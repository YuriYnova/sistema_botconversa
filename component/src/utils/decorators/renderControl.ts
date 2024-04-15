import {InternalHTML} from '../webComponent/internalHTML';

export class RenderControl {
  private static waitForPropertiesToBeUpdatedBeforeRender(botconversaChat: InternalHTML) {
    botconversaChat._propUpdated_ = false;
    setTimeout(() => {
      if (!botconversaChat._propUpdated_) {
        botconversaChat._waitingToRender_ = false;
        botconversaChat.onRender();
      } else {
        RenderControl.waitForPropertiesToBeUpdatedBeforeRender(botconversaChat);
      }
    });
  }

  public static attemptRender(botconversaChat: InternalHTML) {
    botconversaChat._propUpdated_ = true;
    if (!botconversaChat._waitingToRender_) {
      botconversaChat._waitingToRender_ = true;
      RenderControl.waitForPropertiesToBeUpdatedBeforeRender(botconversaChat);
    }
  }
}
