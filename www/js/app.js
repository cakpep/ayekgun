// Ionic Starter App

//variabel to set db 
var db;
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers','chart.js','ngCordova'])

.run(function($ionicPlatform, $cordovaSQLite) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

     
      // App syntax
        db = $cordovaSQLite.openDB({ name: "my.db" });
     
      // for opening a background db:
      db = $cordovaSQLite.openDB({ name: "my.db", bgType: 1 });
      console.log(db);

  // $scope.execute = function() {
  //   var query = "INSERT INTO test_table (data, data_num) VALUES (?,?)";
  //   $cordovaSQLite.execute(db, query, ["test", 100]).then(function(res) {
  //     console.log("insertId: " + res.insertId);
  //   }, function (err) {
  //     console.error(err);
  //   });
  // };

    // $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS team (id integer primary key, name text)");


  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'AppCtrl'
    })   
    .state('app.home', {
        url: '/home',
        views: {
          'menuContent': {
            templateUrl: 'templates/home.html',
            controller: 'HomeController'
          }
        }
      })  
     .state('app.pengeluarans', {
        url: '/pengeluarans',
        views: {
          'menuContent': {
            templateUrl: 'templates/pengeluaranIndex.html',
            controller: 'PengeluaranController'
          }
        }
      })        
      .state('app.grafik', {
        url: '/grafik',
        views: {
          'menuContent': {
            templateUrl: 'templates/grafik.html',          
            controller: 'GrafikController'
          }
        }
      })
      .state('app.playlists', {
        url: '/playlists',
        views: {
          'menuContent': {
            templateUrl: 'templates/playlists.html',
            controller: 'PlaylistsCtrl'
          }
        }
      })
      .state('app.single', {
        url: '/playlists/:playlistId',
        views: {
          'menuContent': {
            templateUrl: 'templates/playlist.html',
            controller: 'PlaylistCtrl'
          }
        }
      });
  // if none of the above states are matched, use this as the fallback
  // default action route
  $urlRouterProvider.otherwise('/app/home');
});
