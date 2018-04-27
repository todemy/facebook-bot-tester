const fbClient = require('../utils/facebook-client.js')
const expect = require('chai').expect


let fb
describe('Initial greeting', function() {
  this.timeout(20000)

  /*
  Set-up initial client.
  */
  before(async function() {
    this.timeout(6000)
    fb = await fbClient.setUpFbWrapper()
  })

  /*
  Removes all messages from the client stack
  */
  beforeEach(() => {
    fbClient.cleanStack()
  })

  /*
  Send message and grab a copy of the messages from the stack
  */
  it('should respond with initial greeting', async () => {
    /*
    Need to grab and determine threadID
    */
    fb.sendMessage("greetings!", fbClient.threadId)

    const response = await fbClient.grabMessages()

    expect(response.length).to.equal(1)
  })
})

