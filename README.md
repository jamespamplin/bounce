# Bounce

Throw a ball and watch it bounce.

## Tech

- SVG for browser display
- [Rollup](https://github.com/rollup/rollup) for JS bundle
- [Babel](http://babeljs.io/) for ES2015 transpiling
- [Flowtype](http://flowtype.org/) for pre-bundle JS type checking
- [ESLint](http://eslint.org/) for linting with [Idiomatic JS](https://www.npmjs.com/package/eslint-config-idiomatic) style
- [Docker + Compose](http://docker.com/) for local dev

## Running locally

With `docker` and `docker-compose`:

```sh
$ docker-compose up
```
This will map container port 8080 to a random host port, use `docker-compose port app 8080`
to find out which one.

Without docker, but with local node.js use `npm start` to start local static server.

**Build:** `npm run build` or `npm run watch`
