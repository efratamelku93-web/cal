import React, { useState, useEffect, useRef } from "react";
const AIChat = ({ lang }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const scrollRef = useRef(null);
  // Update to a valid model name (1.5-flash is stable and fast)
  const GEMINI_API_KEY = "AIzaSyBETHTZcjI2pMoOY3Is6KCp-VzPgiI9mR8";
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatMessages, isTyping]);
  // --- FEATURE: Robust Copy to Clipboard ---
  const copyToClipboard = (text, index) => {
    if (!navigator.clipboard) {
      // Fallback for non-HTTPS or older browsers
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    } else {
      navigator.clipboard.writeText(text);
    }
    // Visual feedback
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };
  // --- FEATURE: Text to Speech (Toggle Start/Stop) ---
  const speakText = (text) => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = text.match(/[ሀ-፟]/) ? "am-ET" : "en-US";
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };
  const formatResponse = (text) => {
    return text.split('\n').map((line, index) => {
      if (line.trim().startsWith('*') || line.trim().startsWith('-')) {
        return (
          <div key={index} className="main-point-line" style={{ display: 'flex', alignItems: 'flex-start', margin: '5px 0' }}>
            <i className="fas fa-lightbulb" style={{ color: '#ffb81c', marginRight: '10px', marginTop: '4px' }}></i>
            <span>{line.replace(/^[*|-]\s*/, '')}</span>
          </div>
        );
      }
      return <div key={index} style={{ marginBottom: '5px' }}>{line}</div>;
    });
  };
  const handleSendMessage = async (text) => {
    const messageText = text || chatInput;
    if (!messageText.trim()) return;
    setChatMessages((prev) => [...prev, { type: "user", text: messageText }]);
    setChatInput("");
    setIsTyping(true);
    const systemPrompt = `
      Identity: Mekdela Amba University Student Advice Center Advisor.
      Role: Help students with academic, mental health, and campus advice.
      Strict Restriction: DO NOT discuss POLITICS.
      Language: Respond in the language used by the user (Amharic or English).
      Format: Use bullet points (stars) for main advice points.
    `;
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            { role: "user", parts: [{ text: systemPrompt }] },
            ...chatMessages.map(m => ({
              role: m.type === "user" ? "user" : "model",
              parts: [{ text: m.text }]
            })),
            { role: "user", parts: [{ text: messageText }] }
          ],
        }),
      });
      const data = await response.json();
      if (data.candidates && data.candidates[0].content.parts[0].text) {
        const aiAnswer = data.candidates[0].content.parts[0].text;
        setChatMessages((prev) => [...prev, { type: "bot", text: aiAnswer }]);
      }
    } catch (error) {
      console.error("Chat Error:", error);
      setChatMessages((prev) => [...prev, { type: "bot", text: "Error connecting to AI. Please check your key or internet." }]);
    } finally {
      setIsTyping(false);
    }
  };
  return (
    <div className={`fixed-ai-chat ${isChatOpen ? "open" : ""}`}>
      {isChatOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <div className="header-info">
              <i className="fas fa-university"></i>
              <div>
                <div style={{ fontSize: '10px', opacity: 0.8 }}>መቅደላ አምባ ዩኒቨርሲቲ</div>
                <div style={{ fontSize: '13px', fontWeight: 'bold' }}>{lang === "en" ? "Advice Center" : "የምክር ማዕከል"}</div>
              </div>
            </div>
            <button className="close-chat" onClick={() => { window.speechSynthesis.cancel(); setIsChatOpen(false); }}>×</button>
          </div>
          <div className="chat-body" ref={scrollRef}>
            <div className="msg bot">
               {lang === "en" ? "Hello! How can I support your studies today?" : "ሰላም! ዛሬ በትምህርትዎ ዙሪያ ምን ላግዝዎ?"}
            </div>
            {chatMessages.map((msg, idx) => (
              <div key={idx} className={`msg-wrapper ${msg.type}`}>
                <div className={`msg ${msg.type}`}>
                  <div className="text-content">
                    {msg.type === "bot" ? formatResponse(msg.text) : msg.text}
                  </div>
                  
                  <div className="msg-actions">
                    <button 
                        onClick={() => copyToClipboard(msg.text, idx)} 
                        title="Copy"
                        className={copiedIndex === idx ? "active" : ""}
                    >
                      <i className={copiedIndex === idx ? "fas fa-check" : "fas fa-copy"}></i>
                    </button>
                    {msg.type === "bot" && (
                      <button 
                        onClick={() => speakText(msg.text)} 
                        title="Listen"
                        style={{ color: isSpeaking ? '#ffb81c' : 'inherit' }}
                      >
                        <i className={isSpeaking ? "fas fa-stop-circle" : "fas fa-volume-up"}></i>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="msg bot typing">
                <i className="fas fa-spinner fa-spin"></i> {lang === "en" ? "Thinking..." : "በማሰብ ላይ..."}
              </div>
            )}
          </div>
          <form className="chat-footer" onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}>
            <input
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder={lang === "en" ? "Ask a question..." : "ጥያቄዎን ይጠይቁ..."}
            />
            <button type="submit" className="send-btn" disabled={isTyping}>
             <i className="fas fa-paper-plane"></i>
            </button>
          </form>
        </div>
      )}
      <button className="chat-trigger" onClick={() => setIsChatOpen(!isChatOpen)}>
        <i className="fas fa-robot"></i> {lang === "en" ? "Advisor" : "አማካሪ"}
      </button> 
    </div>
  );
};
export default AIChat;