import { useRef, useState, useEffect } from "react";
import "./ShoeChat.css";
import { apiKey } from "../services/constants";
import { Paperclip } from "lucide-react";

const geminiKey = apiKey;

export default function ShoeChat({ messages, setMessages, onBack }) {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() && !imagePreview) return;

    if (imagePreview) {
      setMessages((prev) => [
        ...prev,
        { image: imagePreview, sender: "user" },
        { text: "Thanks for your image! We’ll take a look.", sender: "bot" },
      ]);
      setImagePreview(null);
      return;
    }

    const userMsg = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const payload = {
        contents: [{ role: "user", parts: [{ text: input }] }],
      };

      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`;

      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      let reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't understand.";

      const clean = reply.replace(/[*_`#>\-]/g, "").trim();
      setMessages((prev) => [...prev, { text: clean, sender: "bot" }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { text: "Something went wrong. Please try again later.", sender: "bot" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="shoe-chat-container">
      <button onClick={onBack} className="back-btn">← FAQ</button>

      {messages.length === 0 && (
        <div className="info-message">
          This assistant can't answer questions about page structure.
          <br />
          It can help with style fits, size guides, and offers.
        </div>
      )}

      <div className="chat-messages">
        {messages.map((m, i) =>
          m.image ? (
            <div key={i} className={`chat-bubble ${m.sender}`}>
              <img src={m.image} alt="upload" className="chat-image" />
            </div>
          ) : (
            <div key={i} className={`chat-bubble ${m.sender}`}>{m.text}</div>
          )
        )}
        {isLoading && <div className="chat-bubble bot">Typing...</div>}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-area">
        <label htmlFor="file-upload" className="upload-icon">
          <Paperclip size={14} />
        </label>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type your question..."
        />
        <button onClick={sendMessage} disabled={isLoading || (!input.trim() && !imagePreview)}>
          Send
        </button>
      </div>
    </div>
  );
}
