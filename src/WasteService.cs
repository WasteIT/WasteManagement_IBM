using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;
using FireSharp;
using FireSharp.Config;
using FireSharp.Interfaces;
using FireSharp.Response;
using Newtonsoft.Json;

public class WasteService
{
    private IFirebaseClient client;
    //connection conn = new connection();
    public WasteService(IFirebaseClient client)
    {
        this.client = client;
    }

    public async Task SetData(WasteMeasure wasteMeasure)
    { 
        try
        {
            // Can't use async yet because program terminates
            //SetResponse response = await client.SetAsync("test/", set);
            client.Set("sensor/" + wasteMeasure.ID + "/"+ wasteMeasure.Timestamp, wasteMeasure);
        }   
        catch (Exception e)
        {
            Console.WriteLine(e);
        }
    }
}