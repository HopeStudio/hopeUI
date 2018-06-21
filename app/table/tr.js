import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import $ from 'jQuery';

import colors from '../rules/colors.js';
import cssTable from './table.less';
import uuid from '../tools/uuid.js';
import colorTrans from '../tools/colorTrans.js';

class Tr extends React.Component {
  componentWillMount() {
    const {uuid} = this.props;
    this.uuid = uuid;
  }
  getHeight = () => {
    return $(this.DOM).height();
  }
  render() {
    const {children} = this.props;
    return (
      <div className={classnames('hope-tr', cssTable.tr)} ref={DOM => this.DOM = DOM}>
        {children}
      </div>
    )
  }
}

Tr.propTypes = {}

Tr.defaultProps = {}

export default Tr;