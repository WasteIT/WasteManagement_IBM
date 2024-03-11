using FireSharp;
using FireSharp.Config;
using FireSharp.Interfaces;
using FireSharp.Response;



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
if (wasteService != null) Console.WriteLine("yay");

app.MapGet("/", () =>
{
    var currentWasteUpdate = new WasteMeasure
        {
            ID = 1,
            Timestamp = "2",
            fill_level = 3
        };
    wasteService.SetData(currentWasteUpdate);
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
