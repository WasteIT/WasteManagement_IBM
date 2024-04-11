using System;
using System.Collections.Generic;
using System.Threading.Tasks.Dataflow;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using System.ComponentModel;
using System.Net.Http.Json;
using System.Text.Json;
using System.Text;

namespace datascript
{

    class WasteBinManager
    {
        private static readonly HttpClient sharedClient = new HttpClient
        {
            BaseAddress = new Uri("https://wasteit-backend.azurewebsites.net/test")
        };

        //static List<long> randomEpochTimes;
        //static List<WasteCategory> wasteCategories;

        //public List<WasteBin> bins { get; }
        public List<WasteCategory> wasteCategories { set; get; }
        public List<string> allBinData = new List<string>();
        public int panic { get; }

        public WasteBinManager()
        {
            //bins = new List<WasteBin>();
            wasteCategories = new List<WasteCategory>();
        }

        public void addWasteCategory(WasteCategory wasteCategory)
        {
            wasteCategories.Add(wasteCategory);
        }

        public void generateWaste()
        {
            //first generate the waste to be distributed for each waste category
            Random rand = new Random();
            foreach (var wasteCategory in wasteCategories)
            {
                wasteCategory.wasteAmount = ((rand.NextDouble() + 1)) * (wasteCategory.popularity);
            }
        }

        public void calculateWasteShareForEachBin()
        {
            foreach (var wasteCategory in wasteCategories)
            {
                double wasteAmount = wasteCategory.wasteAmount;
                Random rand = new Random();

                //calculate popularity with randomness:
                foreach (var bin in wasteCategory.wasteBins)
                {
                    bin.popularityWithRandomVariation = bin.popularity + (rand.NextDouble() + 1); // is addition right here?
                }

                double totalPopularity = wasteCategory.wasteBins.Sum(b => b.popularityWithRandomVariation); //we find the total popularity to get the distribution.

                foreach (var bin in wasteCategory.wasteBins)
                {
                    //first calculate the share of waste without randomness
                    bin.share = wasteAmount * (bin.popularityWithRandomVariation / totalPopularity);
                }
            }
            //For each category, add the waste to the relevant bins

        }
        public void distributeWasteBasedOnShare()
        {
            double overflowGeneralWaste = 0;
            double excessWaste = 0;
            foreach (var wasteCategory in wasteCategories)
            {
                double wasteAmount = wasteCategory.wasteAmount;
                foreach (var bin in wasteCategory.wasteBins)
                {
                    double binCapacity = bin.depth - bin.fillLevel;
                    double wasteToBeAddedToBin = wasteAmount * bin.share;
                    if (wasteToBeAddedToBin > binCapacity)
                    {
                        bin.fillLevel += binCapacity;
                        // Accumulate the remaining waste as excess waste
                        excessWaste += wasteToBeAddedToBin - binCapacity;
                    }
                    else
                    {
                        // Add the waste to the bin
                        bin.fillLevel += wasteToBeAddedToBin;
                    }
                }
                if (excessWaste > 0)
                {
                    Console.WriteLine("Adding waste from one bin to another bin of the same type beyond its normal share");
                    double totalCapacity = wasteCategory.wasteBins.Sum(bin => bin.depth - bin.fillLevel);
                    if (excessWaste > totalCapacity)
                    {
                        overflowGeneralWaste = excessWaste - totalCapacity;
                        excessWaste = totalCapacity;
                    }
                    if (totalCapacity > 0)
                    {
                        foreach (var bin in wasteCategory.wasteBins)
                        {
                            double binCapacity = bin.depth - bin.fillLevel;
                            double proportion = binCapacity / totalCapacity;
                            double wasteToAdd = excessWaste * proportion;
                            bin.fillLevel += wasteToAdd;
                        }
                    }
                }
            }
            //next go through waste categories again to find general waste and handle overflow into the general waste bins.
            foreach (var wasteCategory in wasteCategories)
            {
                if (overflowGeneralWaste <= 0)
                    break;  //no more overflowGeneralWaste, stop. 

                if (wasteCategory.type == "general waste")
                {
                    Console.WriteLine("Adding overflow waste to general waste bin");
                    double totalCapacity = wasteCategory.wasteBins.Sum(bin => bin.depth - bin.fillLevel);
                    if (totalCapacity < overflowGeneralWaste)
                    {
                        overflowGeneralWaste = totalCapacity;
                        Console.WriteLine("Oh no, there is waste that has nowhere to go. We have ignored it for now");
                    }
                    if (totalCapacity > 0)
                    {
                        foreach (var bin in wasteCategory.wasteBins)
                        {
                            double binCapacity = bin.depth - bin.fillLevel;
                            double proportion = binCapacity / totalCapacity;
                            double wasteToAdd = excessWaste * proportion;
                            bin.fillLevel += wasteToAdd;
                        }
                    }
                }
            }
        }

