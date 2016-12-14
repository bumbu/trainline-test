# Trainline test app

Based on [React Redux Starter Kit](https://github.com/davezuko/react-redux-starter-kit)

## Task

### Original task

Create a simple two "page" web application using node, react, redux (or another state management library of your choice), to display train services departing from London Waterloo station.

#### Basic requirements:
Consume our real-time API - https://realtime.thetrainline.com/departures/wat 

List all departing services, like this:

![Routes listing](https://cloud.githubusercontent.com/assets/171178/21190220/08aa48d2-c219-11e6-8b77-0549268a6baf.png)

On click/tap on a service, display calling pattern like this:

![Route details](https://cloud.githubusercontent.com/assets/171178/21190254/1aaefd5c-c219-11e6-90e3-00f8dd8829e8.png)

#### Nice to have:

* Responsive layout
* Transition between views 
* Automatic update of train progress

### Done
  * Add Local Node server
  * Add Styles compilation
  * Compile JS/JSX
  * Add React 
  * Implement HTML components
  * Add Redux
  * Add linting
  * Load source data 
  * Make items clickable 
  * Automatically refresh statuses
  * Allow closing one item
  * Tests

### Optional todos
  * Tests for Route component
  * Add transitions
  * Add functional/E2E testing
  * Add server-side rendering (Universal app)
  * Make it accessible

### Notes
  * Fonts don't match as Circular is a proprietary font
  * Icons don't match 

## Requirements
* node `^4.5.0`
* npm `^3.0.0`

## Getting Started

After confirming that your development environment meets the specified [requirements](#requirements), you can create a new project based on `react-redux-starter-kit` by doing the following:

### Install from source

Then install dependencies and check to see it works. 

```bash
$ npm install    # Install project dependencies
$ npm start       # Compile and launch
```

While developing, you will probably rely mostly on `npm start`; however, there are additional scripts at your disposal:

|`npm run <script>`|Description|
|------------------|-----------|
|`start`|Serves your app at `localhost:3000`. HMR will be enabled in development.|
|`compile`|Compiles the application to disk (`~/dist` by default).|
|`dev`|Same as `npm start`, but enables nodemon for the server as well.|
|`test`|Runs unit tests with Karma and generates a coverage report.|
|`test:dev`|Runs Karma and watches for changes to re-run tests; does not generate coverage reports.|
|`deploy`|Runs linter, tests, and then, on success, compiles your application to disk.|
|`deploy:dev`|Same as `deploy` but overrides `NODE_ENV` to "development".|
|`deploy:prod`|Same as `deploy` but overrides `NODE_ENV` to "production".|
|`lint`|Lint all `.js` files.|
|`lint:fix`|Lint and fix all `.js` files. [Read more on this](http://eslint.org/docs/user-guide/command-line-interface.html#fix).|

## Development

#### Developer Tools

**We recommend using the [Redux DevTools Chrome Extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd).**
Using the chrome extension allows your monitors to run on a separate thread and affords better performance and functionality. It comes with several of the most popular monitors, is easy to configure, filters actions, and doesn’t require installing any packages.
