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
    public async Task canGoToHomePage()
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
    public async Task clickOnHomeSendsToHome()
    {
        await Page.GotoAsync("https://wasteit.azurewebsites.net/Agreements");
        await Page.GetByRole(AriaRole.Link, new() { Name = "Home" }).ClickAsync();
        await Expect(Page.Locator(".card-body").First).ToBeVisibleAsync();
    }
    [Test]
    public async Task searchWorks()
    {
        await Page.GotoAsync("https://wasteit.azurewebsites.net/Agreements");
        await Page.GetByPlaceholder("Search").ClickAsync();
        await Page.GetByPlaceholder("Search").FillAsync("gade");
        await Page.GetByRole(AriaRole.Button, new() { Name = "Search" }).ClickAsync();
        await Expect(Page.GetByRole(AriaRole.Button, new() { Name = "Ågade" })).ToBeVisibleAsync();
    }
    [Test]
    public async Task clickOnAgreementDropdownWorks()
    {
        await Page.GotoAsync("https://wasteit.azurewebsites.net/Agreements");
        await Page.GetByRole(AriaRole.Button, new() { Name = "Ågade" }).ClickAsync();
        await Expect(Page.GetByRole(AriaRole.Link, new() { Name = "Agreement", Exact = true })).ToBeVisibleAsync();
    }
    [Test]
    public async Task clickOnAgreementButtonSendsToSpecifikAgreementSite()
    {
        await Page.GotoAsync("https://wasteit.azurewebsites.net/Agreements");
        await Page.GetByRole(AriaRole.Button, new() { Name = "Ågade" }).ClickAsync();
        await Page.GetByRole(AriaRole.Link, new() { Name = "Agreement", Exact = true }).ClickAsync();
        await Expect(Page.GetByRole(AriaRole.Main)).ToContainTextAsync("Avg fill level at pickup:");
    }
    [Test]
    public async Task clickOnFractionSendstoFractionSite()
    {
        await Page.GotoAsync("https://wasteit.azurewebsites.net/Agreements");
        await Page.GetByRole(AriaRole.Button, new() { Name = "Ågade" }).ClickAsync();
        await Page.GetByRole(AriaRole.Link, new() { Name = "Agreement", Exact = true }).ClickAsync();
        await Page.GetByRole(AriaRole.Link, new() { Name = "Avg fill level at pickup: 18." }).ClickAsync();
        await Expect(Page.Locator("canvas")).ToBeVisibleAsync();
    }

}