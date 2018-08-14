import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Pagination } from 'react-bootstrap'
import './paginator.css'

const propTypes = {
    pageSize: PropTypes.number,
    offset: PropTypes.number,
    total: PropTypes.number,
    onPageClick: PropTypes.func
}
  
const defaultProps = {
    pageSize: 10,
    offset: 0,
    onPageClick: function() {alert("OnPageClick not set")}
}

class Paginator extends Component {
    handleClick(evt) {
        let newOffset = evt.target.getAttribute('pagenum') * this.props.pageSize
        this.props.onPageClick(newOffset)
    }
    getPageLinks() {
        let { pageSize, total, offset } = this.props

        let totalPages = Math.floor(Math.min(total, 10000)/pageSize) - 1
        if (!totalPages) {
            totalPages = 1
        }
        let currentPageNum = Math.floor(offset/pageSize)

        let pages = []
        var i
        for (i = 0; i < (totalPages > 5 ? 5 : totalPages); i++) {
            pages.push(<Pagination.Item key={i} onClick={this.handleClick.bind(this)} pagenum={i} active={i === currentPageNum}>{i+1}</Pagination.Item>)
        } 
        if (totalPages > 1) {
            pages.push(<Pagination.Ellipsis key={i+1} />)
            pages.push(<Pagination.Item key={totalPages} onClick={this.handleClick.bind(this)} pagenum={totalPages} active={totalPages === currentPageNum}>{totalPages+1}</Pagination.Item>)
        }
        return pages
    }
    render() {
        return (
            <div className={"Paginator"}>
                <Pagination>
                    {this.getPageLinks()}
                </Pagination>
                {this.props.children}
            </div>
        )
    }
}

Paginator.propTypes = propTypes
Paginator.defaultProps = defaultProps

export default Paginator
