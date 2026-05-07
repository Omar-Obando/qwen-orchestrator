---
name: flutter-web
description: >
  Flutter Web development patterns — responsive layouts with LayoutBuilder (600px
  breakpoint), adaptive widgets (Material + Cupertino), state management (lift state
  up, Riverpod/Bloc), single codebase for mobile/web/desktop, SEO meta tags, URL
  routing with go_router, performance optimization.
license: MIT
---

# Flutter Web Development Skill — Cross-Platform UI

This skill provides comprehensive Flutter Web development patterns for building responsive, adaptive, high-performance web applications from a single Dart codebase.

## Key Principles

- **Single Codebase**: One Dart project targeting mobile, web, and desktop
- **Responsive-First**: Design for the smallest viewport, scale up with LayoutBuilder
- **Adaptive UI**: Material for Android/Web, Cupertino for iOS, detect platform at runtime
- **Performance-Conscious**: Tree shaking, deferred imports, lazy loading from day one

## Responsive Design

### Breakpoint Strategy

| Breakpoint | Width    | Layout                 | Columns |
| ---------- | -------- | ---------------------- | ------- |
| Mobile     | < 600px  | Single column          | 1       |
| Tablet     | 600-1024 | Two column             | 2       |
| Desktop    | > 1024px | Multi-column + sidebar | 3+      |

### Responsive Layout with LayoutBuilder

```dart
class ResponsiveLayout extends StatelessWidget {
  const ResponsiveLayout({super.key});

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        if (constraints.maxWidth >= 1024) {
          return const DesktopLayout();
        } else if (constraints.maxWidth >= 600) {
          return const TabletLayout();
        }
        return const MobileLayout();
      },
    );
  }
}
```

**Rule**: Use `LayoutBuilder` for parent-aware breakpoints. Use `MediaQuery` only for device-level info (padding, text scale). Never use `MediaQuery.sizeOf` inside builders that rebuild frequently — it triggers unnecessary rebuilds when keyboard opens.

### Adaptive Grid

```dart
class AdaptiveGrid extends StatelessWidget {
  final List<Widget> children;

  const AdaptiveGrid({super.key, required this.children});

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final crossAxisCount = switch (constraints.maxWidth) {
          >= 1200 => 4,
          >= 900 => 3,
          >= 600 => 2,
          _ => 1,
        };

        return GridView.count(
          crossAxisCount: crossAxisCount,
          childAspectRatio: 1.4,
          mainAxisSpacing: 16,
          crossAxisSpacing: 16,
          children: children,
        );
      },
    );
  }
}
```

## Adaptive Widgets

### Platform Detection

```dart
import 'dart:io' show Platform;
import 'package:flutter/foundation.dart' show kIsWeb;

bool get isIOS => !kIsWeb && Platform.isIOS;
bool get isAndroid => !kIsWeb && Platform.isAndroid;
bool get isWeb => kIsWeb;
```

### Adaptive Components

```dart
class AdaptiveButton extends StatelessWidget {
  final VoidCallback onPressed;
  final Widget child;

  const AdaptiveButton({
    super.key,
    required this.onPressed,
    required this.child,
  });

  @override
  Widget build(BuildContext context) {
    if (isIOS) {
      return CupertinoButton(
        onPressed: onPressed,
        child: child,
      );
    }
    return FilledButton(
      onPressed: onPressed,
      child: child,
    );
  }
}

class AdaptiveSwitch extends StatelessWidget {
  final bool value;
  final ValueChanged<bool> onChanged;

  const AdaptiveSwitch({
    super.key,
    required this.value,
    required this.onChanged,
  });

  @override
  Widget build(BuildContext context) {
    if (isIOS) {
      return CupertinoSwitch(value: value, onChanged: onChanged);
    }
    return Switch(value: value, onChanged: onChanged);
  }
}
```

## State Management

### Lift State Up Pattern

