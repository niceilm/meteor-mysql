Package.describe({
  name: 'flynn:mysql',
  version: '0.0.2',
  // Brief, one-line summary of the package.
  summary: 'nodejs mysql driver wrapper',
  // URL to the Git repository containing the source code for this package.
  git: 'git@github.com:niceilm/meteor-mysql.git',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Npm.depends({
  mysql: "2.9.0"
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use('ecmascript');
  api.use('stevezhu:lodash@3.10.1');
  api.use('flynn:logger@0.0.4');
  api.addFiles('mysql.js', 'server');
  api.export('MySQL', 'server');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('flynn:mysql');
  api.addFiles('mysql-tests.js');
});
