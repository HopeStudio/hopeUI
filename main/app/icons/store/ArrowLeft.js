import React from "react";
import $ from "jQuery";
import iconCSS from "../icon.less";
import colors from "../../rules/colors.js";
class ArrowLeft extends React.Component {
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
          d="M854 469.25H334.592l239.404-239.404L512 170 170 512l342 342 59.844-59.848L334.592 554.75H854v-85.5z"
        />
      </svg>
    );
  }
}
export default ArrowLeft;
