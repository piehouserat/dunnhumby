namespace Dunnhumby.Common.Logger;

public class FileLogger : ILogger
{
    public void Log(string message)
    {
        Console.WriteLine($"Wrote: {message} to the filesystem!");
    }
}