```dart
// Parent holds state, children receive callbacks
class ShoppingCartPage extends StatefulWidget {
  const ShoppingCartPage({super.key});

  @override
  State<ShoppingCartPage> createState() => _ShoppingCartPageState();
}

class _ShoppingCartPageState extends State<ShoppingCartPage> {
  final List<Item> _items = [];

  void _addItem(Item item) {
    setState(() => _items.add(item));
  }

  void _removeItem(int index) {
    setState(() => _items.removeAt(index));
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        ItemList(
          onAdd: _addItem,
        ),
        CartSummary(
          items: _items,
          onRemove: _removeItem,
        ),
      ],
    );
  }
}
```

### Riverpod for Shared State

```dart
// Provider (global, immutable state)
@riverpod
List<Product> products(ProductsRef ref) {
  return [];
}

// NotifierProvider (mutable state with methods)
@riverpod
class Cart extends _$Cart {
  @override
  List<CartItem> build() => [];

  void add(Product product) {
    state = [...state, CartItem(product: product, quantity: 1)];
  }

  void remove(String productId) {
    state = state.where((item) => item.product.id != productId).toList();
  }

  double get total => state.fold(0, (sum, item) => sum + item.product.price * item.quantity);
}
```

### Bloc for Complex Flows

```dart
// Event
sealed class AuthEvent {}
class LoginRequested extends AuthEvent {
  final String email;
  final String password;
  LoginRequested(this.email, this.password);
}
class LogoutRequested extends AuthEvent {}

// State
sealed class AuthState {}
class AuthInitial extends AuthState {}
class AuthLoading extends AuthState {}
class AuthAuthenticated extends AuthState {
  final User user;
  AuthAuthenticated(this.user);
}
class AuthError extends AuthState {
  final String message;
  AuthError(this.message);
}

// Bloc
class AuthBloc extends Bloc<AuthEvent, AuthState> {
  final AuthRepository _repository;

  AuthBloc(this._repository) : super(AuthInitial()) {
    on<LoginRequested>(_onLogin);
    on<LogoutRequested>(_onLogout);
  }

  Future<void> _onLogin(LoginRequested event, Emitter<AuthState> emit) async {
    emit(AuthLoading());
    try {
      final user = await _repository.login(event.email, event.password);
      emit(AuthAuthenticated(user));
    } catch (e) {
      emit(AuthError(e.toString()));
    }
  }

  Future<void> _onLogout(LogoutRequested event, Emitter<AuthState> emit) async {
    await _repository.logout();
    emit(AuthInitial());
  }
}
```

**When to use what**:

| Approach      | Use When                                   |
| ------------- | ------------------------------------------ |
| setState      | Local state within one widget              |
| Lift State Up | 2-3 siblings sharing simple state          |
| Riverpod      | App-wide shared state, async data, caching |
| Bloc          | Complex event-driven flows, testability    |

## Navigation with go_router

### Declarative Routing

```dart
import 'package:go_router/go_router.dart';

final router = GoRouter(
  initialLocation: '/',
  routes: [
    GoRoute(
      path: '/',
      builder: (context, state) => const HomePage(),
    ),
    GoRoute(
      path: '/products',
      builder: (context, state) => const ProductListPage(),
      routes: [
        GoRoute(
          path: ':id',
          builder: (context, state) {
            final id = state.pathParameters['id']!;
            return ProductDetailPage(productId: id);
          },
        ),
      ],
    ),
    GoRoute(
      path: '/cart',
      builder: (context, state) => const CartPage(),
    ),
    ShellRoute(
      builder: (context, state, child) => AuthGuard(child: child),
      routes: [
        GoRoute(
          path: '/profile',
          builder: (context, state) => const ProfilePage(),
        ),
        GoRoute(
          path: '/orders',
          builder: (context, state) => const OrdersPage(),
        ),
      ],
    ),
  ],
);
```

### Navigation Calls

```dart
// Push a route
context.go('/products/42');

// Push with query params
context.go('/products?category=electronics&sort=price');

// Named routes
context.goNamed('productDetail', pathParameters: {'id': '42'});
```

## SEO for Flutter Web

### Meta Tags and Document Title

