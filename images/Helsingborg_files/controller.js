var app = angular.module("helsingborgApp");
var cafeHelsingborg = angular.module("cafeApp");

app.controller('FirstController', ['$scope', '$firebaseAuth', function ($scope, $firebaseAuth) {
    console.log($firebaseAuth());
    $firebaseAuth().$onAuthStateChanged(function (user) {
        console.log(user);
        if (user) {
            $scope.user = user;
        } else {
            $scope.user = null;
        }
    })
}]);
//controller som heter Signupcontroller, 3 moduler, $scope , $firebaseAuth , $location.
app.controller('SignUpController', ['$scope', '$firebaseAuth', '$location', function ($scope, $firebaseAuth, $location) {
    $scope.signUp = function (user) {
        $firebaseAuth().$createUserWithEmailAndPassword(user.email, user.password)
            .then(function (fireUser) {
                if (fireUser) {
                    var theUser = firebase.auth().currentUser;
                    // console.log(theUser)
                    theUser.updateProfile({
                        displayName: user.username
                    })
                        .then(function () {
                            // if successful
                        })
                        .catch(function () {
                            // if error
                        });
                    firebase.database().ref('users/' + fireUser.uid).set({
                        username: user.username
                    });

                    $location.path('/');
                }
            })
            .catch(function (err) {
                $scope.error = err.message;
            })

    };
}]);
app.controller('LogInController', ['$scope', '$firebaseAuth', '$location', function ($scope, $firebaseAuth, $location) {
    $scope.login = function (user) {
        $firebaseAuth().$signInWithEmailAndPassword(user.email, user.password)
            .then(function (user) {
                $location.path('/');
            })
            .catch(function (err) {
                $scope.error = err.message;
            })

    };
}]);
app.controller('SignInController', ['$scope','$location', function ($scope,$location) {
   
            $scope.onSignIn= function() {
                base_provider = new firebase.auth.GoogleAuthProvider();
                firebase.auth().signInWithPopup(base_provider)
                .then(function(result){
            
             // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            console.log(token)
         // The signed-in user info.
          var user = result.user;
          console.log(user)
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
                //var id_token = profile.getAuthResponse().id_token;

                //.then(function(profile){
                    //var token = (profile.credential.accessToken);
                    //console.log(token)
                    // Useful data for your client-side scripts:
                //console.log("ID: " + profile.getId()); // Don't send this directly to your server!
                /*console.log('Full Name: ' + profile.getName());
                console.log('Given Name: ' + profile.getGivenName());
                console.log('Family Name: ' + profile.getFamilyName());
                console.log("Image URL: " + profile.getImageUrl());
                console.log("Email: " + profile.getEmail());
        
                // The ID token you need to pass to your backend:
                
                //console.log("ID Token: " + id_token);
              });
              //$location.path('/');
            })
        .catch(function (err) {
            $scope.error = err.message;
        });*/
    
    }
}]);
app.controller('AuthCtrl', ['$scope', '$location', '$firebaseAuth', function ($scope, $location, $firebaseAuth) {
    $firebaseAuth().$onAuthStateChanged(function (user) {
        console.log(user);
        if (user) {
            $scope.user = user;
        } else {
            $scope.user = null;
        }
    });
    $scope.signOut = function () {
        $firebaseAuth().$signOut();
        $location.path('/');
    }
}]);

app.controller('getWeatherCtrl', ['$scope', 'weatherService', function ($scope, weatherService) {

    weatherService.weatherResult()
        .then(function (result) {
            console.log(result)
            $scope.weatherResult = result.data.main.temp;
            $scope.weatherResult_description = result.data.weather[0].description;
            /*$scope.weatherResult_icon = result.data.weather[0].icon;*/
      
        });
}]);

cafeHelsingborg .controller('cafeSearchCtrl',['$scope','cafeSearch', function ($scope,cafeSearch){
    cafeSearch.cafeSearchResult()
    .then(function (result){
        console.log(result);
    })
}]);

cafeHelsingborg .controller('cafeServiceCtrl',['$scope','cafeService','$location',function ($scope,cafeService,$location) {
   
    cafeService.cafeResult()
    .then(function (output){
       console.log(output)
        var  array=output.data.records;
        $scope.outputArray = array;
       $scope.cafeMaps = function(selectedNamn) {
        var coordinates=selectedNamn;
        $location.path('/cafe-map/' + coordinates);
    };
        /*for (i=0;i<outputArray.length;i++){
            $scope.name= outputArray[i].fields.namn;
            $scope.website= outputArray[i].fields.hemsida;
            $scope.address=outputArray[i].fields.adress;
            $scope.result += "Name is " + $scope.name + "And Address is " + $scope.address + "And website is " +  $scope.website;
        } Calling array for display ---another way of doing*/
        //console.log($scope.name, $scope.website,$scope.address) 
    });
}]);

cafeHelsingborg .controller('cafeSearchMapCtrl',['$scope','cafeSearchMap',,'$routeParams',function ($scope,cafeSearchMap,$routeParams) {
    var geo_shape = $routeParams.coordinates;
    cafeSearchMap.cafeMapResult(geo_shape)
    .then(function (output){
       console.log(output)
        var  array=output.data.records;
        $scope.mapResult=array;
    });
}]);

