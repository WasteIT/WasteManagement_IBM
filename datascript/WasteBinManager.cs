using System;
using System.Collections.Generic;
using System.Threading.Tasks.Dataflow;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using System.ComponentModel;
using System.Net.Http.Json;
using System.Text.Json;

namespace datascript
{

    class WasteBinManager
    {
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

        public void generateData()
        {
            Random rand = new Random();
            for (int dayCount = 1; dayCount <= 30; dayCount++)
            {
                for (int measurementCount = 1; measurementCount <= 12; measurementCount++)
                {
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
                        allBinData.Add("Day " + dayCount + ", meassurement " + measurementCount + ": Bin: " + bin.binNumber + " (" + bin.type + "): " + bin.fillLevel);
                    }
                }
            }
        }

        public void printAllWastebinData()
        {

            foreach (string data in allBinData)
            {
                Console.WriteLine(data);
            }
        }
        public void printOverfilledTime()
        {
            foreach (WasteBin bin in bins)
            {
                Console.WriteLine("Bin number " + bin.binNumber + " was overfilled for " + (bin.overfillTime / 1080.0) * 100 + " percent of the time");
            }
        }
        public void writeDataListsToAFileOrSomething()
        {
            try
            {
                using (StreamWriter writer = new StreamWriter("/Users/juliusdalsgaardbertelsen/Documents/ITU/2 year project/datascript/data.txt"))
                {
                    foreach (WasteBin bin in bins)
                    {
                        writer.WriteLine("\n" + bin.binNumber + "\n");
                        foreach (double meassurement in bin.measurements)
                        {
                            writer.WriteLine(meassurement);
                        }
                    }
                }
            }
            catch
            {
                Console.WriteLine("OH NO!");
            }

        }
        public async void DataSender(List<double> doubles) 
        {
            string firebaseAddress = "https://wasteit-193de-default-rtdb.europe-west1.firebasedatabase.app/";
            List<double> measurements = doubles;
            string jsonString = JsonSerializer.Serialize(measurements);
            string quickTest = "wowowowow";
            string jsonStringTest = JsonSerializer.Serialize(quickTest);

        using (HttpClient client = new HttpClient())
        {  
            
            Console.WriteLine("above");
            HttpResponseMessage responseMessage = await client.PutAsync($"{firebaseAddress}/tester.json", new StringContent(jsonStringTest));
            Console.WriteLine("below");
            if(responseMessage.IsSuccessStatusCode)
            {
                Console.WriteLine("amazing");
            }
            else
            {
                Console.WriteLine("no good");
            }
        }
        }
    }
    
}