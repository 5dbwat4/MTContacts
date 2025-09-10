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
      choice: {
        title:"Unknown",
        audio:"Unknown.mp3"
      }
    };
  }
  setiscall = (iscall) => {
    this.setState({ iscall: iscall });
  };
  setdata = (iscall, item) => {
    this.setState({ iscall: iscall });
    this.setState({ choice: item });
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
          item={this.state.choice}
          setiscall={this.setiscall}
        />
      );
    }
  }
}

export default Mainlist;
