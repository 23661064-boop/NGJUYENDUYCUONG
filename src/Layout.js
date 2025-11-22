import "./assets/css/main.css";
import anhlogo from "./assets/images//Ten-truong-do-1000x159.png";
// 1. Thêm Link để chuyển trang mượt mà không load lại
import { Outlet, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
// 2. Import hook giỏ hàng để lấy số lượng
import { useCart } from "./CartContext";

const Layout = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // 3. Lấy cartItems từ Context
  const { cartItems } = useCart();

  // 4. Tính tổng số lượng sản phẩm (để hiển thị badge số nhỏ)
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    // Lưu ý: Trong React thực tế không nên dùng thẻ <html>, <body> ở đây
    // vì nó đã có sẵn trong index.html, nhưng tôi giữ nguyên theo code của bạn.
    <html>
      <header>
        <div id="divheader" className="header1">
          <div id="banner" className="banner1">
            <div id="topleft">
              <ul className="ul1">
                <li>
                  <a href="/#">TRANG CHỦ</a>
                </li>
                <li>
                  <a href="/trang1">EGOV</a>
                </li>
                <li>
                  <a href="/admin/products">QUẢN TRỊ</a>
                </li>
              </ul>
            </div>
            <div id="logo" className="logo1">
              <img src={anhlogo} width="548" alt="logo" />
            </div>
            <div id="divtimkiem" style={{ width: "300px" }}>
              Phần tìm kiếm
            </div>
          </div>

          <div id="menubar" className="menubar">
            <div className="menubar-left">
              <a href="/menu1" className="menu-item">
                Menu 1
              </a>
              <a href="/menu2" className="menu-item">
                Menu 2
              </a>
              <a href="/menu3" className="menu-item">
                Menu 3
              </a>
            </div>

            <div
              className="menubar-right"
              style={{ display: "flex", alignItems: "center", gap: "15px" }}
            >
              {/* ✅ PHẦN THÊM MỚI: GIỎ HÀNG */}
              <Link
                to="/cart"
                className="menu-item"
                style={{
                  fontWeight: "bold",
                  color: "#fff",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                🛒 Giỏ hàng
                {totalQuantity > 0 && (
                  <span
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      borderRadius: "50%",
                      padding: "2px 6px",
                      fontSize: "12px",
                      marginLeft: "5px",
                    }}
                  >
                    {totalQuantity}
                  </span>
                )}
              </Link>
              {/* ✅ KẾT THÚC PHẦN GIỎ HÀNG */}

              {user ? (
                <>
                  <span className="username" style={{ color: "yellow" }}>
                    👤 {user.username}
                  </span>
                  <button
                    className="logout-btn"
                    onClick={handleLogout}
                    style={{ cursor: "pointer", marginLeft: "10px" }}
                  >
                    Đăng xuất
                  </button>
                </>
              ) : (
                <a href="/login" className="login-link">
                  Đăng nhập
                </a>
              )}
            </div>
          </div>
        </div>
      </header>
      <body>
        <div id="container" className="container">
          <Outlet />
        </div>
      </body>
      <footer></footer>
    </html>
  );
};

export default Layout;
