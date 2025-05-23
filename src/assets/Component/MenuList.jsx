import React from "react";
import "./MenuList.css";
import { Menu } from "antd";
import {
  HomeOutlined,
  UnorderedListOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  DollarOutlined,
  LogoutOutlined,
  BarsOutlined,
 } from "@ant-design/icons";

import { useNavigate } from "react-router-dom";

const MenuList = () => {
  const navigate = useNavigate();

  // ฟังก์ชันเดียวที่เพิ่ม/แก้ไข
  const handleMenuClick = (e) => {
    if (e.key === "task-1") {
      navigate("/FoodPage");
    }
  };

  return (
    <Menu mode="inline" onClick={handleMenuClick}>
      <Menu.Item key="home" icon={<HomeOutlined/>}>
      Home
      </Menu.Item>

      <Menu.SubMenu key="Menu" icon={<UnorderedListOutlined />} title="Menu">
        <Menu.Item key="task-1">อาหาร</Menu.Item>
        <Menu.Item key="task-2">เครื่องดื่ม</Menu.Item>
        <Menu.Item key="task-3">ของหวาน</Menu.Item>
      </Menu.SubMenu>


      <Menu.Item key="Order" icon={<ClockCircleOutlined />}>
        Order
      </Menu.Item>

      <Menu.Item key="Confirm-Order" icon={<CheckCircleOutlined />}>
        Confirm Order
      </Menu.Item>

      <Menu.Item key="Payment" icon={<DollarOutlined />}>
        Payment
      </Menu.Item>

      <Menu.Item key="Log-Out" icon={<LogoutOutlined />}>
        Log Out
      </Menu.Item>
    </Menu>
  );
};




export default MenuList;
