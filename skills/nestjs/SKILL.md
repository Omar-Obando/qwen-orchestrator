---
name: nestjs
description: >
  NestJS TypeScript framework development patterns — modular architecture with
  controllers/providers/exports, Guards for authentication (global via APP_GUARD),
  Pipes for validation, Interceptors for transforms, request lifecycle management,
  CLI schematics for code generation, and enterprise-grade patterns.
license: MIT
---

# NestJS Development Skill — Enterprise TypeScript Framework

This skill provides comprehensive NestJS development patterns for building scalable, testable, enterprise-grade Node.js applications with modular architecture and decorator-driven design.

## Key Principles

- **Modular Architecture**: Organize code into feature modules with clear boundaries
- **Dependency Injection**: Let the container resolve and inject dependencies
- **Decorator-Driven**: Use decorators for metadata-driven behavior (routes, validation, guards)
- **Separation of Concerns**: Controllers handle HTTP, Services handle logic, Modules wire it together

## Module Structure

### Feature Module

```typescript
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";
import { Product } from "./entities/product.entity";
import { ProductRepository } from "./repositories/product.repository";

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductsController],
  providers: [ProductsService, ProductRepository],
  exports: [ProductsService],
})
export class ProductsModule {}
```

### Module Types

| Type           | Purpose                      | Example                          |
| -------------- | ---------------------------- | -------------------------------- |
| Feature Module | Group related features       | `ProductsModule`                 |
| Shared Module  | Reusable across features     | `DatabaseModule`, `LoggerModule` |
| Global Module  | Available everywhere         | `ConfigModule`, `AuthModule`     |
| Dynamic Module | Configurable at registration | `TypeOrmModule.forRootAsync()`   |

### Shared Module Pattern

```typescript
@Module({
  providers: [LoggerService, DateService],
  exports: [LoggerService, DateService],
})
export class SharedModule {}

// Used in feature modules
@Module({
  imports: [SharedModule],
  // LoggerService and DateService now available for injection
})
export class OrdersModule {}
```

### Global Module

```typescript
import { Global, Module } from "@nestjs/common";

@Global()
@Module({
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
// ConfigService available everywhere without importing
```

## Controllers

### REST Controller

```typescript
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Patch,
  Param,
  Body,
  Query,
  HttpCode,
  HttpStatus,
  Res,
} from "@nestjs/common";
import { ProductsService } from "./products.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { PaginationQueryDto } from "../common/dto/pagination-query.dto";

@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateProductDto) {
    return this.productsService.create(dto);
  }

  @Get()
  findAll(@Query() query: PaginationQueryDto) {
    return this.productsService.findAll(query);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.productsService.findOne(id);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() dto: UpdateProductDto) {
    return this.productsService.update(id, dto);
  }

  @Patch(":id")
  partialUpdate(
    @Param("id") id: string,
    @Body() dto: Partial<UpdateProductDto>,
  ) {
    return this.productsService.partialUpdate(id, dto);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param("id") id: string) {
    return this.productsService.remove(id);
  }
}
```

### DTOs with Validation

```typescript
import {
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsArray,
  Min,
  Max,
  MaxLength,
  IsUUID,
} from "class-validator";
import { Type } from "class-transformer";

export class CreateProductDto {
  @IsString()
  @MaxLength(255)
  name: string;

  @IsString()
  @IsUUID()
  categoryId: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(999999.99)
  @Type(() => Number)
  price: number;

  @IsOptional()
  @IsString()
  @MaxLength(5000)
  description?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}

export class PaginationQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number = 20;

  @IsOptional()
  @IsString()
  sort?: string = "createdAt:DESC";
}
```

## Providers (Services)

### Injectable Service

