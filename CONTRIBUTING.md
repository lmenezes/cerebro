Contributing to cerebro
=============================

You can contribute to cerebro through code, documentation or bug reports.

## Bug reports

For bug reports, make sure you:
- give enough details regarding your cerebro setup
- include versions for elasticsearch and cerebro
- describe steps to reproduce the error, the error itself and expected behaviour

## Pull requests

Before getting started on a pull request(be it a new feature or a bug fix), please open an issue explaning what you would like to achieve and how you would go about this.
Even though I'm open to feature requests, I might not always agree on the value a feature might bring. And I would hate to waste someone else's time.

Once working on a pull request, please:
- include the generated css/js files(grunt build)
- add tests that validate your changes
- squash your development commits to keep only important commits(fix typo, wrong indent should not be part of git history)
- rebase it against development before submiting
- make sure all tests pass(sbt test / grunt test)

## Development

You can run cerebro for development through sbt:

```sh
$ sbt
[info] Loading project definition from /Users/leo/dev/cerebro/project
[info] Set current project to cerebro (in build file:/Users/leo/dev/cerebro/)
[cerebro] $ run

--- (Running the application, auto-reloading is enabled) ---

[info] p.c.s.NettyServer - Listening for HTTP on /0:0:0:0:0:0:0:0:9000

(Server started, use Ctrl+D to stop and go back to the console...)
```

Make sure you also run Grunt in order to build the js/css artifcats as you change the code.

```sh
$ grunt watch
Running "watch" task
Waiting...(node:20784) DeprecationWarning: process.EventEmitter is deprecated. 
Use require('events') instead.
```
