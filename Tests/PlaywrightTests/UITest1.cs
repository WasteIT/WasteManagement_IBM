using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.Playwright;
using Microsoft.Playwright.NUnit;
using NUnit.Framework;

namespace PlaywrightTests;

[Parallelizable(ParallelScope.Self)]
[TestFixture]
public class Tests : PageTest
{
    [Test]
    public async Task canGoToStartPagePage()
    {
        await Page.GotoAsync("https://wasteit.azurewebsites.net/");

    }
    [Test]
    public async Task clickOnAgreementsSendsToAgreementPage()
    {
        await Page.GotoAsync("https://wasteit.azurewebsites.net/");
        await Page.GetByRole(AriaRole.Link, new() { Name = "Agreements" }).ClickAsync();
        await Expect(Page.GetByPlaceholder("Search")).ToBeVisibleAsync();
    }
    [Test]
    public async Task searchWorks()
    {
        var page = await Context.NewPageAsync();
        await page.GotoAsync("https://wasteit.azurewebsites.net/");
        await page.GetByPlaceholder("Search").ClickAsync();
        await page.GetByPlaceholder("Search").FillAsync("Bøge");
        await Expect(page.GetByRole(AriaRole.Button, new() { Name = "Agreement: Bøgevej" })).ToBeVisibleAsync();

    }
    [Test]
    public async Task clickOnAgreementDropdownWorks()
    {
        var page = await Context.NewPageAsync();
        await page.GotoAsync("https://wasteit.azurewebsites.net/");
        await page.GetByRole(AriaRole.Button, new() { Name = "Agreement: Bøgevej" }).ClickAsync();
        await Expect(page.GetByRole(AriaRole.Link, new() { Name = "Access waste data" })).ToBeVisibleAsync();

    }
    [Test]
    public async Task clickOnAgreementButtonSendsToSpecifikAgreementSite()
    {
        var page = await Context.NewPageAsync();
        await page.GotoAsync("https://wasteit.azurewebsites.net/");
        await page.GetByRole(AriaRole.Button, new() { Name = "Agreement: Bøgevej" }).ClickAsync();
        await page.GetByRole(AriaRole.Link, new() { Name = "Access waste data" }).ClickAsync();
        await Expect(page.GetByRole(AriaRole.Heading, new() { Name = "Waste Fraction Overview" })).ToBeVisibleAsync();
        await Expect(page.GetByRole(AriaRole.Heading, new() { Name = "Bøgevej" })).ToBeVisibleAsync();

    }
    [Test]
    public async Task clickOnFractionSendstoFractionSite()
    {
        var page = await Context.NewPageAsync();
        await page.GotoAsync("https://wasteit.azurewebsites.net/");
        await page.GetByRole(AriaRole.Button, new() { Name = "Agreement: Bøgevej" }).ClickAsync();
        await page.GetByRole(AriaRole.Link, new() { Name = "Access waste data" }).ClickAsync();
        await page.GetByRole(AriaRole.Link, new() { Name = "Avg fill level at pickup: 19.8% Pickup days: Saturday Bins:" }).ClickAsync();
        await Expect(page.GetByText("Cardboard")).ToBeVisibleAsync();
        await Expect(page.Locator("canvas")).ToBeVisibleAsync();

    }
    [Test]
    public async Task GIVENAnyPageWHENIPressTheOptimizationButtonTHENIAmNavigatedToTheOptimizationPage()
    {
        var page = await Context.NewPageAsync();
        await page.GotoAsync("https://wasteit.azurewebsites.net/");
        await page.GetByRole(AriaRole.Button, new() { Name = "Agreement: Bøgevej" }).ClickAsync();
        await page.GetByRole(AriaRole.Link, new() { Name = "Access waste data" }).ClickAsync();
        await page.GetByRole(AriaRole.Link, new() { Name = "Optimization" }).ClickAsync();
        await page.GetByRole(AriaRole.Link, new() { Name = "Fraction" }).ClickAsync();
        await Expect(page.GetByRole(AriaRole.Heading, new() { Name = "Bøgevej" })).ToBeVisibleAsync();
        await Expect(page.GetByRole(AriaRole.Heading, new() { Name = "Waste Fraction Overview" })).ToBeVisibleAsync();
    }

    [Test]

        public async Task WHENOnAnyPageTHENISeeFractionButton()
    {
        var page = await Context.NewPageAsync();
        await page.GotoAsync("https://wasteit.azurewebsites.net/");
        await page.GetByRole(AriaRole.Button, new() { Name = "Agreement: Bøgevej" }).ClickAsync();
        await page.GetByRole(AriaRole.Link, new() { Name = "Access waste data" }).ClickAsync();
        await page.GetByRole(AriaRole.Link, new() { Name = "Optimization" }).ClickAsync();
        await Expect(page.GetByText("Fraction")).ToBeVisibleAsync();
    }
    [Test]

        public async Task GIVENAnyPageWHENIPressTheFractionButtonTHENIAmNavigatedToTheFractionPage()
    {
        var page = await Context.NewPageAsync();
        await page.GotoAsync("https://wasteit.azurewebsites.net/");
        await page.GetByRole(AriaRole.Button, new() { Name = "Agreement: Bøgevej" }).ClickAsync();
        await page.GetByRole(AriaRole.Link, new() { Name = "Access waste data" }).ClickAsync();
        await page.GetByRole(AriaRole.Link, new() { Name = "Optimization" }).ClickAsync();
        await Expect(page.GetByRole(AriaRole.Heading, new() { Name = "Optimization for Bøgevej" })).ToBeVisibleAsync();
    }

    [Test]
    public async Task WHENIAmViewingTheOptimizationPageTHENISeeTheRelevantTitles()
    {
        var page = await Context.NewPageAsync();
        await page.GotoAsync("https://wasteit.azurewebsites.net/");
        await page.GetByRole(AriaRole.Button, new() { Name = "Agreement: Bøgevej" }).ClickAsync();
        await page.GetByRole(AriaRole.Link, new() { Name = "Access waste data" }).ClickAsync();
        await page.GetByRole(AriaRole.Link, new() { Name = "Optimization" }).ClickAsync();
        await Expect(page.GetByRole(AriaRole.Heading, new() { Name = "Recommended Actions" })).ToBeVisibleAsync();
        await Expect(page.GetByRole(AriaRole.Heading, new() { Name = "Estimated Effects" })).ToBeVisibleAsync();
    }
}