```typescript
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "./entities/product.entity";
import { CreateProductDto } from "./dto/create-product.dto";

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  async create(dto: CreateProductDto): Promise<Product> {
    const product = this.productRepo.create(dto);
    return this.productRepo.save(product);
  }

  async findAll(query: PaginationQueryDto): Promise<[Product[], number]> {
    const { page, limit, sort } = query;
    const [field, order] = sort.split(":");

    return this.productRepo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { [field]: order === "ASC" ? "ASC" : "DESC" },
      relations: ["category"],
    });
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productRepo.findOne({
      where: { id },
      relations: ["category", "reviews"],
    });
    if (!product) {
      throw new NotFoundException(`Product ${id} not found`);
    }
    return product;
  }

  async update(id: string, dto: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(id);
    Object.assign(product, dto);
    return this.productRepo.save(product);
  }

  async remove(id: string): Promise<void> {
    const result = await this.productRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Product ${id} not found`);
    }
  }
}
```

### Custom and Factory Providers

```typescript
// Factory provider
{
  provide: 'CONFIG',
  useFactory: (envService: EnvService) => {
    return envService.getConfig();
  },
  inject: [EnvService],
}

// Async factory provider
{
  provide: 'DATABASE_CONNECTION',
  useFactory: async (configService: ConfigService) => {
    const connection = await createConnection({
      host: configService.get('DB_HOST'),
      port: configService.get('DB_PORT'),
    });
    return connection;
  },
  inject: [ConfigService],
}

// Value provider
{
  provide: 'API_VERSION',
  useValue: 'v1',
}
```

## Guards (Authentication & Authorization)

### JWT Auth Guard (Global)

```typescript
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractToken(request);

    if (!token) {
      throw new UnauthorizedException("Missing authentication token");
    }

    try {
      const payload = await this.jwtService.verifyAsync(token);
      request["user"] = payload;
    } catch {
      throw new UnauthorizedException("Invalid or expired token");
    }

    return true;
  }

  private extractToken(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}
```

### Role-Based Guard

```typescript
import { Reflector } from '@nestjs/core';
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';

export const ROLES_KEY = 'roles';

export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) return true;

    const { user } = context.switchToHttp().getRequest();

    const hasRole = requiredRoles.some((role) => user.roles?.includes(role));
    if (!hasRole) {
      throw new ForbiddenException('Insufficient permissions');
    }

    return true;
  }
}

// Register globally
@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AuthModule {}

// Usage in controller
@Roles('admin')
@Delete(':id')
remove(@Param('id') id: string) {
  return this.productsService.remove(id);
}
```

## Pipes (Validation & Transformation)

### Global Validation Pipe

```typescript
// main.ts
import { ValidationPipe } from "@nestjs/common";

app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true, // Strip unknown properties
    forbidNonWhitelisted: true, // Throw error on unknown properties
    transform: true, // Auto-transform types (string → number)
    transformOptions: {
      enableImplicitConversion: true,
    },
    disableErrorMessages: false,
  }),
);
```

### Custom Pipe

```typescript
import { PipeTransform, Injectable, BadRequestException } from "@nestjs/common";

@Injectable()
export class ParseIntPipe implements PipeTransform<string, number> {
  transform(value: string): number {
    const parsed = parseInt(value, 10);
    if (isNaN(parsed)) {
      throw new BadRequestException(`"${value}" is not a valid number`);
    }
    return parsed;
  }
}
```

## Interceptors

### Logging Interceptor

```typescript
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger("HTTP");

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url } = request;
    const startTime = Date.now();

    return next.handle().pipe(
      tap(() => {
        const duration = Date.now() - startTime;
        this.logger.log(`${method} ${url} — ${duration}ms`);
      }),
    );
  }
}
```

### Transform Interceptor

```typescript
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { Observable, map } from "rxjs";

