import BrowserOnly from '@botconversa/BrowserOnly';
import React from 'react';

// Used to allow client side rendering
export default function botconversaChatBrowser(props) {
  return (
    <BrowserOnly>
      {() => {
        const botconversaChatReact = require('botconversa-chat-react').botconversaChat;
        return <botconversaChatReact {...props}>{props.children}</botconversaChatReact>;
      }}
    </BrowserOnly>
  );
}
