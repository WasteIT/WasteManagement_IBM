using System;
using System.Collections.Generic;

namespace datascript
{
    class Program
    {
        static void Main(string[] args)
        {
            WasteBinManager wasteBinManager = new WasteBinManager();

            //int binNumber, string type, int depth, int schedule, double popularity, WasteBinManager wastebinManager)
            WasteBin bin1 = new WasteBin(1, "general waste", 120, 7, 0.7, wasteBinManager, 1.9);
            wasteBinManager.AddWasteBin(bin1);
            WasteBin bin2 = new WasteBin(2, "paper", 120, 14, 1.5, wasteBinManager, 0.71);
            wasteBinManager.AddWasteBin(bin2);
            WasteBin bin3 = new WasteBin(3, "general waste", 120, 7, 1, wasteBinManager, 1.9);
            wasteBinManager.AddWasteBin(bin3);
            WasteBin bin4 = new WasteBin(4, "plastic", 120, 7, 1.2, wasteBinManager, 1.9);
            wasteBinManager.AddWasteBin(bin4);
            WasteBin bin5 = new WasteBin(5, "food", 120, 3, 1.2, wasteBinManager, 2.5);
            wasteBinManager.AddWasteBin(bin5);

            wasteBinManager.generateData();
            wasteBinManager.printAllWastebinData();
            wasteBinManager.printOverfilledTime();
            wasteBinManager.writeDataListsToAFileOrSomething();
            wasteBinManager.DataSender(bin1.measurements);
        }
    }
}

