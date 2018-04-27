# facebook-bot-tester
End to end facebook bot testing set-up

## Motivation

Aims to help simplify the process of testing a live facebook messenger bot by wrapping the [Facebook Chat Api](https://github.com/Schmavery/facebook-chat-api) for ease of use.

## Usage

Firstly run the set-up bot script with the following environment variables set

```
export FB_BOT_EMAIL=<email>
export FB_BOT_PASSWORD=<password>

npm run setup
```

Next View the example.spec.js file for the workflow integration and run mocha

```
// Note this will run against live facebook bot credentials
npm test
```

This current set-up and architecture is used to test [Todemy](https://todemy.com) for more information and articles please see our [blog](https://todemy.com/blog)

### TO DO

* simplify set-up
* release to npm