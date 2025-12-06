// src/Layout.js - Enhanced Fashion Shop Layout
import "./assets/css/main.css";
import anhlogo from "./assets/images//logo.png";
import { Outlet, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "./CartContext";

const Layout = () => {
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [showPromo, setShowPromo] = useState(true);
  const navigate = useNavigate();

  const { cartItems } = useCart();

  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Xử lý scroll effect cho header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      console.log("Tìm kiếm:", searchQuery);
      navigate(`/products?search=${searchQuery}`);
      // Hoặc có thể filter products ngay tại đây
    }
  };

  return (
    <div style={styles.wrapper}>
      {/* ==================== PROMO BAR ==================== */}
      {showPromo && (
        <div style={styles.promoBar}>
          <div style={styles.promoContent}>
            <span style={styles.promoText}>
              🎉 MIỄN PHÍ VẬN CHUYỂN cho đơn hàng từ 500K | Giảm 20% cho thành
              viên mới
            </span>
            <button
              onClick={() => setShowPromo(false)}
              style={styles.promoClose}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* ==================== HEADER ==================== */}
      <header
        style={{
          ...styles.header,
          ...(isScrolled ? styles.headerScrolled : {}),
        }}
      >
        <div style={styles.headerTop}>
          <div style={styles.container}>
            {/* Top Links */}
            <div style={styles.topBar}>
              <div style={styles.topLeft}>
                <a href="/stores" style={styles.topLink}>
                  📍 Tìm cửa hàng
                </a>
                <a href="/track-order" style={styles.topLink}>
                  📦 Tra cứu đơn hàng
                </a>
                <a href="/contact" style={styles.topLink}>
                  💬 Hỗ trợ 24/7
                </a>
              </div>
              <div style={styles.topRight}>
                <a href="tel:1900xxxx" style={styles.topLink}>
                  ☎️ Hotline: 1900.xxxx
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div style={styles.mainHeader}>
          <div style={styles.container}>
            <div style={styles.headerContent}>
              {/* Logo */}
              <Link to="/" style={styles.logoLink}>
                <img src={anhlogo} style={styles.logo} alt="UNIQLO" />
              </Link>

              {/* Search Bar - Enhanced */}
              <form onSubmit={handleSearch} style={styles.searchForm}>
                <div style={styles.searchWrapper}>
                  <span style={styles.searchIcon}>🔍</span>
                  <input
                    type="text"
                    placeholder="Tìm kiếm sản phẩm, thương hiệu..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={styles.searchInput}
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      style={styles.searchClear}
                    >
                      ✕
                    </button>
                  )}
                </div>
                <button type="submit" style={styles.searchButton}>
                  Tìm kiếm
                </button>
              </form>

              {/* Header Actions */}
              <div style={styles.headerActions}>
                {/* User Account */}
                {user ? (
                  <div style={styles.userMenu}>
                    <div style={styles.actionItem}>
                      <span style={styles.actionIcon}>👤</span>
                      <div style={styles.actionText}>
                        <span style={styles.actionLabel}>Xin chào</span>
                        <span style={styles.actionValue}>{user.username}</span>
                      </div>
                    </div>
                    <button onClick={handleLogout} style={styles.logoutBtn}>
                      Đăng xuất
                    </button>
                  </div>
                ) : (
                  <Link to="/login" style={styles.actionItem}>
                    <span style={styles.actionIcon}>👤</span>
                    <div style={styles.actionText}>
                      <span style={styles.actionLabel}>Đăng nhập</span>
                      <span style={styles.actionValue}>Tài khoản</span>
                    </div>
                  </Link>
                )}

                {/* Wishlist */}
                <Link to="/wishlist" style={styles.actionItem}>
                  <span style={styles.actionIcon}>❤️</span>
                  <div style={styles.actionText}>
                    <span style={styles.actionLabel}>Yêu thích</span>
                    <span style={styles.actionValue}>0</span>
                  </div>
                </Link>

                {/* Cart */}
                <Link to="/cart" style={styles.cartItem}>
                  <div style={styles.cartIcon}>
                    <span style={styles.actionIcon}>🛒</span>
                    {totalQuantity > 0 && (
                      <span style={styles.cartBadge}>{totalQuantity}</span>
                    )}
                  </div>
                  <div style={styles.actionText}>
                    <span style={styles.actionLabel}>Giỏ hàng</span>
                    <span style={styles.actionValue}>
                      {totalQuantity} sản phẩm
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav style={styles.nav}>
          <div style={styles.container}>
            <ul style={styles.navMenu}>
              <li style={styles.navItem}>
                <Link to="/" style={styles.navLink}>
                  <span style={styles.navIcon}>🏠</span>
                  TRANG CHỦ
                </Link>
              </li>
              <li style={styles.navItem}>
                <Link to="/products" style={styles.navLink}>
                  <span style={styles.navIcon}>👕</span>
                  SẢN PHẨM
                  <span style={styles.navArrow}>▼</span>
                </Link>
                {/* Dropdown (có thể thêm sau) */}
              </li>
              <li style={styles.navItem}>
                <Link to="/products?category=nam" style={styles.navLink}>
                  <span style={styles.navIcon}>👔</span>
                  NAM
                </Link>
              </li>
              <li style={styles.navItem}>
                <Link to="/products?category=nu" style={styles.navLink}>
                  <span style={styles.navIcon}>👗</span>
                  NỮ
                </Link>
              </li>
              <li style={styles.navItem}>
                <Link to="/products?category=tre-em" style={styles.navLink}>
                  <span style={styles.navIcon}>🧒</span>
                  TRẺ EM
                </Link>
              </li>
              <li style={styles.navItem}>
                <Link to="/products?sale=true" style={styles.navLink}>
                  <span style={styles.navIcon}>🔥</span>
                  <span style={styles.saleText}>SALE 50%</span>
                </Link>
              </li>
              <li style={styles.navItem}>
                <Link to="/contact" style={styles.navLink}>
                  <span style={styles.navIcon}>📝</span>
                  LIÊN HỆ
                </Link>
              </li>
              {user?.username === "admin" && (
                <li style={styles.navItem}>
                  <Link to="/admin/products" style={styles.navLinkAdmin}>
                    <span style={styles.navIcon}>⚙️</span>
                    QUẢN TRỊ
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </header>

      {/* ==================== MAIN CONTENT ==================== */}
      <main style={styles.main}>
        <Outlet />
      </main>

      {/* ==================== FOOTER ==================== */}
      <footer style={styles.footer}>
        {/* Features Section */}
        <div style={styles.featuresSection}>
          <div style={styles.container}>
            <div style={styles.featuresGrid}>
              <div style={styles.featureItem}>
                <div style={styles.featureIcon}>🚚</div>
                <div style={styles.featureContent}>
                  <h4 style={styles.featureTitle}>MIỄN PHÍ VẬN CHUYỂN</h4>
                  <p style={styles.featureDesc}>Đơn hàng từ 500.000đ</p>
                </div>
              </div>
              <div style={styles.featureItem}>
                <div style={styles.featureIcon}>🔄</div>
                <div style={styles.featureContent}>
                  <h4 style={styles.featureTitle}>ĐỔI TRẢ DỄ DÀNG</h4>
                  <p style={styles.featureDesc}>Trong vòng 30 ngày</p>
                </div>
              </div>
              <div style={styles.featureItem}>
                <div style={styles.featureIcon}>💳</div>
                <div style={styles.featureContent}>
                  <h4 style={styles.featureTitle}>THANH TOÁN AN TOÀN</h4>
                  <p style={styles.featureDesc}>100% bảo mật</p>
                </div>
              </div>
              <div style={styles.featureItem}>
                <div style={styles.featureIcon}>🎁</div>
                <div style={styles.featureContent}>
                  <h4 style={styles.featureTitle}>ƯU ĐÃI ĐỘC QUYỀN</h4>
                  <p style={styles.featureDesc}>Dành cho thành viên</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer */}
        <div style={styles.footerMain}>
          <div style={styles.container}>
            <div style={styles.footerGrid}>
              {/* Column 1 */}
              <div style={styles.footerColumn}>
                <h3 style={styles.footerTitle}>VỀ UNIQLO</h3>
                <ul style={styles.footerList}>
                  <li>
                    <Link to="/about" style={styles.footerLink}>
                      Giới thiệu
                    </Link>
                  </li>
                  <li>
                    <Link to="/stores" style={styles.footerLink}>
                      Hệ thống cửa hàng
                    </Link>
                  </li>
                  <li>
                    <Link to="/careers" style={styles.footerLink}>
                      Tuyển dụng
                    </Link>
                  </li>
                  <li>
                    <Link to="/news" style={styles.footerLink}>
                      Tin tức
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Column 2 */}
              <div style={styles.footerColumn}>
                <h3 style={styles.footerTitle}>HỖ TRỢ KHÁCH HÀNG</h3>
                <ul style={styles.footerList}>
                  <li>
                    <Link to="/faq" style={styles.footerLink}>
                      Câu hỏi thường gặp
                    </Link>
                  </li>
                  <li>
                    <Link to="/shipping" style={styles.footerLink}>
                      Chính sách vận chuyển
                    </Link>
                  </li>
                  <li>
                    <Link to="/return" style={styles.footerLink}>
                      Đổi trả hàng
                    </Link>
                  </li>
                  <li>
                    <Link to="/size-guide" style={styles.footerLink}>
                      Hướng dẫn chọn size
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Column 3 */}
              <div style={styles.footerColumn}>
                <h3 style={styles.footerTitle}>TÀI KHOẢN</h3>
                <ul style={styles.footerList}>
                  <li>
                    <Link to="/register" style={styles.footerLink}>
                      Đăng ký thành viên
                    </Link>
                  </li>
                  <li>
                    <Link to="/profile" style={styles.footerLink}>
                      Thông tin tài khoản
                    </Link>
                  </li>
                  <li>
                    <Link to="/orders" style={styles.footerLink}>
                      Lịch sử đơn hàng
                    </Link>
                  </li>
                  <li>
                    <Link to="/wishlist" style={styles.footerLink}>
                      Sản phẩm yêu thích
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Column 4 */}
              <div style={styles.footerColumn}>
                <h3 style={styles.footerTitle}>ĐĂNG KÝ NHẬN TIN</h3>
                <p style={styles.newsletterText}>
                  Nhận thông tin về sản phẩm mới và ưu đãi độc quyền
                </p>
                <form style={styles.newsletterForm}>
                  <input
                    type="email"
                    placeholder="Email của bạn"
                    style={styles.newsletterInput}
                  />
                  <button type="submit" style={styles.newsletterButton}>
                    Đăng ký
                  </button>
                </form>
                <div style={styles.socialSection}>
                  <h4 style={styles.socialTitle}>KẾT NÔI VỚI CHÚNG TÔI</h4>
                  <div style={styles.socialIcons}>
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={styles.socialIcon}
                    >
                      f
                    </a>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={styles.socialIcon}
                    >
                      📷
                    </a>
                    <a
                      href="https://youtube.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={styles.socialIcon}
                    >
                      ▶
                    </a>
                    <a
                      href="https://tiktok.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={styles.socialIcon}
                    >
                      🎵
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div style={styles.footerBottom}>
          <div style={styles.container}>
            <div style={styles.bottomContent}>
              <p style={styles.copyright}>
                © 2024 UNIQLO Vietnam. All rights reserved.
              </p>
              <div style={styles.paymentMethods}>
                <span style={styles.paymentText}>Phương thức thanh toán:</span>
                <div style={styles.paymentIcons}>
                  <span style={styles.paymentIcon}>💳 Visa</span>
                  <span style={styles.paymentIcon}>💳 Master</span>
                  <span style={styles.paymentIcon}>📱 MoMo</span>
                  <span style={styles.paymentIcon}>🏦 COD</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// ==================== STYLES ====================
