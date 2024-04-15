import {FileAttachments} from '../../../../../types/fileAttachments';
import {ServiceFileTypes} from '../../../../../services/serviceIO';
import {AudioFileAttachmentType} from './audioFileAttachmentType';
import {FileAttachmentsType} from './fileAttachmentsType';
import {botconversaChat} from '../../../../../botconversaChat';

export class FileAttachmentTypeFactory {
  // prettier-ignore
  public static create(botconversaChat: botconversaChat, files: FileAttachments, toggleContainer: (display: boolean) => void,
      container: HTMLElement, type: keyof ServiceFileTypes) {
    if (type === 'audio') {
      return new AudioFileAttachmentType(botconversaChat, files, toggleContainer, container);
    }
    return new FileAttachmentsType(botconversaChat, files, toggleContainer, container);
  }
}
