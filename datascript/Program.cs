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
    public class Program
    {

        static async Task Main(string[] args)
        {
            WasteBinManager wasteBinManager = new WasteBinManager();



            WasteCategory generalWaste = new WasteCategory("General waste", 10, new List<int> { 2, 5 }, 1);
            wasteBinManager.addWasteCategory(generalWaste);

            WasteBin bin1 = new WasteBin("generalWaste1", 120, 0.7, generalWaste, wasteBinManager);
            WasteBin bin2 = new WasteBin("generalWaste2", 120, 1, generalWaste, wasteBinManager);
            WasteBin bin3 = new WasteBin("generalWaste3", 120, 0.9, generalWaste, wasteBinManager);
            WasteBin bin4 = new WasteBin("generalWaste3", 120, 0.8, generalWaste, wasteBinManager);

            generalWaste.AddWasteBin(bin1);
            generalWaste.AddWasteBin(bin2);
            generalWaste.AddWasteBin(bin3);
            generalWaste.AddWasteBin(bin4);



            WasteCategory cardboardWaste = new WasteCategory("Cardboard", 10, new List<int> { 2 }, 1);
            wasteBinManager.addWasteCategory(cardboardWaste);

            WasteBin bin5 = new WasteBin("cardboard1", 120, 0.5, cardboardWaste, wasteBinManager);
            //WasteBin bin6 = new WasteBin("cardboard2", 120, 0.6, cardboardWaste, wasteBinManager);
            //WasteBin bin7 = new WasteBin("cardboard2", 120, 0.6, cardboardWaste, wasteBinManager);

            cardboardWaste.AddWasteBin(bin5);

            WasteCategory plasticWaste = new WasteCategory("Plastic", 12, new List<int> { 2 }, 1);
            wasteBinManager.addWasteCategory(plasticWaste);

            WasteBin bin8 = new WasteBin("plastic1", 120, 0.9, plasticWaste, wasteBinManager);

            plasticWaste.AddWasteBin(bin8);

            WasteCategory dangerousWaste = new WasteCategory("Dangerous", 2, new List<int> { 2 }, 4);
            wasteBinManager.addWasteCategory(dangerousWaste);

            WasteBin bin9 = new WasteBin("dangerous1", 120, 0.7, dangerousWaste, wasteBinManager);
            WasteBin bin10 = new WasteBin("dangerous1", 120, 1, dangerousWaste, wasteBinManager);

            dangerousWaste.AddWasteBin(bin9);
            dangerousWaste.AddWasteBin(bin10);

            WasteCategory foodWaste = new WasteCategory("Food", 14, new List<int> { 1, 3, 5 }, 1);
            wasteBinManager.addWasteCategory(foodWaste);

            WasteBin bin11 = new WasteBin("food1", 120, 0.7, foodWaste, wasteBinManager);
            WasteBin bin12 = new WasteBin("food2", 120, 1, foodWaste, wasteBinManager);

            foodWaste.AddWasteBin(bin11);
            foodWaste.AddWasteBin(bin12);

            WasteCategory glassWaste = new WasteCategory("Glass", 5, new List<int> { 5 }, 2);
            wasteBinManager.addWasteCategory(glassWaste);

            WasteBin bin13 = new WasteBin("glass1", 120, 0.7, glassWaste, wasteBinManager);
            WasteBin bin14 = new WasteBin("glass2", 120, 1, glassWaste, wasteBinManager);
            WasteBin bin15 = new WasteBin("glass2", 120, 1, glassWaste, wasteBinManager);

            glassWaste.AddWasteBin(bin13);
            glassWaste.AddWasteBin(bin14);
            glassWaste.AddWasteBin(bin15);

            WasteCategory metalWaste = new WasteCategory("Metal", 5, new List<int> { 4 }, 2);
            wasteBinManager.addWasteCategory(metalWaste);

            WasteBin bin16 = new WasteBin("metal1", 120, 0.7, metalWaste, wasteBinManager);
            WasteBin bin17 = new WasteBin("metal2", 120, 1, metalWaste, wasteBinManager);

            metalWaste.AddWasteBin(bin16);
            metalWaste.AddWasteBin(bin17);

            WasteCategory paperWaste = new WasteCategory("Paper", 10, new List<int> { 4 }, 1);
            wasteBinManager.addWasteCategory(paperWaste);

            WasteBin bin18 = new WasteBin("paper1", 120, 0, paperWaste, wasteBinManager);
            WasteBin bin19 = new WasteBin("paper2", 120, 1, paperWaste, wasteBinManager);

            paperWaste.AddWasteBin(bin18);
            paperWaste.AddWasteBin(bin19);

            await wasteBinManager.generateData(60, 2, new DateTime(2024, 3, 1));
        }
    }
}

