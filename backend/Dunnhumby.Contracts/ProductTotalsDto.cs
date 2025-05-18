namespace Dunnhumby.Contracts;

public record ProductTotalsDto(
    int TotalProductCount,
    int TotalStockQuantity,
    decimal TotalStockValue,
    DateTime FromDate,
    DateTime ToDate
);
