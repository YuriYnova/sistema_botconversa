import {StyleUtils} from '../../../../utils/element/styleUtils';
import {HTMLClassUtilities} from '../../../../types/html';
import {StatefulStyles} from '../../../../types/styles';
import {MessagesBase} from '../messagesBase';
import {MessageElements} from '../messages';
import {HTMLUtils} from './htmlUtils';

const botconversa_CHAT_TEMPORARY_MESSAGE = 'botconversa-chat-temporary-message';
const botconversa_CHAT_SUGGESTION_BUTTON = 'botconversa-chat-suggestion-button';

const botconversa_CHAT_ELEMENTS: HTMLClassUtilities = {
  'botconversa-chat-button': {
    styles: {
      default: {
        backgroundColor: 'white',
        padding: '5px',
        paddingLeft: '7px',
        paddingRight: '7px',
        border: '1px solid #c2c2c2',
        borderRadius: '6px',
        cursor: 'pointer',
      },
      hover: {
        backgroundColor: '#fafafa',
      },
      click: {
        backgroundColor: '#f1f1f1',
      },
    },
  },
};

const botconversa_CHAT_ELEMENT_CLASSES = Object.keys(botconversa_CHAT_ELEMENTS);

export class HTMLbotconversaChatElements {
  private static applySuggestionEvent(messages: MessagesBase, element: Element) {
    // needs to be in a timeout for submitMessage to be available
    setTimeout(() => {
      element.addEventListener('click', () => {
        messages.submitUserMessage?.({text: element.textContent?.trim() || ''});
      });
    });
  }

  public static isElementTemporary(messageElements?: MessageElements) {
    if (!messageElements) return false;
    return messageElements.bubbleElement.children[0]?.classList.contains(botconversa_CHAT_TEMPORARY_MESSAGE);
  }

  public static doesElementContainbotconversaChatClass(element: HTMLElement) {
    return botconversa_CHAT_ELEMENT_CLASSES.find((className) => element.classList.contains(className));
  }

  private static applyEvents(element: Element, className: string) {
    const events = botconversa_CHAT_ELEMENTS[className].events;
    Object.keys(events || []).forEach((eventType) => {
      element.addEventListener(eventType, events?.[eventType as keyof GlobalEventHandlersEventMap] as () => void);
    });
  }

  private static getProcessedStyles(utilities: HTMLClassUtilities, element: Element, className: string) {
    const customStyles = Array.from(element.classList).reduce<StatefulStyles[]>((styles, className) => {
      const statefulStyles = utilities[className]?.styles as StatefulStyles;
      if (statefulStyles && utilities[className].styles) {
        styles.push(statefulStyles);
      }
      return styles;
    }, []);
    const botconversaChatStyles = botconversa_CHAT_ELEMENTS[className].styles;
    if (botconversaChatStyles) {
      const stylesCp = JSON.parse(JSON.stringify(botconversaChatStyles));
      if (stylesCp.default) StyleUtils.overwriteDefaultWithAlreadyApplied(stylesCp, element as HTMLElement);
      customStyles.unshift(stylesCp); // add it to the front to be primary
    }
    const mergedStyles = StyleUtils.mergeStatefulStyles(customStyles);
    return StyleUtils.processStateful(mergedStyles, {}, {});
  }

  public static applybotconversaChatUtilities(messages: MessagesBase, utilities: HTMLClassUtilities, element: HTMLElement) {
    botconversa_CHAT_ELEMENT_CLASSES.forEach((className) => {
      const elements = element.getElementsByClassName(className);
      Array.from(elements || []).forEach((element) => {
        const styles = HTMLbotconversaChatElements.getProcessedStyles(utilities, element, className);
        HTMLUtils.applyStylesToElement(element as HTMLElement, styles);
        HTMLbotconversaChatElements.applyEvents(element, className);
      });
    });
    const suggestionElements = element.getElementsByClassName(botconversa_CHAT_SUGGESTION_BUTTON);
    Array.from(suggestionElements).forEach((element) => HTMLbotconversaChatElements.applySuggestionEvent(messages, element));
  }
}
