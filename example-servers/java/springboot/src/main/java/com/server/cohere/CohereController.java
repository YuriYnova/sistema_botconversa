package com.server.cohere;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import com.server.utils.types.botconversaChatRequestBody;
import com.server.utils.types.botconversaChatTextRespose;

// Make sure to set the COHERE_API_KEY environment variable in application.properties

@RestController
public class CohereController {
  @Autowired
  private CohereService cohereService;

  @PostMapping("/cohere-chat")
  public botconversaChatTextRespose chat(@RequestBody botconversaChatRequestBody requestBody) throws Exception {
    return this.cohereService.chat(requestBody);
  }

  @PostMapping("/cohere-generate")
  public botconversaChatTextRespose generateText(@RequestBody botconversaChatRequestBody requestBody) throws Exception {
    return this.cohereService.generateText(requestBody);
  }

  @PostMapping("/cohere-summarize")
  public botconversaChatTextRespose sumamrizeText(@RequestBody botconversaChatRequestBody requestBody) throws Exception {
    return this.cohereService.summarizeText(requestBody);
  }
}
