namespace Function.Tests;
using Xunit;

public class UnitTest
{
    [Fact]
    public void TestAdd()
    {
        var function = new Function();
        Assert.Equal(3, function.add(1, 2));
    }
}
