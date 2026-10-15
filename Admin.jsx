import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./admin.css";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("requests");
  const [requests, setRequests] = useState([]);
  const [selectedReq, setSelectedReq] = useState(null);
  const [showOtherInput, setShowOtherInput] = useState(false);
  
  const [advisorData, setAdvisorData] = useState({
    id: "", name: "", phone: "", email: "", password: "", office_no: "", expertise: ""
  });

  const [reportFilters, setReportFilters] = useState({ category: "", date: "" });

  const expertiseCategories = [
    "Guidance and Counseling", 
    "Freshman Coordination", 
    "Life Skills Training",
    "Financial Management", 
    "SOCIAL LIFE", 
    "MENTAL HEALTH BASIC",
    "Goal Setting & Vision", 
    "Academic Support", 
    "technology support"
  ];

  useEffect(() => {
    fetchRequests();
    const interval = setInterval(fetchRequests, 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await axios.get("http://localhost/wibset/admin_get_requests.php");
      if (Array.isArray(res.data)) {
        setRequests(res.data);
      }
    } catch (err) { 
      console.error("Error fetching requests:", err); 
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      const res = await axios.post("http://localhost/wibset/update_request_status.php", { 
        id, 
        status 
      });
      if (res.data?.status === "success") {
        Swal.fire("Success", `Request ${status}!`, "success");
        fetchRequests();
        setSelectedReq(null);
      }
    } catch (err) { 
      Swal.fire("Error", "Failed to update", "error"); 
    }
  };

  const handleCreateAdvisor = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost/wibset/admin_create_advisor.php", advisorData);
      if (res.data?.status === "success") {
        Swal.fire("Success", "Advisor Created!", "success");
        setAdvisorData({ 
          id: "", name: "", phone: "", email: "", 
          password: "", office_no: "", expertise: "" 
        });
      }
    } catch (err) { 
      Swal.fire("Error", "Failed to register", "error"); 
    }
  };
 
 
  return (
    <div className="admin-container">
      {/* Sidebar */}
      <div className="admin-sidebar">
        <h2 className="sidebar-logo">ADMIN PANEL</h2>
        <div className="sidebar-nav">
          <button 
            className={`nav-item ${activeTab === 'requests' ? 'active' : ''}`} 
            onClick={() => setActiveTab("requests")}
          >
            📩 View Requests ({requests.filter(r => r.status === 'Pending').length})
          </button>
          <button 
            className={`nav-item ${activeTab === 'add_advisor' ? 'active' : ''}`} 
            onClick={() => setActiveTab("add_advisor")}
          >
            👤 Add Advisor
          </button>
          <button 
            className={`nav-item ${activeTab === 'reports' ? 'active' : ''}`} 
            onClick={() => setActiveTab("reports")}
          >
            📊 View Reports
          </button>
        </div>
      </div>

      <div className="admin-main">
        {/* VIEW REQUESTS TAB */}
        {activeTab === "requests" && (
          <div className="requests-view animated fadeIn">
            <h2 className="tab-title">
              {selectedReq ? 'Request Details' : 'Pending Student Requests'}
            </h2>
            
            {selectedReq ? (
              <div className="request-details-card">
                <div className="details-header">
                  <h3>{selectedReq.student_name}</h3>
                  <span className="badge">{selectedReq.expertise_category}</span>
                </div>
                <div className="details-body">
                  <p><strong>Phone:</strong> {selectedReq.student_phone}</p>
                  <p><strong>Category:</strong> {selectedReq.expertise_category}</p>
                  <p><strong>Reason:</strong></p>
                  <p style={{ background: '#f8fafc', padding: '15px', borderRadius: '8px' }}>
                    {selectedReq.reason}
                  </p>
                  {selectedReq.preferred_time && (
                    <p><strong>Preferred Time:</strong> {selectedReq.preferred_time}</p>
                  )}
                  {selectedReq.advisor_name && (
                    <>
                      <hr />
                      <p><strong>Assigned Advisor:</strong> {selectedReq.advisor_name}</p>
                      <p><strong>Advisor Phone:</strong> {selectedReq.advisor_phone}</p>
                    </>
                  )}
                  <p><strong>Status:</strong> 
                    <span style={{ 
                      color: selectedReq.status === 'Pending' ? '#f59e0b' : 
                             selectedReq.status === 'Approved' ? '#10b981' : '#ef4444',
                      marginLeft: '10px',
                      fontWeight: 'bold'
                    }}>
                      {selectedReq.status}
                    </span>
                  </p>
                </div>
                <div className="details-actions">
                  <button 
                    className="back-btn" 
                    onClick={() => setSelectedReq(null)}
                    style={{
                      background: '#64748b',
                      color: 'white',
                      border: 'none',
                      padding: '12px 25px',
                      borderRadius: '10px',
                      cursor: 'pointer'
                    }}
                  >
                    ← Back to List
                  </button>
                  
                  {selectedReq.status === 'Pending' && (
                    <>
                      <button 
                        className="approve-btn" 
                        onClick={() => handleStatusUpdate(selectedReq.id, 'Approved')}
                      >
                        ✓ Approve
                      </button>
                      <button 
                        className="reject-btn" 
                        onClick={() => handleStatusUpdate(selectedReq.id, 'Declined')}
                      >
                        ✕ Decline
                      </button>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="request-grid">
                {requests.filter(r => r.status === 'Pending').length === 0 ? (
                  <div className="placeholder-pill">
                    No pending requests
                  </div>
                ) : (
                  requests
                    .filter(r => r.status === 'Pending')
                    .map(req => (
                      <div 
                        key={req.id} 
                        className="req-card" 
                        onClick={() => setSelectedReq(req)}
                      >
                        <div className="req-header">
                          <div>
                            <h4 style={{ margin: 0 }}>{req.student_name}</h4>
                            <span style={{ fontSize: '0.8rem', color: '#666' }}>
                              {req.student_phone}
                            </span>
                          </div>
                          <span className="req-cat">{req.expertise_category}</span>
                        </div>
                        <p className="req-preview">
                          {req.reason?.substring(0, 100)}
                          {req.reason?.length > 100 ? '...' : ''}
                        </p>
                        <div className="req-actions">
                          <button 
                            className="approve-btn" 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStatusUpdate(req.id, 'Approved');
                            }}
                          >
                            Approve
                          </button>
                          <button 
                            className="decline-btn" 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStatusUpdate(req.id, 'Declined');
                            }}
                          >
                            Decline
                          </button>
                        </div>
                      </div>
                    ))
                )}
              </div>
            )}
          </div>
        )}

        {/* ADD ADVISOR TAB */}
        {activeTab === "add_advisor" && (
          <div className="registration-card animated fadeIn">
            <div className="card-header">
              <h3>Register New Advisor</h3>
            </div>
            <form onSubmit={handleCreateAdvisor} className="admin-reg-form">
              <div className="input-row">
                <div className="form-group">
                  <label>Employee ID</label>
                  <input 
                    type="text" 
                    placeholder="e.g., MAU1609053" 
                    value={advisorData.id} 
                    onChange={e => setAdvisorData({...advisorData, id: e.target.value})} 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Full Name</label>
                  <input 
                    type="text" 
                    placeholder="Enter full name" 
                    value={advisorData.name} 
                    onChange={e => setAdvisorData({...advisorData, name: e.target.value})} 
                    required 
                  />
                </div>
              </div>
              
              <div className="input-row">
                <div className="form-group">
                  <label>Phone Number</label>
                  <input 
                    type="tel" 
                    placeholder="0912345678" 
                    value={advisorData.phone} 
                    onChange={e => setAdvisorData({...advisorData, phone: e.target.value})} 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input 
                    type="email" 
                    placeholder="advisor@mau.edu.et" 
                    value={advisorData.email} 
                    onChange={e => setAdvisorData({...advisorData, email: e.target.value})} 
                    required 
                  />
                </div>
              </div>

              <div className="input-row">
                <div className="form-group">
                  <label>Office No</label>
                  <input 
                    type="text" 
                    placeholder="Block 1, Room 5" 
                    value={advisorData.office_no} 
                    onChange={e => setAdvisorData({...advisorData, office_no: e.target.value})} 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input 
                    type="password" 
                    placeholder="Minimum 6 characters" 
                    value={advisorData.password} 
                    onChange={e => setAdvisorData({...advisorData, password: e.target.value})} 
                    required 
                  />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '20px' }}>
                <label>Select Expertise</label>
                <select 
                  value={showOtherInput ? "Other" : advisorData.expertise}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === "Other") {
                      setShowOtherInput(true);
                      setAdvisorData({...advisorData, expertise: ""});
                    } else {
                      setShowOtherInput(false);
                      setAdvisorData({...advisorData, expertise: val});
                    }
                  }} 
                  required
                >
                  <option value="">Select Expertise</option>
                  {expertiseCategories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                  <option value="Other">Other (Specify)</option>
                </select>
              </div>

              {showOtherInput && (
                <div className="form-group animated fadeIn" style={{ marginBottom: '20px' }}>
                  <label>Specify Expertise</label>
                  <input 
                    type="text" 
                    placeholder="Type custom expertise" 
                    value={advisorData.expertise}
                    onChange={e => setAdvisorData({...advisorData, expertise: e.target.value})} 
                    required 
                  />
                </div>
              )}

              <button type="submit" className="submit-main-btn">
                CREATE ADVISOR ACCOUNT
              </button>
            </form>
          </div>
        )}

        {/* VIEW REPORTS TAB */}
        {activeTab === "reports" && (
          <div className="reports-view animated fadeIn">
            <div className="report-header">
              <h2>System Reports</h2>
              <button className="print-btn" onClick={() => window.print()}>
                Print Report
              </button>
            </div>
            
            <div className="report-filters">
              <input 
                type="date" 
                onChange={(e) => setReportFilters({...reportFilters, date: e.target.value})} 
              />
              <select 
                onChange={(e) => setReportFilters({...reportFilters, category: e.target.value})}
              >
                <option value="">All Categories</option>
                {expertiseCategories.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <table className="modern-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Student</th>
                  <th>Category</th>
                  <th>Advisor</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {requests.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', padding: '40px' }}>
                      No data available
                    </td>
                  </tr>
                ) : (
                  requests.map(req => (
                    <tr key={req.id}>
                      <td>{req.created_at?.split(' ')[0] || 'N/A'}</td>
                      <td>{req.student_name || 'Unknown'}</td>
                      <td>{req.expertise_category || 'N/A'}</td>
                      <td>{req.advisor_name || 'Not Assigned'}</td>
                      <td>
                        <span className={`status-pill ${req.status || 'Pending'}`}>
                          {req.status || 'Pending'}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;