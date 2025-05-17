namespace Dunnhumby.Common.Logger;

public class DatabaseLogger : ILogger
{
    public void Log(string message)
    {
        Console.WriteLine($"Wrote: {message} to the database!");
    }
}