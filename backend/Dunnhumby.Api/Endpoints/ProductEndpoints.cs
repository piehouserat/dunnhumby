using Dunnhumby.Services.Products;

namespace Dunnhumby.Api.Endpoints
{
    public static class ProductEndpoints
    {
        public static IEndpointRouteBuilder MapProductEndpoints(this IEndpointRouteBuilder endpoints)
        {
            endpoints.MapGet("/products", async (IProductQueryService productService) =>
            {
                var products = await productService.GetAllProductsAsync(1, 10);
                return Results.Ok(products);
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

            return endpoints;
        }
    }
}