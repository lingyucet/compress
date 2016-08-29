module.exports = function(grunt){
  grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      uglify:{
        options:{
          banner:'/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        build:{
          src: 'src/<%= pkg.name %>.js',
          dest:'build/<% pkg.name %>.min.js'
        }
      }
  });

 //加载插件
  grunt.loadNpmTasks('grunt-contrib-uglify');

  //执行任务列表
  grunt.registerTask('default',['uglify']);
};