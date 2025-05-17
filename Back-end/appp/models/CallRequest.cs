using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

public class CallRequestModel
{
    public string PhoneNumber { get; set; }
    public string Message { get; set; }

    public CallRequestModel(string phoneNumber, string message)
    {
        PhoneNumber = phoneNumber;
        Message = message;
    }
    public CallRequestModel()
    {
    }
}