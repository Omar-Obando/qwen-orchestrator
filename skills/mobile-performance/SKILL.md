---
name: mobile-performance
description: Mobile app performance optimization, startup time, memory management, and battery efficiency
license: MIT
---

# Mobile Performance Optimization

## When to Use

- Optimizing mobile app startup time
- Reducing memory footprint and preventing leaks
- Improving scroll performance and frame rates
- Optimizing battery consumption
- Reducing app bundle size
- Implementing lazy loading for mobile resources
- Optimizing image loading and caching strategies
- Improving network request efficiency on mobile
- Reducing jank and stuttering in animations
- Optimizing database queries on mobile devices
- Implementing efficient state management
- Reducing cold/warm start times
- Optimizing rendering pipeline
- Implementing efficient list/virtualization patterns
- Reducing memory allocations in hot paths
- Optimizing JavaScript execution on mobile
- Implementing efficient caching strategies
- Reducing main thread blocking operations
- Optimizing image decoding and processing
- Implementing efficient animation systems
- Reducing layout thrashing
- Optimizing touch response times
- Implementing efficient background task handling

## When NOT to Use

- Desktop web performance optimization (use `performance` skill instead)
- Server-side rendering optimization (use `serverless-optimization` skill)
- API endpoint performance (use `api-design` skill)
- Database server optimization (use `database-design` skill)
- Network infrastructure optimization
- CDN configuration and optimization
- Web worker optimization for desktop
- WebGL/WebGPU performance tuning
- Progressive Web App caching strategies
- Service worker optimization
- HTTP/2 or HTTP/3 configuration
- Server push optimization
- Critical CSS generation for web
- Font loading optimization for web
- Preload/prefetch hint optimization

## Prerequisites

- Understanding of mobile app architecture (React Native, Flutter, or native)
- Knowledge of mobile device constraints (memory, CPU, battery)
- Familiarity with mobile profiling tools
- Understanding of mobile network conditions (3G, 4G, 5G, offline)
- Experience with mobile-specific performance metrics

## Performance Metrics

### Core Mobile Metrics

| Metric | Target | Measurement Tool |
|--------|--------|------------------|
| **Time to Interactive (TTI)** | < 3s (4G), < 8s (3G) | Chrome DevTools, Lighthouse |
| **First Contentful Paint (FCP)** | < 1.8s | Chrome DevTools, Web Vitals |
| **Largest Contentful Paint (LCP)** | < 2.5s | Chrome DevTools, Web Vitals |
| **First Input Delay (FID)** | < 100ms | Chrome DevTools, Web Vitals |
| **Cumulative Layout Shift (CLS)** | < 0.1 | Chrome DevTools, Web Vitals |
| **Total Blocking Time (TBT)** | < 300ms | Chrome DevTools, Lighthouse |
| **Memory Usage** | < 150MB (iOS), < 200MB (Android) | Xcode Instruments, Android Profiler |
| **Battery Impact** | < 5% per hour | Device battery stats, battery-historian |
| **Frame Rate** | 60fps (target), 120fps (high refresh) | FPS counter, Performance Monitor |
| **App Bundle Size** | < 50MB (initial), < 100MB (total) | App Store Connect, Play Console |

### Mobile-Specific Metrics

| Metric | Description | Target |
|--------|-------------|--------|
| **Jank Rate** | Percentage of dropped frames | < 1% |
| **Touch Response Time** | Time from touch to visual feedback | < 100ms |
| **Scroll Smoothness** | Consistency of scroll frame rate | 60fps sustained |
| **Memory Leak Rate** | Memory growth per navigation cycle | 0MB growth |
| **Network Request Time** | Average request completion time | < 500ms (cached), < 2s (network) |
| **Image Load Time** | Time to display optimized images | < 1s |
| **Animation Frame Budget** | Time available per frame | 16.67ms (60fps) |

## Startup Time Optimization

### Cold Start Optimization

```javascript
// ❌ BAD: Heavy operations during startup
class App extends Component {
  componentDidMount() {
    // All these block startup
    this.loadUserData();
    this.initializeAnalytics();
    this.fetchNotifications();
    this.syncLocalDatabase();
    this.preloadImages();
  }
}

// ✅ GOOD: Prioritized, async startup
class App extends Component {
  componentDidMount() {
    // Phase 1: Show splash screen immediately
    this.showSplashScreen();
    
    // Phase 2: Critical initialization (parallel)
    Promise.all([
      this.initializeCoreServices(),
      this.loadUserPreferences()
    ]).then(() => {
      // Phase 3: Navigate to main screen
      this.navigateToMainScreen();
      
      // Phase 4: Background tasks (non-blocking)
      this.initializeAnalytics();
      this.fetchNotifications();
      this.syncLocalDatabase();
    });
  }
}
```

