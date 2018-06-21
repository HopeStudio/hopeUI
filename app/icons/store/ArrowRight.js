import React from "react";
import $ from "jquery";
import iconCSS from "../icon.less";
import colors from "../../rules/colors.js";
class ArrowRight extends React.Component {
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
          d="M170 554.75h519.408L450.004 794.154 512 854l342-342-342-342-59.844 59.848L689.408 469.25H170v85.5z"
        />
      </svg>
    );
  }
}
export default ArrowRight;
