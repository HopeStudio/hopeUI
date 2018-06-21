module.exports = (opts = {}) => {
  const strFunc = str => `\`\${${str}}\``;
  return (code, state) => {
    code = code
      .replace(/<svg/, '<svg ref={svg => this.svg = svg} ')
      .replace(/<path/, '<path ref={path => this.path = path} ')
      .replace(/width={[\w|\W]*?}/, 'width={props.size ? props.size : "20px"}')
      .replace(/height={[\w|\W]*?}/, 'height={props.size ? props.size : "20px"}');
    return (`import React from 'react';
    import $ from 'jquery';
      import iconCSS from '../icon.less';
      import colors from '../../rules/colors.js';
      class ${state.componentName} extends React.Component{
        constructor(props){
          super(props)
        }
        componentDidMount(){
          if(!this.path) return;
          const props = this.props;
          $(this.path).attr('fill', ${strFunc('props.fillcolor ? colors[props.fillcolor] : "currentColor"')})
          $(this.svg).removeClass().addClass(iconCSS.icon)
        }
        render(){
          const props = this.props;
          return (${code})
        }
      }
      export default ${state.componentName}`);
  };
};
