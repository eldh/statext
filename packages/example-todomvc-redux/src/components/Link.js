import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const Link = ({ active, children, setFilter }) => (
  <a
className={classnames({ selected: active })} onClick={() => console.log('setFilter') ||
   setFilter()} style={{ cursor: 'pointer' }}>
    {children}
  </a>
)

Link.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  setFilter: PropTypes.func.isRequired,
}

export default Link
