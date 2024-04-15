package com.server.openAI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;
import com.server.utils.types.botconversaChatFileResponse;
import com.server.utils.types.botconversaChatRequestBody;
import com.server.utils.types.botconversaChatTextRespose;
import reactor.core.publisher.Flux;
import java.util.List;

// Make sure to set the OPENAI_API_KEY environment variable in application.properties

@RestController
public class OpenAIController {
  @Autowired
  private OpenAIService openAIService;

  @PostMapping("/openai-chat")
  public botconversaChatTextRespose chat(@RequestBody botconversaChatRequestBody requestBody) throws Exception {
    return this.openAIService.chat(requestBody);
  }

  @PostMapping("/openai-chat-stream")
  public Flux<botconversaChatTextRespose> chatStream(@RequestBody botconversaChatRequestBody requestBody) {
    return this.openAIService.chatStream(requestBody);
  }

  @PostMapping("/openai-image")
  public botconversaChatFileResponse files(@RequestPart("files") List<MultipartFile> files) throws Exception {
    return this.openAIService.imageVariation(files);
  }
}
