react-datum-datagrid
====================

A datagrid built on [react-virtualized](https://github.com/bvaughn/react-virtualized) that works with or without 
(react-datum)[https://github.com/zulily/react-datum] and (Backbone.js)[http://backbonejs.org/]

[![Build Status](https://travis-ci.org/zulily/react-datum.svg?branch=master)](https://travis-ci.org/zulily/react-datum)
[![Coverage Status](https://coveralls.io/repos/github/zulily/react-datum/badge.svg?branch=master)](https://coveralls.io/github/zulily/react-datum?branch=master)


## Live Demo & Examples
(http://zulily.github.io/react-datum-datagrid/docs/examples/)

## Installation

**Install from NPM:**
```bash
npm install react-datum-datagrid --save
```

** Install from the web: **

Copy development (.js) or optimized (.min.js) distribution file from (https://github.com/zulily/react-datum-datagrid/tree/master/dist) in with your other vendor js and use a script tag or AMD to load it.  

## Usage

### TO BE DONE


```javascript

// Say you have this model:

var puppyModel = new Backbone.Model({
  name: "Fluffy",
  title: "His Royal Cuteness",
  description: "He's a cuddler and a lover through and through",
  forAdoption: true,
  ageInMonths: 10,
  createdAt: 1446520828,
  imgUrl: "https://drpem3xzef3kf.cloudfront.net/photos/pets/32707403/1/?bust=1436666804&width=200&no_scale_up=1",
  sponsorEmail: "kindoldcatlady@lotsofcats.com",
  comment: ""
});

// To create the card below:

var puppyCard = React.createClass({
  displayName:"PuppyCard",
  render: function(){
    return (
      <div className='puppy-card'>
        <ReactDatum.Model model={puppyModel}>
          <h3>Adopt <ReactDatum.Text attr="name"/> Today!</h3>
          <div><ReactDatum.LazyPhoto attr="imgUrl"/></div>
          <div><ReactDatum.Text attr="name" label="Name"/> (<ReactDatum.Text attr="title"/>)</div>
          <div><ReactDatum.Email attr="sponsorEmail" label="Adoption Sponsor" displayLink/></div>
          <ReactDatum.Text attr="description"/>
          <h5>Leave a comment</h5>
          <ReactDatum.Text attr="comment" inputMode="edit"/>
        </ReactDatum.Model>
      </div>
    )
  }
})
ReactDOM.render(React.createElement(puppyCard), document.getElementById('demo'))

```


## API Docs
The object oriented API of react-datum-datagrid is documented in our [API Docs](http://zulily.github.io/react-datum-datagrid/docs/api).   

Enough reading, [check out the demos!](http://zulily.github.io/react-datum/docs/examples/)
