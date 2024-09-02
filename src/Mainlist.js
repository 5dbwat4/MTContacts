import React from "react";
import IndexList from "./IndexList";
import TabBar from "./TabBar";
import Header from "./Header";
import Call from "./Call";
class Mainlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      iscall: false,
      group: 0,
      company: 0,
    };
  }
  setiscall = (iscall) => {
    this.setState({ iscall: iscall });
  };
  setdata = (iscall, group, company) => {
    this.setState({ iscall: iscall });
    this.setState({ group: group });
    this.setState({ company: company });
  };
  render() {
    if (this.state.iscall === false) {
      return (
        <>
          <Header />
          <IndexList setdata={this.setdata} />
          <TabBar />
        </>
      );
    } else {
      return (
        <Call
          group={this.state.group}
          company={this.state.company}
          setiscall={this.setiscall}
        />
      );
    }
  }
}

export default Mainlist;
