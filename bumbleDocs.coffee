
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
    { path: "/test/lib/kittenData.js" }
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
      thumbnailUrl: "http://zulily.github.io/react-datum-datagrid/img/docs/react-datum_model-example.png"  
    }]    
