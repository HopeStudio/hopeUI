import React from "react";
import $ from "jquery";
import iconCSS from "../icon.less";
import colors from "../../rules/colors.js";
class CirBlank extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    if (!this.path) return;
    const props = this.props;
    $(this.path).attr(
      "fill",
      `${props.fillcolor ? colors[props.fillcolor] : "currentColor"}`
    );
    $(this.svg)
      .removeClass()
      .addClass(iconCSS.icon);
  }
  render() {
    const props = this.props;
    return (
      <svg
        ref={svg => (this.svg = svg)}
        className="icon"
        viewBox="0 0 1024 1024"
        width={props.size ? props.size : "20px"}
        height={props.size ? props.size : "20px"}
        {...props}
      >
        <defs />
        <path
          ref={path => (this.path = path)}
          d="M512 960C264.96 960 64 759.04 64 512S264.96 64 512 64s448 200.96 448 448-200.96 448-448 448zm0-832c-211.744 0-384 172.256-384 384s172.256 384 384 384 384-172.256 384-384-172.256-384-384-384z"
        />
      </svg>
    );
  }
}
export default CirBlank;
