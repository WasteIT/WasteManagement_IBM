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
    public async Task GIVEN_any_page_WHEN_I_press_the_optimization_button_THEN_I_am_navigated_to_the_optimization_page()
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
    public async Task WHEN_an_agreement_has_been_chosen_on_any_page_within_said_agreement_THEN_i_see_the_fraction_button_in_the_navbar()
    {
        var page = await Context.NewPageAsync();
        await page.GotoAsync("https://wasteit.azurewebsites.net/");
        await page.GetByRole(AriaRole.Button, new() { Name = "Agreement: Bøgevej" }).ClickAsync();
        await page.GetByRole(AriaRole.Link, new() { Name = "Access waste data" }).ClickAsync();
        await page.GetByRole(AriaRole.Link, new() { Name = "Optimization" }).ClickAsync();
        await Expect(page.GetByText("Fraction")).ToBeVisibleAsync();
    }

    [Test]
    public async Task GIVEN_a_fraction_button_WHEN_clicking_the_button_THEN_I_am_navigated_to_the_fraction_page()
    {
        var page = await Context.NewPageAsync();
        await page.GotoAsync("https://wasteit.azurewebsites.net/");
        await page.GetByRole(AriaRole.Button, new() { Name = "Agreement: Bøgevej" }).ClickAsync();
        await page.GetByRole(AriaRole.Link, new() { Name = "Access waste data" }).ClickAsync();
        await page.GetByRole(AriaRole.Link, new() { Name = "Optimization" }).ClickAsync();
        await Expect(page.GetByRole(AriaRole.Heading, new() { Name = "Optimization for Bøgevej" })).ToBeVisibleAsync();
    }

    [Test]
    public async Task WHEN_I_am_viewing_the_optimization_page_THEN_I_see_the_relevant_titles()
    {
        var page = await Context.NewPageAsync();
        await page.GotoAsync("https://wasteit.azurewebsites.net/");
        await page.GetByRole(AriaRole.Button, new() { Name = "Agreement: Bøgevej" }).ClickAsync();
        await page.GetByRole(AriaRole.Link, new() { Name = "Access waste data" }).ClickAsync();
        await page.GetByRole(AriaRole.Link, new() { Name = "Optimization" }).ClickAsync();
        await Expect(page.GetByRole(AriaRole.Heading, new() { Name = "Recommended Actions" })).ToBeVisibleAsync();
        await Expect(page.GetByRole(AriaRole.Heading, new() { Name = "Estimated Effects" })).ToBeVisibleAsync();
    }
    
    [Test]
    public async Task WHEN_viewing_any_page_THEN_I_can_breadcrumbs_reflecting_the_structure_of_the_navigation_path()
    {
        var page = await Context.NewPageAsync();
        await page.GotoAsync("https://wasteit.azurewebsites.net/");
        await page.GetByRole(AriaRole.Button, new() { Name = "Agreement: Bøgevej" }).ClickAsync();
        await page.GetByRole(AriaRole.Link, new() { Name = "Access waste data" }).ClickAsync();
        await Expect(page.GetByRole(AriaRole.Link, new() { Name = "Home" })).ToBeVisibleAsync();
        await Expect(page.GetByRole(AriaRole.Link, new() { Name = "Overview" })).ToBeVisibleAsync();
        await page.GetByRole(AriaRole.Link, new() { Name = "Avg fill level at pickup: 40%" }).ClickAsync();
        await Expect(page.GetByRole(AriaRole.Link, new() { Name = "Home" })).ToBeVisibleAsync();
        await Expect(page.GetByRole(AriaRole.Link, new() { Name = "Overview" })).ToBeVisibleAsync();
        await Expect(page.GetByRole(AriaRole.Link, new() { Name = "Graph" })).ToBeVisibleAsync();
        await page.GetByRole(AriaRole.Banner).GetByRole(AriaRole.Link, new() { Name = "Optimization" }).ClickAsync();
        await Expect(page.GetByRole(AriaRole.Link, new() { Name = "Report" })).ToBeVisibleAsync();
        await Expect(page.GetByRole(AriaRole.Link, new() { Name = "Overview" })).ToBeVisibleAsync();
        await Expect(page.GetByRole(AriaRole.Link, new() { Name = "Home" })).ToBeVisibleAsync();
        await Expect(page.GetByRole(AriaRole.Link, new() { Name = "Report" })).ToBeVisibleAsync();
        await page.GetByRole(AriaRole.Link, new() { Name = "Overview" }).ClickAsync();
        await page.GetByRole(AriaRole.Link, new() { Name = "Optimization" }).ClickAsync();
        await Expect(page.GetByRole(AriaRole.Link, new() { Name = "Report" })).ToBeVisibleAsync();
        await Expect(page.GetByRole(AriaRole.Link, new() { Name = "Overview" })).ToBeVisibleAsync();
        await Expect(page.GetByRole(AriaRole.Link, new() { Name = "Home" })).ToBeVisibleAsync();
    }
    
    [Test]
    public async Task GIVEN_a_breadcrumb_trail_WHEN_clicking_a_breadcrumb_THEN_I_navigate_to_the_relevant_page()
    {
        var page = await Context.NewPageAsync();
        await page.GotoAsync("https://wasteit.azurewebsites.net/");
        await page.GetByRole(AriaRole.Button, new() { Name = "Agreement: Bøgevej" }).ClickAsync();
        await page.GetByRole(AriaRole.Link, new() { Name = "Access waste data" }).ClickAsync();
        await page.GetByRole(AriaRole.Link, new() { Name = "Avg fill level at pickup: 40%" }).ClickAsync();
        await page.GetByRole(AriaRole.Banner).GetByRole(AriaRole.Link, new() { Name = "Optimization" }).ClickAsync();
        await page.GetByRole(AriaRole.Link, new() { Name = "Overview" }).ClickAsync();
        await Expect(page.GetByRole(AriaRole.Link, new() { Name = "Home" })).ToBeVisibleAsync();
    }
     
    [Test]
    public async Task GIVEN_a_ready_optimization_report_WHEN_i_am_on_any_page_other_than_the_optimization_page_THEN_I_want_a_visual_indicator_of_a_ready_report()
    {
        var page = await Context.NewPageAsync();
        await page.GotoAsync("https://wasteit.azurewebsites.net/");
        await page.GetByRole(AriaRole.Button, new() { Name = "Agreement: Bøgevej" }).ClickAsync();
        await page.GetByRole(AriaRole.Link, new() { Name = "Access waste data" }).ClickAsync();
        await page.Keyboard.DownAsync("KeyY");
        await Expect(page.GetByText("Optimization Report Complete")).ToBeVisibleAsync();
    }
    
    [Test]
    public async Task GIVEN_a_notification_for_a_ready_optimization_report_WHEN_clicking_the_element_THEN_I_am_navigated_to_the_respective_optimization_page()
    {
        var page = await Context.NewPageAsync();
        await page.GotoAsync("https://wasteit.azurewebsites.net/");
        await page.GetByRole(AriaRole.Button, new() { Name = "Agreement: Bøgevej" }).ClickAsync();
        await page.GetByRole(AriaRole.Link, new() { Name = "Access waste data" }).ClickAsync();
        await page.Keyboard.DownAsync("KeyY");
        await page.ClickAsync("text=Optimization Report Complete");
        await Expect(page.GetByRole(AriaRole.Heading, new() { Name = "Optimization for Bøgevej" })).ToBeVisibleAsync();
    }

    [Test]
    public async Task GIVEN_that_I_have_navigated_to_the_page_WHEN_the_page_has_loaded_THEN_the_numbers_are_increasing_with_an_animation()
    {
        var page = await Context.NewPageAsync();
        await page.GotoAsync("https://wasteit.azurewebsites.net/");
         await page.GetByRole(AriaRole.Button, new() { Name = "Agreement: Bøgevej" }).ClickAsync();
        await page.GetByRole(AriaRole.Link, new() { Name = "Access waste data" }).ClickAsync();
        await page.Keyboard.DownAsync("KeyY");
        await page.ClickAsync("text=Optimization Report Complete");
        
        var expectedYearlySavings = "DKK 14,960";
        var expectedEmissionReduction = "12 %";
        var expectedSavingsPerHousehold = "DKK 450";
        var expectedRecyclingRateIncrease = "25 %";
        var expectedAveragePickup = "5 times";
            
        await Task.Delay(5000);

            
         var yearlySavings = await page.InnerTextAsync("#yearlySavings");
        Assert.AreEqual(expectedYearlySavings, yearlySavings);

        var emissionText = await page.InnerTextAsync("#emissionReduction");
        Assert.AreEqual(expectedEmissionReduction, emissionText);

        var householdSavingsText = await page.InnerTextAsync("#savingsPerHousehold");
        Assert.AreEqual(expectedSavingsPerHousehold, householdSavingsText);

        var recyclingRateText = await page.InnerTextAsync("#recyclingRateIncrease");
        Assert.AreEqual(expectedRecyclingRateIncrease, recyclingRateText);

        var averagePickupText = await page.InnerTextAsync("#averagePickup");
        Assert.AreEqual(expectedAveragePickup, averagePickupText);
    }
}