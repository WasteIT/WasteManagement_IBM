using System;
using System.Collections.Generic;

namespace datascript
{

    public class WasteCategory
    {
        public double wasteAmount { get; set; }
        public string type { get; set; }
        public List<WasteBin> wasteBins { get; set; }
        public int popularity { get; set; }
        public List<int> schedule { get; set; }



        public WasteCategory(string type, int popularity, List<int> schedule)
        {
            this.type = type;
            this.wasteBins = new List<WasteBin>();
            this.popularity = popularity;
            this.schedule = schedule;
        }

        public void AddWasteBin(WasteBin bin)
        {
            wasteBins.Add(bin);
        }
    }
}
