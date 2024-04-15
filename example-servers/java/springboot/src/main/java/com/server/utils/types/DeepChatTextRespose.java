package com.server.utils.types;

public class botconversaChatTextRespose {
  private String text;

  public botconversaChatTextRespose(String text) {
    if (text != null) {
      this.text = text;
    }
  }

  public String getText() {
    return text;
  }
}