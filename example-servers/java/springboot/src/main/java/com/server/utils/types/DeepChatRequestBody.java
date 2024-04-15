package com.server.utils.types;

public class botconversaChatRequestBody {
  private botconversaChatRequestMessage[] messages;
  private String model;
  private Boolean stream;

  public botconversaChatRequestMessage[] getMessages() {
    return this.messages;
  }

  public String getModel() {
    return this.model;
  }

  public Boolean getStream() {
    return this.stream;
  }
}
