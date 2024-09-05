import React, { useState } from "react";
import { TabBar as AntdTabBar } from "antd-mobile";
import {
  AppOutline,
  AppstoreOutline,
  UserOutline,
  ClockCircleOutline,
} from "antd-mobile-icons";

export default function TabBar() {
  const tabs = [
    {
      key: "Collection",
      title: "个人收藏",
      icon: <AppOutline />,
    },
    {
      key: "Record",
      title: "最近通话",
      icon: <ClockCircleOutline />,
    },
    {
      key: "Message",
      title: "通讯录",
      icon: <UserOutline />,
    },
    {
      key: "Keybroad",
      title: "拨号键盘",
      icon: <AppstoreOutline />,
    },
  ];

  const [activeKey, setActiveKey] = useState("todo");

  return (
    <>
      <div>
        <AntdTabBar
          style={{
            position: "sticky",
            bottom: "0px",
            zIndex: 9999,
            height: 50,
          }}
          activeKey="Message"
        >
          {tabs.map((item) => (
            <AntdTabBar.Item key={item.key} icon={item.icon} title={item.title} />
          ))}
        </AntdTabBar>
      </div>
    </>
  );
};
