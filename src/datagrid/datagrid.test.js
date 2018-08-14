import React from 'react'
import ReactDOM from 'react-dom'
import Datagrid from './datagrid'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Datagrid 
  
  />, div)
  ReactDOM.unmountComponentAtNode(div)
});