```dart
import 'dart:html' as html;

void updatePageMeta({
  required String title,
  required String description,
  String? ogImage,
}) {
  html.document.title = title;

  html.document.querySelector('meta[name="description"]')
      ?.setAttribute('content', description);

  if (ogImage != null) {
    html.document.querySelector('meta[property="og:image"]')
        ?.setAttribute('content', ogImage);
  }
}

// Usage in page widget
class ProductDetailPage extends StatefulWidget {
  final String productId;
  const ProductDetailPage({super.key, required this.productId});

  @override
  State<ProductDetailPage> createState() => _ProductDetailPageState();
}

class _ProductDetailPageState extends State<ProductDetailPage> {
  @override
  void initState() {
    super.initState();
    updatePageMeta(
      title: 'Product Details — My Store',
      description: 'Browse our product catalog',
    );
  }
  // ...
}
```

### Semantic HTML

```dart
// Use Semantics widget for accessibility and SEO
Semantics(
  label: 'Product image: Blue wireless headphones',
  child: Image.network('https://example.com/headphones.jpg'),
)
```

## Performance Optimization

### Tree Shaking and Deferred Imports

```dart
// Deferred import — loads only when needed
import 'package:my_app/heavy_feature.dart' deferred as heavy;

Future<void> openHeavyFeature() async {
  await heavy.loadLibrary();
  Navigator.of(context).push(
    MaterialPageRoute(builder: (_) => heavy.HeavyFeaturePage()),
  );
}
```

### Image Optimization

```dart
// Use cached_network_image for remote images
CachedNetworkImage(
  imageUrl: product.imageUrl,
  placeholder: (context, url) => const CircularProgressIndicator(),
  errorWidget: (context, url, error) => const Icon(Icons.error),
  memCacheWidth: 400, // Limit decoded size
  memCacheHeight: 300,
)
```

### Code Splitting Strategy

| Strategy            | Impact                 | When to Use                |
| ------------------- | ---------------------- | -------------------------- |
| Deferred imports    | Reduces initial bundle | Heavy features not on home |
| Lazy loading routes | Faster first paint     | Non-critical routes        |
| Image caching       | Avoids re-downloads    | All remote images          |
| const constructors  | Avoids rebuilds        | Stateless widgets          |
| ListView.builder    | Renders visible items  | Long lists                 |

## Web-Specific Considerations

### URL Strategy

```dart
// main.dart
import 'package:flutter_web_plugins/url_strategy.dart';

void main() {
  usePathUrlStrategy(); // Clean URLs: /products/42
  // useHashUrlStrategy();  // Hash URLs: /#/products/42
  runApp(MyApp());
}
```

### CORS Handling

- Configure CORS headers on your API server, not in Flutter
- For development, use a proxy or configure allowed origins
- Never expose API secrets in Flutter web client code

### Local Storage

```dart
import 'dart:html' as html;

class WebStorage {
  static void save(String key, String value) {
    html.window.localStorage[key] = value;
  }

  static String? load(String key) {
    return html.window.localStorage[key];
  }

  static void remove(String key) {
    html.window.localStorage.remove(key);
  }
}
```

## Testing

### Widget Testing

```dart
testWidgets('Counter increments on tap', (WidgetTester tester) async {
  await tester.pumpWidget(const MaterialApp(home: CounterPage()));

  expect(find.text('0'), findsOneWidget);
  expect(find.text('1'), findsNothing);

  await tester.tap(find.byIcon(Icons.add));
  await tester.pump();

  expect(find.text('1'), findsOneWidget);
});
```

### Integration Testing

```dart
import 'package:integration_test/integration_test.dart';

void main() {
  IntegrationTestWidgetsFlutterBinding.ensureInitialized();

  testWidgets('Full purchase flow', (tester) async {
    app.main();
    await tester.pumpAndSettle();

    // Navigate to product
    await tester.tap(find.text('Products'));
    await tester.pumpAndSettle();

    // Add to cart
    await tester.tap(find.byIcon(Icons.add_shopping_cart));
    await tester.pumpAndSettle();

    // Verify cart badge
    expect(find.text('1'), findsOneWidget);
  });
}
```

## Anti-Patterns

