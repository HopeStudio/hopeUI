import React from "react";
import $ from "jquery";
import iconCSS from "../icon.less";
import colors from "../../rules/colors.js";
class ArrowDown extends React.Component {
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
        width={props.size ? props.size : "20px"}
        height={props.size ? props.size : "20px"}
        viewBox="0 0 1024 1024"
        {...props}
      >
        <path
          ref={path => (this.path = path)}
          fill="#333"
          d="M554.75 170v519.408l239.404-239.404L854 512 512 854 170 512l59.848-59.844L469.25 689.408V170h85.5z"
        />
      </svg>
    );
  }
}
export default ArrowDown;
