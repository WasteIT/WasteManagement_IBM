global using datascript;
using System.Collections.Generic;
using Xunit;

namespace Function.Tests
{
    public class UnitTest
    {
        [Fact]
        public void TestGenerateWaste()
        {
            // Arrange
            WasteBinManager manager = new WasteBinManager();
            
            WasteCategory plastic = new WasteCategory("Plastic", 7, new List<int> { 6 });
            WasteCategory paper = new WasteCategory("Paper", 6, new List<int> { 5 });
            WasteCategory glass = new WasteCategory("Glass", 5, new List<int> { 4});
            
            manager.addWasteCategory(plastic);
            manager.addWasteCategory(paper);

            // Act
            manager.generateWaste();

            // Assert
            foreach (var wasteCategory in manager.wasteCategories)
            {
                Assert.True(wasteCategory.wasteAmount > 0);
            }
        }
        [Fact]
        public void calculateWasteShareForEachBin()
        {
            //Arrange
            WasteBinManager manager = new WasteBinManager();
            WasteCategory plastic = new WasteCategory("Plastic", 7, new List<int> { 6 });

            WasteBin bin1 = new WasteBin(1, 120, 0.7, plastic, manager);
            WasteBin bin2 = new WasteBin(2, 120, 1, plastic, manager);
            WasteBin bin3 = new WasteBin(3, 120, 0.9, plastic, manager);

            manager.addWasteCategory(plastic);
            plastic.AddWasteBin(bin1);
            plastic.AddWasteBin(bin2);
            plastic.AddWasteBin(bin3);

            plastic.wasteAmount = 10;
            
            //Act
            manager.calculateWasteShareForEachBin();
            
            
            //Assert
            double totalWaste = bin1.share + bin2.share + bin3.share;
            Assert.Equal(10, totalWaste);
        }
    }
}
