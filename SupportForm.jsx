import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./Admin.css";
const StudentSupportForm = () => {
  const [formData, setFormData] = useState({ student_name: "", student_phone: "", college: "", department: "", category: "", reason: "", preferred_time: "" });
  const [assignedAdvisor, setAssignedAdvisor] = useState(null);

  const handleDeptChange = async (dept) => {
    setFormData({ ...formData, department: dept });
    try {
      const res = await axios.post("http://localhost/wibset/get_advisor_by_dept.php", { department: dept });
      if (res.data.status === "success") {
        setAssignedAdvisor(res.data.advisor);
      } else {
        setAssignedAdvisor(null);
      }
    } catch (err) { console.error(err); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalData = { ...formData, advisor_name: assignedAdvisor?.name || "N/A", advisor_phone: assignedAdvisor?.phone || "N/A" };
    try {
      const res = await axios.post("http://localhost/wibset/submit_advice_request.php", finalData);
      if (res.data.status === "success") Swal.fire("Success", "Request Sent!", "success");
    } catch (err) { Swal.fire("Error", "Failed to send", "error"); }
  };

  return (
    <div className="support-container">
      <form onSubmit={handleSubmit} className="support-card">
        <h3>Academic & Psychological Support</h3>
        <input type="text" placeholder="Full Name" onChange={e => setFormData({...formData, student_name: e.target.value})} required />
        <input type="text" placeholder="Phone Number" onChange={e => setFormData({...formData, student_phone: e.target.value})} required />
        
        <select onChange={e => setFormData({...formData, college: e.target.value})} required>
          <option value="">Select College</option>
          <option value="Technology">Technology</option>
          <option value="Natural Science">Natural Science</option>
        </select>

        <select onChange={e => handleDeptChange(e.target.value)} required>
          <option value="">Select Department</option>
          <option value="Computer Science">Computer Science</option>
          <option value="Information Technology">Information Technology</option>
        </select>

        {assignedAdvisor && (
          <div className="advisor-info-box animated fadeIn">
            <p>👨‍🏫 <strong>Advisor:</strong> {assignedAdvisor.name}</p>
            <p>📍 <strong>Office:</strong> {assignedAdvisor.office_no || "Not assigned"}</p>
            <p>📞 <strong>Phone:</strong> {assignedAdvisor.phone}</p>
          </div>
        )}

        <select onChange={e => setFormData({...formData, category: e.target.value})} required>
          <option value="">Type of Support</option>
          <option value="Academic">Academic (በትምህርት)</option>
          <option value="Psychological">Psychological (በስነ-ልቦና)</option>
          <option value="Social">Social (ማህበራዊ)</option>
        </select>

        <textarea placeholder="Reason for seeking advice..." onChange={e => setFormData({...formData, reason: e.target.value})} required></textarea>
        <input type="datetime-local" onChange={e => setFormData({...formData, preferred_time: e.target.value})} required />

        <button type="submit" className="submit-btn">BOOK APPOINTMENT</button>
      </form>
    </div>
  );
};
export default StudentSupportForm;