| Anti-Pattern                                           | Problem                          | Fix                                        |
| ------------------------------------------------------ | -------------------------------- | ------------------------------------------ |
| MediaQuery in builder causing rebuilds                 | Rebuilds on every keyboard open  | Use LayoutBuilder for layout decisions     |
| GlobalKey overuse                                      | Performance hit, hard to manage  | Use Keys only when for reparenting         |
| setState for everything                                | Tight coupling, untestable       | Lift state up or use Riverpod/Bloc         |
| Not using const constructors                           | Unnecessary widget rebuilds      | Add const to all stateless widgets         |
| Network calls without error handling                   | Silent failures, broken UI       | Always handle loading/error states         |
| Setting opacity to 0.0 for hiding                      | Still renders and occupies space | Use Visibility widget or conditional build |
| Using Column with SingleChildScrollView for long lists | All items rendered at once       | Use ListView.builder for lazy rendering    |

## Practical Patterns

### Form Handling with Validation

```dart
class LoginForm extends StatefulWidget {
  const LoginForm({super.key});

  @override
  State<LoginForm> createState() => _LoginFormState();
}

class _LoginFormState extends State<LoginForm> {
  final _formKey = GlobalKey<FormState>();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  bool _isLoading = false;
  String? _errorMessage;

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  Future<void> _submit() async {
    if (!_formKey.currentState!.validate()) return;

    setState(() {
      _isLoading = true;
      _errorMessage = null;
    });

    try {
      final authBloc = context.read<AuthBloc>();
      authBloc.add(LoginRequested(
        email: _emailController.text.trim(),
        password: _passwordController.text,
      ));
    } catch (e) {
      setState(() => _errorMessage = e.toString());
    } finally {
      if (mounted) setState(() => _isLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formKey,
      child: Column(
        children: [
          TextFormField(
            controller: _emailController,
            validator: (value) {
              if (value == null || value.isEmpty) return 'Email is required';
              if (!value.contains('@')) return 'Enter a valid email';
              return null;
            },
            decoration: const InputDecoration(
              labelText: 'Email',
              prefixIcon: Icon(Icons.email_outlined),
            ),
            keyboardType: TextInputType.emailAddress,
            textInputAction: TextInputAction.next,
          ),
          const SizedBox(height: 16),
          TextFormField(
            controller: _passwordController,
            validator: (value) {
              if (value == null || value.length < 8) return 'Min 8 characters';
              return null;
            },
            decoration: const InputDecoration(
              labelText: 'Password',
              prefixIcon: Icon(Icons.lock_outline),
            ),
            obscureText: true,
          ),
          if (_errorMessage != null)
            Padding(
              padding: const EdgeInsets.only(top: 8),
              child: Text(_errorMessage!, style: TextStyle(color: Theme.of(context).colorScheme.error)),
            ),
          const SizedBox(height: 24),
          SizedBox(
            width: double.infinity,
            child: FilledButton(
              onPressed: _isLoading ? null : _submit,
              child: _isLoading
                  ? const SizedBox(height: 20, width: 20, child: CircularProgressIndicator(strokeWidth: 2))
                  : const Text('Sign In'),
            ),
          ),
        ],
      ),
    );
  }
}
```

### API Service with Error Handling

```dart
class ApiService {
  final String baseUrl;
  final http.Client _client;

  ApiService({required this.baseUrl}) : _client = http.Client();

  Future<T> get<T>(String path, T Function(Map<String, dynamic>) fromJson) async {
    try {
      final response = await _client.get(
        Uri.parse('$baseUrl$path'),
        headers: {'Content-Type': 'application/json'},
      );

      if (response.statusCode == 200) {
        return fromJson(jsonDecode(response.body));
      }
      throw ApiException(response.statusCode, response.body);
    } on http.ClientException {
      throw const NetworkException('Connection failed');
    } on FormatException {
      throw const DataException('Invalid response format');
    }
  }

  Future<T> post<T>(String path, Map<String, dynamic> body, T Function(Map<String, dynamic>) fromJson) async {
    try {
      final response = await _client.post(
        Uri.parse('$baseUrl$path'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode(body),
      );

      if (response.statusCode == 200 || response.statusCode == 201) {
        return fromJson(jsonDecode(response.body));
      }
      throw ApiException(response.statusCode, response.body);
    } on http.ClientException {
      throw const NetworkException('Connection failed');
    }
  }
}

// Usage with Riverpod
@riverpod
Future<List<Product>> products(ProductsRef ref) async {
  final api = ref.watch(apiServiceProvider);
  return api.get('/products', (json) =>
    (json['data'] as List).map((e) => Product.fromJson(e)).toList()
  );
}

// Usage in widget
class ProductList extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final productsAsync = ref.watch(productsProvider);

    return productsAsync.when(
      data: (products) => ListView.builder(
        itemCount: products.length,
        itemBuilder: (context, index) => ProductCard(product: products[index]),
      ),
      loading: () => const Center(child: CircularProgressIndicator()),
      error: (error, stack) => ErrorWidget(
        message: error.toString(),
        onRetry: () => ref.invalidate(productsProvider),
      ),
    );
  }
}
```

