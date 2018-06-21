import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import $ from 'jQuery';

import colors from '../rules/colors.js';
import cssTable from './table.less';
import uuid from '../tools/uuid.js';
import colorTrans from '../tools/colorTrans.js';

class Th extends React.Component {
  componentWillMount() {
    const {uuid} = this.props;
    this.uuid = uuid;
  }
  render() {
    const {children} = this.props;
    return (
      <div className={classnames('hope-th', cssTable.th)}>
        {children}
      </div>
    )
  }
}

Th.propTypes = {}

Th.defaultProps = {}

export default Th;