
Path = require('path')
Util = require('bumble-util')
GitStatusUtils = require('git-status-utils')

CSS_FILES_TO_DISTRIB = [
  'css/distrib/*.css'
]


BUMBLE_DOCS_SCRIPTS = './node_modules/bumble-docs/bin/'
bumbleScriptCommand = (scriptFile, args="")-> 
  return "coffee #{Path.join(BUMBLE_DOCS_SCRIPTS, scriptFile)} #{args}"


module.exports = (grunt) ->
    
  # load plugins
  # this loads all of the grunt-... packages in package.json.  clever
  require('load-grunt-tasks')(grunt)
  pkg = grunt.file.readJSON("package.json")

  # initialize grunt
  grunt.initConfig
  
    pkg: pkg

    # args to initConfig method are the tasks
    clean:
      distrib: ["dist/#{pkg.name}.*"]
      lib: ["lib/*"]
      docsVendorLibs: ["docs/vendor/*"]
    
    
    copy:
      docVendorLibs: 
        files: [
          { src: "node_modules/react-bootstrap/dist/react-bootstrap.min.js",  dest: "docs/vendor/react-bootstrap.js"}
          { src: "dist/react-datum-datagrid.js",  dest: "docs/vendor/react-datum-datagrid.js"}
        ]
      
    # .js & .jsx use babel to build 
    babel:
      options:
        # Not using es2015 preset = ship es6 without transforming
        presets: ['stage-2', 'react']
      build: 
        files: [{
          expand: true
          cwd: 'src'
          src: ['**/*.js']
          dest: 'lib'
          ext: '.js'          
        }]

    coffee:
      build:
        files: [
          expand: true
          cwd: 'src'
          src: ['**/*.coffee']
          dest: 'lib'
          ext: '.js'
        ]
              
    cjsx:
      build:
        files: [
          expand: true
          cwd: 'src'
          src: ['**/*.cjsx']
          dest: 'lib'
          ext: '.js'
        ]
      
      
    cssmin:
      options:
        shorthandCompacting: false,
        keepBreaks: true
      distrib:
        files:[
          {src: CSS_FILES_TO_DISTRIB, dest: "dist/#{pkg.name}.css"}
        ]    
    
    shell:
      buildExamples:
        command: bumbleScriptCommand('buildExamples.coffee')

      buildDocIndex:
        command: bumbleScriptCommand('buildDocIndex.coffee')
        
      buildApiDocs: 
        command: bumbleScriptCommand('buildApiDocs.coffee')
      
      test:
        command: 'node_modules/bumble-test/bin/testRunner.coffee'
        execOptions:
          env: {NODE_ENV: 'test'}
      coverage:
        command: 'node_modules/.bin/istanbul report text-summary lcov'
    
    # end shell

    coveralls:
      options:
        force: true
      
      upload:
        src: 'coverage/lcov.info'
        

    availabletasks:
      tasks:
        options:
          filter: 'include'
          tasks: ['build', 'test', 'watch',  'clean', 'docs']
          descriptions: 
            build: "Builds everything except docs & examples"
            test: "Run tests in /test directory"
            watch: "Watch for changing files and calls build."
            docs: "Build the docs. To publish to github.io, use 'grunt build ghpages'"
            "gh-pages": "Publish the build docs to github.io"
            clean: "Remove all compiled files. Use `grunt clean build` to rebuild everything from scratch"


    watch:
      build:
        files: ["src/**/*", "css/**/*", "lib/**/*", "scripts/**/*", "webpack.config.coffee"]
        tasks: ["build"]


    webpack:
      distrib: require("./webpack.config.coffee")
      optimize: require("./webpack.config.min.coffee")


  # tasks
  grunt.registerTask 'test', ["shell:test", "shell:coverage"]
  grunt.registerTask 'distrib', ['cssmin:distrib', 'webpack:distrib', 'webpack:optimize']
  grunt.registerTask 'docs',  ['clean:docsVendorLibs', 'copy:docVendorLibs', 'shell:buildDocIndex', 'shell:buildApiDocs', 'shell:buildExamples']
  grunt.registerTask 'build', ['npmInstall', 'newer:cjsx:build', 'newer:coffee:build', 'newer:babel:build', 'distrib', 'docs']
  
  grunt.registerTask 'default', ['availabletasks']


  LAST_NPM_INSTALL_FILE = './.lastNpmInstall'
  grunt.registerTask 'npmInstall', 'runs npm install if node_modules not up to date with package.json', ->
    Util.npmInstall()
    
  grunt.registerTask 'gh-pages', 'publishes complied docs to github.io', ->
    @gitStatus = GitStatusUtils.getStatus '.'
    if @gitStatus.stagedChanges.length > 0 || @gitStatus.unstagedChanges.length > 0
      console.log "Cowardly refusing to publish to gh-pages.  Uncommitted changes exist on current branch"
      return false
    if @gitStatus.branch != 'master'
      console.log "Cowardly refusing to publish to gh-pages from branch (#{@gitStatus.branch}) other than master"
      return false
    Util.systemCmd 'git co gh-pages'
    Util.systemCmd 'git pull . master'
    Util.systemCmd 'grunt build'
    # /docs dir is normally ignored by git via .gitignore, but in the gh-pages
    #  branch /docs needs to be checked in
    Util.systemCmd 'git add docs'
    Util.systemCmd 'git push origin gh-pages'
    Util.systemCmd 'git co master'
    
    
    

