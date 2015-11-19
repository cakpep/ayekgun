angular.module('starter.controllers', ['starter.services'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout , $ionicPopup, $ionicPlatform) {
                
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {    
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.loginModal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.loginModal.hide();
    $ionicPopup.alert({
              title: 'Success',
              content: 'Anda Berhasil Hello World!!!'
            }).then(function(res) {
              console.log('Test Alert Box');
            });    
  };

  // Open the login modal
  $scope.login = function() {
    $scope.loginModal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

  /********************************************************************************************
    * proses pengeluaran
    */
  // Form data for the login modal
  $scope.pengeluaranData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/pengeluaran.html', {    
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.pengeluaranModal = modal;
  });
  
  // Open the login modal
  $scope.pengeluaran = function() {
    $scope.pengeluaranModal.show();
  };

  // Triggered in the login modal to close it
  $scope.closePengeluaran = function() {
    $scope.pengeluaranModal.hide();    
  };

  // Perform the login action when the user submits the login form
  $scope.doSavePengeluaran = function() {
    console.log('Data pengeluaran', $scope.pengeluaranData);
    alert($scope.pengeluaranData.nama);    
  };

  //*******************************************************************************************
  //* end proses pengeluaran
    

  /********************************************************************************************
    * proses pemasukan
    */
  // Form data for the login modal
  $scope.pemasukanData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/pemasukan.html', {    
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.pemasukanModal = modal;
  });
  // Open the login modal
  $scope.pemasukan = function() {
    $scope.pemasukanModal.show();
  };

  // Triggered in the login modal to close it
  $scope.closePemasukan = function() {
    $scope.pemasukanModal.hide();    
    
  };

  // Perform the login action when the user submits the login form
  $scope.doSavePemasukan = function() {
    console.log('Data pemasukan', $scope.pemasukanData);
    alert($scope.pemasukanData.nama);    
  };

  // Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
      $scope.loginModal.remove();
      $scope.pengeluaranModal.remove();
      $scope.pemasukanModal.remove();    
  });


})

.controller('HomeController', function($scope,$stateParams,Session) {
  $scope.pengeluarans = [
    { title: 'ngopi', jumlah: 2000, id: 3 },
    { title: 'burjo', jumlah: 2000, id: 4 },
    { title: 'Rap',   jumlah: 0, id: 5 },
    { title: 'Cowbe', jumlah: null, id: 6 },
    { title: 'makan', jumlah: 2000, id: 1 },
    { title: 'minum', jumlah: 2000, id: 2 }    
  ];
  $scope.welcome = 'hello World';
  //using session 
  $scope.sessions = Session.query();  
  $scope.session = Session.get({sessionId: $stateParams.sessionId});
  console.log($scope.session);  
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'makan', jumlah: 2000, id: 1 },
    { title: 'minum', jumlah: 2000, id: 2 },
    { title: 'ngopi', jumlah: 2000, id: 3 },
    { title: 'burjo', jumlah: 2000, id: 4 },
    { title: 'Rap',   jumlah: 0, id: 5 },
    { title: 'Cowbe', jumlah: null, id: 6 }
  ];
})

.controller('PengeluaranController', function($scope) {
  $scope.pengeluarans = [
    { title: 'ngopi', jumlah: 2000, id: 3 },
    { title: 'burjo', jumlah: 2000, id: 4 },
    { title: 'Rap',   jumlah: 0, id: 5 },
    { title: 'Cowbe', jumlah: null, id: 6 },
    { title: 'makan', jumlah: 2000, id: 1 },
    { title: 'minum', jumlah: 2000, id: 2 }
    
  ];
  
})

.controller('GrafikController', function($scope) {
 
    $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
    $scope.series = ['Series A', 'Series B'];
    $scope.data = [
        [65, 59, 80, 81, 56, 55, 40],
        [28, 48, 40, 19, 86, 27, 90]
    ];

    $scope.polarData = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        data: [65, 59, 80, 81, 56, 55, 40],
    };
 
})

.controller(['HomeController','PlaylistCtrl','PengeluaranController','GrafikController'], function($scope, $stateParams) {
});
