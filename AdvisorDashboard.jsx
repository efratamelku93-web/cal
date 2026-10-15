import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Send, User, MessageSquare, Clock, CheckCircle, XCircle } from "lucide-react";
import "./advisor.css";

const AdvisorDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [selected, setSelected] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  
  const user = JSON.parse(localStorage.getItem("user"));
  const scrollRef = useRef();

  // Fetch assigned requests
  useEffect(() => {
    if (!user?.phone) return;
    
    const fetchRequests = () => {
      axios.post("http://localhost/wibset/get_advisor_requests.php", { 
        advisor_phone: user.phone 
      })
      .then(res => {
        if (Array.isArray(res.data)) {
          setRequests(res.data);
        }
      })
      .catch(err => {
        console.error("Error fetching requests:", err);
        Swal.fire("Error", "Failed to load requests", "error");
      });
    };

    fetchRequests();
    const interval = setInterval(fetchRequests, 5000);
    return () => clearInterval(interval);
  }, [user?.phone]);

  // Fetch chat messages when a student is selected
  useEffect(() => {
    if (!selected?.id) return;

    const fetchChat = () => {
      axios.get(`http://localhost/wibset/get_chat_history.php?request_id=${selected.id}`)
        .then(res => {
          if (Array.isArray(res.data)) {
            setMessages(res.data);
          }
        })
        .catch(err => console.error("Error fetching chat:", err));
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
  const sendMessage = async () => {
    if (!input.trim() || !selected?.id) return;
    
    setLoading(true);
    try {
      const res = await axios.post("http://localhost/wibset/send_chat_message.php", {
        request_id: selected.id,
        sender_role: "advisor",
        message_text: input
      });

      if (res.data.status === "success") {
        setInput("");
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
      Swal.fire("Error", "Failed to send message", "error");
    } finally {
      setLoading(false);
    }
  };

  // Handle Enter key
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch(status) {
      case 'Approved': return <CheckCircle size={16} color="#10b981" />;
      case 'Pending': return <Clock size={16} color="#f59e0b" />;
      case 'Declined': return <XCircle size={16} color="#ef4444" />;
      default: return null;
    }
  };

  return (
    <div className="advisor-dashboard-root">
      {/* Sidebar - Student List */}
      <div className="advisor-sidebar">
        <div className="sidebar-header">
          <h3>
            <MessageSquare size={20} className="inline mr-2" />
            My Students
          </h3>
          <p className="text-sm opacity-75">Active Consultations</p>
        </div>

        <div className="student-list">
          {requests.length === 0 ? (
            <div style={{ 
              padding: '30px 20px', 
              textAlign: 'center', 
              color: '#94a3b8' 
            }}>
              <User size={40} strokeWidth={1} />
              <p className="mt-3">No students assigned yet</p>
            </div>
          ) : (
            requests.map(req => (
              <div 
                key={req.id} 
                className={`request-item ${selected?.id === req.id ? 'active' : ''}`}
                onClick={() => setSelected(req)}
              >
                <div className="student-avatar">
                  {req.student_name?.charAt(0)?.toUpperCase() || 'S'}
                </div>
                <div className="student-meta">
                  <span className="name">{req.student_name || 'Unknown'}</span>
                  <span className="preview">
                    {req.expertise_category || 'General'}
                  </span>
                  <span className={`status-text ${req.status || 'Pending'}`}>
                    {getStatusIcon(req.status)}
                    <span style={{ marginLeft: '4px' }}>{req.status || 'Pending'}</span>
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="advisor-main-view">
        {selected ? (
          <div className="chat-container">
            {/* Chat Header */}
            <div className="chat-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div className="student-avatar">
                  {selected.student_name?.charAt(0)?.toUpperCase() || 'S'}
                </div>
                <div>
                  <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                    {selected.student_name || 'Student'}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                    {selected.expertise_category || 'General Consultation'}
                  </div>
                </div>
              </div>
              <span className="cat-tag">
                {selected.status || 'Pending'}
              </span>
            </div>

            {/* Chat Messages */}
            <div className="chat-messages chat-bg">
              {/* Original Request */}
              {selected.reason && (
                <div className="original-request">
                  <div style={{ 
                    fontSize: '0.75rem', 
                    color: '#666', 
                    marginBottom: '5px',
                    fontWeight: 'bold'
                  }}>
                    📋 Original Request:
                  </div>
                  <div style={{ fontSize: '0.9rem' }}>{selected.reason}</div>
                  {selected.preferred_time && (
                    <div style={{ 
                      fontSize: '0.75rem', 
                      color: '#666', 
                      marginTop: '8px' 
                    }}>
                      Preferred Time: {new Date(selected.preferred_time).toLocaleString()}
                    </div>
                  )}
                </div>
              )}

              {/* Message Bubbles */}
              {messages.length === 0 ? (
                <div style={{ 
                  textAlign: 'center', 
                  color: '#94a3b8', 
                  padding: '40px 20px' 
                }}>
                  <MessageSquare size={40} strokeWidth={1} />
                  <p className="mt-3">No messages yet. Start the conversation!</p>
                </div>
              ) : (
                messages.map(msg => (
                  <div 
                    key={msg.id} 
                    className={`msg ${msg.sender_role === 'advisor' ? 'my-msg' : 'student-msg'}`}
                  >
                    <div className="msg-label">
                      {msg.sender_role === 'advisor' ? 'You' : selected.student_name}
                      <span style={{ 
                        fontSize: '0.7rem', 
                        marginLeft: '10px',
                        color: '#94a3b8',
                        fontWeight: 'normal'
                      }}>
                        {formatDate(msg.sent_at)}
                      </span>
                    </div>
                    <div className="msg-bubble">
                      {msg.message_text}
                    </div>
                  </div>
                ))
              )}
              <div ref={scrollRef} />
            </div>

            {/* Reply Input */}
            <div className="reply-section">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your advice or response..."
                disabled={loading}
                rows={3}
              />
              <button 
                className="send-reply-btn"
                onClick={sendMessage}
                disabled={loading || !input.trim()}
              >
                {loading ? (
                  <>Sending...</>
                ) : (
                  <>
                    <Send size={18} className="inline mr-2" />
                    Send Reply
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="empty-state">
            <div className="icon-circle">
              <MessageSquare size={60} strokeWidth={1} />
            </div>
            <h3 style={{ color: '#334155', marginBottom: '10px' }}>
              Select a Student
            </h3>
            <p style={{ color: '#94a3b8' }}>
              Choose a student from the sidebar to view your conversation
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvisorDashboard;