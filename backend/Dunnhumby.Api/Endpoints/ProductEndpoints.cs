using Dunnhumby.Contracts;
using Dunnhumby.Services.Products;

namespace Dunnhumby.Api.Endpoints;

public static class ProductEndpoints
{
    public static IEndpointRouteBuilder MapProductEndpoints(this IEndpointRouteBuilder endpoints)
    {
        endpoints.MapGet("/products", async (int? page, int? pageSize, Guid? categoryId, IProductQueryService productService) =>
        {
            var currentPage = page ?? 1;
            var currentPageSize = pageSize ?? 10;
            var response = await productService.GetAllProductsAsync(currentPage, currentPageSize, categoryId);
            return Results.Ok(response);
        });
        
        endpoints.MapGet("/products/{productId:guid}", async (Guid productId, IProductQueryService productService) =>
        {
            var product = await productService.GetProductByIdAsync(productId);
            return product is null ? Results.NotFound() : Results.Ok(product);
        });

        
        endpoints.MapGet("/products/seed", async (IProductCommandService productService) =>
        {
            try
            {
                await productService.SeedAsync();
                return Results.Ok("Successfully seeded products");
            }
            catch (Exception ex)
            {
                return Results.Problem($"Failed to seed products: {ex.Message}");
            }
        });
        
        endpoints.MapPost("/products", async (CreateProductRequest request, IProductCommandService productService) =>
        {
            try
            {
                var productId = await productService.CreateProductAsync(request);
                return Results.Created($"/products/{productId}", productId);
            }
            catch (Exception ex)
            {
                return Results.Problem($"Failed to create product: {ex.Message}");
            }
        });


        return endpoints;
    }
}