### React Native Startup Optimization

```javascript
// App.js - Optimized startup
import React, {lazy, Suspense} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

// Lazy load heavy screens
const Dashboard = lazy(() => import('./screens/Dashboard'));
const Settings = lazy(() => import('./screens/Settings'));
const Profile = lazy(() => import('./screens/Profile'));

const LazyScreen = ({screen}) => (
  <Suspense fallback={
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large"/>
    </View>
  }>
    {screen}
  </Suspense>
);

export default function App() {
  return (
    <NavigationContainer>
      {/* Heavy screens are only loaded when navigated to */}
      <Stack.Screen 
        name="Dashboard" 
        component={() => <LazyScreen screen={<Dashboard/>}/>} 
      />
      <Stack.Screen 
        name="Settings" 
        component={() => <LazyScreen screen={<Settings/>}/>} 
      />
      <Stack.Screen 
        name="Profile" 
        component={() => <LazyScreen screen={<Profile/>}/>} 
      />
    </NavigationContainer>
  );
}
```

### Flutter Startup Optimization

```dart
// main.dart - Optimized startup
import 'package:flutter/material.dart';
import 'package:flutter_cache_manager/flutter_cache_manager.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  // Pre-warm cache in background
  DefaultCacheManager().getFileFromCache('banner.jpg').then((_) {
    // Cache warmed, navigate to main app
  });
  
  // Initialize services without blocking
  unawaited(initializeAnalytics());
  unawaited(syncLocalDatabase());
  
  runApp(const MyApp());
}

class MyApp extends StatefulWidget {
  @override
  _MyAppState createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  bool _isLoading = true;
  
  @override
  void initState() {
    super.initState();
    // Show splash, load critical data
    loadCriticalData().then((_) {
      setState(() {
        _isLoading = false;
      });
    });
  }
  
  @override
  Widget build(BuildContext context) {
    if (_isLoading) {
      return const SplashScreen();
    }
    return const MainApp();
  }
}
```

## Memory Optimization

### Prevent Memory Leaks

```javascript
// ❌ BAD: Memory leak from event listeners
class Component extends React.Component {
  componentDidMount() {
    EventEmitter.on('data', this.handleData);
    setInterval(this.pollData, 5000);
  }
  
  // Missing cleanup!
  
  render() { return <View/>; }
}

// ✅ GOOD: Proper cleanup
class Component extends React.Component {
  componentDidMount() {
    EventEmitter.on('data', this.handleData);
    this.intervalId = setInterval(this.pollData, 5000);
  }
  
  componentWillUnmount() {
    EventEmitter.off('data', this.handleData);
    clearInterval(this.intervalId);
  }
  
  render() { return <View/>; }
}
```

### Image Memory Management

```javascript
// React Native - Image optimization
import FastImage from 'react-native-fast-image';
import {Image} from 'react-native';

// Predefine image sizes
const IMAGE_SIZES = {
  thumbnail: {width: 100, height: 100},
  medium: {width: 400, height: 300},
  large: {width: 800, height: 600},
};

// Use FastImage with caching
const OptimizedImage = ({uri, size = 'medium'}) => (
  <FastImage
    source={{
      uri,
      priority: FastImage.priority.normal,
      // Cache control
      cache: FastImage.cacheControl.cacheOnly,
    }}
    style={{
      width: IMAGE_SIZES[size].width,
      height: IMAGE_SIZES[size].height,
    }}
    resizeMode={FastImage.resizeMode.cover}
  />
);

// Flutter - Image optimization
import 'package:cached_network_image/cached_network_image.dart';

Widget optimizedImage(String url) {
  return CachedNetworkImage(
    imageUrl: url,
    // Memory cache settings
    memCacheWidth: 400, // Constrain memory cache
    memCacheHeight: 300,
    // Disk cache
    fadeInDuration: Duration(milliseconds: 300),
    placeholder: (context, url) => CircularProgressIndicator(),
    errorWidget: (context, url, error) => Icon(Icons.error),
  );
}
```

## Scroll Performance

### Virtualized Lists

