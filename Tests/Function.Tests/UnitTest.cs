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
            double totalWastePercent = bin1.share + bin2.share + bin3.share;
            int roundedTotalWastePercent = (int)Math.Ceiling(totalWastePercent);
            Assert.Equal(roundedTotalWastePercent, 1);
        }
        [Theory]
        //[InlineData(0.5, 0.5, 100, 0)]
        [InlineData(0.2, 0.8, 10, 0)]
        public void distributeWasteBasedOnShare(int bin1Share, int bin2Share, double bin1FillLevel, double bin2FillLevel)
        {
            //Arrange
            WasteBinManager manager = new WasteBinManager();

            WasteCategory plastic = new WasteCategory("Plastic", 7, new List<int> { 6 });
            WasteCategory general = new WasteCategory("GeneralWaste", 6, new List<int> { 4 });

            WasteBin bin1 = new WasteBin(1, 120, 1, plastic, manager);
            WasteBin bin2 = new WasteBin(2, 120, 1, plastic, manager);

            WasteBin bin3 = new WasteBin(2, 120, 0.6, general, manager);

            bin1.share = bin1Share;
            bin2.share = bin2Share;
            bin1.fillLevel = bin1FillLevel;
            bin2.fillLevel = bin2FillLevel;

            plastic.wasteAmount = 50;

            manager.addWasteCategory(plastic);
            manager.addWasteCategory(general);

            plastic.AddWasteBin(bin1);
            plastic.AddWasteBin(bin2);
            general.AddWasteBin(bin3);
            //Act
            manager.distributeWasteBasedOnShare();
            
            //Assert
            if(bin1.fillLevel + bin1.share * plastic.wasteAmount > bin1.depth && bin2.fillLevel + bin2.share * plastic.wasteAmount < bin2.depth)
            {
                Assert.Equal(bin1.fillLevel, bin1.depth);
                Assert.True(bin2.fillLevel > bin2.share * plastic.wasteAmount);
            }
            if(bin1.fillLevel + bin1.share * plastic.wasteAmount < bin1.depth && bin2.fillLevel + bin2.share * plastic.wasteAmount < bin2.depth)
            {
                Assert.Equal(bin1.fillLevel, bin1.share * plastic.wasteAmount);
                Assert.Equal(bin2.fillLevel, bin2.share * plastic.wasteAmount);
            }
            
        } 
    }
}
