using Microsoft.OpenApi.Models;
using Microsoft.EntityFrameworkCore;
using Models;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using Twilio.Types;
using System.Text.Json;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddOpenApi();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseInMemoryDatabase("ApplicationDb"));

var app = builder.Build();


const string TWILIO_ACCOUNT_SID = "";
const string TWILIO_AUTH_TOKEN = "";
const string TWILIO_PHONE_NUMBER = "";



TwilioClient.Init(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);



if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();



app.MapGet("/callSummarySize", async (AppDbContext dbContext) =>
{
    var callSummary = await dbContext.CallSumary.ToListAsync();
    return Results.Ok(callSummary.Count);
});

app.MapGet("/callSummary", async (AppDbContext dbContext) =>
{
    var callSummary = await dbContext.CallSumary.ToListAsync();
    return Results.Ok(callSummary);
});

app.MapPost("/callSummary", async (CallSummary callSummary, AppDbContext dbContext) =>
{
    dbContext.CallSumary.Add(callSummary);
    await dbContext.SaveChangesAsync();
    return Results.Ok(callSummary);
});

app.MapGet("/dialers", async (AppDbContext dbContext) =>
{
    var dialers = await dbContext.Dialers.ToListAsync();
    return Results.Ok(dialers);
});

app.MapPost("/dialer", async (Dialer dialer, AppDbContext dbContext) =>
{
    dbContext.Dialers.Add(dialer);
    await dbContext.SaveChangesAsync();
    return Results.Ok(dialer);
});

app.MapGet("/agents", async (AppDbContext dbContext) =>
{
    var agents = await dbContext.Agents.ToListAsync();
    return Results.Ok(agents);
});

app.MapPost("/agent", async (Agent agent, AppDbContext dbContext) =>
{
    dbContext.Agents.Add(agent);
    await dbContext.SaveChangesAsync();
    return Results.Ok(agent);
});

app.MapPost("/agentLogin", async (AgentLogin agentLogin, AppDbContext dbContext) =>
{
    try
    {
        var agent = await dbContext.Agents
            .FirstOrDefaultAsync(a => a.Email == agentLogin.Email);

        return agent != null 
            ? Results.Ok(agent) 
            : Results.NotFound("Agent not found");
    }
    catch (Exception ex)
    {
        return Results.Problem("Server error: " + ex.Message);
    }
});



app.MapPost("/api/call", async (CallRequestModel request) =>
{
    try
    {
        if (string.IsNullOrEmpty(request.PhoneNumber) || string.IsNullOrEmpty(request.Message))
        {
            throw new Exception("PhoneNumber and Message are required.");
        }

        var call = CallResource.Create(
            to: new PhoneNumber(request.PhoneNumber),
            from: new PhoneNumber(TWILIO_PHONE_NUMBER),
            twiml: new Twilio.TwiML.VoiceResponse().Say(request.Message).ToString()
        );

        return Results.Ok(new { status = "success", call_sid = call.Sid });
    }
    catch (Exception ex)
    {
        return Results.Problem(detail: ex.Message, statusCode: 500);
    }
});

app.MapPost("/api/whatsapp", async (CallRequestModel request) =>
{
    try
    {
        if (string.IsNullOrEmpty(request.PhoneNumber) || string.IsNullOrEmpty(request.Message))
        {
            throw new Exception("PhoneNumber and Message are required.");
        }

        var message = MessageResource.Create(
            to: new PhoneNumber($"whatsapp:{request.PhoneNumber}"),
            from: new PhoneNumber("whatsapp:+14155238886"), 
            body: request.Message
        );

        return Results.Ok(new { status = "success", message_sid = message.Sid });
    }
    catch (Exception ex)
    {
        return Results.Problem(detail: ex.Message, statusCode: 500);
    }
});

app.Run();

public record CallRequest(string PhoneNumber, string Message);
