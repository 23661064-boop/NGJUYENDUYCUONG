import "./assets/css/main.css";
import anhlogo from "./assets/images//logo.png";
import { Outlet, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "./CartContext";

const Layout = () => {
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const { cartItems } = useCart();

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

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Bạn có thể navigate đến trang search hoặc filter products
      console.log("Tìm kiếm:", searchQuery);
      alert(`Đang tìm kiếm: ${searchQuery}`);
      // navigate(`/search?q=${searchQuery}`);
    }
  };

  return (
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

            {/* ✅ PHẦN TÌM KIẾM MỚI */}
            <div id="divtimkiem" style={styles.searchContainer}>
              <form onSubmit={handleSearch} style={styles.searchForm}>
                <input
                  type="text"
                  placeholder="Tìm kiếm sản phẩm..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={styles.searchInput}
                />
                <button type="submit" style={styles.searchButton}>
                  🔍
                </button>
              </form>
            </div>
          </div>

          <div id="menubar" className="menubar">
            <div className="menubar-left">
              {/* ✅ MENU MỚI THEO YÊU CẦU */}
              <Link to="/" className="menu-item">
                Trang chủ
              </Link>
              <Link to="/products" className="menu-item">
                Sản phẩm
              </Link>
              <Link to="/contact" className="menu-item">
                Góp ý
              </Link>
            </div>

            <div
              className="menubar-right"
              style={{ display: "flex", alignItems: "center", gap: "15px" }}
            >
              {/* GIỎ HÀNG */}
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

// ✅ STYLES CHO PHẦN TÌM KIẾM
const styles = {
  searchContainer: {
    display: "flex",
    alignItems: "center",
  },

  searchForm: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },

  searchInput: {
    padding: "6px 12px",
    width: "180px",
    height: "18px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    outline: "none",
    fontSize: "13px",
    backgroundColor: "#fff",
    color: "#000",
  },

  searchButton: {
    height: "32px",
    minWidth: "40px",
    border: "1px solid #0d6efd",
    borderRadius: "6px",
    backgroundColor: "transparent",
    color: "#0d6efd",
    fontSize: "15px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "0.2s",
  },
};

export default Layout;
