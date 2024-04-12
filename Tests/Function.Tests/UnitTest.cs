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

            //WasteBin bin1 = new WasteBin(1, 120, 0.7, plastic, manager);
            //WasteBin bin2 = new WasteBin(1, 120, 0.7, paper, manager);
            
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
    }
}
