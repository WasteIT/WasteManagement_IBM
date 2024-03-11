using FireSharp;
using FireSharp.Config;
using FireSharp.Interfaces;
using FireSharp.Response;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorPages();

var app = builder.Build();
app.MapGet("/", () => "Hello World");

IFirebaseConfig config = new FirebaseConfig
{
    AuthSecret = "AIzaSyBrUXDmmZzLtLWYNdqwh4jhFbQvR51SP4A",
    BasePath = "https://wasteit-193de-default-rtdb.europe-west1.firebasedatabase.app/"
};
IFirebaseClient client = new FireSharp.FirebaseClient(config);
var wasteService = new WasteService(client);

app.MapPost("/sensor", async (WasteMeasure wasteMeasure) =>
{
    await wasteService.SetData(1, "2", 3.0f);
    return wasteMeasure;
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
