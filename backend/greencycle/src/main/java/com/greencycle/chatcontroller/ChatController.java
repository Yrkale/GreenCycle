package com.greencycle.chatcontroller;

import com.greencycle.chatdto.ChatRequest;
import com.greencycle.chatdto.ChatResponse;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "http://localhost:3000") // allow frontend React app
public class ChatController {

    @PostMapping
    public ChatResponse chat(@RequestBody ChatRequest req) {
        String userMsg = req.getMessage().toLowerCase();
        String reply;

        switch (userMsg) {
            case "hi":
            case "hello":
                reply = "Hello! 👋 Welcome to GreenCycle. How can I help you today?";
                break;
            case "what is greencycle":
                reply = "GreenCycle is an eco-friendly platform encouraging recycling and sustainable practices.";
                break;
            case "bye":
                reply = "Goodbye! 🌱 Keep making the planet greener.";
                break;
            default:
                reply = "I'm not sure about that 🤔, but I'm learning every day!";
        }

        return new ChatResponse(reply);
    }
}
