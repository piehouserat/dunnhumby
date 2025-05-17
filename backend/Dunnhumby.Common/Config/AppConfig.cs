using Microsoft.Extensions.Configuration;

namespace Dunnhumby.Common.Config;

public class AppConfig
{
    private static readonly Lazy<AppConfig> LazyInstance = new(() => new AppConfig());
    public static AppConfig Instance => LazyInstance.Value;

    private readonly IConfigurationRoot _configuration;

    private AppConfig()
    {
        var builder = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
            .AddEnvironmentVariables();

        _configuration = builder.Build();
    }

    public string GetSetting(string key)
    {
        return _configuration[key] ?? string.Empty;
    }
}