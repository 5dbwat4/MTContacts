import React from "react";
import "./Call.css";
// import background from "./assets/background.jpg";
import background from "./assets/bk.jpg";
import svg0 from "./assets/svg0.svg";
import svg1 from "./assets/svg1.svg";
import svg2 from "./assets/svg2.svg";
import svg3 from "./assets/svg3.svg";
import svg4 from "./assets/svg4.svg";
import svg5 from "./assets/svg5.svg";
import svg6 from "./assets/svg6.svg";
import audioMap from "./audioMap";

const { num2cn, cn2num } = require("./transform");

const description = ["等待对方接听", "通话中", "静音...", "通话结束"];

class Call extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mute: false,
      louder: false,
      status: 0,
    };
  }
  ToChinese(group, company) {
    return num2cn(group) + "团" + num2cn(company) + "连";
  }
  GetMP3(group, company) {
    const mp3 = audioMap["" + group + "-" + company + ".mp3"];
    return mp3;
  }
  render() {
    return (
      <>
        <audio
          id="audio"
          // src="./audio/1_1.mp3"
          // src={MP31_1}
          src={this.GetMP3(this.props.group, this.props.company)}
          // autoPlay
          muted={this.state.mute}
          volume={this.state.volume}
          onEnded={(e) => {
            setTimeout(() => {
              this.props.setiscall(false);
            }, 1500);
          }}
          onCanPlay={(e) => {
            let audio = document.getElementById("audio");
            audio.play();
            this.setState({ status: 1 });
          }}
        />
        <img
          alt="背景图片"
          src={background}
          style={{
            position: "fixed",
            left: 0,
            top: 0,
            height: window.innerHeight * 0.996,
            width: window.innerWidth,
            zIndex: -9,
          }}
        />
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.45)",
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: -8,
            height: window.innerHeight * 0.996,
            width: window.innerWidth,
          }}
        ></div>
        <div style={{ color: "rgba(255, 255, 255, 0.9)" }}>
          <center style={{ margin: 20 }}>
            <div id="name">
              {this.ToChinese(this.props.group, this.props.company)}
            </div>
          </center>
          <center>
            <div id="status">
              {this.state.status === 3
                ? description[this.state.status]
                : this.state.mute === true
                ? description[2]
                : description[this.state.status]}
            </div>
          </center>
          <div className="pannel">
            <div className="container">
              <div
                className={
                  this.state.status === 3
                    ? "button_disable"
                    : this.state.mute
                    ? "button_pick"
                    : "button_normal"
                }
                onClick={(e) => {
                  console.log(e);
                  this.setState({ mute: !this.state.mute });
                }}
              >
                <img src={svg0} alt="静音" className="button_svg" />
              </div>
              <div className="button_label">静音</div>
            </div>
            <div className="container">
              <div className="button_disable">
                <img src={svg1} alt="拨号键盘" className="button_svg" />
              </div>
              <div className="button_label">拨号键盘</div>
            </div>
            <div className="container">
              <div
                className={
                  this.state.status === 3
                    ? "button_disable"
                    : this.state.louder
                    ? "button_pick"
                    : "button_normal"
                }
                onClick={(e) => {
                  this.setState({
                    louder: !this.state.louder,
                  });
                  let audio = document.getElementById("audio");
                  audio.volume = this.state.louder ? 0.3 : 1;
                }}
              >
                <img src={svg2} alt="免提" className="button_svg" />
              </div>
              <div className="button_label">免提</div>
            </div>
          </div>
          <div className="pannel">
            <div className="container">
              <div className="button_disable">
                <img src={svg3} alt="添加通话" className="button_svg" />
              </div>
              <div className="button_label">添加通话</div>
            </div>
            <div className="container">
              <div className="button_disable">
                <img src={svg4} alt="FaceTime" className="button_svg" />
              </div>
              <div className="button_label">FaceTime</div>
            </div>
            <div className="container">
              <div className="button_disable">
                <img src={svg5} alt="通讯录" className="button_svg" />
              </div>
              <div className="button_label">通讯录</div>
            </div>
          </div>
          <div
            className="container"
            style={{ marginTop: window.innerHeight * 0.06 }}
          >
            <div
              className={
                this.state.status === 3 ? "button_disable" : "button_hang"
              }
              onClick={() => {
                this.setState({ status: 3 });
                let audio = document.getElementById("audio");
                audio.pause();
                setTimeout(() => {
                  this.props.setiscall(false);
                }, 1500);
              }}
            >
              <img src={svg6} alt="挂断" className="button_svg" />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Call;