export interface ApiResponse<T> {
  success: true;
  data: T;
  timestamp: string;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<
  T,
  ApiResponse<T>
> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponse<T>> {
    return next.handle().pipe(
      map((data) => ({
        success: true as const,
        data,
        timestamp: new Date().toISOString(),
      })),
    );
  }
}
```

## Request Lifecycle

Understanding the order of execution is critical:

```
Incoming Request
    │
    ├── 1. Middleware (module-level, then global)
    ├── 2. Guard (global, then controller, then route)
    ├── 3. Interceptor (before) — global, then controller, then route
    ├── 4. Pipe (global, then parameter-level)
    ├── 5. Controller Method
    ├── 6. Service (business logic)
    ├── 7. Interceptor (after) — route, then controller, then global
    └── 8. Exception Filter (if any error occurred)
```

## CLI Schematics

### Code Generation Commands

```bash
nest g module products          # Generate module
nest g controller products      # Generate controller
nest g service products         # Generate service
nest g guard auth               # Generate guard
nest g interceptor logging      # Generate interceptor
nest g pipe validate            # Generate pipe
nest g filter http-exception    # Generate exception filter
nest g resource products        # Generate full CRUD module
nest g decorator roles          # Generate custom decorator
nest g middleware logger        # Generate middleware
```

### Resource Generator (Full CRUD)

```bash
nest g resource products
# Creates:
#   products/
#   ├── dto/
#   │   ├── create-product.dto.ts
#   │   └── update-product.dto.ts
#   ├── entities/
#   │   └── product.entity.ts
#   ├── products.module.ts
#   ├── products.controller.ts
#   ├── products.controller.spec.ts
#   ├── products.service.ts
#   └── products.service.spec.ts
```

## Testing

### Unit Testing with Jest

```typescript
import { Test, TestingModule } from "@nestjs/testing";
import { ProductsService } from "./products.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Product } from "./entities/product.entity";
import { NotFoundException } from "@nestjs/common";

describe("ProductsService", () => {
  let service: ProductsService;
  let mockRepo: any;

  beforeEach(async () => {
    mockRepo = {
      find: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it("should return a product by id", async () => {
    const product = { id: "1", name: "Test" };
    mockRepo.findOne.mockResolvedValue(product);

    const result = await service.findOne("1");
    expect(result).toEqual(product);
    expect(mockRepo.findOne).toHaveBeenCalledWith({
      where: { id: "1" },
      relations: ["category", "reviews"],
    });
  });

  it("should throw NotFoundException for missing product", async () => {
    mockRepo.findOne.mockResolvedValue(null);

    await expect(service.findOne("999")).rejects.toThrow(NotFoundException);
  });
});
```

### E2E Testing

```typescript
import * as request from "supertest";
import { Test } from "@nestjs/testing";
import { AppModule } from "../app.module";
import { INestApplication, ValidationPipe } from "@nestjs/common";

describe("Products (e2e)", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
  });

  it("POST /products — should create a product", () => {
    return request(app.getHttpServer())
      .post("/products")
      .send({ name: "Widget", price: 9.99, categoryId: "cat-1" })
      .expect(201);
  });

  it("POST /products — should reject invalid data", () => {
    return request(app.getHttpServer())
      .post("/products")
      .send({ name: 123, price: "not-a-number" })
      .expect(400);
  });

  afterAll(async () => {
    await app.close();
  });
});
```

## Anti-Patterns

| Anti-Pattern                            | Problem                        | Fix                                                      |
| --------------------------------------- | ------------------------------ | -------------------------------------------------------- |
| God modules (everything in one module)  | Unmaintainable, hard to test   | Split into focused feature modules                       |
| No DTOs (accepting raw objects)         | No validation, security risk   | Always use class-validator DTOs                          |
| Services without interfaces             | Hard to mock, tight coupling   | Define interfaces, inject by token                       |
| Missing validation                      | Bad data enters system         | Global ValidationPipe + DTOs on every route              |
| Synchronous operations in providers     | Blocks event loop              | Use async/await for all I/O                              |
| Direct repository access in controllers | Skips business logic layer     | Always go through service layer                          |
| Not using request-scoped injection      | Memory leaks with shared state | Use REQUEST scope for per-request data                   |
| Throwing generic exceptions             | No useful error info           | Use NestJS built-in exceptions (NotFoundException, etc.) |
