# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Cerebro is an Elasticsearch web admin tool built with:
- **Backend**: Scala 2.13.4, Play Framework 2.8.7, SBT 1.4.5
- **Frontend**: AngularJS 1.8.2, Bootstrap 3, jQuery
- **Build Tools**: SBT (Scala), Grunt (JavaScript/CSS)
- **Requirements**: Java 17 (Java 11 may work but 17 is recommended; Java 18+ requires additional configuration)

## Development Commands

### Running the Application

**Backend (Scala/Play):**
```bash
sbt run
```
This starts the Play server on http://localhost:9000 with auto-reloading enabled. Use Ctrl+D to stop.

**Frontend (JavaScript/CSS):**
```bash
# Build once
grunt build

# Watch mode (for development)
grunt watch
```

**Docker:**
```bash
docker run -p 9000:9000 lmenezes/cerebro
```

### Testing

**Scala tests (89 tests):**
```bash
sbt test
```
All backend tests pass successfully with Java 17.

**JavaScript tests (198 tests):**
```bash
# Run tests with Chrome
CHROME_BIN=/usr/bin/google-chrome-stable npx grunt karma

# Or use the alias if Chrome is in PATH
grunt test

# Continuous watch mode:
CHROME_BIN=/usr/bin/google-chrome-stable npx grunt karma --singleRunTests=false
```

**Complete test suite:**
```bash
# Run both backend and frontend tests
sbt test && CHROME_BIN=/usr/bin/google-chrome-stable npx grunt karma
```

**Build and test (for PRs):**
```bash
# Build frontend assets and run all tests
npx grunt clean jshint eslint concat copy && sbt test && CHROME_BIN=/usr/bin/google-chrome-stable npx grunt karma
```

### Linting

```bash
# JavaScript linting
grunt jshint
grunt eslint  # Also auto-fixes issues
```

### Building

```bash
# Complete build (required before commits)
grunt build
```

This generates production assets in `public/js/` and `public/css/` from `src/app/` sources.

## Important Configuration Notes

### Java Version Compatibility

The project requires **Java 17** for optimal compatibility. The `build.sbt` includes Java 17+ compatibility settings:

```scala
// Add Java 17+ compatibility for tests (opens internal packages for Guice/CGLib)
Test / javaOptions ++= Seq(
  "--add-opens=java.base/java.lang=ALL-UNNAMED",
  "--add-opens=java.base/java.lang.invoke=ALL-UNNAMED",
  "--add-opens=java.base/java.lang.reflect=ALL-UNNAMED",
  "--add-opens=java.base/java.util=ALL-UNNAMED"
)
```

These flags are required because:
- Guice (dependency injection) uses reflection on internal Java classes
- CGLib (used by mocking framework) generates bytecode dynamically
- Java 9+ modules restrict access to internal packages by default

**If using Java 25+:** You'll encounter SecurityManager errors with SBT 1.4.5. Either:
- Use Java 17 (recommended)
- Upgrade to SBT 1.9.7+, but this requires updating Play Framework dependencies

### Frontend Test Configuration

Frontend tests require Chrome/Chromium. The test configuration (`tests/karma.config.js`) uses:
- `ChromeHeadless` as the default browser
- Correct path to ace-builds: `/node_modules/ace-builds/src/ace.js`
- The deprecated `karma-phantomjs-launcher` has been removed

### Known Issues Fixed

1. **karma-phantomjs-launcher incompatibility**: PhantomJS doesn't work with modern Node.js versions. Use Chrome instead.
2. **ace-builds path**: The correct path is `node_modules/ace-builds/src/ace.js`, not `node_modules/ace-builds/src/ace/ace.js`.
3. **Java 17+ reflection restrictions**: Tests fail without the `--add-opens` JVM flags due to Guice/CGLib reflection requirements.

## Architecture

### Backend Structure (app/)

**MVC Pattern:**
- `controllers/` - Play controllers handling HTTP endpoints
  - Each controller corresponds to a feature (Aliases, Nodes, Overview, etc.)
  - `BaseController` provides common request processing with authentication
  - `AuthSupport` trait provides authentication helpers
- `models/` - Domain models and data structures
- `views/` - Scala HTML templates
- `services/` - Business logic layer (e.g., `OverviewDataService`, `ClusterChangesDataService`)

**Key Components:**
- `elastic/ElasticClient` - Core interface for Elasticsearch API calls
- `elastic/HTTPElasticClient` - HTTP implementation of ElasticClient
- `dao/RestHistoryDAO` - Persistence for REST request history
- `controllers/auth/` - Authentication system (LDAP, Basic auth, Open)
- `forms/` - Form validation (e.g., LoginForm)

**Request Flow:**
1. HTTP request → Controller
2. `AuthAction` validates authentication
3. `BaseController.process()` wraps request in `CerebroRequest`
4. Controller logic uses `ElasticClient` to call Elasticsearch
5. Response wrapped in `CerebroResponse`

