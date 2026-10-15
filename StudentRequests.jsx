import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { 
  Send, 
  MessageSquare, 
  User, 
  Clock, 
  CheckCircle,
  Copy,
  Volume2
} from "lucide-react";
import "./StudentRequests.css";

const StudentRequests = ({ lang }) => {
  const [requests, setRequests] = useState([]);
  const [selected, setSelected] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  
  const user = JSON.parse(localStorage.getItem("user"));
  const scrollRef = useRef();

  // Fetch student's requests
  useEffect(() => {
    if (!user?.phone) return;

    const fetchRequests = () => {
      axios.post("http://localhost/wibset/get_student_requests.php", { 
        student_phone: user.phone 
      })
      .then(res => {
        if (Array.isArray(res.data)) {
          setRequests(res.data);
        }
      })
      .catch(err => {
        console.error("Error fetching requests:", err);
      });
    };

    fetchRequests();
    const interval = setInterval(fetchRequests, 10000);
    return () => clearInterval(interval);
  }, [user?.phone]);

  // Fetch chat messages for selected request
  useEffect(() => {
    if (!selected?.id) return;

    const fetchChat = () => {
      axios.get(`http://localhost/wibset/get_chat_history.php?request_id=${selected.id}`)
        .then(res => {
          if (Array.isArray(res.data)) {
            setMessages(res.data);
          } else {
            setMessages([]);
          }
        })
        .catch(err => {
          console.error("Error fetching chat:", err);
        });
    };

    fetchChat();
    const timer = setInterval(fetchChat, 3000);
    return () => clearInterval(timer);
  }, [selected]);

  // Auto-scroll to bottom
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send message
  const handleSend = async () => {
    if (!text.trim() || !selected?.id) return;

    setLoading(true);
    try {
      const res = await axios.post("http://localhost/wibset/send_chat_message.php", {
        request_id: selected.id,
        sender_role: "student",
        message_text: text
      });

      if (res.data.status === "success") {
        setText("");
        // Refresh messages
        const updated = await axios.get(
          `http://localhost/wibset/get_chat_history.php?request_id=${selected.id}`
        );
        if (Array.isArray(updated.data)) {
          setMessages(updated.data);
        }
      }
    } catch (err) {
      console.error("Error sending message:", err);
      Swal.fire(
        lang === "en" ? "Error" : "ስህተት",
        lang === "en" ? "Failed to send message" : "መልእክት መላክ አልተሳካም",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  // Copy message to clipboard
  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    });
  };

  // Text to speech
  const speakText = (text) => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = text.match(/[\u1200-\u137F]/) ? "am-ET" : "en-US";
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  // Handle Enter key
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get status info
  const getStatusInfo = (status) => {
    switch(status) {
      case 'Approved':
        return {
          icon: <CheckCircle size={14} />,
          color: '#10b981',
          bg: '#d1fae5',
          text: lang === "en" ? "Active" : "ንቁ"
        };
      case 'Pending':
        return {
          icon: <Clock size={14} />,
          color: '#f59e0b',
          bg: '#fef3c7',
          text: lang === "en" ? "Pending" : "በመጠባበቅ ላይ"
        };
      case 'Declined':
        return {
          icon: <XCircle size={14} />,
          color: '#ef4444',
          bg: '#fee2e2',
          text: lang === "en" ? "Declined" : "ውድቅ"
        };
      default:
        return {
          icon: <Clock size={14} />,
          color: '#94a3b8',
          bg: '#f1f5f9',
          text: status || 'Unknown'
        };
    }
  };

  return (
    <div className="student-chat-layout">
      <div className="chat-wrapper">
        {/* Sidebar - Request List */}
        <div className="requests-sidebar">
          <div className="sidebar-title">
            <MessageSquare size={20} />
            <span>
              {lang === "en" ? "My Requests" : "የእኔ ጥያቄዎች"}
            </span>
          </div>

          <div className="req-items-list">
            {requests.length === 0 ? (
              <div style={{ 
                padding: '40px 20px', 
                textAlign: 'center', 
                color: '#94a3b8' 
              }}>
                <MessageSquare size={40} strokeWidth={1} />
                <p className="mt-3">
                  {lang === "en" ? "No requests yet" : "እስካሁን ምንም ጥያቄ የለም"}
                </p>
              </div>
            ) : (
              requests.map(req => {
                const statusInfo = getStatusInfo(req.status);
                const isActive = selected?.id === req.id;
                
                return (
                  <div 
                    key={req.id} 
                    className={`req-card-item ${isActive ? 'active' : ''}`}
                    onClick={() => setSelected(req)}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div className="avatar-small">
                        {req.advisor_name?.charAt(0)?.toUpperCase() || 'A'}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div className="adv-name">
                          {req.advisor_name || (lang === "en" ? "Advisor" : "አማካሪ")}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                          {req.expertise_category || 'General'}
                        </div>
                      </div>
                    </div>
                    <div style={{ marginTop: '8px' }}>
                      <span 
                        className="status-pill"
                        style={{
                          backgroundColor: statusInfo.bg,
                          color: statusInfo.color,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        {statusInfo.icon}
                        {statusInfo.text}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Main Chat View */}
        <div className="chat-view">
          {selected ? (
            <>
              {/* Chat Header */}
              <div className="chat-window-header">
                <div className="advisor-info">
                  <div className="avatar-small">
                    {selected.advisor_name?.charAt(0)?.toUpperCase() || 'A'}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600 }}>
                      {selected.advisor_name || (lang === "en" ? "Advisor" : "አማካሪ")}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                      {selected.expertise_category || 'General'}
                    </div>
                  </div>
                </div>
                {selected.status && (
                  <span 
                    className="status-pill"
                    style={{
                      backgroundColor: getStatusInfo(selected.status).bg,
                      color: getStatusInfo(selected.status).color
                    }}
                  >
                    {getStatusInfo(selected.status).icon}
                    <span style={{ marginLeft: '4px' }}>
                      {getStatusInfo(selected.status).text}
                    </span>
                  </span>
                )}
              </div>

              {/* Messages Area */}
              <div className="chat-messages-container">
                {/* Original Request Card */}
                {selected.reason && (
                  <div className="original-question-card">
                    <div style={{ 
                      fontSize: '0.75rem', 
                      color: '#666', 
                      marginBottom: '8px',
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      letterSpacing: '1px'
                    }}>
                      {lang === "en" ? "📋 Your Request" : "📋 ያቀረቡት ጥያቄ"}
                    </div>
                    <div style={{ fontSize: '0.9rem', color: '#333' }}>
                      {selected.reason}
                    </div>
                    {selected.preferred_time && (
                      <div style={{ 
                        fontSize: '0.8rem', 
                        color: '#666', 
                        marginTop: '8px' 
                      }}>
                        {lang === "en" ? "Preferred Time: " : "የተመረጠ ሰዓት: "}
                        {new Date(selected.preferred_time).toLocaleString()}
                      </div>
                    )}
                  </div>
                )}

                {/* Message Bubbles */}
                {messages.length === 0 && selected.status === 'Approved' ? (
                  <div style={{ 
                    textAlign: 'center', 
                    color: '#94a3b8', 
                    padding: '60px 20px' 
                  }}>
                    <Send size={40} strokeWidth={1} />
                    <p className="mt-3">
                      {lang === "en" 
                        ? "Send your first message to the advisor" 
                        : "የመጀመሪያ መልእክትዎን ይላኩ"}
                    </p>
                  </div>
                ) : messages.length === 0 && selected.status === 'Pending' ? (
                  <div style={{ 
                    textAlign: 'center', 
                    color: '#94a3b8', 
                    padding: '60px 20px' 
                  }}>
                    <Clock size={40} strokeWidth={1} />
                    <p className="mt-3">
                      {lang === "en" 
                        ? "Waiting for admin approval..." 
                        : "የአስተዳዳሪ ማፅደቅን በመጠበቅ ላይ..."}
                    </p>
                  </div>
                ) : (
                  messages.map((msg, idx) => (
                    <div 
                      key={msg.id || idx} 
                      className={`chat-bubble-row ${msg.sender_role === 'student' ? 'student' : 'advisor'}`}
                    >
                      <div className="chat-bubble">
                        <div className="msg-content">
                          {msg.message_text}
                        </div>
                        
                        {/* Message Actions */}
                        <div className="bubble-actions">
                          <button 
                            onClick={() => copyToClipboard(msg.message_text, idx)}
                            title={lang === "en" ? "Copy" : "ቅዳ"}
                          >
                            {copiedIndex === idx ? (
                              <CheckCircle size={14} color="#2ecc71" />
                            ) : (
                              <Copy size={14} />
                            )}
                          </button>
                          
                          {msg.sender_role === 'advisor' && (
                            <button 
                              onClick={() => speakText(msg.message_text)}
                              title={lang === "en" ? "Listen" : "አዳምጥ"}
                              style={{ 
                                color: isSpeaking ? '#ffb81c' : 'inherit' 
                              }}
                            >
                              <Volume2 size={14} />
                            </button>
                          )}
                        </div>
                        
                        <span className="chat-time">
                          {formatDate(msg.sent_at)}
                        </span>
                      </div>
                    </div>
                  ))
                )}
                <div ref={scrollRef} />
              </div>

              {/* Chat Input (only for approved requests) */}
              {selected.status === 'Approved' && (
                <div className="chat-footer">
                  <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={
                      lang === "en" 
                        ? "Type your message..." 
                        : "መልእክትዎን ይፃፉ..."
                    }
                    disabled={loading}
                  />
                  <button 
                    className="send-btn"
                    onClick={handleSend}
                    disabled={loading || !text.trim()}
                  >
                    <Send size={18} />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="chat-empty-state">
              <div className="empty-icon">
                <MessageSquare size={60} strokeWidth={1} />
              </div>
              <h3>
                {lang === "en" 
                  ? "Select a conversation" 
                  : "ውይይት ይምረጡ"}
              </h3>
              <p>
                {lang === "en" 
                  ? "Choose a request from the sidebar to view messages" 
                  : "መልእክቶችን ለማየት ከግራ በኩል ጥያቄ ይምረጡ"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentRequests;