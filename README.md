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

Grab your [ThreadID](https://github.com/Schmavery/facebook-chat-api/blob/master/DOCS.md#sendMessage) then start testing! 
```javascript
const fbClient = require('../utils/facebook-client.js')
const expect = require('chai').expect

let fb
describe('Initial greeting', function() {
  // Bot testing can have quite some delay.
  this.timeout(20000)

  /*
  Set-up initial client.
  */
  before(async function() {
    this.timeout(6000)
    fb = await fbClient.setUpFbWrapper()
  })

  /*
  Removes all messages from the client stack before each test
  */
  beforeEach(() => {
    fbClient.cleanStack()
  })

  it('should respond with initial greeting', async () => {
    /*
    Need to grab and determine threadID from your own app
    */
    fb.sendMessage("greetings!", fbClient.threadId)

    const response = await fbClient.grabMessages()

    expect(response.length).to.equal(1)
  })
})
```

```
// Note this will run against live facebook bot credentials
npm test
```

This current set-up and architecture is used to test [Todemy](https://todemy.com) for more information and articles please see our [blog](https://todemy.com/blog)

### TO DO

* simplify set-up
* release to npm