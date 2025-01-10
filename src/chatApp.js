import React, { useState } from "react";

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const API_ENDPOINT = "http://127.0.0.1:8000/ask";


  // Function to handle sending a message
  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message to the chat
    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    // Clear input box
    setInput("");

    try {
      // Send user message to the backend
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: input }),
      });

      const data = await response.json();
      const aiMessage = { sender: "ai", text: data.answer || "No response received." };

      // Add AI response to the chat
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      const errorMessage = { sender: "ai", text: "Error: Unable to fetch response." };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.chatContainer}>
        <div style={styles.messages}>
          {messages.map((message, index) => (
            <div
              key={index}
              style={{
                ...styles.message,
                ...(message.sender === "user" ? styles.user : styles.ai),
              }}
            >
              {message.text}
            </div>
          ))}
        </div>
        <div style={styles.inputContainer}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your question..."
            style={styles.inputBox}
          />
          <button onClick={handleSend} style={styles.sendButton}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f9f9f9",
  },
  chatContainer: {
    width: "90%",
    maxWidth: "600px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    backgroundColor: "#fff",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  messages: {
    flex: 1,
    padding: "10px",
    overflowY: "auto",
  },
  message: {
    margin: "5px 0",
    padding: "10px",
    borderRadius: "5px",
    maxWidth: "80%",
    wordWrap: "break-word",
  },
  user: {
    alignSelf: "flex-end",
    backgroundColor: "#d1e7dd",
  },
  ai: {
    alignSelf: "flex-start",
    backgroundColor: "#f8d7da",
  },
  inputContainer: {
    display: "flex",
    borderTop: "1px solid #ddd",
  },
  inputBox: {
    flex: 1,
    padding: "10px",
    border: "none",
    fontSize: "16px",
  },
  sendButton: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default ChatApp;