```javascript
// React Native - FlatList optimization
import {FlatList} from 'react-native';

const OptimizedList = ({items}) => (
  <FlatList
    data={items}
    renderItem={RenderItem}
    // Key optimizations
    keyExtractor={item => item.id}
    initialNumToRender={10}          // Render first 10 items
    maxToRenderPerBatch={5}          // Batch size for subsequent renders
    windowSize={5}                   // Number of screens to render
    removeClippedSubviews={true}     // Remove off-screen views (Android)
    // Performance optimizations
    getItemLayout={(data, index) => ({
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index,
    })}
    // Remove layout calculation
    onEndReachedThreshold={0.5}      // Load more at 50% from end
    onEndReached={() => loadMore()}
    // Memoize render
    renderItem={({item}) => <MemoizedItem item={item}/>}
  />
);

// Flutter - ListView optimization
import 'package:flutter_slidable/flutter_slidable.dart';

Widget optimizedList(List<Item> items) {
  return ListView.builder(
    // Pre-calculate item count
    itemCount: items.length,
    // Use builder pattern
    itemBuilder: (context, index) {
      final item = items[index];
      return ListTile(
        key: ValueKey(item.id), // Stable key
        title: Text(item.title),
        subtitle: Text(item.subtitle),
        leading: CircleAvatar(child: Text(item.initial)),
      );
    },
    // Optimize scrolling
    cacheExtent: 500.0, // Pre-render 500px ahead
    addAutomaticKeepAlives: true, // Keep item state
    addRepaintBoundaries: true,   // Isolate repaints
  );
}
```

## Battery Optimization

### Reduce Background Activity

```javascript
// React Native - Battery-efficient polling
import {AppState} from 'react-native';

class BatteryEfficientComponent extends Component {
  state = {appState: AppState.currentState};
  
  componentDidMount() {
    this.appStateSubscription = AppState.addEventListener(
      'change', this.handleAppStateChange
    );
    
    // Only poll when app is in foreground
    if (this.state.appState === 'active') {
      this.startPolling();
    }
  }
  
  handleAppStateChange = (nextAppState) => {
    if (this.state.appState === 'active' && nextAppState === 'inactive') {
      this.stopPolling(); // App went to background
    } else if (nextAppState === 'active') {
      this.startPolling(); // App came to foreground
    }
    this.setState({appState: nextAppState});
  }
  
  componentWillUnmount() {
    this.appStateSubscription?.remove();
    this.stopPolling();
  }
}
```

## Bundle Size Optimization

### Code Splitting

```javascript
// React Native - Dynamic imports
import React, {lazy, Suspense} from 'react';

// Split by feature
const ChatFeature = lazy(() => import('./features/Chat'));
const PaymentFeature = lazy(() => import('./features/Payment'));
const SettingsFeature = lazy(() => import('./features/Settings'));

// Split by route
const Dashboard = lazy(() => import('./screens/Dashboard'));
const Profile = lazy(() => import('./screens/Profile'));

// Split by platform
const PlatformSpecific = lazy(() => 
  Platform.OS === 'ios' 
    ? import('./components/IOSComponent')
    : import('./components/AndroidComponent')
);
```

### Tree Shaking

```javascript
// ❌ BAD: Import entire library
import _ from 'lodash';
_.debounce(() => {});

// ✅ GOOD: Import only what you need
import debounce from 'lodash/debounce';
```

## Profiling Tools

### React Native

| Tool | Purpose | URL |
|------|---------|-----|
| **React DevTools** | Component hierarchy, render timing | https://facebook.github.io/react-native/react-devtools |
| **Hermes Profiler** | JavaScript execution profiling | Built into React Native |
| **Flipper** | Network, layout, plugin debugging | https://fbflipper.com |
| **Android Profiler** | Memory, CPU, network | Android Studio |
| **Instruments** | Memory leaks, energy impact | Xcode |

### Flutter

| Tool | Purpose | URL |
|------|---------|-----|
| **Flutter DevTools** | Performance, memory, network | https://docs.flutter.dev/tools/devtools |
| **Timeline** | Frame rendering analysis | Built into Flutter |
| **Memory View** | Heap analysis | Flutter DevTools |
| **Network View** | Request monitoring | Flutter DevTools |

## Production Checklist

- [ ] App startup time < 3s on mid-range device
- [ ] Memory usage < 150MB (iOS), < 200MB (Android)
- [ ] No memory leaks detected (profile 30min session)
- [ ] Scroll performance 60fps sustained
- [ ] Touch response < 100ms
- [ ] Battery impact < 5% per hour
- [ ] Bundle size < 50MB (initial download)
- [ ] Images optimized and cached
- [ ] Network requests batched and cached
- [ ] Background tasks respect app state
- [ ] Animations use native driver
- [ ] Lists are virtualized
- [ ] No jank during navigation
- [ ] Tested on 3G network conditions
- [ ] Offline mode functional
- [ ] Memory profiling shows no leaks
- [ ] Frame rate consistent during animations
- [ ] Touch targets meet accessibility guidelines

## References

- [React Native Performance](https://reactnative.dev/docs/performance)
- [Flutter Performance](https://docs.flutter.dev/perf/rendering)
- [Android Performance](https://developer.android.com/topic/performance)
- [iOS Performance](https://developer.apple.com/documentation/xcode/improving-your-apps-performance)
- [Mobile Web Vitals](https://web.dev/vitals/)
