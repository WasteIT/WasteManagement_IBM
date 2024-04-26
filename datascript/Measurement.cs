using System;
using System.Collections.Generic;

namespace datascript
{

    public class Measurement
    {
        // Properties
        public int binNumber { get; set; }
        public string type { get; set; }
        public long timestamp { get; set; }
        public double fillLevel { get; set; }


        public Measurement(int binNumber, string type, long timestamp, double fillLevel)
        {
            this.binNumber = binNumber;
            this.type = type;
            this.timestamp = timestamp;
            this.fillLevel = fillLevel;
        }
    }
}
