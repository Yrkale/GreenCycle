package com.greencycle.chatservice;

import org.springframework.stereotype.Service;

@Service
public class ChatService {

    public String getReply(String message) {
        if (message == null || message.trim().isEmpty()) {
            return "Please tell me how I can help — e.g. 'pricing', 'schedule pickup', or 'contact'.";
        }

        String m = message.toLowerCase();

        if (m.contains("hello") || m.contains("hi")) {
            return "Hi 👋! Welcome to GreenCycle. I can help with pricing, pickup, recycling items, or contact info. What would you like to know?";
        }
        if (m.contains("price") || m.contains("cost") || m.contains("charge")) {
            return "Our pricing depends on the item and volume. For an estimate, tell me the item type and quantity or visit the Pricing page.";
        }
        if (m.contains("pickup") || m.contains("schedule")) {
            return "You can schedule pickups from the 'Schedule Pickup' page. Would you like a link to it?";
        }
        if (m.contains("contact") || m.contains("email") || m.contains("phone")) {
            return "You can reach us at support@greencycle.example or +91-XXXXXXXXXX (Mon–Sat, 9am–6pm).";
        }
        if (m.contains("hours") || m.contains("open")) {
            return "We operate Monday to Saturday, 9:00 AM to 6:00 PM.";
        }

        return "Sorry, I didn't understand that — can you rephrase or ask about pricing, pickup or contact info?";
    }
}
