namespace Dunnhumby.Common.Extensions;

public static class DateTimeExtensions
{
    public static DateTime StartOfMonth(this DateTime date)
    {
        return new DateTime(date.Year, date.Month, 1);
    }
    
    public static DateTime EndOfMonth(this DateTime date)
    {
        return new DateTime(date.Year, date.Month, 1).AddMonths(1).AddDays(-1);
    }
    
    public static DateTime StartOfDay(this DateTime date)
    {
        return date.Date;
    }
    
    public static DateTime EndOfDay(this DateTime date)
    {
        return date.Date.AddDays(1).AddTicks(-1);
    }
}