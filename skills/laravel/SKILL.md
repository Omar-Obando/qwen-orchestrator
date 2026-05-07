---
name: laravel
description: >
  Laravel PHP framework development patterns — Eloquent ORM with factories and
  relationships, Form Requests for validation, Service Container and dependency
  injection, API resources for JSON APIs, Blade templating, queue jobs with
  ShouldQueue, middleware layers, policy-based authorization, migrations, and
  artisan commands.
license: MIT
---

# Laravel Development Skill — PHP Framework Mastery

This skill provides comprehensive Laravel development patterns following convention-over-configuration principles, Eloquent-first data access, and enterprise-grade architecture.

## Key Principles

- **Convention over Configuration**: Follow Laravel naming conventions for zero-config discovery
- **Eloquent-First**: Use ORM for all data access; raw SQL only for complex queries
- **Validation at the Edge**: Form Requests validate before reaching controllers
- **Thin Controllers, Fat Models**: Business logic in models and services, not controllers

## Project Scaffolding

### Model Creation (All-in-One)

```bash
php artisan make:model Product -crR
# Creates: Model + Controller (resource) + Form Requests + API Resource
```

| Flag | Creates                                     |
| ---- | ------------------------------------------- |
| `-c` | Controller                                  |
| `-r` | Resource controller (CRUD methods)          |
| `-R` | Form Requests (StoreRequest, UpdateRequest) |
| `-m` | Migration                                   |
| `-f` | Factory                                     |
| `-s` | Seeder                                      |

## Eloquent ORM

### Relationships

```php
class User extends Model
{
    // One-to-One
    public function profile(): HasOne
    {
        return $this->hasOne(Profile::class);
    }

    // One-to-Many
    public function posts(): HasMany
    {
        return $this->hasMany(Post::class);
    }

    // Inverse: belongsTo (on the child model)
    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    // Many-to-Many (pivot table)
    public function roles(): BelongsToMany
    {
        return $this->belongsToMany(Role::class)
            ->withPivot('assigned_at')
            ->withTimestamps();
    }

    // Polymorphic
    public function comments(): MorphMany
    {
        return $this->morphMany(Comment::class, 'commentable');
    }

    // Has-One-Through
    public function license(): HasOneThrough
    {
        return $this->hasOneThrough(License::class, Subscription::class);
    }
}
```

### Eager Loading (Prevent N+1)

```php
// BAD: N+1 query — one query per post to get author
$posts = Post::all();
foreach ($posts as $post) {
    echo $post->author->name; // N queries
}

// GOOD: Eager load with 2 queries total
$posts = Post::with('author', 'comments.user')->get();
foreach ($posts as $post) {
    echo $post->author->name; // No additional queries
}

// Conditional eager loading
$posts = Post::with(['comments' => function ($query) {
    $query->where('is_approved', true)->latest();
}])->get();

// Lazy eager loading (load only when needed)
$posts = Post::all();
if ($needComments) {
    $posts->load('comments');
}
```

### Factories and Seeders

```php
// database/factories/ProductFactory.php
class ProductFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => fake()->words(3, true),
            'sku' => fake()->unique()->ean8(),
            'price' => fake()->randomFloat(2, 5, 500),
            'description' => fake()->paragraphs(3, true),
            'is_active' => true,
            'category_id' => Category::factory(),
        ];
    }

    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => false,
        ]);
    }
}

// database/seeders/DatabaseSeeder.php
class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        Category::factory(10)->create();
        Product::factory(100)
            ->has(Review::factory()->count(3))
            ->create();
    }
}
```

### Scopes, Accessors, and Mutators

```php
class Product extends Model
{
    // Query Scope
    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }

    public function scopeInStock(Builder $query): Builder
    {
        return $query->where('stock_count', '>', 0);
    }

    // Accessor (computed attribute)
    protected function formattedPrice(): Attribute
    {
        return Attribute::make(
            get: fn (mixed $value, array $attributes) =>
                '$' . number_format($attributes['price'], 2),
        );
    }

    // Mutator (transform on set)
    protected function name(): Attribute
    {
        return Attribute::make(
            get: fn (string $value) => ucfirst($value),
            set: fn (string $value) => strtolower(trim($value)),
        );
    }

    // Casts
    protected function casts(): array
    {
        return [
            'price' => 'decimal:2',
            'is_active' => 'boolean',
            'metadata' => 'array',
            'published_at' => 'datetime',
            'tags' => 'collection',
        ];
    }
}
```