const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: "#f8f9fa",
  },

  // Promo Bar
  promoBar: {
    backgroundColor: "#e74c3c",
    color: "#fff",
    padding: "10px 0",
    position: "relative",
    zIndex: 1001,
  },
  promoContent: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  promoText: {
    fontSize: "14px",
    fontWeight: "600",
    textAlign: "center",
  },
  promoClose: {
    position: "absolute",
    right: "20px",
    background: "none",
    border: "none",
    color: "#fff",
    fontSize: "20px",
    cursor: "pointer",
    padding: "5px 10px",
  },

  // Header
  header: {
    backgroundColor: "#fff",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    transition: "all 0.3s ease",
  },
  headerScrolled: {
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px",
  },

  // Top Bar
  headerTop: {
    backgroundColor: "#f8f9fa",
    borderBottom: "1px solid #e9ecef",
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8px 0",
    fontSize: "13px",
  },
  topLeft: {
    display: "flex",
    gap: "20px",
  },
  topRight: {
    display: "flex",
    gap: "20px",
  },
  topLink: {
    color: "#666",
    textDecoration: "none",
    transition: "color 0.2s",
    fontSize: "13px",
  },

  // Main Header
  mainHeader: {
    padding: "15px 0",
  },
  headerContent: {
    display: "flex",
    alignItems: "center",
    gap: "30px",
  },
  logoLink: {
    display: "flex",
    alignItems: "center",
  },
  logo: {
    height: "50px",
    width: "auto",
    objectFit: "contain",
  },

  // Enhanced Search
  searchForm: {
    flex: 1,
    display: "flex",
    gap: "10px",
    maxWidth: "600px",
  },
  searchWrapper: {
    flex: 1,
    position: "relative",
    display: "flex",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    borderRadius: "25px",
    padding: "0 15px",
    border: "2px solid transparent",
    transition: "all 0.3s",
  },
  searchIcon: {
    fontSize: "18px",
    marginRight: "10px",
  },
  searchInput: {
    flex: 1,
    border: "none",
    outline: "none",
    padding: "12px 5px",
    fontSize: "14px",
    backgroundColor: "transparent",
  },
  searchClear: {
    background: "none",
    border: "none",
    color: "#999",
    cursor: "pointer",
    fontSize: "16px",
    padding: "5px",
  },
  searchButton: {
    padding: "12px 24px",
    backgroundColor: "#e74c3c",
    color: "#fff",
    border: "none",
    borderRadius: "25px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s",
    whiteSpace: "nowrap",
  },

  // Header Actions
  headerActions: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
  },
  actionItem: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    textDecoration: "none",
    color: "#333",
    cursor: "pointer",
    transition: "color 0.2s",
  },
  actionIcon: {
    fontSize: "24px",
  },
  actionText: {
    display: "flex",
    flexDirection: "column",
    lineHeight: "1.2",
  },
  actionLabel: {
    fontSize: "11px",
    color: "#999",
  },
  actionValue: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#333",
  },
  userMenu: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  logoutBtn: {
    padding: "5px 12px",
    fontSize: "12px",
    backgroundColor: "#f8f9fa",
    border: "1px solid #dee2e6",
    borderRadius: "15px",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  cartItem: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    textDecoration: "none",
    color: "#333",
    cursor: "pointer",
    padding: "8px 16px",
    backgroundColor: "#fff3cd",
    borderRadius: "25px",
    transition: "all 0.2s",
  },
  cartIcon: {
    position: "relative",
  },
  cartBadge: {
    position: "absolute",
    top: "-8px",
    right: "-8px",
    backgroundColor: "#e74c3c",
    color: "#fff",
    fontSize: "10px",
    fontWeight: "bold",
    padding: "2px 6px",
    borderRadius: "10px",
    minWidth: "18px",
    textAlign: "center",
  },

  // Navigation
  nav: {
    backgroundColor: "#2c3e50",
    borderTop: "3px solid #e74c3c",
  },
  navMenu: {
    display: "flex",
    listStyle: "none",
    margin: 0,
    padding: 0,
    gap: "5px",
  },
  navItem: {
    position: "relative",
  },
  navLink: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "14px 20px",
    color: "#fff",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "600",
    transition: "all 0.3s",
    position: "relative",
  },
  navLinkAdmin: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "14px 20px",
    color: "#ffd700",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "600",
    transition: "all 0.3s",
  },
  navIcon: {
    fontSize: "16px",
  },
  navArrow: {
    fontSize: "10px",
    marginLeft: "5px",
  },
  saleText: {
    color: "#ffeb3b",
    animation: "pulse 1.5s infinite",
  },

  // Main Content
  main: {
    flex: 1,
    backgroundColor: "#fff",
  },

  // Features Section
  featuresSection: {
    backgroundColor: "#f8f9fa",
    padding: "40px 0",
    borderBottom: "1px solid #e9ecef",
  },
  featuresGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "30px",
  },
  featureItem: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  featureIcon: {
    fontSize: "40px",
    flexShrink: 0,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    margin: "0 0 5px 0",
    fontSize: "14px",
    fontWeight: "bold",
    color: "#2c3e50",
  },
  featureDesc: {
    margin: 0,
    fontSize: "13px",
    color: "#666",
  },

  // Footer
  footer: {
    backgroundColor: "#2c3e50",
    color: "#ecf0f1",
  },
  footerMain: {
    padding: "50px 0 30px",
  },
  footerGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "40px",
  },
  footerColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  footerTitle: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#fff",
    marginBottom: "15px",
    borderBottom: "2px solid #e74c3c",
    paddingBottom: "10px",
  },
  footerList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  footerLink: {
    color: "#ecf0f1",
    textDecoration: "none",
    fontSize: "14px",
    transition: "all 0.2s",
  },
  newsletterText: {
    fontSize: "14px",
    lineHeight: "1.6",
    color: "#ecf0f1",
    marginBottom: "15px",
  },
  newsletterForm: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  newsletterInput: {
    flex: 1,
    padding: "10px 15px",
    border: "1px solid #34495e",
    borderRadius: "5px",
    fontSize: "14px",
    backgroundColor: "#34495e",
    color: "#fff",
  },
  newsletterButton: {
    padding: "10px 20px",
    backgroundColor: "#e74c3c",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s",
    whiteSpace: "nowrap",
  },
  socialSection: {
    marginTop: "20px",
  },
  socialTitle: {
    fontSize: "14px",
    fontWeight: "600",
    marginBottom: "10px",
    color: "#fff",
  },
  socialIcons: {
    display: "flex",
    gap: "10px",
  },
  socialIcon: {
    width: "36px",
    height: "36px",
    backgroundColor: "#34495e",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    textDecoration: "none",
    color: "#fff",
    fontSize: "16px",
    transition: "all 0.3s",
  },

  // Bottom Footer
  footerBottom: {
    backgroundColor: "#1a252f",
    padding: "20px 0",
    borderTop: "1px solid #34495e",
  },
  bottomContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "15px",
  },
  copyright: {
    fontSize: "13px",
    color: "#95a5a6",
    margin: 0,
  },
  paymentMethods: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  paymentText: {
    fontSize: "13px",
    color: "#95a5a6",
  },
  paymentIcons: {
    display: "flex",
    gap: "10px",
  },
  paymentIcon: {
    fontSize: "12px",
    padding: "5px 10px",
    backgroundColor: "#34495e",
    borderRadius: "4px",
    color: "#ecf0f1",
  },
};

export default Layout;
