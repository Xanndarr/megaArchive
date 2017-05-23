# Mega Archive Utility

Taken a monolithic repo style. Subfolders contain their own projects.

## Project Structure
`api/` - Master API. Handles spinning up all slaves, communicating and terminating them. Holds a queue of downloads and takes responses, indexing them for later search.

`app/` - Public facing web app. All processing performed client side. No server side processing available. Queries master API for data. Built with React, Redux in ES6 syntax.

`slave/` - Code base for slave API. Prebaked into images that will be spun up on each slave. Handles download, encrpytion and re-upload to archives of links.

## Development
You need [Yarn](https://github.com/yarnpkg/yarn) and [NVM](https://github.com/creationix/nvm) installed. Both should have brew/apt/yum packages from what I remember:

```
$ nvm i     # setup node + npm
$ nvm use
```

Run `yarn` in each directory to install package dependencies. Please use Yarn rather than NPM for package management. Very similar commands e.g. `yarn add PACKAGE` to install.

NPM commands can be found in each projects' `package.json`.

`api/`:
- `npm run start` -> Start the API (built with [Restify](https://github.com/restify/node-restify))
- `PORT=$PORT npm run start` -> Start API on port `$PORT`
- `npm run prettier -- *.js` -> Run [Prettier](https://github.com/prettier/prettier/) on all .js files

`app/`:
- `npm run build` -> Build with webpack
- `npm run start` -> Start webpack server locally. Builds project first on start. Supports hot-reloading
- `npm run prettier -- *.js` -> Run [Prettier](https://github.com/prettier/prettier/) on all .js files

`slave/`:
- `npm run start` -> Start the API (built with [Restify](https://github.com/restify/node-restify))
- `PORT=$PORT npm run start` -> Start API on port `$PORT`
- `npm run prettier -- *.js` -> Run [Prettier](https://github.com/prettier/prettier/) on all .js files

## Linting + Code Quality
`app/` uses ES6 syntax. `api/` and `slave/` use ES5.

Code is formatted with [Prettier](https://github.com/prettier/prettier/) before commit. Might be an idea to install the prettier plugin for your favourite editor.

Config settings used. Set these if you install plugin for editor:
- `print-width` -> 100 = how long each line is
- `single-quote` -> Use single quotes instead of double
- `trailing-comma` -> all = Add all trailing commas. ES6 AirBnB standard
- `parser` -> babylon = required for ES6 syntax
