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
using System.Linq;

namespace datascript
{

    public class WasteBinManager
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


        public Dictionary<string, List<int>> pickupSchedule;
        public Dictionary<string, double> averageFillLevelAtPickup;

        public WasteBinManager()
        {
            //bins = new List<WasteBin>();
            wasteCategories = new List<WasteCategory>();
            pickupSchedule = new Dictionary<string, List<int>>();
            averageFillLevelAtPickup = new Dictionary<string, double>();
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
                    bin.share = (bin.popularityWithRandomVariation / totalPopularity);
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
                    //Console.WriteLine("Adding waste from one bin to another bin of the same type beyond its normal share");
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

        

        public void EmptyBinsOnSchedule(int measurementCount, int currentWeekDayNumber)
        {

            if (measurementCount == 0)
            {
                foreach (var wasteCategory in wasteCategories)
                {
                    foreach (int scheduleWeekDay in wasteCategory.schedule)
                    {
                    
                        if (scheduleWeekDay + 1 == currentWeekDayNumber)
                        {
                            
                            foreach (var bin in wasteCategory.wasteBins)
                            {
                                bin.fillLevel = 0;
                            }
                        }
                    }
                    //if (measurementCount % (wasteCategory.schedule * 2) == 0) // * 2 because there is two measurements each day ... 
                }
            }

        }

        public async Task uploadDataForOneGenerationOfMeasurements(long time)
        {
            foreach (var wasteCategory in wasteCategories)
            {
                foreach (var bin in wasteCategory.wasteBins)
                {
                    //await PostAsync(sharedClient, bin, time.ToString());
                    //Console.WriteLine("Bin with number " + bin.binNumber + " of type " + bin.wasteCategory.type + " has a level of " + bin.fillLevel + " at time: " + time);

                    //Also add the data (nicely formatted) to a local dataset to calculate pickup stuff here, just for now.
                    Measurement measurement = new Measurement(bin.binNumber, bin.wasteCategory.type, time, bin.fillLevel);
                    bin.measurements.Add(measurement);
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
            DayOfWeek startDateWeekDay = startDate.DayOfWeek;
            int weekDayNumber = (int)startDateWeekDay;
            long time = startDateUnixTime;

            for (int day = 0; day < dayCount; day++)
            {
                if (weekDayNumber % 7 == 0)
                {
                    weekDayNumber = 0;
                }
                weekDayNumber += 1;

                for (int observation = 0; observation < dailyObservationCount; observation++)
                {
                    //first create the time stamp for this generation of measurements and convert it to a date. 
                    time += incrementSeconds;
                    DateTime timeDateTime = UnixTimeStampToDateTime(time);

                    //next, generate data for this generation of measurements
                    generateWaste();
                    calculateWasteShareForEachBin();
                    distributeWasteBasedOnShare();
                    EmptyBinsOnSchedule(observation, weekDayNumber);
                    await uploadDataForOneGenerationOfMeasurements(time);
                    ResetCategoriesAndBins();
                }
            }
            CalculatePickupSchedulesAndAvgFillLevelBasedOnDataTrends();
            PrintDictionaryStuff();
            
        }

        public void PrintDictionaryStuff()
        {
            foreach (KeyValuePair<string, List<int>> kvp in pickupSchedule)
            {
                Console.Write("Key: " + kvp.Key + ", Value: ");
                // Iterate over the list and print each element
                foreach (int value in kvp.Value)
                {
                    Console.Write(value + " ");
                }
                Console.WriteLine(); // Move to the next line for the next key-value pair
            }

            foreach (KeyValuePair<string, double> kvp in averageFillLevelAtPickup)
            {
                Console.WriteLine("Waste type: " + kvp.Key + ", Average fill level at pickup time: " + kvp.Value);
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

        public void CalculatePickupSchedulesAndAvgFillLevelBasedOnDataTrends()
        {
            foreach (var wasteCategory in wasteCategories)
            {

                HashSet<int> pickUpWeekDays = new HashSet<int>();
                List<double> measurementsBeforePickup = new List<double>();
                foreach (var bin in wasteCategory.wasteBins)
                {
                    double previousMeasurementFillLevel = -1;
                    foreach (var measurement in bin.measurements)
                    {
                        if (previousMeasurementFillLevel > measurement.fillLevel)
                        {
                            //Console.WriteLine("FOUND AN DAY WHERE A BIN WAS EMPTIED! FRACTION " + wasteCategory.type + " IS EMPTIED. PREVIOUS: " + previousMeasurementFillLevel + " AND CURRENT/NEW: " + measurement.fillLevel + ". THIS IS THE BIN: " + measurement.type + " number: " + measurement.binNumber);

                            DateTime timestampDateTime = DateTimeOffset.FromUnixTimeSeconds(measurement.timestamp).DateTime;
                            int timestampWeekday = (int)timestampDateTime.DayOfWeek;

                            pickUpWeekDays.Add(timestampWeekday);
                            measurementsBeforePickup.Add(previousMeasurementFillLevel);
                        }
                        previousMeasurementFillLevel = measurement.fillLevel;
                    }
                }

                pickupSchedule[wasteCategory.type] = pickUpWeekDays.ToList();
                //Console.WriteLine("ADDED PICK UP TIMES TO THE LIBRARY");
                double averageFillLevelAtPickupValue = 0;
                if (measurementsBeforePickup.Count > 0)
                {
                    averageFillLevelAtPickupValue = measurementsBeforePickup.Average();
                }
                averageFillLevelAtPickup[wasteCategory.type] = averageFillLevelAtPickupValue;
                //Console.WriteLine("ADDED AVERAGE FILL LEVEL AT UP TIMES TO THE LIBRARY: " + averageFillLevelAtPickupValue + " FOR WASTE TYPE " + wasteCategory.type);
            }
        }

    }
}