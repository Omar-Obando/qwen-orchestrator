---
name: performance
description: >
  Performance optimization skill with profiling techniques, bottleneck identification,
  and optimization strategies. Use when improving application speed, reducing resource
  usage, or diagnosing performance issues.
license: MIT
---

# Performance Skill — Optimization & Profiling

This skill provides systematic performance analysis and optimization guidance.

## Performance Budget Template

| Metric                   | Target          | Critical Threshold |
| ------------------------ | --------------- | ------------------ |
| First Contentful Paint   | < 1.5s          | < 3s               |
| Largest Contentful Paint | < 2.5s          | < 4s               |
| Total Bundle Size        | < 200KB gzipped | < 500KB            |
| API Response Time (p50)  | < 100ms         | < 500ms            |
| API Response Time (p99)  | < 500ms         | < 2s               |
| Memory Usage             | < 100MB         | < 500MB            |
| CPU Usage (steady)       | < 30%           | < 80%              |

## Profiling Methodology

### 1. Measure First

```
NEVER optimize without measuring first.
ALWAYS establish a baseline before changes.
ALWAYS compare after optimization with real numbers.
```

### 2. Identify Bottleneck

| Layer    | Tool                    | What to Look For                     |
| -------- | ----------------------- | ------------------------------------ |
| Frontend | Lighthouse, DevTools    | Render blocking, layout thrash       |
| Network  | Wireshark, Charles      | Unnecessary requests, large payloads |
| API      | APM tools               | Slow endpoints, N+1 queries          |
| Database | EXPLAIN, slow query log | Full table scans, missing indexes    |
| Compute  | CPU profiler            | Hot loops, unnecessary computation   |
| Memory   | Heap snapshot           | Leaks, retained objects              |

### 3. Optimize by Category

#### Algorithmic

- Replace O(n²) with O(n log n) or O(n)
- Use appropriate data structures (Set for lookups, Map for key-value)
- Cache repeated computations (memoization)
- Lazy evaluation for expensive operations

#### I/O

- Batch database queries
- Use connection pooling
- Implement pagination
- Compress responses (gzip/brotli)
- Use CDN for static assets

#### Memory

- Stream large data instead of buffering
- Release references when done
- Use object pooling for frequent allocations
- Avoid closure capture of large objects

#### Concurrency

- Use async/await for I/O-bound work
- Worker threads for CPU-bound work
- Connection pooling for database/HTTP
- Backpressure handling for streams

## Optimization Patterns

### Caching Strategy

```
Layer 1: In-memory (LRU, TTL: seconds)
Layer 2: Redis/Memcached (TTL: minutes)
Layer 3: Database (materialized views)
Layer 4: CDN (static assets, TTL: hours)
```

### Database Optimization

1. **Index Strategy**: Index all WHERE/JOIN columns
2. **Query Optimization**: Avoid SELECT \*, use projections
3. **Connection Pooling**: Reuse connections
4. **Pagination**: Cursor-based for large datasets
5. **Denormalization**: For read-heavy workloads

## Performance Testing

```typescript
describe('Performance', () => {
  it('should process 10k records in under 100ms', async () => {
    const data = generateTestData(10_000);
    const start = performance.now();
    const result = processRecords(data);
    const elapsed = performance.now() - start;
    expect(elapsed).toBeLessThan(100);
    expect(result).toHaveLength(10_000);
  });
});
```

## Anti-Patterns to Avoid

- Premature optimization without profiling data
- Caching everything (cache invalidation is hard)
- Denormalizing too early
- Micro-optimizing cold paths
- Ignoring GC pressure from excessive allocations
