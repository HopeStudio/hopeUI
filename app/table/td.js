import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import $ from 'jQuery';

import colors from '../rules/colors.js';
import cssTable from './table.less';
import uuid from '../tools/uuid.js';
import colorTrans from '../tools/colorTrans.js';

class Td extends React.Component {
  setSize() {
    const {getRatio, getTotalRatio} = this.props;
    const size = Number.parseFloat((getRatio() / getTotalRatio() * 100).toFixed(8));
    $(this.DOM).css({
      width: size + '%'
    })
  }
  componentDidMount() {
    const {uuid} = this.props;
    this.uuid = uuid;
    this.setSize();
  }
  componentDidUpdate() {
    this.setSize();
  }
  render() {
    const {children} = this.props;
    return (
      <div className={classnames('hope-td', cssTable.td)} ref={DOM => this.DOM = DOM}>
        <div className={classnames('hope-tdIn', cssTable.tdIn)}>{children}</div>
      </div>
    )
  }
}

Td.propTypes = {
  getRatio: PropTypes.func,
  getTotalRatio: PropTypes.func
}

Td.defaultProps = {}

export default Td;