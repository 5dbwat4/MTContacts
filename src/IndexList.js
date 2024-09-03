import React from "react";
import { IndexBar, List } from "antd-mobile";
const { num2cn, cn2num } = require("./transform");

const companyNum = [
  { title: "一团", count: 19 },
  { title: "二团", count: 13 },
  { title: "三团", count: 13 },
  { title: "四团", count: 6 },
];

const data = companyNum.map(({ title, count }) => ({
  title,
  items: Array.from({ length: count }, (_, i) => `${title}${num2cn(i + 1)}连`),
}));

console.log(data);

class IndexList extends React.Component {
  setdata(iscall, group, company) {
    // console.log(`是否呼叫${num2cn(group)}团${num2cn(company)}连：${iscall}`);
    this.props.setdata(iscall, group, company);
  }
  handleClick = (e) => {
    let regimentCN = e.target.innerText.slice(0, 1);
    let regiment = cn2num(regimentCN);
    // console.log("regiment", regiment);
    let company = data[regiment - 1].items.indexOf(e.target.innerText) + 1;
    // console.log("company", company);
    this.setdata(true, regiment, company);
  };
  render() {
    return (
      <div style={{ height: window.innerHeight - 100 }}>
        <IndexBar>
          {data.map((group) => {
            const { title, items } = group;
            return (
              <IndexBar.Panel
                index={title}
                title={`${title}`}
                key={`${title}`}
                brief={title.slice(0, 1)}
              >
                <List>
                  {items.map((item, index) => (
                    <List.Item key={index} onClick={this.handleClick}>
                      <span>{item}</span>
                    </List.Item>
                  ))}
                </List>
              </IndexBar.Panel>
            );
          })}
        </IndexBar>
      </div>
    );
  }
}

export default IndexList;
