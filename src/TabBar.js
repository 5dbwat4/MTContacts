import React, { useState } from "react";
import { Badge, TabBar } from "antd-mobile";
// import { div } from 'demos'
import {
  AppOutline,
  MessageOutline,
  MessageFill,
  UnorderedListOutline,
  AppstoreOutline,
  UserOutline,
  ClockCircleOutline,
} from "antd-mobile-icons";

export default () => {
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
        <TabBar
          style={{
            position: "sticky",
            bottom: "0px",
            zIndex: 9999,
            height: 50,
          }}
          activeKey="Message"
        >
          {tabs.map((item) => (
            <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
          ))}
        </TabBar>
      </div>
    </>
  );
};
