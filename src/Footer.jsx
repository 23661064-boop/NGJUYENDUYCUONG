// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={styles.footer}>
      {/* Main Footer Content */}
      <div style={styles.footerContent}>
        <div style={styles.container}>
          <div style={styles.grid}>
            {/* Column 1: Về Uniqlo */}
            <div style={styles.column}>
              <h3 style={styles.columnTitle}>Về Uniqlo</h3>
              <ul style={styles.linkList}>
                <li style={styles.linkItem}>
                  <Link to="/about" style={styles.link}>
                    Thông tin
                  </Link>
                </li>
                <li style={styles.linkItem}>
                  <Link to="/stores" style={styles.link}>
                    Danh sách cửa hàng
                  </Link>
                </li>
                <li style={styles.linkItem}>
                  <Link to="/careers" style={styles.link}>
                    Cơ Hội Nghề Nghiệp
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: Trợ giúp */}
            <div style={styles.column}>
              <h3 style={styles.columnTitle}>Trợ giúp</h3>
              <ul style={styles.linkList}>
                <li style={styles.linkItem}>
                  <Link to="/faq" style={styles.link}>
                    FAQ
                  </Link>
                </li>
                <li style={styles.linkItem}>
                  <Link to="/return-policy" style={styles.link}>
                    Chính sách trả hàng
                  </Link>
                </li>
                <li style={styles.linkItem}>
                  <Link to="/privacy-policy" style={styles.link}>
                    Chính sách bảo mật
                  </Link>
                </li>
                <li style={styles.linkItem}>
                  <Link to="/contact" style={styles.link}>
                    Tiếp cận
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Tài khoản */}
            <div style={styles.column}>
              <h3 style={styles.columnTitle}>Tài khoản</h3>
              <ul style={styles.linkList}>
                <li style={styles.linkItem}>
                  <Link to="/register" style={styles.link}>
                    Trở thành thành viên
                  </Link>
                </li>
                <li style={styles.linkItem}>
                  <Link to="/profile" style={styles.link}>
                    Hồ sơ
                  </Link>
                </li>
                <li style={styles.linkItem}>
                  <Link to="/coupons" style={styles.link}>
                    Coupons
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Bản tin điện tử */}
            <div style={styles.column}>
              <h3 style={styles.columnTitle}>Bản tin điện tử</h3>
              <p style={styles.newsletterText}>
                Đăng ký ngay và là người đầu tiên nắm được thông tin khi có mặt
                hàng mới, khuyến mãi, các sự kiện sắp diễn ra tại cửa hàng và
                nhiều thông tin hữu ích khác.
              </p>
              <Link to="/register" style={styles.registerButton}>
                ĐĂNG KÝ NGAY
              </Link>
            </div>

            {/* Column 5: Social Media */}
            <div style={styles.column}>
              <h3 style={styles.columnTitle}>Tài khoản xã hội UNIQLO</h3>
              <div style={styles.socialIcons}>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.socialIcon}
                  aria-label="Facebook"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>

                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.socialIcon}
                  aria-label="Instagram"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>

                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.socialIcon}
                  aria-label="YouTube"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>

                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.socialIcon}
                  aria-label="TikTok"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div style={styles.bottomFooter}>
        <div style={styles.container}>
          <div style={styles.bottomContent}>
            <p style={styles.copyright}>
              © {currentYear} UNIQLO Vietnam. All rights reserved.
            </p>
            <div style={styles.bottomLinks}>
              <Link to="/terms" style={styles.bottomLink}>
                Điều khoản sử dụng
              </Link>
              <span style={styles.separator}>|</span>
              <Link to="/privacy" style={styles.bottomLink}>
                Chính sách bảo mật
              </Link>
              <span style={styles.separator}>|</span>
              <Link to="/sitemap" style={styles.bottomLink}>
                Sơ đồ trang web
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: "#757575",
    color: "#fff",
    marginTop: "auto",
  },

  footerContent: {
    padding: "50px 0 30px",
  },

  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "40px",
  },

  column: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },

  columnTitle: {
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#fff",
  },

  linkList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  linkItem: {
    margin: 0,
  },

  link: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "14px",
    transition: "color 0.2s",
  },

  newsletterText: {
    fontSize: "13px",
    lineHeight: "1.6",
    color: "#fff",
    margin: 0,
  },

  registerButton: {
    display: "inline-block",
    padding: "10px 20px",
    backgroundColor: "#fff",
    color: "#757575",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "14px",
    border: "none",
    cursor: "pointer",
    transition: "all 0.3s",
    textAlign: "center",
    marginTop: "10px",
  },

  socialIcons: {
    display: "flex",
    gap: "15px",
    flexWrap: "wrap",
  },

  socialIcon: {
    width: "40px",
    height: "40px",
    backgroundColor: "#8f8f8f",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "4px",
    transition: "background-color 0.3s",
    textDecoration: "none",
  },

  bottomFooter: {
    borderTop: "1px solid #8f8f8f",
    padding: "20px 0",
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
    color: "#fff",
    margin: 0,
  },

  bottomLinks: {
    display: "flex",
    gap: "15px",
    alignItems: "center",
    flexWrap: "wrap",
  },

  bottomLink: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "13px",
    transition: "color 0.2s",
  },

  separator: {
    color: "#8f8f8f",
  },
};

export default Footer;
