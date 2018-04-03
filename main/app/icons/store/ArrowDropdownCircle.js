import React from "react";
import $ from "jQuery";
import iconCSS from "../icon.less";
import colors from "../../rules/colors.js";
class ArrowDropdownCircle extends React.Component {
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
          d="M512 96C282.25 96 96 282.25 96 512s186.25 416 416 416 416-186.25 416-416S741.75 96 512 96zm0 544L320 448h384L512 640z"
        />
      </svg>
    );
  }
}
export default ArrowDropdownCircle;
