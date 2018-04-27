const fbLogin = require('facebook-chat-api')
const fs = require('fs')

let globalMessageStack = []

// Always based on calling directory.
const login = async () => {
  return new Promise((resolve ,reject) => {
    fbLogin({appState: JSON.parse(fs.readFileSync('appState.json', 'utf8'))}, (err, api) => {
      if (err) return reject(err)

      api.setOptions({listenEvents: true})

      resolve(api)
    })
  })
}


const parseCallToActions = (rawCallToActions) => {
  const callToActions = []

  rawCallToActions.forEach(section => {
    switch(section.action_open_type) {
      case "POSTBACK":
        callToActions.push({
          title: section.title,
          type: "POSTBACK"
        })
        break;
      default:
        callToActions.push({
          title: section.title,
          type: "WEB_URL",
          actionLink: section.action_link
        })
        break;
    }
  })

  return callToActions
}

const waitForMessage = (interval) => {
  return new Promise((resolve ,reject) => {
    setTimeout(() => {
      resolve()
    }, interval)
  })
}

export const grabMessages = async (attempt=0) => {
  if (attempt > 30) {
    return Promise.reject(new Error(`Too many attempts trying to fetch messages on stack!`))
  }

  await waitForMessage(600)
  if (globalMessageStack.length > 0) {
    return Promise.resolve(globalMessageStack.slice())
  }

  return grabMessages(attempt + 1)
}

export const cleanStack = () => {
  globalMessageStack = []
}

export const setUpFbWrapper = async () => {
  const api = await login()

  api.listen((err, event) => {
    if (err) {
      console.error(`Shit went wrong listening to facebook: `, err)
      return Promise.reject(err)
    }

    console.log('our event: ', event)

    switch(event.type) {
      case "message":
        globalMessageStack.push({
          rawEvent: event,
          body: event.body,
          callToActions: event.attachments && event.attachments[0].target && event.attachments[0].target.call_to_actions ? parseCallToActions(event.attachments[0].target.call_to_actions) : []
        })
        break;
    }
  })

  return api
}


