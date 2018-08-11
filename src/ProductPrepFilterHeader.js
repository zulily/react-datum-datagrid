import React, { Component } from 'react'
// import PropTypes from 'prop-types'

const propTypes = {}
  
const defaultProps = {}

class ProductPrepFilterHeader extends Component {
    render() {
        return (
            <div className={"Paginator"}>
                <div>ProductPrepFilterHeaders</div>
                {this.props.children}
            </div>
        )
    }
}

ProductPrepFilterHeader.propTypes = propTypes
ProductPrepFilterHeader.defaultProps = defaultProps

export default ProductPrepFilterHeader