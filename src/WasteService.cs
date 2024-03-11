using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FireSharp;
using FireSharp.Config;
using FireSharp.Interfaces;
using FireSharp.Response;
using Newtonsoft.Json;

public class WasteService
{
    private IFirebaseClient client;
    public WasteService(IFirebaseClient client)
    {
        this.client = client;
    }

    public async Task SetData(int Id, string Timestamp, float fill_level)
    {
        var data = new WasteMeasure
        {
            ID = Id,
            Timestamp = Timestamp,
            fill_level = fill_level
        };
        SetResponse response = await client.SetAsync("sensor/" + Id, data);
        WasteMeasure result = response.ResultAs<WasteMeasure>();
    }
}