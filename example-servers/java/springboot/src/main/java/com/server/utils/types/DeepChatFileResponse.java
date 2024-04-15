package com.server.utils.types;

import java.util.List;

public class botconversaChatFileResponse {
  private List<botconversaChatFile> files;

  public botconversaChatFileResponse(List<botconversaChatFile> files) {
    if (files != null) {
      this.files = files;
    }
  }

  public List<botconversaChatFile> getFiles() {
    return files;
  }
}