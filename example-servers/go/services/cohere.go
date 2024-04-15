package services

import (
	"encoding/json"
	"net/http"
	"errors"
	"bytes"
	"fmt"
	"io"
	"os"
)

// Make sure to set the COHERE_API_KEY environment variable in a .env file (create if does not exist) - see .env.example

func CohereChat(w http.ResponseWriter, r *http.Request) error {
	err, skipPreflight := ProcessIncomingRequest(&w, r)
	if err != nil { return err }
	if skipPreflight { return nil }

	// Text messages are stored inside request body using the botconversa Chat JSON format:
	// https://botconversachat.dev/docs/connect
	chatBodyBytes, err := createCohereChatRequestBodyBytes(w, r, false)
	if (err != nil) { return err }

	req, _ := http.NewRequest("POST", "https://api.cohere.ai/v1/chat", bytes.NewBuffer(chatBodyBytes))
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer " + os.Getenv("COHERE_API_KEY"))

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil { return err }
	
	defer resp.Body.Close()

	var resultData CohereChatResult
	err = json.NewDecoder(resp.Body).Decode(&resultData)
	if err != nil { return err }

	if resultData.Message != "" {
    return errors.New(resultData.Message)
	}

	// Create response
	jsonResponse, err := CreateTextResponse(w, resultData.Text)
	if err != nil { return err }

	// Send response
	w.Header().Set("Content-Type", "application/json")
	w.Write(jsonResponse)
	return nil
}

func createCohereChatRequestBodyBytes(w http.ResponseWriter, r *http.Request, stream bool) ([]byte, error) {
	// Text messages are stored inside request body using the botconversa Chat JSON format:
	// https://botconversachat.dev/docs/connect
	userRequestBodyBytes, err := io.ReadAll(r.Body)
	if err != nil {
		fmt.Println("Failed to read request body:", err)
		http.Error(w, "Failed to read request body", http.StatusInternalServerError)
		return userRequestBodyBytes, err
	}

	var botconversaChatRequestBody botconversaChatRequestBody
	err = json.Unmarshal(userRequestBodyBytes, &botconversaChatRequestBody)
	if err != nil {
		fmt.Println("Failed to unmarshal request body:", err)
		http.Error(w, "Failed to unmarshal request body", http.StatusInternalServerError)
		return userRequestBodyBytes, err
	}

	chatBody := createCohereChatBody(botconversaChatRequestBody.Messages)
	return json.Marshal(chatBody)
}

func createCohereChatBody(botconversaChatRequestMessages []botconversaChatRequestMessage) CohereChatBody {
	return CohereChatBody{
		Query: botconversaChatRequestMessages[len(botconversaChatRequestMessages)-1].Text,
		ChatHistory: func() []CohereChatHistoryMessage {
			chatHistory := make([]CohereChatHistoryMessage, 0, len(botconversaChatRequestMessages)-1)
			for _, message := range botconversaChatRequestMessages[:len(botconversaChatRequestMessages)-1] {
				userName := "USER"
				if message.Role == "ai" {
					userName = "CHATBOT"
				}
				chatHistory = append(chatHistory, CohereChatHistoryMessage{
					UserName: userName,
					Text:     message.Text,
				})
			}
			return chatHistory
		}(),
	}
}

func CohereGenerate(w http.ResponseWriter, r *http.Request) error {
	err, skipPreflight := ProcessIncomingRequest(&w, r)
	if err != nil { return err }
	if skipPreflight { return nil }

	// Text messages are stored inside request body using the botconversa Chat JSON format:
	// https://botconversachat.dev/docs/connect
	userRequestBodyBytes, err := io.ReadAll(r.Body)
	if err != nil { return err }

	var botconversaChatRequestBody botconversaChatRequestBody
	err = json.Unmarshal(userRequestBodyBytes, &botconversaChatRequestBody)
	if err != nil { return err }

	fmt.Println("Request Body:", botconversaChatRequestBody.Messages[0].Text)

	generateBody := CohereGenerateBody{
		Prompt: botconversaChatRequestBody.Messages[0].Text,
	}

	generateBodyBytes, err := json.Marshal(generateBody)
	if err != nil { return err }

	req, _ := http.NewRequest("POST", "https://api.cohere.ai/v1/generate", bytes.NewBuffer(generateBodyBytes))
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer " + os.Getenv("COHERE_API_KEY"))

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil { return err }
	
	defer resp.Body.Close()

	var resultData CohereGenerateResult
	err = json.NewDecoder(resp.Body).Decode(&resultData)
	if err != nil { return err }

	if resultData.Message != "" {
    return errors.New(resultData.Message)
	}

	// Create response
	jsonResponse, err := CreateTextResponse(w, resultData.Generations[0].Text)
	if err != nil { return err }

	// Send response
	w.Header().Set("Content-Type", "application/json")
	w.Write(jsonResponse)
	return nil
}


func CohereSummarize(w http.ResponseWriter, r *http.Request) error {
	err, skipPreflight := ProcessIncomingRequest(&w, r)
	if err != nil { return err }
	if skipPreflight { return nil }

	// Text messages are stored inside request body using the botconversa Chat JSON format:
	// https://botconversachat.dev/docs/connect
	userRequestBodyBytes, err := io.ReadAll(r.Body)
	if err != nil { return err }

	var botconversaChatRequestBody botconversaChatRequestBody
	err = json.Unmarshal(userRequestBodyBytes, &botconversaChatRequestBody)
	if err != nil { return err }
	fmt.Println("Request Body:", botconversaChatRequestBody.Messages[0].Text)

	summarizeBody := CohereSummarizeBody{
		Text: botconversaChatRequestBody.Messages[0].Text,
	}

	summarizeBodyBytes, err := json.Marshal(summarizeBody)
	if err != nil { return err }

	req, _ := http.NewRequest("POST", "https://api.cohere.ai/v1/summarize", bytes.NewBuffer(summarizeBodyBytes))
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer " + os.Getenv("COHERE_API_KEY"))

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil { return err }

	defer resp.Body.Close()

	var resultData CohereSummarizeResult
	err = json.NewDecoder(resp.Body).Decode(&resultData)
	if err != nil { return err }

	if resultData.Message != "" {
    return errors.New(resultData.Message)
	}

	// Create response
	jsonResponse, err := CreateTextResponse(w, resultData.Summary)
	if err != nil { return err }

	// Send response
	w.Header().Set("Content-Type", "application/json")
	w.Write(jsonResponse)
	return nil
}