
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.IO;
using System.Text.Json;
using FireSharp;
using FireSharp.Config;
using FireSharp.Interfaces;
using FireSharp.Response;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews();

var app = builder.Build();

IFirebaseConfig config = new FirebaseConfig
{
    AuthSecret = "AIzaSyBrUXDmmZzLtLWYNdqwh4jhFbQvR51SP4A",
    BasePath = "https://wasteit-193de-default-rtdb.europe-west1.firebasedatabase.app/"
};

IFirebaseClient client = new FireSharp.FirebaseClient(config);

var wasteService = new WasteService(client);
if (wasteService == null) Console.WriteLine("An error occurred when connecting to the database");

// Configure endpoints
app.MapPost("/test", async (HttpContext context) =>
{
    using var reader = new StreamReader(context.Request.Body);
    var json = await reader.ReadToEndAsync();
    var data = JsonSerializer.Deserialize<WasteMeasure>(json);

    // Perform any data processing or validation here

    wasteService.SetData(new WasteMeasure
    {
        ID = data.ID,
        Timestamp = data.Timestamp,
        fill_level = data.fill_level
    });
});

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();

