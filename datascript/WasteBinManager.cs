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
            BaseAddress = new Uri("http://localhost:5000/test")
        };

        static List<long> randomEpochTimes;
        public List<WasteBin> bins { get; }
        public List<string> allBinData = new List<string>();
        public int panic { get; }
        public WasteBinManager()
        {
            bins = new List<WasteBin>();
        }
        public void AddWasteBin(WasteBin bin)
        {
            bins.Add(bin);
        }

        public void manageOverspill(WasteBin overfilledBin, double overfill)
        {
            Console.WriteLine("MANAGING OVERSPILL");
            bool overspillManaged = false;
            foreach (var bin in bins)
            {
                if (overspillManaged)
                {
                    break;
                }
                if (bin.type == "general waste" || bin.type == overfilledBin.type && !bin.overfilled && bin != overfilledBin)
                {
                    bin.addWaste(overfill);
                    overfilledBin.removeWaste(overfill);
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
            if (!overspillManaged)
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
            }*/

        }

        public async Task generateData()
        {
            Random rand = new Random();
            for (int dayCount = 1; dayCount <= 30; dayCount++)
            {
                randomEpochTimes = GenerateRandomEpochTimes(2024, 1, dayCount);
                for (int measurementCount = 1; measurementCount <= 2; measurementCount++)
                {
                    string time = randomEpochTimes[measurementCount].ToString();
                    //first check if bin is being emptied (first measurement on bin collection day)
                    foreach (WasteBin bin in bins)
                    {

                        if (bin.schedule != 0 && (dayCount % bin.schedule) == 0 && measurementCount == 1)
                        {
                            bin.emptyBin();
                        }

                        //fill wastebin and handle potential overspill
                        bin.fillLevel += ((2 * rand.NextDouble()) * (bin.fillRate) * bin.popularity); //Randomly adjust fill level

                        if (bin.fillLevel >= bin.depth)
                        {
                            bin.overfilled = true;
                            bin.overfillTime++; //count number of meassurements made where the bin has been overfilled.
                            manageOverspill(bin, bin.fillLevel - bin.depth);
                        }

                        bin.measurements.Add(bin.fillLevel);
                        await PostAsync(sharedClient, bin, time);
                    }
                }
            }
        }

        static async Task PostAsync(HttpClient httpClient, WasteBin bin, string time)
        {        
                using StringContent jsonContent = new StringContent(JsonSerializer.Serialize(new
                {

                    ID = bin.binNumber,
                    Type = bin.type,
                    Timestamp = time,
                    fill_level = bin.fillLevel.ToString()
                }), Encoding.UTF8, "application/json");

                using HttpResponseMessage response = await httpClient.PostAsync("test", jsonContent);

                var jsonResponse = await response.Content.ReadAsStringAsync();
                Console.WriteLine($"{jsonResponse}\n");
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
            for (int i = 0; i <= 2; i++) // Generate 12 random times
            {
                long randomEpochTime = startEpochTime + (long)(random.NextDouble() * (endEpochTime - startEpochTime));
                epochTimes.Add(randomEpochTime);
            }

            return epochTimes;
        }
    }
}