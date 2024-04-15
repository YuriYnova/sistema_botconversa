import {botconversaChat as botconversaChatCore} from 'botconversa-chat';
import {createComponent} from '@lit-labs/react';
import * as React from 'react';

export const botconversaChat = createComponent({
  tagName: 'botconversa-chat',
  elementClass: botconversaChatCore,
  react: React,
  events: {
    onactivate: 'activate',
    onchange: 'change',
  },
});
