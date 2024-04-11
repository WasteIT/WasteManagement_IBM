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
    class Program
    {

        static async Task Main(string[] args)
        {
            WasteBinManager wasteBinManager = new WasteBinManager();



            WasteCategory generalWaste = new WasteCategory("General waste", 3, 7);
            wasteBinManager.addWasteCategory(generalWaste);

            WasteBin bin1 = new WasteBin(1, 120, 0.7, generalWaste, wasteBinManager);
            WasteBin bin2 = new WasteBin(2, 120, 1, generalWaste, wasteBinManager);
            WasteBin bin3 = new WasteBin(3, 120, 0.9, generalWaste, wasteBinManager);

            generalWaste.AddWasteBin(bin1);
            generalWaste.AddWasteBin(bin2);
            generalWaste.AddWasteBin(bin3);


            WasteCategory cardboardWaste = new WasteCategory("Cardboard", 3, 7);
            wasteBinManager.addWasteCategory(cardboardWaste);

            WasteBin bin4 = new WasteBin(4, 120, 0.5, cardboardWaste, wasteBinManager);
            WasteBin bin5 = new WasteBin(5, 120, 0.6, cardboardWaste, wasteBinManager);

            cardboardWaste.AddWasteBin(bin4);
            cardboardWaste.AddWasteBin(bin5);

            WasteCategory plasticWaste = new WasteCategory("Plastic", 3, 7);
            wasteBinManager.addWasteCategory(plasticWaste);

            WasteBin bin6 = new WasteBin(4, 120, 0.9, plasticWaste, wasteBinManager);

            plasticWaste.AddWasteBin(bin6);

            WasteCategory dangerousWaste = new WasteCategory("Dangerous", 3, 2);
            wasteBinManager.addWasteCategory(dangerousWaste);

            WasteBin bin7 = new WasteBin(1, 120, 0.7, dangerousWaste, wasteBinManager);
            WasteBin bin8 = new WasteBin(2, 120, 1, dangerousWaste, wasteBinManager);

            dangerousWaste.AddWasteBin(bin7);
            dangerousWaste.AddWasteBin(bin8);

            WasteCategory foodWaste = new WasteCategory("Food", 3, 2);
            wasteBinManager.addWasteCategory(foodWaste);

            WasteBin bin9 = new WasteBin(1, 120, 0.7, foodWaste, wasteBinManager);
            WasteBin bin10 = new WasteBin(2, 120, 1, foodWaste, wasteBinManager);

            foodWaste.AddWasteBin(bin9);
            foodWaste.AddWasteBin(bin10);

            WasteCategory glassWaste = new WasteCategory("Glass", 3, 2);
            wasteBinManager.addWasteCategory(glassWaste);

            WasteBin bin11 = new WasteBin(1, 120, 0.7, glassWaste, wasteBinManager);
            WasteBin bin12 = new WasteBin(2, 120, 1, glassWaste, wasteBinManager);

            foodWaste.AddWasteBin(bin11);
            foodWaste.AddWasteBin(bin12);

            WasteCategory MetalWaste = new WasteCategory("Metal", 3, 2);
            wasteBinManager.addWasteCategory(MetalWaste);

            WasteBin bin13 = new WasteBin(1, 120, 0.7, MetalWaste, wasteBinManager);
            WasteBin bin14 = new WasteBin(2, 120, 1, MetalWaste, wasteBinManager);

            foodWaste.AddWasteBin(bin13);
            foodWaste.AddWasteBin(bin14);

            WasteCategory PaperWaste = new WasteCategory("Paper", 3, 2);
            wasteBinManager.addWasteCategory(PaperWaste);

            WasteBin bin15 = new WasteBin(1, 120, 0.7, PaperWaste, wasteBinManager);
            WasteBin bin16 = new WasteBin(2, 120, 1, PaperWaste, wasteBinManager);

            foodWaste.AddWasteBin(bin15);
            foodWaste.AddWasteBin(bin16);

             await wasteBinManager.generateData(30, 2, new DateTime(2024, 3, 1));
        }
    }
}

/*
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

}*/

