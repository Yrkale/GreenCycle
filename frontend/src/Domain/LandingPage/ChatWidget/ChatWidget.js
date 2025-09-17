import React, { useState } from "react";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message to UI
    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);

    try {
      const res = await fetch("http://localhost:8080/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await res.json();
      setMessages([...newMessages, { sender: "bot", text: data.reply }]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages([
        ...newMessages,
        { sender: "bot", text: "⚠️ Error connecting to chatbot." },
      ]);
    }

    setInput("");
  };

  return (
    <div>
      {/* Floating button */}
      <button
        onClick={toggleChat}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          backgroundColor: "#28a745",
          color: "white",
          borderRadius: "50%",
          width: "60px",
          height: "60px",
          border: "none",
          cursor: "pointer",
          fontSize: "24px",
        }}
      >
        💬
      </button>

      {/* Chat window */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "90px",
            right: "20px",
            width: "300px",
            height: "400px",
            backgroundColor: "white",
            border: "1px solid #ccc",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
          }}
        >
          <div
            style={{
              backgroundColor: "#28a745",
              color: "white",
              padding: "10px",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
              fontWeight: "bold",
            }}
          >
            GreenCycle Chatbot
          </div>

          <div
            style={{
              flex: 1,
              padding: "10px",
              overflowY: "auto",
              fontSize: "14px",
            }}
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  margin: "5px 0",
                  textAlign: msg.sender === "user" ? "right" : "left",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    padding: "8px 12px",
                    borderRadius: "15px",
                    backgroundColor:
                      msg.sender === "user" ? "#dcf8c6" : "#f1f0f0",
                  }}
                >
                  {msg.text}
                </span>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", borderTop: "1px solid #ccc" }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              style={{ flex: 1, border: "none", padding: "10px" }}
              placeholder="Type a message..."
            />
            <button
              onClick={sendMessage}
              style={{
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                padding: "10px 15px",
                cursor: "pointer",
              }}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
