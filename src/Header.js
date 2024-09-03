import { Space } from "antd-mobile";
import React from "react";
export default function Header() {
  return (
    <Space style={{ "display": "flex", "justifyContent": "center", "alignItems": "center", "height": 50 }}>
      <div style={{ "fontSize": "200%" }}>通讯录</div>
    </Space>
  );
};
