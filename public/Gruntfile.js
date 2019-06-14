module.exports = function(grunt) {
	grunt.initConfig({
	  sass: {                             
		dist: {                           
		  options: {                   
			style: 'expanded'
		  },
		  files: {                        
			'assets/css/main.css': 'sass/main.sass'  
		  }
		}
	  },
	  concat: {
		  js: {
			  src: "js/*.js",
			  dest: "assets/js/concat.js"
		  }
	  },
	  uglify: {
		  my_target: {
			  files: {
				  "assets/js/concat.min.js": "assets/js/concat.js"
			  }
		  }
	  },
	  watch: {
		sass: {
		  files: ['sass/*.sass'],
		  tasks: ['sass',],
		  options: {
			spawn: false,
		  }
		},
		concat: {
			files: ['js/*.js'],
			tasks: ['concat', 'uglify'],
			options: {
				spawn: false,
			}
		}
	  }
	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['watch']);
}