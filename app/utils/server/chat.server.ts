import { EventEmitter } from 'events'

export const EVENTS = {
  NEW_MESSAGE: 'NEW_MESSAGE'
}

let chatEmitter: EventEmitter

declare global {
  var __chat_emitter__: EventEmitter
}

if (process.env.NODE_ENV === 'production') {
  chatEmitter = new EventEmitter()
} else {
  if (!global.__chat_emitter__) {
    global.__chat_emitter__ = new EventEmitter()
  }
  chatEmitter = global.__chat_emitter__
}

export { chatEmitter }
