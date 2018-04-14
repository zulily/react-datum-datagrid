
module.exports = 
  
  logo: "img/docs/react-datum-datagrid.logo.png",

  # these get added to the css linked to the static examples and docs and copied to 
  # docs/css
  styleSheets: [{
    path: "css/docs/docs.css"
    media: "screen"
  },{
    path: "css/docs/tilegridExample.css"
    media: "screen"
  }]

  scripts: [
    # the vendor scripts are copied from our node_modules dir by Gruntfile.coffee
    { path: "docs/vendor/react-datum.js"}  
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
    demos: []    
