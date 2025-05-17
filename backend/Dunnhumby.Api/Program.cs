using Dunnhumby.Api.Endpoints;
using Microsoft.EntityFrameworkCore;
using Dunnhumby.DataAccess;
using Dunnhumby.DataAccess.Repositories.Categories;
using Dunnhumby.DataAccess.Repositories.Products;
using Dunnhumby.Services.Categories;
using Dunnhumby.Services.Products;

var builder = WebApplication.CreateBuilder(args);
        
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();

builder.Services.AddScoped<IProductQueryService, ProductQueryService>();
builder.Services.AddScoped<IProductCommandService, ProductCommandService>();

builder.Services.AddScoped<ICategoryQueryService, CategoryQueryService>();
builder.Services.AddScoped<ICategoryCommandService, CategoryCommandService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});


var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors("AllowAll");

app.UseHttpsRedirection();

app.MapGet("/", () => "OK")
    .WithName("Index");

app.MapProductEndpoints();
app.MapCategoryEndpoints();

app.Run();