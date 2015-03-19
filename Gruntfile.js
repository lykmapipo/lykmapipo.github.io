'use strict';

module.exports = function(grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    //grunt tasks config
    grunt.initConfig({
        //site configurations
        lykmapipo: {
            posts: '_posts',
            layouts: '_layouts',
            topics: 'topics',
            partials: '_partials',
            site: 'public',
            drafts: '_drafts',
            tmp: '.tmp'
        },

        //metalsmith configurations
        metalsmith: {
            lykmapipo: {
                options: {
                    metadata: {
                        title: 'lykmapipo',
                        description: 'A personal way of sharing what I know, gather and learn from others'
                    },
                    plugins: {
                        'metalsmith-ignore': [
                            '_drafts/*',
                            '_posts/index.md'
                        ],
                        'metalsmith-drafts': {},
                        'metalsmith-markdown': {},
                        'metalsmith-permalinks': {
                            pattern: ':date/:collection/:title',
                            date: 'YYYY/MM/DD'
                        },
                        'metalsmith-collections': {
                            articles: {
                                pattern: '*.md',
                                sortBy: 'date',
                                reverse: true
                            }
                        },
                        'metalsmith-templates': {
                            engine: 'handlebars',
                            directory: '_layouts'
                        },
                        'metalsmith-tags': {
                            handle: 'tags', // yaml key for tag list in you pages
                            path: '<%= lykmapipo.topics %>/:tag.html', // path for result pages
                            template: '<%= lykmapipo.layouts %>/tag.html', // template to use for tag listing
                            sortBy: 'date', // provide posts sorted by 'date' (optional)
                            reverse: true // sort direction (optional)
                        }
                    }
                },
                src: '<%= lykmapipo.posts %>',
                dest: '<%= lykmapipo.tmp %>'
            }
        },

        //connect config
        connect: {
            options: {
                port: 9000,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: 'localhost',
                livereload: 35729
            },

            livereload: {
                options: {
                    open: true
                },
                middleware: function(connect) {
                    return [
                        connect.static('.tmp'),
                        connect().use(
                            '/bower_components',
                            connect.static('./bower_components')
                        )
                    ];
                }
            }
        },

        //watch files for changes
        // Watches files for changes and runs tasks based on the changed files
        watch: {
            bower: {
                files: ['bower.json'],
                // tasks: ['wiredep']
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },
            _posts: {
                files: ['<%= lykmapipo.posts %>/**/*'],
                tasks: ['metalsmith:lykmapipo'],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },
            _layouts: {
                files: ['<%= lykmapipo.layouts %>/**/*'],
                tasks: ['metalsmith:lykmapipo'],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },
            gruntfile: {
                files: ['Gruntfile.js'],
                tasks: ['metalsmith:lykmapipo'],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= lykmapipo.posts %>/**/*'
                ]
            }
        },

        // Empties folders to start fresh
        clean: {
            lykmapipo: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= lykmapipo.site %>/{,*/}*',
                        '!<%= lykmapipo.site %>/.git{,*/}*'
                    ]
                }]
            }
        }

    });

    grunt.registerTask('serve', 'Compile then start a connect web server', function(target) {

        grunt.task.run([
            'clean:lykmapipo',
            'metalsmith:lykmapipo',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('build', [
        'metalsmith:lykmapipo'
    ]);
}
