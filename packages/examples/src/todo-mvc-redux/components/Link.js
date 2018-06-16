import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { css } from 'glamor'

const Link = ({ active, children, setFilter }) => (
  // eslint-disable-next-line jsx-a11y/anchor-is-valid
  <a
    className={classnames({ selected: active }, css({ cursor: 'pointer' }))}
    onClick={setFilter}
    role="button"
    tabIndex="0"
  >
    {children}
  </a>
)

Link.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  setFilter: PropTypes.func.isRequired,
}

export default Link
