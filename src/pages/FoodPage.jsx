import React, { useEffect, useState } from "react";
import { Layout, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import Logo from "../assets/Component/Logo";
import MenuList from "../assets/Component/MenuList";
import "./FoodPage.css";

const { Header, Sider, Content } = Layout;

function FoodPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [orders, setOrders] = useState({});
  const [uploading, setUploading] = useState(false);

  // Fetch menu from backend
  useEffect(() => {
    axios.get("http://localhost:3001/api/mainmenu")
      .then(res => {
        setMenuItems(res.data);
        // Init order state
        const initialOrders = {};
        res.data.forEach(item => {
          initialOrders[item.menu_id] = 0;
        });
        setOrders(initialOrders);
      })
      .catch(() => message.error("โหลดเมนูไม่สำเร็จ"));
  }, []);

  // Add order
  const handleAdd = (id) => {
    setOrders(prev => ({
      ...prev,
      [id]: prev[id] + 1,
    }));
  };

  // Remove order
  const handleRemove = (id) => {
    setOrders(prev => ({
      ...prev,
      [id]: prev[id] > 0 ? prev[id] - 1 : 0,
    }));
  };

  // Upload image handler
  const handleUpload = async (file, menuId) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await axios.post("http://localhost:3001/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      // Update menu item's image_url
      await axios.put(`http://localhost:3001/api/mainmenu/${menuId}`, {
        ...menuItems.find(item => item.menu_id === menuId),
        image_url: res.data.imageUrl
      });
      // Refresh menu
      const menuRes = await axios.get("http://localhost:3001/api/mainmenu");
      setMenuItems(menuRes.data);
      message.success("อัปโหลดรูปสำเร็จ");
    } catch {
      message.error("อัปโหลดรูปไม่สำเร็จ");
    }
    setUploading(false);
    return false; // prevent default upload
  };

  // Calculate total
  const total = menuItems.reduce(
    (sum, item) => sum + (orders[item.menu_id] || 0) * item.menu_price,
    0
  );

  // Confirm order handler
  const handleConfirmOrder = () => {
    const orderList = menuItems
      .filter(item => orders[item.menu_id] > 0)
      .map(item => ({
        menu_id: item.menu_id,
        qty: orders[item.menu_id],
      }));
    if (orderList.length === 0) {
      message.warning("กรุณาเลือกรายการอาหารก่อนยืนยัน");
      return;
    }
    // TODO: ส่ง orderList ไป backend (เช่น POST /api/order)
    message.success("ยืนยัน Order สำเร็จ (Demo)");
    // Reset order
    const resetOrders = {};
    menuItems.forEach(item => { resetOrders[item.menu_id] = 0; });
    setOrders(resetOrders);
  };

  return (
    <Layout>
      {/* Sidebar */}
      <Sider
        className="Sidebar"
        width={220}
        breakpoint="lg"
        collapsedWidth="60"
      >
        <Logo />
        <MenuList />
      </Sider>
      {/* Main Layout */}
      <Layout>
        <Header className="staff-dashboard-header" />
        <Content className="food-page-content">
          <h2>รายการอาหาร</h2>
          <div className="food-card-grid">
            {menuItems.map((item) => (
              <div className="food-card" key={item.menu_id}>
                <div className="food-card-header">
                  <span className="food-card-title">{item.menu_name}</span>
                  <span className="food-card-price">{item.menu_price} บาท</span>
                </div>
                <div className="food-card-desc">{item.menu_description}</div>
                <div className="food-card-image">
                  {item.image_url ? (
                    <img
                      src={`http://localhost:3001${item.image_url}`}
                      alt={item.menu_name}
                      style={{ width: "100px", height: "100px", objectFit: "cover" }}
                    />
                  ) : (
                    <span style={{ color: "#aaa" }}>ไม่มีรูป</span>
                  )}
                </div>
                <Upload
                  showUploadList={false}
                  customRequest={({ file }) => handleUpload(file, item.menu_id)}
                  accept="image/*"
                  disabled={uploading}
                >
                  <Button icon={<UploadOutlined />} size="small" loading={uploading}>
                    {item.image_url ? "เปลี่ยนรูป" : "อัปโหลดรูป"}
                  </Button>
                </Upload>
                <div className="food-card-order">
                  <button
                    className="order-btn"
                    onClick={() => handleRemove(item.menu_id)}
                    disabled={orders[item.menu_id] === 0}
                  >
                    -
                  </button>
                  <span className="order-qty">{orders[item.menu_id]}</span>
                  <button
                    className="order-btn"
                    onClick={() => handleAdd(item.menu_id)}
                  >
                    +
                  </button>
                </div>
                <div className="food-card-subtotal">
                  ยอดรวม: {(orders[item.menu_id] || 0) * item.menu_price} บาท
                </div>
              </div>
            ))}
          </div>
          <div className="food-page-total">
            <strong>ราคารวมทั้งหมด: {total} บาท</strong>
          </div>
          <Button
            type="primary"
            size="large"
            style={{ marginTop: 24 }}
            onClick={handleConfirmOrder}
          >
            ยืนยัน Order
          </Button>
        </Content>
      </Layout>
    </Layout>
  );
}

export default FoodPage;
