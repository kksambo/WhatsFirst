using Microsoft.AspNetCore.Mvc;
using Twilio.Rest.Api.V2010.Account;
using Twilio.Types;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}




app.MapGet("/greet", () =>{

    return "hello whats first";
});


app.MapPost("/send-whatsapp", async ([FromBody] WhatsAppRequest request) =>
{
    try
    {
        string accountSid = "";
        string authToken = "";
        string fromWhatsAppNumber = "whatsapp:+14155238886"; 
        
        Twilio.TwilioClient.Init(accountSid, authToken);

        var message = await MessageResource.CreateAsync(
            body: request.Message,
            from: new PhoneNumber(fromWhatsAppNumber),
            to: new PhoneNumber($"whatsapp:{request.ToPhoneNumber}")
        );

        return Results.Ok(new { Success = true, MessageSid = message.Sid });
    }
    catch (Exception ex)
    {
        return Results.Problem(ex.Message);
    }
});


app.Run();

public record WhatsAppRequest(string ToPhoneNumber, string Message);
