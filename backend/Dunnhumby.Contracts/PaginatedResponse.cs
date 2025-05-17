namespace Dunnhumby.Contracts;

public record PaginatedResponse<T>
{
    public IEnumerable<T> Data { get; init; }
    
    public int Total { get; init; }

    public PaginatedResponse(IEnumerable<T> data, int total)
    {
        Data = data;
        Total = total;
    }
}
