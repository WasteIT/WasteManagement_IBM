global using datascript;
using System.Collections.Generic;
using Xunit;

namespace Function.Tests
{
    public class UnitTest
    {
        [Fact]
        public void WasteBin_Constructor_SetsPropertiesCorrectly()
        {
            // Arrange
            int binNumber = 1;
            int depth = 100;
            double popularity = 0.5;
            WasteCategory category = new WasteCategory("General", 10, new List<int>() { 1, 3 });
            WasteBinManager manager = new WasteBinManager();

            // Act
            WasteBin bin = new WasteBin(binNumber, depth, popularity, category, manager);

            // Assert
            Assert.Equal(binNumber, bin.binNumber);
            Assert.Equal(depth, bin.depth);
            Assert.Equal(popularity, bin.popularity);
            Assert.Equal(category, bin.wasteCategory);
            Assert.Empty(bin.measurements);
            Assert.Equal(0, bin.fillLevel);
        }
        [Fact]
        public void WasteBin_AddWaste_IncreasesFillLevel()
        {
            // Arrange
            WasteBin bin = new WasteBin(1, 100, 0.5, new WasteCategory("General", 10, new List<int>() { 1, 3 }), new WasteBinManager());
            double wasteAmount = 10.5;

            // Act
            bin.addWaste(wasteAmount);

            // Assert
            Assert.Equal(wasteAmount, bin.fillLevel);
        }

        [Fact]
        public void WasteBinManager_GenerateWaste_SetsWasteAmountForCategories()
        {
            // Arrange
            WasteBinManager manager = new WasteBinManager();
            WasteCategory category1 = new WasteCategory("General", 10, new List<int>() { 1 });
            WasteCategory category2 = new WasteCategory("Recycling", 5, new List<int>() { 2 });
            manager.wasteCategories.Add(category1);
            manager.wasteCategories.Add(category2);

            // Act
            manager.generateWaste();

            // Assert
            Assert.True(category1.wasteAmount >= category1.popularity);
            Assert.True(category2.wasteAmount >= category2.popularity);
        }
        [Fact]
        public void WasteBinManager_CalculateWasteShareForEachBin_SetsShareWithRandomVariation()
        {
            // Arrange
            var mockRandom = new Mock<Random>();
            mockRandom.Setup(r => r.NextDouble()).Returns(0.2);

            WasteBinManager manager = new WasteBinManager(mockRandom.Object); 
            WasteCategory category = new WasteCategory("General", 10, new List<int>() { 1 });
            WasteBin bin1 = new WasteBin(1, 100, 0.5, category, manager);
            WasteBin bin2 = new WasteBin(2, 100, 0.7, category, manager);
            category.wasteBins.Add(bin1);
            category.wasteBins.Add(bin2);

            // Act
            manager.calculateWasteShareForEachBin();

            // Assert 
            Assert.Equal(0.7, bin1.popularityWithRandomVariation); 
            Assert.Equal(0.9, bin2.popularityWithRandomVariation); 
        }
        [Fact]
        public void WasteBinManager_DistributeWasteBasedOnShare_FillsBinToCapacity()
        {
            // Arrange
            WasteBinManager manager = new WasteBinManager();
            WasteCategory category = new WasteCategory("General", 100, new List<int>() { 1 });
            WasteBin bin = new WasteBin(1, 50, 0.5, category, manager);
            category.wasteBins.Add(bin);
            bin.fillLevel = 50;
            category.wasteAmount = 60;

            // Act
            manager.distributeWasteBasedOnShare();

            // Assert
            Assert.Equal(bin.fillLevel, bin.depth);
        }

        [Fact]
        public void WasteBinManager_DistributeWasteBasedOnShare_HandlesOverflowToGeneralWaste()
        {
            // Arrange
            WasteBinManager manager = new WasteBinManager();
            WasteCategory category = new WasteCategory("General", 100, new List<int>() { 1 });
            WasteBin bin1 = new WasteBin(1, 20, 0.5, category, manager);
            WasteBin bin2 = new WasteBin(2, 30, 0.5, category, manager);
            category.wasteBins.Add(bin1);
            category.wasteBins.Add(bin2);
            category.wasteAmount = 70; // Waste exceeding total bin capacity

            // Act
            manager.distributeWasteBasedOnShare();

            // Assert - Check fill levels of both bins
            Assert.True(bin1.fillLevel <= bin1.depth);  // Less than or equal to bin depth
            Assert.True(bin2.fillLevel <= bin2.depth);
        }

        
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
        /*[Theory]
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
            
        }*/ 
    }
}
