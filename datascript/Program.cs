﻿using System;
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
    class Program
    {
       
        static async Task Main(string[] args)
        {
            WasteBinManager wasteBinManager = new WasteBinManager();

            //int binNumber, string type, int depth, int schedule, double popularity, WasteBinManager wastebinManager)
            WasteBin bin1 = new WasteBin(1, "General waste", 120, 7, 0.7, wasteBinManager);
            wasteBinManager.AddWasteBin(bin1);
             WasteBin bin10 = new WasteBin(1, "General waste", 120, 7, 0.2, wasteBinManager);
            wasteBinManager.AddWasteBin(bin10);
            WasteBin bin2 = new WasteBin(2, "Plastic", 120, 7, 0.5, wasteBinManager);
            wasteBinManager.AddWasteBin(bin2);
            WasteBin bin3 = new WasteBin(3, "Cardboard", 120, 7, 1.2, wasteBinManager);
            wasteBinManager.AddWasteBin(bin3);
            WasteBin bin4 = new WasteBin(4, "Metal", 120, 7, 0.3, wasteBinManager);
            wasteBinManager.AddWasteBin(bin4);
            WasteBin bin5 = new WasteBin(5, "Food", 120, 7, 0.5, wasteBinManager);
            wasteBinManager.AddWasteBin(bin5);

            await wasteBinManager.generateData();
            wasteBinManager.printAllWastebinData();
        }
    }

}

