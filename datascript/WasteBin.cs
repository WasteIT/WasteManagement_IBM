using System;
using System.Collections.Generic;

namespace datascript
{

    class WasteBin
    {
        public int binNumber { get; set; }
        public string type { get; set; }
        public int depth { get; set; }
        public int schedule { get; set; }
        public double popularity { get; set; }
        public double fillLevel { get; set; }
        public bool overfilled { get; set; }
        public int overfillTime { get; set; }
        public int measurementCount { get; set; }
        public double fillRate { get; set; }
        public WasteBinManager wasteBinManager { get; set; }
        public List<double> measurements { get; set; }
        public double dailyFillLevel {get; set; }

        public WasteBin(int binNumber, string type, int depth, int schedule, double popularity, WasteBinManager wastebinManager, double fillRate)
        {
            this.type = type;
            this.depth = depth;
            this.schedule = schedule;
            this.popularity = popularity;
            measurementCount = 0;
            fillLevel = 0;
            overfilled = false;
            overfillTime = 0;
            this.fillRate = fillRate;
            this.wasteBinManager = wasteBinManager;
            this.binNumber = binNumber;
            measurements = new List<double>();
            Console.WriteLine("JUST MADE A NEW BIN WITH THESE SPECS: " + type + " " + depth + " " + schedule + " " + popularity);
        }

        public void addWaste(double amount)
        {
            fillLevel += amount;
        }

        public void removeWaste(double amount)
        {
            fillLevel -= amount;
        }
        public void emptyBin()
        {
            fillLevel = 0;
            overfilled = false;
        }
    }
}
