namespace Dunnhumby.Contracts;

public class GetProductsRequest
{
    public int? Page { get; set; }
    public int? PageSize { get; set; }
    public Guid? CategoryId { get; set; }
    public string? OrderBy { get; set; }
    public bool? IsDescending { get; set; }
}