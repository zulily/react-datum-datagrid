
module.exports = 
  
  logo: "img/docs/react-datum-datagrid.logo.png",

  # these get added to the css linked to the static examples and docs and copied to 
  # docs/css
  styleSheets: [{
    path: "css/docs/docs.css"
    media: "screen"
  },{
    path: "dist/react-datum-datagrid.css"
    media: "screen"
  }]

  scripts: [
    # the vendor scripts are copied from our node_modules dir by Gruntfile.coffee
    { path: "docs/vendor/react-datum-datagrid.js" },  
    { path: "docs/vendor/react-bootstrap.js" },  
    { path: "docs/vendor/react-virtualized-9.18.5.js"}
    { path: "/test/lib/puppyData.js" }
  ]
  
  apiDocs: {
    sections: [{
      label: "Datagrid" 
      path: "src/?(*.coffee|*.cjsx)"
    }]
  }

  examples: 
    root: 'examples'
    demos: [{
      id: "basic",
      name: "Basic Datagrid Demo",
      path: "basicDatagrid/basicDatagrid.jsx",
      description: "This demo shows how simple it is to create a basic react-datum-datagrid.", 
      thumbnailUrl: "http://zulily.github.io/react-datum-datagrid/img/docs/basicDatagridDemo.png"  
    },{
      id: "editable",
      name: "Editable Datagrid Demo",
      path: "editing/editing.jsx",
      description: "This demo shows how to create an editable react-datum-datagrid.", 
      thumbnailUrl: null  
    },{
      id: "rvIssue",
      name: "React Virtualized Issue Demo",
      path: "reactVirtualizedIssue/demo.jsx",
      description: "This demo shows how to create an editable react-datum-datagrid.", 
      thumbnailUrl: null  
    }]    
