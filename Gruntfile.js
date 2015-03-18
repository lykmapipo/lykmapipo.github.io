'use strict';

module.exports = function(grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    //grunt tasks config
    grunt.initConfig({
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
                            'pattern': ':title'
                        },
                        'metalsmith-collections': {
                            'articles': {
                                'pattern': '*.md',
                                'sortBy': 'date',
                                'reverse': true
                            }
                        },
                        'metalsmith-templates': {
                            'engine': 'handlebars',
                            'directory': '_layouts'
                        }
                    }
                },
                src: '_posts',
                dest: '_site'
            }
        }
    });
}
