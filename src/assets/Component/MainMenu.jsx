import React, { useState, useEffect } from "react";
import "./MainMenu.css";

const API_URL = "http://localhost:3001/api/mainmenu";

const defaultNewProduct = {
  menu_name: "",
  menu_description: "",
  menu_price: "",
  menu_status: "available",
  menu_tag: "อาหาร",
  menu_image: null,
};

const MainMenu = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState(defaultNewProduct);
  const [editProduct, setEditProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch menu items from backend
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      alert("โหลดข้อมูลเมนูไม่สำเร็จ");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Add product handler
  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!newProduct.menu_name || !newProduct.menu_price) return;
    try {
      const formData = new FormData();
      formData.append("menu_name", newProduct.menu_name);
      formData.append("menu_description", newProduct.menu_description);
      formData.append("menu_price", parseFloat(newProduct.menu_price));
      formData.append("menu_status", newProduct.menu_status);
      formData.append("menu_tag", newProduct.menu_tag);
      if (newProduct.menu_image) {
        formData.append("menu_image", newProduct.menu_image);
      }
      await fetch(API_URL, {
        method: "POST",
        body: formData,
      });
      setNewProduct(defaultNewProduct);
      fetchProducts();
    } catch {
      alert("เพิ่มเมนูไม่สำเร็จ");
    }
  };

  // Edit product handler
  const handleEditClick = (product) => {
    setEditProduct({ ...product });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSave = async (e) => {
    e.preventDefault();
    try {
      await fetch(`${API_URL}/${editProduct.menu_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...editProduct,
          menu_price: parseFloat(editProduct.menu_price),
        }),
      });
      setEditProduct(null);
      fetchProducts();
    } catch {
      alert("บันทึกเมนูไม่สำเร็จ");
    }
  };

  const handleEditCancel = () => {
    setEditProduct(null);
  };

  // Delete product handler
  const handleDeleteProduct = async (id) => {
    if (!window.confirm("ยืนยันการลบเมนูนี้?")) return;
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setEditProduct(null);
      fetchProducts();
    } catch {
      alert("ลบเมนูไม่สำเร็จ");
    }
  };

  return (
    <div className="main-menu">
      <h1 className="main-menu-title">เมนูหลัก (Main Menu)</h1>

      <section style={{ marginBottom: 32 }}>
        <h2>เพิ่มเมนูใหม่</h2>
        <form onSubmit={handleAddProduct} className="main-menu-form" encType="multipart/form-data">
          <input
            type="text"
            placeholder="ชื่อเมนู"
            value={newProduct.menu_name}
            onChange={(e) => setNewProduct({ ...newProduct, menu_name: e.target.value })}
            name="menu_name"
            required
          />
          <input
            type="text"
            placeholder="รายละเอียด"
            value={newProduct.menu_description}
            onChange={(e) => setNewProduct({ ...newProduct, menu_description: e.target.value })}
            name="menu_description"
          />
          <input
            type="number"
            placeholder="ราคา"
            value={newProduct.menu_price}
            onChange={(e) => setNewProduct({ ...newProduct, menu_price: e.target.value })}
            name="menu_price"
            required
            min="0"
          />
          <select
            value={newProduct.menu_status}
            onChange={(e) => setNewProduct({ ...newProduct, menu_status: e.target.value })}
            name="menu_status"
          >
            <option value="available">พร้อมขาย</option>
            <option value="unavailable">ไม่พร้อมขาย</option>
          </select>
          <select
            value={newProduct.menu_tag}
            onChange={(e) => setNewProduct({ ...newProduct, menu_tag: e.target.value })}
            name="menu_tag"
            required
          >
            <option value="อาหาร">อาหาร</option>
            <option value="เครื่องดื่ม">เครื่องดื่ม</option>
            <option value="ของหวาน">ของหวาน</option>
          </select>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setNewProduct({ ...newProduct, menu_image: e.target.files[0] })}
            name="menu_image"
          />
          <button type="submit" className="main-menu-button">
            เพิ่มเมนู
          </button>
        </form>
      </section>

      <section>
        <h2>รายการเมนู</h2>
        {loading ? (
          <div>กำลังโหลด...</div>
        ) : (
          <ul className="main-menu-list">
            {products.map((product) => (
              <li className="main-menu-item" key={product.menu_id}>
                {editProduct && editProduct.menu_id === product.menu_id ? (
                  <form onSubmit={handleEditSave} className="main-menu-form" style={{ display: "inline-block" }}>
                    <input
                      type="text"
                      name="menu_name"
                      value={editProduct.menu_name}
                      onChange={handleEditChange}
                      required
                    />
                    <input
                      type="text"
                      name="menu_description"
                      value={editProduct.menu_description || ""}
                      onChange={handleEditChange}
                    />
                    <input
                      type="number"
                      name="menu_price"
                      value={editProduct.menu_price}
                      onChange={handleEditChange}
                      required
                      min="0"
                    />
                    <select
                      name="menu_status"
                      value={editProduct.menu_status}
                      onChange={handleEditChange}
                    >
                      <option value="available">พร้อมขาย</option>
                      <option value="unavailable">ไม่พร้อมขาย</option>
                    </select>
                    <button type="submit" className="main-menu-button">บันทึก</button>
                    <button type="button" className="main-menu-button" onClick={handleEditCancel} style={{ background: "#ccc", color: "#333" }}>
                      ยกเลิก
                    </button>
                    <button
                      type="button"
                      className="main-menu-button"
                      style={{ background: "#e57373", color: "#fff" }}
                      onClick={() => handleDeleteProduct(product.menu_id)}
                    >
                      ลบ
                    </button>
                  </form>
                ) : (
                  <>
                    <span>
                      {product.menu_name} - {product.menu_price} บาท
                      {product.menu_description ? ` (${product.menu_description})` : ""}
                      {product.menu_status === "unavailable" ? " [ไม่พร้อมขาย]" : ""}
                    </span>
                    <button
                      className="main-menu-button"
                      style={{ marginLeft: 12 }}
                      onClick={() => handleEditClick(product)}
                    >
                      แก้ไข
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default MainMenu;
