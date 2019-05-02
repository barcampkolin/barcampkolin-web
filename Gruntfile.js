module.exports = function(grunt) {

    let currentYear = '2019';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            main: {
                files: [
                    {expand: true, cwd: 'assets/bower_components/bootstrap/fonts/', src: ['**'], dest: 'www/static/' + currentYear + '/fonts/'},
                    {expand: true, cwd: 'assets/fonts/icomoon/', src: ['**'], dest: 'www/static/' + currentYear + '/fonts/'},
                ],
            },
        },
        less: {
            main: {
                options: {
                    compress: true,
                    sourceMap: false
                },
                files: {
                    ['www/static/' + currentYear + '/css/main.css']: [
                        'assets/css/pure/pure.css',
                        'assets/css/icomoon.css',
                        'assets/less/main.less',
                        'assets/less/flash.less',
                        'assets/bower_components/slick-carousel/slick/slick.less'
                    ],
                    ['www/static/' + currentYear + '/css/admin.css']: [
                        'assets/bower_components/bootstrap/dist/css/bootstrap.css',
                        'assets/bower_components/happy/dist/happy.css',
                        'assets/bower_components/bootstrap-datepicker/dist/css/bootstrap-datepicker3.css',
                        'assets/bower_components/ublaboo-datagrid/assets/dist/datagrid.css',
                        'assets/bower_components/ublaboo-datagrid/assets/dist/datagrid-spinners.css',
                        'assets/bower_components/bootstrap-select/dist/css/bootstrap-select.css',
                        'assets/bower_components/semantic-ui-transition/transition.css',
                        'assets/bower_components/semantic-ui-dropdown/dropdown.css',
                        'assets/less/admin.less'
                    ]
                }
            }
        },
        uglify: {
            options: {
                sourceMap: false,
                beautify: true
            },
            default: {
                files: {
                    ['www/static/' + currentYear + '/js/main.js']: [
                        'assets/js/jquery-3.1.1.js',
                        'assets/bower_components/slick-carousel/slick/slick.js',
                        'vendor/nette/forms/src/assets/netteForms.js',
                        'assets/bower_components/nette.ajax.js/nette.ajax.js',
                        'assets/js/main.js'
                    ],
                    ['www/static/' + currentYear + '/js/admin.js']: [
                        'assets/bower_components/jquery/dist/jquery.js',
                        'assets/bower_components/nette-forms/src/assets/netteForms.js',
                        'assets/bower_components/nette.ajax.js/nette.ajax.js',
                        'assets/bower_components/happy/dist/happy.js',
                        'assets/bower_components/bootstrap-datepicker/dist/js/bootstrap-datepicker.js',
                        'assets/bower_components/jquery-ui-sortable/jquery-ui-sortable.js',
                        'assets/bower_components/ublaboo-datagrid/assets/dist/datagrid.js',
                        'assets/bower_components/ublaboo-datagrid/assets/dist/datagrid-instant-url-refresh.js',
                        'assets/bower_components/ublaboo-datagrid/assets/dist/datagrid-spinners.js',
                        'assets/bower_components/bootstrap/dist/js/bootstrap.js',
                        'assets/bower_components/bootstrap-select/dist/js/bootstrap-select.js',
                        'assets/bower_components/semantic-ui-transition/transition.js',
                        'assets/bower_components/semantic-ui-dropdown/dropdown.js',
                        'assets/bower_components/clipboard/dist/clipboard.js',
                        'assets/js/admin.js'
                    ]
                }
            }
        },
        watch: {
            js: {
                files: 'assets/js/*.js',
                tasks: ['uglify']
            },
            less: {
                files: 'assets/less/*.less',
                tasks: ['less']
            },
        },
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['copy', 'less', 'uglify']);
};