### Frontend Structure (src/app/)

**AngularJS Architecture:**
- `app.routes.js` - Route definitions
- `components/` - Feature modules, each with:
  - `controller.js` - AngularJS controller
  - `data.js` - Service for data fetching
  - Additional helpers (filters, validators, etc.)
- `shared/` - Reusable services, directives, filters:
  - `services/` - Core services (data, modal, alerts, clipboard, page, refresh, cluster_changes, ace_editor)
  - `directives/` - Custom directives (sort_table, plain_include)
  - Filters - bytes, time_interval, starts_with
  - Utilities - pagination, paginator, request, progress, node_filter, index_filter, alias_filter, grouped_settings

**Build Pipeline (Grunt):**
- Concatenates vendor libraries → `public/js/lib.js`
- Concatenates app code → `public/js/app.js`
- Concatenates vendor CSS → `public/css/lib.css`
- Concatenates app CSS → `public/css/app.css`
- Copies font-awesome fonts → `public/fonts/`

### Configuration

**Main config:** `conf/application.conf`
- Secret key (change in production)
- Port configuration (default: 9000)
- Database path (default: ./cerebro.db)
- REST request history size
- Authentication settings (LDAP/Basic auth via env variables)
- Known Elasticsearch hosts

**Routes:** `conf/routes` - Maps HTTP endpoints to controller actions

**Environment Variables:**
- `CEREBRO_PORT` - Server port
- `AUTH_TYPE` - Authentication type (ldap/basic)
- `LDAP_*` - LDAP configuration
- `BASIC_AUTH_USER`, `BASIC_AUTH_PWD` - Basic auth credentials

### Database

Uses Slick with SQLite for storing:
- REST request history (per user)
- Database file location: configurable via `data.path` in application.conf
- Evolutions for schema management in `conf/evolutions/`

## Pull Request Requirements

When submitting PRs:
1. Include generated CSS/JS files (`grunt build`)
2. Add tests for changes
3. Ensure all tests pass (`sbt test` and `grunt test`)
4. Squash development commits
5. Rebase against development branch
6. Open an issue first to discuss features/approach

## Key Features

- Cluster overview and health monitoring
- Index management (create, delete, open, close, force merge, clear cache, refresh, flush)
- Shard management and relocation
- Alias management
- Node statistics and monitoring
- REST API interface with history
- Cluster settings management
- Index settings management
- Index templates
- Snapshot and repository management
- Analysis tools (analyzers, tokenizers)
- Cat API support
- Authentication support (LDAP, Basic)

## Troubleshooting

### Backend Test Failures

**Error: `java.lang.reflect.InaccessibleObjectException`**
- **Cause**: Java 17+ restricts access to internal packages
- **Solution**: Ensure `build.sbt` includes the `--add-opens` JVM flags (already configured)

**Error: `UnsupportedOperationException: Setting a Security Manager is not supported`**
- **Cause**: Java 18+ removed SecurityManager support
- **Solution**: Use Java 17 or upgrade SBT to 1.9.7+

**Error: Version conflicts with `scala-xml`**
- **Cause**: SBT version mismatch with Play Framework dependencies
- **Solution**: Use SBT 1.4.5 with Java 17 (recommended configuration)

### Frontend Test Failures

**Error: `Found 1 load error` / `karma-phantomjs-launcher` error**
- **Cause**: PhantomJS is deprecated and incompatible with modern Node.js
- **Solution**: Remove `karma-phantomjs-launcher` package and use Chrome:
  ```bash
  npm uninstall karma-phantomjs-launcher
  CHROME_BIN=/usr/bin/google-chrome-stable npx grunt karma
  ```

**Error: Pattern does not match any file (ace-builds)**
- **Cause**: Incorrect ace-builds path in `tests/karma.config.js`
- **Solution**: Use `/node_modules/ace-builds/src/ace.js` (not `.../src/ace/ace.js`)

**Error: Chrome not found**
- **Cause**: ChromeHeadless requires Chrome/Chromium installation
- **Solution**: Install Chrome or Chromium, or use Firefox by editing `tests/karma.config.js` line 30

### Build Issues

**npm vulnerabilities warnings**
- **Status**: Known issue with legacy dependencies
- **Impact**: Does not affect functionality
- **Note**: Run `npm audit` for details; exercise caution with `npm audit fix --force`

**SBT deprecation warnings**
- **Status**: Expected with SBT 1.4.5 and Java 17
- **Impact**: Does not affect functionality
- **Note**: These warnings appear but do not cause failures

## Test Results Reference

**Backend (Scala/Specs2):**
- 89 tests across 17 test suites
- All tests passing
- Test execution time: ~5 seconds

**Frontend (JavaScript/Karma/Jasmine):**
- 198 tests
- All tests passing
- Test execution time: ~0.16 seconds
- Browser: Chrome Headless 141.0.0.0

**Total: 287 tests passing**
