// src/CheckoutPage.tsx
import React, { useState } from "react";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  district: string;
  ward: string;
  note: string;
  paymentMethod: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
}

export default function CheckoutPage() {
  const { cartItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  // State cho form thông tin khách hàng
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    district: "",
    ward: "",
    note: "",
    paymentMethod: "cod", // cod, bank, momo
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  // Xử lý thay đổi input
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Xóa lỗi khi user bắt đầu nhập
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Vui lòng nhập họ tên";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Vui lòng nhập email";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Vui lòng nhập số điện thoại";
    } else if (!/^[0-9]{10,11}$/.test(formData.phone)) {
      newErrors.phone = "Số điện thoại không hợp lệ";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Vui lòng nhập địa chỉ";
    }

    if (!formData.city.trim()) {
      newErrors.city = "Vui lòng chọn tỉnh/thành phố";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Xử lý đặt hàng
  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      alert("⚠️ Vui lòng điền đầy đủ thông tin!");
      return;
    }

    setIsProcessing(true);

    // Giả lập gửi đơn hàng (thực tế bạn sẽ gọi API)
    setTimeout(() => {
      const order = {
        id: Date.now(),
        customerInfo: formData,
        items: cartItems,
        total: totalPrice,
        orderDate: new Date().toISOString(),
        status: "pending",
      };

      // Lưu đơn hàng vào localStorage (hoặc gửi lên server)
      const existingOrders = JSON.parse(
        localStorage.getItem("MY_APP_ORDERS") || "[]"
      );
      existingOrders.push(order);
      localStorage.setItem("MY_APP_ORDERS", JSON.stringify(existingOrders));

      // Xóa giỏ hàng
      clearCart();

      setIsProcessing(false);

      // Hiển thị thông báo thành công
      alert(
        `✅ Đặt hàng thành công!\n\nMã đơn hàng: #${
          order.id
        }\nTổng tiền: $${totalPrice.toFixed(2)}\n\nCảm ơn bạn đã mua hàng!`
      );

      // Chuyển về trang chủ
      navigate("/");
    }, 2000);
  };

  // Nếu giỏ hàng trống
  if (cartItems.length === 0) {
    return (
      <div style={styles.emptyContainer}>
        <h3>🛒 Giỏ hàng trống!</h3>
        <p style={{ marginTop: 10, color: "#666" }}>
          Vui lòng thêm sản phẩm trước khi thanh toán
        </p>
        <button onClick={() => navigate("/")} style={styles.primaryButton}>
          Quay lại mua sắm
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🛒 Thanh Toán</h2>

      <div style={styles.mainContent}>
        {/* FORM THÔNG TIN */}
        <div style={styles.formSection}>
          <h3 style={styles.sectionTitle}>Thông tin nhận hàng</h3>

          <form onSubmit={handlePlaceOrder}>
            {/* Họ tên */}
            <div style={styles.formGroup}>
              <label style={styles.label}>
                Họ và tên <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Nguyễn Văn A"
                style={{
                  ...styles.input,
                  ...(errors.fullName ? styles.inputError : {}),
                }}
              />
              {errors.fullName && (
                <span style={styles.errorText}>{errors.fullName}</span>
              )}
            </div>

            {/* Email & Phone */}
            <div style={styles.row}>
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  Email <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="email@example.com"
                  style={{
                    ...styles.input,
                    ...(errors.email ? styles.inputError : {}),
                  }}
                />
                {errors.email && (
                  <span style={styles.errorText}>{errors.email}</span>
                )}
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>
                  Số điện thoại <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="0901234567"
                  style={{
                    ...styles.input,
                    ...(errors.phone ? styles.inputError : {}),
                  }}
                />
                {errors.phone && (
                  <span style={styles.errorText}>{errors.phone}</span>
                )}
              </div>
            </div>

            {/* Địa chỉ */}
            <div style={styles.formGroup}>
              <label style={styles.label}>
                Địa chỉ <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Số nhà, tên đường"
                style={{
                  ...styles.input,
                  ...(errors.address ? styles.inputError : {}),
                }}
              />
              {errors.address && (
                <span style={styles.errorText}>{errors.address}</span>
              )}
            </div>

            {/* Thành phố, Quận, Phường */}
            <div style={styles.row}>
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  Tỉnh/Thành phố <span style={{ color: "red" }}>*</span>
                </label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  style={{
                    ...styles.input,
                    ...(errors.city ? styles.inputError : {}),
                  }}
                >
                  <option value="">-- Chọn --</option>
                  <option value="hn">Hà Nội</option>
                  <option value="hcm">TP. Hồ Chí Minh</option>
                  <option value="dn">Đà Nẵng</option>
                  <option value="ct">Cần Thơ</option>
                </select>
                {errors.city && (
                  <span style={styles.errorText}>{errors.city}</span>
                )}
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Quận/Huyện</label>
                <input
                  type="text"
                  name="district"
                  value={formData.district}
                  onChange={handleInputChange}
                  placeholder="Quận 1"
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Phường/Xã</label>
                <input
                  type="text"
                  name="ward"
                  value={formData.ward}
                  onChange={handleInputChange}
                  placeholder="Phường Bến Nghé"
                  style={styles.input}
                />
              </div>
            </div>

            {/* Ghi chú */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Ghi chú đơn hàng (tùy chọn)</label>
              <textarea
                name="note"
                value={formData.note}
                onChange={handleInputChange}
                placeholder="Ghi chú về đơn hàng, ví dụ: thời gian giao hàng..."
                style={{ ...styles.input, minHeight: 80, resize: "vertical" }}
              />
            </div>

            {/* Phương thức thanh toán */}
            <div style={styles.formGroup}>
              <label style={styles.label}>
                Phương thức thanh toán <span style={{ color: "red" }}>*</span>
              </label>
              <div style={styles.paymentOptions}>
                <label style={styles.radioLabel}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === "cod"}
                    onChange={handleInputChange}
                  />
                  <span>💵 Thanh toán khi nhận hàng (COD)</span>
                </label>

                <label style={styles.radioLabel}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="bank"
                    checked={formData.paymentMethod === "bank"}
                    onChange={handleInputChange}
                  />
                  <span>🏦 Chuyển khoản ngân hàng</span>
                </label>

                <label style={styles.radioLabel}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="momo"
                    checked={formData.paymentMethod === "momo"}
                    onChange={handleInputChange}
                  />
                  <span>📱 Ví MoMo</span>
                </label>
              </div>
            </div>
          </form>
        </div>

        {/* ĐƠN HÀNG */}
        <div style={styles.orderSection}>
          <h3 style={styles.sectionTitle}>Đơn hàng của bạn</h3>

          <div style={styles.orderSummary}>
            {cartItems.map((item) => (
              <div key={item.product.id} style={styles.orderItem}>
                <img
                  src={item.product.image}
                  alt={item.product.title}
                  style={styles.itemImage}
                />
                <div style={styles.itemInfo}>
                  <p style={styles.itemName}>{item.product.title}</p>
                  <p style={styles.itemQuantity}>x{item.quantity}</p>
                </div>
                <p style={styles.itemPrice}>
                  ${(item.product.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div style={styles.divider} />

          {/* Tổng tiền */}
          <div style={styles.totalRow}>
            <span>Tạm tính:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>

          <div style={styles.totalRow}>
            <span>Phí vận chuyển:</span>
            <span style={{ color: "#28a745" }}>Miễn phí</span>
          </div>

          <div style={styles.divider} />

          <div style={{ ...styles.totalRow, ...styles.grandTotal }}>
            <span>Tổng cộng:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>

          {/* Nút đặt hàng */}
          <button
            onClick={handlePlaceOrder}
            disabled={isProcessing}
            style={{
              ...styles.checkoutButton,
              ...(isProcessing ? styles.checkoutButtonDisabled : {}),
            }}
          >
            {isProcessing ? "⏳ Đang xử lý..." : "🛒 Đặt hàng ngay"}
          </button>

          <button
            onClick={() => navigate("/cart")}
            style={styles.backButton}
            disabled={isProcessing}
          >
            ⬅ Quay lại giỏ hàng
          </button>
        </div>
      </div>
    </div>
  );
}

// CSS Styles
const styles = {
  container: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: 20,
  },
  title: {
    textAlign: "center" as const,
    marginBottom: 30,
    fontSize: 28,
    color: "#333",
  },
  mainContent: {
    display: "grid",
    gridTemplateColumns: "1fr 400px",
    gap: 30,
  },
  formSection: {
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 10,
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },
  orderSection: {
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 10,
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    height: "fit-content" as const,
    position: "sticky" as const,
    top: 20,
  },
  sectionTitle: {
    marginBottom: 20,
    fontSize: 20,
    color: "#333",
    borderBottom: "2px solid #007bff",
    paddingBottom: 10,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    display: "block",
    marginBottom: 8,
    fontWeight: 500,
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "10px 12px",
    border: "1px solid #ddd",
    borderRadius: 6,
    fontSize: 14,
    transition: "border 0.2s",
    boxSizing: "border-box" as const,
  },
  inputError: {
    borderColor: "#dc3545",
  },
  errorText: {
    color: "#dc3545",
    fontSize: 12,
    marginTop: 5,
    display: "block",
  },
  row: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: 15,
  },
  paymentOptions: {
    display: "flex",
    flexDirection: "column" as const,
    gap: 12,
  },
  radioLabel: {
    display: "flex",
    alignItems: "center",
    padding: 12,
    border: "1px solid #ddd",
    borderRadius: 6,
    cursor: "pointer",
    transition: "all 0.2s",
  },
  orderSummary: {
    marginBottom: 20,
  },
  orderItem: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: 15,
    paddingBottom: 15,
    borderBottom: "1px solid #eee",
  },
  itemImage: {
    width: 60,
    height: 60,
    objectFit: "contain" as const,
    borderRadius: 6,
    border: "1px solid #eee",
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    margin: 0,
    fontSize: 14,
    fontWeight: 500,
    color: "#333",
  },
  itemQuantity: {
    margin: "5px 0 0 0",
    fontSize: 13,
    color: "#666",
  },
  itemPrice: {
    fontWeight: "bold",
    color: "#333",
  },
  divider: {
    height: 1,
    backgroundColor: "#ddd",
    margin: "15px 0",
  },
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "8px 0",
    fontSize: 15,
    color: "#333",
  },
  grandTotal: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#d32f2f",
    marginTop: 10,
  },
  checkoutButton: {
    width: "100%",
    padding: 15,
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: 8,
    fontSize: 16,
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: 20,
    transition: "background 0.2s",
  },
  checkoutButtonDisabled: {
    backgroundColor: "#ccc",
    cursor: "not-allowed",
  },
  backButton: {
    width: "100%",
    padding: 12,
    backgroundColor: "white",
    color: "#333",
    border: "1px solid #ddd",
    borderRadius: 8,
    fontSize: 14,
    cursor: "pointer",
    marginTop: 10,
    transition: "background 0.2s",
  },
  emptyContainer: {
    textAlign: "center" as const,
    padding: 60,
  },
  primaryButton: {
    padding: "12px 24px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: 6,
    fontSize: 16,
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: 20,
  },
};
