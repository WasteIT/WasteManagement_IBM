using System;
using System.Collections.Generic;

namespace datascript
{

    public class WasteBin
    {
        public int binNumber { get; set; }
        public WasteCategory wasteCategory { get; set; }
        public int depth { get; set; }
        public double popularity { get; set; }
        public double fillLevel { get; set; }
        public WasteBinManager wasteBinManager { get; set; }

        public double popularityWithRandomVariation { get; set; }
        public double share { get; set; }

        public List<Measurement> measurements { get; set; }

        public WasteBin(int binNumber, int depth, double popularity, WasteCategory wasteCategory, WasteBinManager wastebinManager)
        {
            this.wasteCategory = wasteCategory;
            this.depth = depth;
            this.popularity = popularity;
            fillLevel = 0;
            this.wasteBinManager = wasteBinManager;
            this.binNumber = binNumber;
            this.measurements = new List<Measurement>();
            //Console.WriteLine("JUST MADE A NEW BIN WITH THESE SPECS: " + type + " " + depth + " " + schedule + " " + popularity);
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
            //overfilled = false;
        }
    }
}
