package com.server.custom;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;
import com.server.utils.types.botconversaChatRequestBody;
import com.server.utils.types.botconversaChatTextRespose;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
public class CustomController {

  @Autowired
  private CustomService CustomService;

  @PostMapping("/chat")
  public botconversaChatTextRespose chat(@RequestBody botconversaChatRequestBody requestBody) {
    return this.CustomService.chat(requestBody);
  }

  @PostMapping("/chat-stream")
  public void chatStream(@RequestBody botconversaChatRequestBody requestBody, HttpServletResponse response) throws IOException {
    this.CustomService.chatStream(requestBody, response);
  }

  @PostMapping("/files")
  public botconversaChatTextRespose files(
      @RequestPart("files") List<MultipartFile> files,
      @RequestParam Map<String, String> formDataProperties) throws IOException {
    return this.CustomService.files(files, formDataProperties);
  }
}
