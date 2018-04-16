react-datum-datagrid
====================

A datagrid built on [react-virtualized](https://github.com/bvaughn/react-virtualized) that works with or without 
(react-datum)[https://github.com/zulily/react-datum] and (Backbone.js)[http://backbonejs.org/]

[![Build Status](https://travis-ci.org/zulily/react-datum.svg?branch=master)](https://travis-ci.org/zulily/react-datum)
[![Coverage Status](https://coveralls.io/repos/github/zulily/react-datum/badge.svg?branch=master)](https://coveralls.io/github/zulily/react-datum?branch=master)


## Live Demo & Examples
http://zulily.github.io/react-datum-datagrid/docs/examples/#basic

## Installation

**Install from NPM:**
```bash
npm install react-datum-datagrid --save
```

** Install from the web: **

Copy development (.js) or optimized (.min.js) distribution file from https://github.com/zulily/react-datum-datagrid/tree/master/dist in with your other vendor js and use a script tag or AMD to load it.  

## Usage
Suppose you have a Backbone Collection of puppy records such as http://zulily.github.io/react-datum-datagrid/test/lib/puppyData.js ...

```javascript

let puppyCollection = new Backbone.Collection(PUPPY_DATA)
```

To build an infinitely scrolling datagrid with locked left columns...

```javacript 

class BasicDatagridDisplay extends React.Component {
  static displayName = "BasicDatagridDisplay"
  
  render(){
    // ReactDatumDatagrid will fill what ever element it is placed in
    // Below we constrain it to 100% of the demo pane and a fixed width of 600px
    // You can also use Flex!  See TODO Flexy Demo
    return (
      <div style={{height: "100%", width: 600}}>
        <ReactDatumDatagrid 
          collection={puppyCollection}
          columns={this.getColumns()}
          headerHeight={40}
          rowHeight={110}
          defaultColumnDef={{
            width: 150
          }}/>
      </div>
    )
  }
  
  getColumns(){
    return [{
      key: 'imageUrl',
      name: 'Image',
      width: 120,
      datum: ReactDatum.LazyPhoto,
      locked: true
    },{
      key: 'name',
    },{
      key: 'breed',
    },{
      key: 'size',
      width: 80,
    },{
      key: 'sex',
      width: 80,
    },{
      key: 'contactEmail',
      width: '200',
      datum: ReactDatum.Email,
      datumProps: {
        ellipsizeAt: false,
        reverseEllipsis: true,
      }
    }]
  }
}

window.Demo = BasicDatagridDisplay

```
And violà...


*screenshot - click to view demo:*

[<img alt="Screenshot from doc/examples/basicDatagrid/basicDatagrid.html" src="http://zulily.github.io/react-datum-datagrid/img/docs/basicDatagridDemo.png"
/>](http://zulily.github.io/react-datum-datagrid/docs/examples/#basic)




## API Docs
The object oriented API of react-datum-datagrid is documented in our [API Docs](http://zulily.github.io/react-datum-datagrid/docs/api).   

Enough reading, [check out the demos!](http://zulily.github.io/react-datum/docs/examples/)
