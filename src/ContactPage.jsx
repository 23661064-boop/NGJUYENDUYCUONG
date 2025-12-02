// src/ContactPage.jsx
import React, { useState } from "react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Kiểm tra dữ liệu
    if (!formData.name || !formData.email || !formData.message) {
      alert("⚠️ Vui lòng điền đầy đủ thông tin bắt buộc!");
      return;
    }

    // Lưu góp ý (có thể gửi lên server)
    console.log("Góp ý:", formData);

    // Hiển thị thông báo
    setSubmitted(true);

    // Reset form sau 3 giây
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h2 style={styles.title}>📝 Góp Ý & Liên Hệ</h2>
        <p style={styles.subtitle}>
          Chúng tôi luôn lắng nghe ý kiến của bạn để cải thiện dịch vụ
        </p>

        {submitted ? (
          <div style={styles.successMessage}>
            <h3>✅ Cảm ơn bạn đã gửi góp ý!</h3>
            <p>Chúng tôi sẽ phản hồi trong thời gian sớm nhất.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={styles.form}>
            {/* Họ tên */}
            <div style={styles.formGroup}>
              <label style={styles.label}>
                Họ và tên <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nguyễn Văn A"
                style={styles.input}
                required
              />
            </div>

            {/* Email & SĐT */}
            <div style={styles.row}>
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  Email <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="email@example.com"
                  style={styles.input}
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Số điện thoại</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="0901234567"
                  style={styles.input}
                />
              </div>
            </div>

            {/* Chủ đề */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Chủ đề</label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                style={styles.input}
              >
                <option value="">-- Chọn chủ đề --</option>
                <option value="product">Góp ý về sản phẩm</option>
                <option value="service">Góp ý về dịch vụ</option>
                <option value="delivery">Vấn đề giao hàng</option>
                <option value="payment">Thanh toán</option>
                <option value="other">Khác</option>
              </select>
            </div>

            {/* Nội dung */}
            <div style={styles.formGroup}>
              <label style={styles.label}>
                Nội dung góp ý <span style={{ color: "red" }}>*</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Nhập nội dung góp ý của bạn..."
                style={{
                  ...styles.input,
                  minHeight: "120px",
                  resize: "vertical",
                }}
                required
              />
            </div>

            {/* Nút gửi */}
            <button type="submit" style={styles.submitButton}>
              📨 Gửi góp ý
            </button>
          </form>
        )}
      </div>

      {/* THÔNG TIN LIÊN HỆ */}
      <div style={styles.infoCard}>
        <h3 style={styles.infoTitle}>📞 Thông tin liên hệ</h3>

        <div style={styles.infoItem}>
          <strong>📍 Địa chỉ:</strong>
          <p>129 Đường Bùi Thị Xuân, Quận 1, TP.HCM</p>
        </div>

        <div style={styles.infoItem}>
          <strong>📧 Email:</strong>
          <p>support@rubies.vn</p>
        </div>

        <div style={styles.infoItem}>
          <strong>☎️ Hotline:</strong>
          <p>1900 1234 (8:00 - 22:00)</p>
        </div>

        <div style={styles.infoItem}>
          <strong>⏰ Giờ làm việc:</strong>
          <p>Thứ 2 - Chủ Nhật: 8:00 - 22:00</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "30px 20px",
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "30px",
  },
  content: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },
  title: {
    fontSize: "28px",
    marginBottom: "10px",
    color: "#333",
  },
  subtitle: {
    color: "#666",
    marginBottom: "30px",
    fontSize: "15px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "8px",
    fontWeight: "500",
    color: "#333",
    fontSize: "14px",
  },
  input: {
    padding: "12px 15px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "14px",
    outline: "none",
    transition: "border 0.2s",
  },
  row: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "15px",
  },
  submitButton: {
    padding: "14px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background 0.3s",
    marginTop: "10px",
  },
  successMessage: {
    textAlign: "center",
    padding: "50px 20px",
    backgroundColor: "#d4edda",
    borderRadius: "10px",
    border: "2px solid #28a745",
  },
  infoCard: {
    backgroundColor: "#f8f9fa",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    height: "fit-content",
  },
  infoTitle: {
    fontSize: "20px",
    marginBottom: "20px",
    color: "#333",
    borderBottom: "2px solid #007bff",
    paddingBottom: "10px",
  },
  infoItem: {
    marginBottom: "20px",
    fontSize: "14px",
  },
};

export default ContactPage;
