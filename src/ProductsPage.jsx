// src/ProductsPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";
import { useCart } from "./CartContext";

const ProductsPage = () => {
  const [listProduct, setListProduct] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from("product1")
          .select("*")
          .order("id", { ascending: true });
        if (error) throw error;
        setListProduct(data);
        setFilteredProducts(data);
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu:", err.message);
      }
    };
    fetchProducts();
  }, []);

  // Lọc sản phẩm
  useEffect(() => {
    let filtered = [...listProduct];

    // Tìm kiếm theo tên
    if (searchTerm) {
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Lọc theo danh mục (nếu có trường category)
    if (selectedCategory !== "all") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Lọc theo giá
    if (priceRange === "under50") {
      filtered = filtered.filter((p) => p.price < 50);
    } else if (priceRange === "50to100") {
      filtered = filtered.filter((p) => p.price >= 50 && p.price <= 100);
    } else if (priceRange === "over100") {
      filtered = filtered.filter((p) => p.price > 100);
    }

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, priceRange, listProduct]);

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    addToCart(product);
    alert(`Đã thêm "${product.title}" vào giỏ hàng!`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Tất cả sản phẩm</h2>

      {/* BỘ LỌC */}
      <div style={styles.filterContainer}>
        {/* Tìm kiếm */}
        <input
          type="text"
          placeholder="🔍 Tìm kiếm sản phẩm..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />

        {/* Lọc theo giá */}
        <select
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          style={styles.select}
        >
          <option value="all">Tất cả giá</option>
          <option value="under50">Dưới $50</option>
          <option value="50to100">$50 - $100</option>
          <option value="over100">Trên $100</option>
        </select>
      </div>

      {/* KẾT QUẢ */}
      <p style={{ margin: "20px 0", color: "#666" }}>
        Hiển thị {filteredProducts.length} / {listProduct.length} sản phẩm
      </p>

      {/* DANH SÁCH SẢN PHẨM */}
      <div style={styles.productGrid}>
        {filteredProducts.length === 0 ? (
          <p style={{ textAlign: "center", width: "100%", padding: "40px" }}>
            Không tìm thấy sản phẩm nào!
          </p>
        ) : (
          filteredProducts.map((p) => (
            <div
              key={p.id}
              onClick={() => navigate(`/detail/${p.id}`)}
              style={styles.productCard}
            >
              <div style={styles.imageContainer}>
                <img src={p.image} alt={p.title} style={styles.image} />
              </div>

              <h4 style={styles.productTitle}>{p.title}</h4>
              <p style={styles.price}>${p.price}</p>
              <small style={styles.rating}>
                ⭐ {p.rating_rate} | ({p.rating_count} đánh giá)
              </small>

              <button
                onClick={(e) => handleAddToCart(e, p)}
                style={styles.addButton}
              >
                🛒 Thêm vào giỏ
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const styles = {
  filterContainer: {
    display: "flex",
    gap: "15px",
    marginBottom: "20px",
    flexWrap: "wrap",
  },
  searchInput: {
    flex: 1,
    minWidth: "250px",
    padding: "10px 15px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "14px",
  },
  select: {
    padding: "10px 15px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "14px",
    cursor: "pointer",
  },
  productGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "20px",
  },
  productCard: {
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "12px",
    textAlign: "center",
    cursor: "pointer",
    background: "#fff",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  imageContainer: {
    width: "100%",
    height: "200px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  productTitle: {
    margin: "10px 0 5px",
    fontSize: "1rem",
    minHeight: "40px",
  },
  price: {
    color: "#e63946",
    fontWeight: "bold",
    margin: "0",
  },
  rating: {
    color: "#555",
    display: "block",
    marginBottom: "10px",
  },
  addButton: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
    marginTop: "10px",
    transition: "background 0.2s",
  },
};

export default ProductsPage;
