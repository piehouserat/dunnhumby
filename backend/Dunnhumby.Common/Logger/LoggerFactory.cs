namespace Dunnhumby.Common.Logger;

public class LoggerFactory
{
    public static ILogger CreateLogger(string type)
    {
        return type switch
        {
            "Console" => new ConsoleLogger(),
            "File" => new FileLogger(),
            "Database" => new DatabaseLogger(),
            _ => throw new ArgumentException($"Logger type '{type}' is not supported")
        };
    }
}