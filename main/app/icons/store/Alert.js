import React from "react";
import $ from "jQuery";
import iconCSS from "../icon.less";
import colors from "../../rules/colors.js";
class Alert extends React.Component {
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
          d="M512 96C283.2 96 96 283.202 96 512s187.2 416 416 416 416-187.202 416-416S740.8 96 512 96zm48 624h-96v-80h96v80zm0-176h-96V288h96v256z"
        />
      </svg>
    );
  }
}
export default Alert;