### Responsive Dashboard Layout

```dart
class DashboardScaffold extends StatelessWidget {
  final String title;
  final Widget body;
  final int currentIndex;
  final ValueChanged<int> onNavigationChanged;

  const DashboardScaffold({
    super.key,
    required this.title,
    required this.body,
    required this.currentIndex,
    required this.onNavigationChanged,
  });

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final isDesktop = constraints.maxWidth >= 1024;
        final isTablet = constraints.maxWidth >= 600;

        if (isDesktop) {
          return Row(
            children: [
              NavigationRail(
                selectedIndex: currentIndex,
                onDestinationSelected: onNavigationChanged,
                labelType: NavigationRailLabelType.all,
                destinations: const [
                  NavigationRailDestination(icon: Icon(Icons.dashboard), label: Text('Dashboard')),
                  NavigationRailDestination(icon: Icon(Icons.inventory_2), label: Text('Products')),
                  NavigationRailDestination(icon: Icon(Icons.people), label: Text('Customers')),
                  NavigationRailDestination(icon: Icon(Icons.settings), label: Text('Settings')),
                ],
              ),
              const VerticalDivider(thickness: 1, width: 1),
              Expanded(
                child: Scaffold(
                  appBar: AppBar(title: Text(title)),
                  body: body,
                ),
              ),
            ],
          );
        }

        return Scaffold(
          appBar: AppBar(title: Text(title)),
          drawer: isTablet ? null : _buildDrawer(context),
          bottomNavigationBar: NavigationBar(
            selectedIndex: currentIndex,
            onDestinationSelected: onNavigationChanged,
            destinations: const [
              NavigationDestination(icon: Icon(Icons.dashboard), label: 'Dashboard'),
              NavigationDestination(icon: Icon(Icons.inventory_2), label: 'Products'),
              NavigationDestination(icon: Icon(Icons.people), label: 'Customers'),
              NavigationDestination(icon: Icon(Icons.settings), label: 'Settings'),
            ],
          ),
          body: body,
        );
      },
    );
  }
}
```

### Memory MCP Integration

Use the Knowledge Graph MCP server to persist Flutter project decisions:

```
# Save project tech decisions
create_entities({
  entities: [
    { name: "flutter-project", entityType: "project", observations: [
      "State management: Riverpod",
      "Router: go_router",
      "API: REST with Dio",
      "Theme: Material 3 with custom color scheme"
    ]},
    { name: "user-pref-flutter", entityType: "preference", observations: [
      "Prefers Material 3 design",
      "Dark mode by default",
      "Responsive breakpoints: 600/1024"
    ]}
  ]
})

# Relate decisions
create_relations({
  relations: [
    { from: "flutter-project", to: "user-pref-flutter", relationType: "configured_by" }
  ]
})

# Query previous decisions in new sessions
read_graph({})
```

### Deployment Checklist

- [ ] `flutter build web --release` succeeds with zero errors
- [ ] PWA manifest configured (`flutter.config.js` or `web/manifest.json`)
- [ ] favicon and app icons generated for all sizes
- [ ] Meta tags set: title, description, og:image per page
- [ ] URL strategy configured: `usePathUrlStrategy()` for clean URLs
- [ ] CORS headers configured on API server
- [ ] Service worker caching strategy defined
- [ ] Bundle size < 2MB initial load (check with `--tree-shake-icons`)
- [ ] Lighthouse Performance > 85, Accessibility > 90
- [ ] No `print()` statements in production code
- [ ] Error tracking configured (Sentry, Firebase Crashlytics)
