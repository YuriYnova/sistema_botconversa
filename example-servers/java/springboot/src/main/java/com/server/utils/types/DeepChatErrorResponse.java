package com.server.utils.types;

public class botconversaChatErrorResponse {
  private String error;

  public botconversaChatErrorResponse(String error) {
    this.error = error;
  }

  public String getError() {
    return this.error;
  }
}