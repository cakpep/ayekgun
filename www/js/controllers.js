angular.module('starter.controllers', ['starter.services'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout , $ionicPopup, $ionicPlatform) {
                
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  /********************************************************************************************
    * proses pengeluaran
    */
  // Form data for the login modal
  $scope.pengeluaranData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/pengeluaran/pengeluaran.html', {    
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
    

  
  
  // start of modal category settings
  // Form data for the category modal  
  $scope.categoryData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/settings/category.html', {    
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.categoryModal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeCategory = function() {
    $scope.categoryModal.hide();
    $ionicPopup.alert({
              title: 'Success',
              content: 'Category Berhasil Di Simpan'
            }).then(function(res) {
              console.log('Test Alert Box');
            });    
  };

  // Open the login modal
  $scope.category = function() {
    $scope.categoryModal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doSaveCategory = function() {
    console.log('save data category', $scope.categoryData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
  // end of modal category settings
  // Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {      
      $scope.pengeluaranModal.remove();
      $scope.pemasukanModal.remove();
      $scope.categoryModal.remove();
  });


})
.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state) {
    $scope.data = {};
 
    $scope.login = function() {
        LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {
            $state.go('app.home');
        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
            });
        });
    }
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

.controller('PengeluaranController', function($scope,$stateParams) {
  $scope.pengeluarans = [
    { title: 'ngopi', jumlah: 2000, id: 3 },
    { title: 'burjo', jumlah: 2000, id: 4 },
    { title: 'Rap',   jumlah: 0, id: 5 },
    { title: 'Cowbe', jumlah: null, id: 6 },
    { title: 'makan', jumlah: 2000, id: 1 },
    { title: 'minum', jumlah: 2000, id: 2 }
    
  ];
  
})

.controller('PemasukanController', function($scope,$ionicModal, $ionicPopup, $cordovaSQLite,$stateParams) {
    var data = [];
        
    /********************************************************************************************
    * proses pemasukan
    */
    // Form data for the login modal
    $scope.pemasukanData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/pemasukan/pemasukan.html', {    
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
    
//    $scope.selectAll = function() {
        var query = "SELECT * FROM pemasukan";
        var data =  $cordovaSQLite.execute(db, query).then(function(res) {
            if(res.rows.length > 0) {
                //console.log("SELECTED -> " + res.rows.item(0).nama_pemasukan + " " + res.rows.item(0).jumlah);                
                for(i=0;i<res.rows.length;i++){
                    data[i] = res.rows.item(i);
//                  data.push(res.rows.item(i));

                }                
                $scope.pemasukans = data;                
            } else {
                console.log("No results found");
            }
        }, function (err) {
            console.error(err);
        });        
//    }
    
    if($stateParams.pemasukanId){
        var dataDetil= [];
        var id = $stateParams.pemasukanId;           
        var query = "SELECT * FROM pemasukan where id ="+id;
        var data =  $cordovaSQLite.execute(db, query).then(function(res) {
            if(res.rows.length > 0) {                
                for(i=0;i<res.rows.length;i++){
                    dataDetil = res.rows.item(i);          
                }                
                $scope.pemasukanDetil = dataDetil;
                console.log($scope.pemasukanDetil);
            } else {
                console.log("No results found");
            }
        }, function (err) {
            console.error(err);
        }); 
        
    }else{
        console.log('params not found');
    }
    
    $scope.select = function() {     
        console.log($stateParams.pemasukanId);
        var query = "SELECT firstname, lastname FROM people WHERE lastname = ?";
        $cordovaSQLite.execute(db, query, [lastname]).then(function(res) {
            if(res.rows.length > 0) {
                console.log("SELECTED -> " + res.rows.item(0).firstname + " " + res.rows.item(0).lastname);
            } else {
                console.log("No results found");
            }
        }, function (err) {
            console.error(err);
        });
    }
    
    // Perform the login action when the user submits the login form
    $scope.doSavePemasukan = function() {        
            var data = $scope.pemasukanData;
            var query = "INSERT INTO pemasukan (nama_pemasukan, jumlah, keterangan) VALUES (?,?,?)";
            $cordovaSQLite.execute(db, query, [data.nama_pemasukan, data.jumlah, data.keterangan]).then(function(res) {
                console.log("INSERT ID -> " + res.insertId);
                var alertPopup = $ionicPopup.alert({
                    title: 'Success',
                    template: 'data '+res.insertId+' berhasil disimpan'
                });
                $scope.pemasukanModal.hide();    
            }, function (err) {
                console.error(err);
                var alertPopup = $ionicPopup.alert({
                    title: 'Error',
                    template: 'data gagal disimpan'
                });
            });
    };
  
})

.controller('GrafikController', function($scope,$cordovaSQLite) {
 
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
.controller('SettingsController', function($scope,$ionicModal, $ionicPopup) {
    
});