## Form Requests (Validation at the Edge)

```php
// php artisan make:request StoreProductRequest
class StoreProductRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('create', Product::class);
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'sku' => ['required', 'string', 'unique:products,sku'],
            'price' => ['required', 'numeric', 'min:0', 'max:999999.99'],
            'description' => ['nullable', 'string', 'max:5000'],
            'category_id' => ['required', 'exists:categories,id'],
            'is_active' => ['boolean'],
            'tags' => ['array'],
            'tags.*' => ['string', 'max:50'],
        ];
    }

    public function messages(): array
    {
        return [
            'sku.unique' => 'This SKU is already in use.',
            'price.max' => 'Price cannot exceed 999,999.99.',
        ];
    }

    // Prepare data before validation
    protected function prepareForValidation(): void
    {
        $this->merge([
            'sku' => strtoupper(trim($this->sku)),
        ]);
    }
}
```

## Service Container and Dependency Injection

### Automatic Injection

```php
class ProductController extends Controller
{
    // Automatic resolution via constructor
    public function __construct(
        private readonly ProductRepository $products,
    ) {}

    // Automatic resolution via method
    public function show(Product $product): ProductResource
    {
        return new ProductResource($product);
    }
}
```

### Binding

```php
// AppServiceProvider.php
public function register(): void
{
    // Interface → Implementation
    $this->app->bind(
        PaymentGatewayInterface::class,
        StripeGateway::class
    );

    // Singleton (shared instance)
    $this->app->singleton(
        CacheService::class,
        fn () => new CacheService(config('cache.ttl'))
    );

    // Scoped (one per request cycle)
    $this->app->scoped(TenantManager::class);

    // Factory binding (new instance each time)
    $this->app->bind(ReportGenerator::class, function ($app) {
        return new ReportGenerator(
            $app->make(DataSource::class),
            $app->make(Formatter::class),
        );
    });
}
```

## API Development

### API Resources

```php
class ProductResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'sku' => $this->sku,
            'price' => [
                'amount' => (float) $this->price,
                'currency' => 'USD',
                'formatted' => $this->formatted_price,
            ],
            'category' => new CategoryResource($this->whenLoaded('category')),
            'reviews_count' => $this->whenCounted('reviews'),
            'tags' => $this->whenLoaded('tags'),
            'created_at' => $this->created_at->toISOString(),
            'links' => [
                'self' => route('api.products.show', $this->id),
            ],
        ];
    }
}

// Collection with metadata
class ProductCollection extends ResourceCollection
{
    public function toArray(Request $request): array
    {
        return [
            'data' => $this->collection,
            'meta' => [
                'total' => $this->total(),
                'count' => $this->count(),
                'per_page' => $this->perPage(),
                'current_page' => $this->currentPage(),
            ],
        ];
    }
}
```

### API Routes

```php
// routes/api.php
Route::middleware(['auth:sanctum', 'throttle:api'])->group(function () {
    Route::apiResource('products', ProductController::class);

    Route::get('products/search', [ProductController::class, 'search']);

    Route::prefix('admin')->middleware('role:admin')->group(function () {
        Route::apiResource('users', Admin\UserController::class);
    });
});
```

## Queues and Jobs

### Job Classes

```php
class ProcessProductImport implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $tries = 3;
    public int $backoff = 30;
    public bool $deleteWhenMissingModels = true;

    public function __construct(
        public readonly string $filePath,
        public readonly int $userId,
    ) {}

    public function handle(
        ProductImportService $importService,
        NotificationService $notifications,
    ): void {
        $result = $importService->import($this->filePath);

        $notifications->notifyUser($this->userId, new ImportComplete($result));
    }

    public function failed(\Throwable $exception): void
    {
        Log::error('Product import failed', [
            'file' => $this->filePath,
            'error' => $exception->getMessage(),
        ]);
    }
}

// Dispatch
ProcessProductImport::dispatch($filePath, auth()->id())
    ->onQueue('imports')
    ->delay(now()->addMinutes(5));

// Job chains
Bus::chain([
    new ValidateImportFile($path),
    new ProcessProductImport($path),
    new CleanupImportFile($path),
])->catch(function (\Throwable $e) {
    Log::error('Import chain failed: ' . $e->getMessage());
})->dispatch();
```

## Middleware

