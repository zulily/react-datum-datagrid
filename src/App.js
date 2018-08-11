import React, { Component } from 'react'

import Paginator from './paginator/Paginator'
// import Datagrid from './datagrid/MGrid'
import Datagrid from './datagrid/datagrid'

// Bundle datums in new datagrid
// Demonstrate use of backbone models
// Show alternative to backbone
// Add select and copy from datagrid

// Make in seprate repo styling to make it look like Jenn's designs

// I work on the grid refactors and Justin/Jon work on the discontinue skus component

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      width: 0,
      height: 0,
      data: {},
      columns: [],
      pageSize: 30,
      loading: false
    }
  }
  componentDidMount() {
    this.getData()
  }
  handlePageClick(newOffset) {
    if (newOffset !== this.state.data.offset) {
      this.getData(newOffset)
    }
  }
  getData(offset = 0) {
    this.setState({
      loading: true
    })
    let url = "http://itemmaster-merch.prod.bids.bidw.aws.z8s.io/v1/search/styles?sort=productStyleId&order=ASC&limit="+this.state.pageSize+"&offset="+offset
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': '31d6e184-cce2-4b62-be68-b019f7eb20bc-product-setup'
      },
      body: JSON.stringify({})
    })
    .then(function(response) {
      return response.json()
    })
    .then(function(data) {
      if (!data || !data.styles || !data.styles.length) {
        this.setState({ data: [], columns: [], loading: false })
        return
      }
      let columns = []
      columns = Object.keys(data.styles[0]).map(function(key) {
        return {'key': key}
      })
      this.setState({
        data: data, 
        columns: columns,
        width: window.innerWidth,
        height: window.innerHeight,
        loading: false
      })
    }.bind(this))
  }
  render() {
    if (this.state.loading) {
      return (<div>Loading...</div>)
    } else if (!this.state.data.styles || !this.state.data.styles.length) {
      return (<div>No Data</div>)
    }
    return (
      <div className="App" style={{height: window.innerHeight, width: window.innerWidth}}>
        <Paginator 
            pageSize={this.state.pageSize}
            offset={this.state.data.offset}
            total={this.state.data.total} 
            onPageClick={this.handlePageClick.bind(this)}
        >
          <Datagrid 
            columns={this.state.columns}
            collection={this.state.data.styles}
            height={this.state.height}
            width={this.state.width}
            headerHeight={60}
            rowHeight={60}
          />
        </Paginator>
      </div>
    )
  }
}

export default App
