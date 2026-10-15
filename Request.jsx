import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { User, Phone, MapPin, UserCheck, Calendar, MessageSquare, Clock, AlertCircle, Send } from "lucide-react"; 
import "./Request.css";

const StudentSupportForm = ({ onSuccess, lang }) => {
  const [formData, setFormData] = useState({ 
    student_name: "", 
    student_phone: "", 
    category: "", 
    reason: "", 
    preferred_time: "" 
  });
  const [categories, setCategories] = useState([]); 
  const [advisors, setAdvisors] = useState([]);
  const [selectedAdvisor, setSelectedAdvisor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setFormData(prev => ({ 
        ...prev, 
        student_name: user.name || "", 
        student_phone: user.phone || "" 
      }));
    }

    // Fetch categories from database
    axios.get("http://localhost/wibset/get_all_expertises.php")
      .then(res => {
        if (Array.isArray(res.data)) {
          setCategories(res.data);
        }
      })
      .catch(err => {
        console.error("Error fetching categories:", err);
        Swal.fire("Error", "Failed to load categories", "error");
      });
  }, []);

  const handleCategoryChange = async (cat) => {
    setFormData({ ...formData, category: cat });
    setSelectedAdvisor(null);
    setAdvisors([]);
    
    if (!cat) return;
    
    try {
      const res = await axios.post("http://localhost/wibset/get_advisors_by_expertise.php", { 
        expertise: cat 
      });
      
      if (Array.isArray(res.data)) {
        setAdvisors(res.data);
        if (res.data.length === 0) {
          Swal.fire({
            icon: 'info',
            title: lang === "en" ? 'No Advisors Available' : 'አማካሪ አልተገኘም',
            text: lang === "en" 
              ? 'No advisors found for this category. Please try another.' 
              : 'ለዚህ ምድብ አማካሪ አልተገኘም። እባክዎ ሌላ ይሞክሩ።',
          });
        }
      }
    } catch (err) { 
      console.error("Error fetching advisors:", err);
      Swal.fire("Error", "Failed to load advisors", "error");
    }
  };

  // Validate form before submission
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.category) {
      newErrors.category = lang === "en" ? "Please select a category" : "እባክዎ ምድብ ይምረጡ";
    }
    
    if (!selectedAdvisor) {
      newErrors.advisor = lang === "en" ? "Please select an advisor" : "እባክዎ አማካሪ ይምረጡ";
    }
    
    if (!formData.reason || formData.reason.trim().length < 10) {
      newErrors.reason = lang === "en" 
        ? "Please write at least 10 characters" 
        : "እባክዎ ቢያንስ 10 ቁምፊዎች ይጻፉ";
    }
    
    if (!formData.preferred_time) {
      newErrors.time = lang === "en" 
        ? "Please select a preferred time" 
        : "እባክዎ የሚመችዎትን ሰዓት ይምረጡ";
    } else {
      // Check if selected time is in the future
      const selectedTime = new Date(formData.preferred_time);
      const now = new Date();
      if (selectedTime <= now) {
        newErrors.time = lang === "en" 
          ? "Please select a future date and time" 
          : "እባክዎ የወደፊት ቀን እና ሰዓት ይምረጡ";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Get minimum datetime (current time)
  const getMinDateTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate first
    if (!validateForm()) {
      const firstError = Object.values(errors)[0];
      Swal.fire({
        icon: 'warning',
        title: lang === "en" ? 'Validation Error' : 'የማረጋገጥ ስህተት',
        text: firstError,
      });
      return;
    }

    // Build final data
    const finalData = {
      student_name: formData.student_name,
      student_phone: formData.student_phone,
      category: formData.category,
      reason: formData.reason,
      preferred_time: formData.preferred_time,
      advisor_name: selectedAdvisor.name,
      advisor_phone: selectedAdvisor.phone,
      advisor_email: selectedAdvisor.email || "N/A"
    };

    // Show confirmation dialog
    const confirmResult = await Swal.fire({
      title: lang === "en" ? 'Confirm Your Request' : 'ጥያቄዎን ያረጋግጡ',
      html: `
        <div style="text-align: left; line-height: 1.8;">
          <p><strong>${lang === "en" ? 'Category' : 'ምድብ'}:</strong> ${finalData.category}</p>
          <p><strong>${lang === "en" ? 'Advisor' : 'አማካሪ'}:</strong> ${finalData.advisor_name}</p>
          <p><strong>${lang === "en" ? 'Office' : 'ቢሮ'}:</strong> ${selectedAdvisor.office_no || 'N/A'}</p>
          <p><strong>${lang === "en" ? 'Preferred Time' : 'የተመረጠ ሰዓት'}:</strong> ${new Date(finalData.preferred_time).toLocaleString()}</p>
          <hr style="margin: 10px 0;">
          <p><strong>${lang === "en" ? 'Reason' : 'ምክንያት'}:</strong><br>${finalData.reason}</p>
        </div>
      `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#321a81',
      cancelButtonColor: '#64748b',
      confirmButtonText: lang === "en" ? 'Yes, Submit' : 'አዎ፣ ላክ',
      cancelButtonText: lang === "en" ? 'Cancel' : 'ይቅር'
    });

    if (!confirmResult.isConfirmed) {
      return;
    }

    // Submit request
    setLoading(true);
    try {
      const res = await axios.post("http://localhost/wibset/submit_advice_request.php", finalData);
      
      if (res.data.status === "success") {
        await Swal.fire({
          icon: 'success',
          title: lang === "en" ? 'Success!' : 'ተሳክቷል!',
          text: lang === "en" 
            ? 'Your request has been sent! You can chat with the advisor after approval.' 
            : 'ጥያቄዎ ተልኳል! ከተፈቀደ በኋላ ከአማካሪው ጋር መወያየት ይችላሉ።',
          confirmButtonColor: '#321a81',
        });
        
        // Reset form
        setFormData(prev => ({
          ...prev,
          category: "",
          reason: "",
          preferred_time: ""
        }));
        setSelectedAdvisor(null);
        setAdvisors([]);
        setErrors({});
        
        // Navigate to requests tab
        if (onSuccess) onSuccess();
      } else {
        Swal.fire({
          icon: 'error',
          title: lang === "en" ? 'Error' : 'ስህተት',
          text: res.data.message || (lang === "en" ? 'Failed to submit request' : 'ጥያቄ መላክ አልተሳካም'),
        });
      }
    } catch (err) {
      console.error("Submit error:", err);
      Swal.fire({
        icon: 'error',
        title: lang === "en" ? 'Server Error' : 'የሰርቨር ስህተት',
        text: lang === "en" 
          ? 'Could not connect to server. Please try again.' 
          : 'ከሰርቨር ጋር መገናኘት አልተቻለም። እባክዎ እንደገና ይሞክሩ።',
      });
    } finally { 
      setLoading(false); 
    }
  };

  return (
    <div className="support-container">
      <form onSubmit={handleSubmit} className="support-card animated fadeIn">
        <div className="card-header"> 
          <MessageSquare size={24} /> 
          <h3>{lang === "en" ? 'Book Advice Appointment' : 'የምክር ቀጠሮ ያስይዙ'}</h3> 
        </div>
        
        {/* Student Info (Read-only) */}
        <div className="form-grid">
          <div className={`input-field disabled-field ${errors.name ? 'error' : ''}`}> 
            <User size={18} /> 
            <input 
              type="text" 
              value={formData.student_name} 
              readOnly 
              placeholder={lang === "en" ? "Student Name" : "የተማሪ ስም"}
            /> 
          </div>
          <div className={`input-field disabled-field ${errors.phone ? 'error' : ''}`}> 
            <Phone size={18} /> 
            <input 
              type="tel" 
              value={formData.student_phone} 
              readOnly 
              placeholder={lang === "en" ? "Phone Number" : "ስልክ ቁጥር"}
            /> 
          </div>
        </div>

        {/* Category Selection */}
        <label className="field-label">
          {lang === "en" ? 'What kind of support do you need?' : 'ምን አይነት ድጋፍ ይፈልጋሉ?'}
          <span className="required">*</span>
        </label>
        <select 
          value={formData.category}
          onChange={e => handleCategoryChange(e.target.value)} 
          required
          className={errors.category ? 'error-border' : ''}
        >
          <option value="">
            {lang === "en" ? 'Select Support Category...' : 'የድጋፍ ምድብ ይምረጡ...'}
          </option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>{cat}</option>
          ))}
        </select>
        {errors.category && <span className="error-message">{errors.category}</span>}

        {/* Advisor Selection */}
        {advisors.length > 0 && (
          <>
            <label className="field-label">
              {lang === "en" ? 'Available Advisors' : 'የሚገኙ አማካሪዎች'}
              <span className="required">*</span>
            </label>
            <select 
              onChange={e => {
                const advisor = advisors.find(a => String(a.id) === e.target.value);
                setSelectedAdvisor(advisor);
              }} 
              required
              className={errors.advisor ? 'error-border' : ''}
            >
              <option value="">
                {lang === "en" ? 'Choose an Advisor...' : 'አማካሪ ይምረጡ...'}
              </option>
              {advisors.map(adv => (
                <option key={adv.id} value={adv.id}>
                  {adv.name} - {adv.office_no || 'Office N/A'}
                </option>
              ))}
            </select>
            {errors.advisor && <span className="error-message">{errors.advisor}</span>}
          </>
        )}

        {/* Selected Advisor Info */}
        {selectedAdvisor && (
          <div className="advisor-info-highlight animated slideDown">
            <div className="info-row"> 
              <UserCheck size={20} color="#321a81" /> 
              <span>
                <strong>{lang === "en" ? 'Advisor' : 'አማካሪ'}:</strong> {selectedAdvisor.name}
              </span> 
            </div>
            <div className="info-row"> 
              <MapPin size={20} color="#321a81" /> 
              <span>
                <strong>{lang === "en" ? 'Office' : 'ቢሮ'}:</strong> {selectedAdvisor.office_no || 'N/A'}
              </span> 
            </div>
            {selectedAdvisor.email && (
              <div className="info-row"> 
                <MessageSquare size={20} color="#321a81" /> 
                <span>
                  <strong>Email:</strong> {selectedAdvisor.email}
                </span> 
              </div>
            )}
          </div>
        )}

        {/* Reason Textarea */}
        <label className="field-label">
          {lang === "en" ? 'Reason for seeking advice' : 'ምክር ለመጠየቅ ምክንያትዎ'}
          <span className="required">*</span>
        </label>
        <textarea 
          placeholder={lang === "en" ? 'Write your reason in detail...' : 'ምክንያትዎን በዝርዝር ይጻፉ...'}
          value={formData.reason}
          onChange={e => setFormData({...formData, reason: e.target.value})} 
          required
          className={errors.reason ? 'error-border' : ''}
          rows={4}
        ></textarea>
        {errors.reason && <span className="error-message">{errors.reason}</span>}
        <div className="char-count">
          {formData.reason.length} {lang === "en" ? 'characters' : 'ቁምፊዎች'}
          {formData.reason.length < 10 && (
            <span className="min-char-warning">
              {' '}({lang === "en" ? 'minimum 10' : 'ቢያንስ 10'})
            </span>
          )}
        </div>

        {/* Preferred Time - NOW REQUIRED */}
        <label className="field-label">
          <Clock size={16} className="inline-icon" />
          {lang === "en" ? 'Preferred Appointment Time' : 'የሚመችዎት የቀጠሮ ሰዓት'}
          <span className="required">*</span>
        </label>
        <div className="date-field">
          <Calendar size={20} color="#64748b" className="field-icon" />
          <input 
            type="datetime-local" 
            value={formData.preferred_time}
            min={getMinDateTime()}
            onChange={e => setFormData({...formData, preferred_time: e.target.value})} 
            required
            className={errors.time ? 'error-border' : ''}
          />
        </div>
        {errors.time && <span className="error-message">{errors.time}</span>}
        
        {/* Time Notice */}
        <div className="time-notice">
          <AlertCircle size={16} />
          <span>
            {lang === "en" 
              ? 'Please select a date and time that works for you. The advisor will confirm availability.' 
              : 'እባክዎ ለእርስዎ የሚመች ቀን እና ሰዓት ይምረጡ። አማካሪው መገኘቱን ያረጋግጣል።'}
          </span>
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          className="submit-btn" 
          disabled={loading || !selectedAdvisor}
        >
          {loading ? (
            <>
              <span className="spinner"></span>
              {lang === "en" ? 'Processing...' : 'በማስተናገድ ላይ...'}
            </>
          ) : (
            <>
              <Send size={18} className="inline-icon" />
              {lang === "en" ? 'SEND REQUEST' : 'ጥያቄ ላክ'}
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default StudentSupportForm;