        public void EmptyBinsOnSchedule(int measurementCount)
        {
            foreach (var wasteCategory in wasteCategories)
            {
                if (measurementCount % (wasteCategory.schedule * 2) == 0) // * 2 because there is two measurements each day ... 
                {
                    foreach (var bin in wasteCategory.wasteBins)
                    {
                        bin.fillLevel = 0;
                    }

                }
            }
        }

        public async Task uploadDataForOneGenerationOfMeasurements(DateTime time)
        {
            foreach (var wasteCategory in wasteCategories)
            {
                foreach (var bin in wasteCategory.wasteBins)
                {
                    await PostAsync(sharedClient, bin, time.ToString());
                    Console.WriteLine("Bin with number " + bin.binNumber + " of type " + bin.wasteCategory.type + " has a level of " + bin.fillLevel + " at time: " + time);
                }
            }
        }

        public void ResetCategoriesAndBins()
        {
            foreach (var wasteCategory in wasteCategories)
            {
                wasteCategory.wasteAmount = 0;
                foreach (var bin in wasteCategory.wasteBins)
                {
                    bin.popularityWithRandomVariation = 0;
                }
            }
        }

        public async Task generateData(int dayCount, int dailyObservationCount, DateTime startDate)
        {
            //first we find out how much to increment time stamp according to number of daily ovservations.
            int incrementSeconds = 86400 / dailyObservationCount;
            long startDateUnixTime = ((DateTimeOffset)startDate).ToUnixTimeSeconds();
            long time = startDateUnixTime;

            for (int observation = 1; observation <= dailyObservationCount * dayCount; observation++)
            {
                //first create the time stamp for this generation of measurements and convert it to a date. 
                time += incrementSeconds;
                DateTime timeDateTime = UnixTimeStampToDateTime(time);

                //next, generate data for this generation of measurements
                generateWaste();
                calculateWasteShareForEachBin();
                distributeWasteBasedOnShare();
                EmptyBinsOnSchedule(observation);
                await uploadDataForOneGenerationOfMeasurements(timeDateTime);
                ResetCategoriesAndBins();
            }
        }

        public static DateTime UnixTimeStampToDateTime(double unixTimeStamp)
        {
            // Unix timestamp is seconds past epoch
            DateTime dateTime = new DateTime(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc);
            dateTime = dateTime.AddSeconds(unixTimeStamp).ToLocalTime();
            return dateTime;
        }

        static async Task PostAsync(HttpClient httpClient, WasteBin bin, string time)
        {
            using StringContent jsonContent = new StringContent(JsonSerializer.Serialize(new
            {

                ID = bin.binNumber,
                Type = bin.wasteCategory.type,
                Timestamp = time,
                fill_level = bin.fillLevel.ToString()
            }), Encoding.UTF8, "application/json");

            using HttpResponseMessage response = await httpClient.PostAsync("test", jsonContent);
            var jsonResponse = await response.Content.ReadAsStringAsync();
            Console.WriteLine($"{jsonResponse}\n");
        }
    }
}










