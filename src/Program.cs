using FireSharp;
using FireSharp.Config;
using FireSharp.Interfaces;
using FireSharp.Response;
using System.Text.Json;



var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorPages();

var app = builder.Build();


IFirebaseConfig config = new FirebaseConfig
{
    AuthSecret = "AIzaSyBrUXDmmZzLtLWYNdqwh4jhFbQvR51SP4A",
    BasePath = "https://wasteit-193de-default-rtdb.europe-west1.firebasedatabase.app/"
};

IFirebaseClient client = new FireSharp.FirebaseClient(config);

var wasteService = new WasteService(client);
if (wasteService == null) Console.WriteLine("An error occured when connecting to the database");


app.MapPost("/test", async (HttpContext context) =>
{
    using var reader = new StreamReader(context.Request.Body);
    var json = await reader.ReadToEndAsync();
    var data = JsonSerializer.Deserialize<WasteMeasure>(json);
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
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapRazorPages();

app.Run();


void configureWasteData() {

}
