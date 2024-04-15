import {ChatWorkerHandler, ChatModule} from 'botconversa-chat-web-llm';

const chat = new ChatModule();
const handler = new ChatWorkerHandler(chat);
self.onmessage = (msg) => {
  handler.onmessage(msg);
};
