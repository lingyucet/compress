var mozjpeg = require('imagemin-mozjpeg');
module.exports = function(grunt){
  grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      uglify:{
        options:{
          //用于在文件顶部生成一个注释  文件名  时间
          banner:'/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        build:{
          src: 'src/<%= pkg.name %>.js',
          dest:'build/<%= pkg.name %>.min.js'
        }
      },
      imagemin:{
          static:{
              options:{
                  optimizationLevel:3,
                  svgoPlugins:[{removeViewBox:false}],
                  use:[mozjpeg()]
              },
              files:{
                  'dist/img.png':'src/img.png',
                  'dist/img.jpg':'src/img.jpg',
                  'dist/img.gif':'src/img.gif'
              }
          },
          dynamic:{
              files:[{
                  expand:true,
                  cwd:'src/',
                  src:['**/*.{png,jpg,gif}'],
                  dest:'build/dist/'
              }]
          }
      },
      htmlmin:{
          dist:{            // Target
              options:{
                  removeComments:true,
                  collapseWhitespace:true
              },
              files:{
                  'build/index.html':'src/index.html',
                  'build/contact.html':'src/contact.html'
              }
          },
          dev:{                 // Another target
              files:{
                  'dist/index.html':'src/index.html',
                  'dist/contact.html':'src/contact.html'
              }
          }
      },
      cssmin:{
          options:{
              shorthandCompacting:false,
              roundingPrecision:-1
          },
          target:{
              files:[{
                  //'output.css':['foo.css','bar.css'],  //合并两个文件
                  expand:true,
                  cwd:'src/css',
                  src:['*.css','!*.min.css'],
                  dest:'build/release/css',
                  ext:'.min.css'
              }]
          }
      }
  });

 //加载插件
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  //执行任务列表
  grunt.registerTask('default',['uglify','imagemin','htmlmin','cssmin']);
};