```php
// Custom middleware
class EnsureTenantScope
{
    public function handle(Request $request, Closure $next): Response
    {
        if ($tenant = $request->route('tenant')) {
            app(TenantManager::class)->setCurrent($tenant);
        }

        return $next($request);
    }
}

// Registration in bootstrap/app.php or Kernel.php
->withMiddleware(function (Middleware $middleware) {
    $middleware->appendToGroup('api', [
        \App\Http\Middleware\EnsureJsonResponse::class,
    ]);

    $middleware->alias([
        'tenant' => \App\Http\Middleware\EnsureTenantScope::class,
        'role' => \App\Http\Middleware\EnsureRole::class,
    ]);
});
```

## Policy-Based Authorization

```php
// php artisan make:policy ProductPolicy --model=Product
class ProductPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->can('products.view');
    }

    public function view(User $user, Product $product): bool
    {
        return $user->belongsToTenant($product->tenant);
    }

    public function create(User $user): bool
    {
        return $user->can('products.create');
    }

    public function update(User $user, Product $product): bool
    {
        return $user->can('products.update')
            && $user->belongsToTenant($product->tenant);
    }

    // Super-admin bypass
    public function before(User $user, string $ability): bool|null
    {
        return $user->isSuperAdmin() ? true : null;
    }
}

// Usage in controller
class ProductController extends Controller
{
    public function update(UpdateProductRequest $request, Product $product)
    {
        $this->authorize('update', $product);
        // ...
    }
}

// Usage in Blade
@can('update', $product)
    <a href="{{ route('products.edit', $product) }}">Edit</a>
@endcan
```

## Migrations

```php
// php artisan make:migration create_products_table
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tenant_id')->constrained()->cascadeOnDelete();
            $table->foreignId('category_id')->nullable()->constrained()->nullOnDelete();
            $table->string('name');
            $table->string('sku')->unique();
            $table->decimal('price', 10, 2)->default(0);
            $table->text('description')->nullable();
            $table->json('metadata')->nullable();
            $table->boolean('is_active')->default(true);
            $table->unsignedInteger('stock_count')->default(0);
            $table->timestamp('published_at')->nullable();
            $table->softDeletes();
            $table->timestamps();

            // Indexes for common queries
            $table->index(['tenant_id', 'is_active']);
            $table->index('published_at');
            $table->fullText(['name', 'description']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
```

## Testing

### Feature Tests with Pest

```php
test('can list active products', function () {
    Product::factory(3)->create(['is_active' => true]);
    Product::factory(2)->create(['is_active' => false]);

    $response = $this->getJson('/api/products');

    $response->assertOk()
        ->assertJsonCount(3, 'data')
        ->assertJsonStructure([
            'data' => [
                '*' => ['id', 'name', 'price', 'category'],
            ],
        ]);
});

test('cannot create product without authentication', function () {
    $this->postJson('/api/products', [
        'name' => 'Test Product',
    ])->assertUnauthorized();
});

test('product belongs to user tenant', function () {
    $user = User::factory()->create();
    $product = Product::factory()->create(['tenant_id' => $user->tenant_id]);

    $response = $this->actingAs($user)
        ->getJson("/api/products/{$product->id}");

    $response->assertOk();
});
```

### HTTP Test Assertions

```php
$response->assertStatus(200);
$response->assertJson(['status' => 'success']);
$response->assertJsonPath('data.name', 'Test Product');
$response->assertJsonCount(10, 'data');
$response->assertJsonStructure(['data' => ['id', 'name']]);
$response->assertJsonValidationErrors(['email']);
$response->assertCreated();
$response->assertNotFound();
$response->assertForbidden();
```

## Anti-Patterns

| Anti-Pattern                       | Problem                      | Fix                                          |
| ---------------------------------- | ---------------------------- | -------------------------------------------- |
| Fat controllers                    | Hard to test, mixed concerns | Extract to services/actions                  |
| Queries in Blade templates         | N+1, slow rendering          | Eager load in controller                     |
| No eager loading                   | N+1 queries                  | Use `::with()` or `::load()`                 |
| Raw SQL without bindings           | SQL injection                | Use Eloquent or parameterized queries        |
| Ignoring mass assignment           | Security vulnerability       | Use `$fillable` or `$guarded` on all models  |
| Validation in controllers          | Repeated, hard to test       | Use Form Request classes                     |
| Business logic in routes           | No reusability               | Move to controller or service                |
| Not using database transactions    | Data inconsistency           | Wrap related operations in `DB::transaction` |
| Returning models directly from API | Exposes internal structure   | Use API Resources for transformation         |
| Catching all exceptions silently   | Hidden bugs                  | Log and handle specifically                  |
