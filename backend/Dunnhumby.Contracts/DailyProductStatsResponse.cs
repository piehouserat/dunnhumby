namespace Dunnhumby.Contracts;

public record DailyProductStats(
    DateOnly Date,
    int ProductsAdded,
    int StockAdded
);