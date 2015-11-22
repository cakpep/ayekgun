// Ionic Starter App

//variabel to set db 
var db;
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ngCordova', 'starter.controllers', 'chart.js'])

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
//        db = $cordovaSQLite.openDB({ name: "my.db" });
        // for opening a background db:
//        db = $cordovaSQLite.openDB({ name: "my.db", bgType: 1 });
        
        if (window.cordova) {
            db = $cordovaSQLite.openDB({ name: "my.db" }); //device
        }else{
            db = window.openDatabase("my.db", '1', 'my', 1024 * 1024 * 100); // browser
        }                
        
        $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS people (id integer primary key, firstname text, lastname text)");
        $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS pemasukan (id integer primary key, nama_pemasukan text, jumlah int, keterangan text)");
        
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
     .state('login', {
        url: '/login',
        templateUrl: 'templates/index/login.html',
        controller: 'LoginCtrl'
    })
    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/layouts/menu.html',
      controller: 'AppCtrl'
    })   
    .state('app.home', {
        url: '/home',
        views: {
          'menuContent': {
            templateUrl: 'templates/index/home.html',
            controller: 'HomeController'
          }
        }
      })  
     .state('app.pengeluarans', {
        url: '/pengeluarans',
        views: {
          'menuContent': {
            templateUrl: 'templates/pengeluaran/index.html',
            controller: 'PengeluaranController'
          }
        }
      })
      .state('app.pengeluaran', {
        url: '/pengeluarans/:pemasukanId',
        views: {
          'menuContent': {
            templateUrl: 'templates/pengeluaran/detil.html',
            controller: 'PengeluaranController'
          }
        }
      })
      .state('app.pemasukans', {
        url: '/pemasukans',
        views: {
          'menuContent': {
            templateUrl: 'templates/pemasukan/index.html',
            controller: 'PemasukanController'
          }
        }
      })
      .state('app.pemasukan', {
        url: '/pemasukans/:pemasukanId',
        views: {
          'menuContent': {
            templateUrl: 'templates/pemasukan/detil.html',
            controller: 'PemasukanController'
          }
        }
      })
      .state('app.grafik', {
        url: '/grafik',
        views: {
          'menuContent': {
            templateUrl: 'templates/grafik/grafik.html',          
            controller: 'GrafikController'
          }
        }
      });
  // if none of the above states are matched, use this as the fallback
  // default action route
  // $urlRouterProvider.otherwise('/app/home');
  $urlRouterProvider.otherwise('/login');
});
