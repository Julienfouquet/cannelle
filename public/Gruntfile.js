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
	  watch: {
		scripts: {
		  files: ['sass/*.sass'],
		  tasks: ['sass'],
		  options: {
			spawn: false,
		  },
		}
	  }
	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['watch']);
}