/*











        public void AddWasteBin(WasteBin bin)
        {
            bins.Add(bin);
        }

        public void manageOverspill(WasteBin overfilledBin, double overfill)
        {
            //Console.WriteLine("MANAGING OVERSPILL");
            bool overspillManaged = false;
            foreach (var bin in bins)
            {
                if (overspillManaged)
                {
                    break;
                }
                if (bin.wasteCategory.type == "General waste" && bin != overfilledBin)
                {
                    //Console.WriteLine("Handling overspill from " + overfilledBin.type + " into: " + bin.type);
                    bin.addWaste(overfill);
                    overspillManaged = true;
                    if (bin.fillLevel > bin.depth)
                    {

                        bin.fillLevel = bin.depth;
                        bin.overfilled = true;
                        bin.overfillTime++;
                        manageOverspill(bin, bin.fillLevel - bin.depth); //if the bin we passed overspill to is now overfilled, call manageoverspill again with new bin
                    }
                }
            }
            if (overspillManaged)
            {
                overfilledBin.fillLevel = overfilledBin.depth;
            }
            /*if (overfilledBin.fillLevel > overfilledBin.depth) //if the overfilled bin is still full, then the overfill hasn't gone anywhere. Send overfill anywhere indescriminately instead.
            {
                foreach (var bin in bins)
                {
                    if (!bin.overfilled && bin != overfilledBin)
                    {
                        bin.addWaste(overfill);
                        overfilledBin.removeWaste(overfill);
                        if (bin.fillLevel > bin.depth)
                        {
                            bin.fillLevel = bin.depth;
                            bin.overfilled = true;
                            bin.overfillTime++;
                            manageOverspill(bin, bin.fillLevel - bin.depth);
                        }
                    }
                }
            }

}

public async Task generateData()
{
Random rand = new Random();
for (int dayCount = 1; dayCount <= 30; dayCount++)
{

    randomEpochTimes = GenerateRandomEpochTimes(2024, 1, dayCount);
    string time = randomEpochTimes[0].ToString();
    for (int measurementCount = 1; measurementCount <= 2; measurementCount++)
    {

        //first check if bin is being emptied (first measurement on bin collection day)
        foreach (WasteBin bin in bins)
        {

            //fill wastebin and handle potential overspill
            bin.fillLevel += (((rand.NextDouble() + 1)) * (bin.fillRate) * bin.popularity); //Randomly adjust fill level
            if (bin.fillLevel >= bin.depth || bin.overfilled)
            {
                bin.overfilled = true;
                bin.overfillTime++; //count number of meassurements made where the bin has been overfilled.
                manageOverspill(bin, bin.fillLevel - bin.depth);
            }

            bin.measurements.Add(bin.fillLevel);
            //allBinData.Add("Day " + dayCount + ", meassurement " + measurementCount + ": Bin: " + bin.binNumber + " (" + bin.type + "): " + bin.fillLevel);

            if (bin.schedule != 0 && (dayCount % bin.schedule) == 0 && measurementCount == 1)
            {
                bin.emptyBin();
            }
        }
        foreach (WasteBin bin in bins)
        {
            await PostAsync(sharedClient, bin, time);
        }
    }
}
}

static List<long> GenerateRandomEpochTimes(int year, int month, int day)
{
List<long> epochTimes = new List<long>();
Random random = new Random();

// Create DateTime object for the given day
DateTime givenDate = new DateTime(year, month, day);

// Convert the given date to epoch time
long startEpochTime = (long)(givenDate.Date - new DateTime(1970, 1, 1)).TotalSeconds;
long endEpochTime = startEpochTime + 86400; // Add 24 hours in seconds for end time

// Generate random epoch times within the range of the given day
for (int i = 0; i <= 2; i++) // Generate 2  times
{
    long randomEpochTime = startEpochTime + (endEpochTime - startEpochTime) + 43200;
    epochTimes.Add(randomEpochTime);
}

return epochTimes;
}

public void printAllWastebinData()
{

foreach (string data in allBinData)
{
    if (data.Contains("Plastic"))
        Console.WriteLine(data);
}
}
}*/