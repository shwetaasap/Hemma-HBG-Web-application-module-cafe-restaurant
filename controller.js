var app = angular.module("GRASSPApp");
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
//
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
    
app.controller('AuthCtrl', ['$scope', '$location', '$firebaseAuth','facebookService', function ($scope, $location, $firebaseAuth) {
    $firebaseAuth().$onAuthStateChanged(function (user) {
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

  //facebook sign in function
    $scope.signInWithFacebook = function () {
        var auth = $firebaseAuth();
        //console.log(firebase);
        var provider = new firebase.auth.FacebookAuthProvider();
        auth.$signInWithPopup(provider)
      
        .then(function (result) {
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            console.log(user);
            // locatino chanage or something to do wit your app....
        })
        .catch(function (err) {
            console.log(err);
        })
    };

    //google sign in function
    $scope.signInWithGoogle = function () {
        var auth = $firebaseAuth();
        var provider = new firebase.auth.GoogleAuthProvider();
        
        $firebaseAuth().$signInWithPopup(provider)
      
        .then(function (result) {
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // locatino chanage or something to do wit your app....
        })
        .catch(function (err) {
            console.log(err);
            
        })
    };
}]);
//calling current weather information for displaying in main page
app.controller('getWeatherCtrl', ['$scope', 'weatherService', function ($scope, weatherService) {

    weatherService.weatherResult()
        .then(function (result) {
            $scope.weatherResult = result.data.main.temp;
            $scope.weatherResult_description = result.data.weather[0].description;
            /*$scope.weatherResult_icon = result.data.weather[0].icon;*/
        });
}]);
//search result menu 
cafeHelsingborg.controller('cafeSearchCtrl',['$scope','cafeSearch', function ($scope,cafeSearch){
    cafeSearch.cafeSearchResult()
    .then(function (result){
        console.log(result);
    })
}]);
//displaying data after calling api of cafe if selected from drop down menu 
cafeHelsingborg.controller('cafeServiceCtrl',['$scope','cafeService','$location','$sce',function ($scope,cafeService,$location,$sce) {
   
    cafeService.cafeResult()
    .then(function (output){
        var  array=output.data.records;
        $scope.outputArray = array;
       $scope.cafeMaps = function(selectedNamn) {
        var coordinates=selectedNamn;
        console.log(coordinates)
        var coordinate_noBracket= coordinates[0]
        var coordinates_second= coordinates[1];
        console.log(coordinate_noBracket,coordinates_second)
      
        var url=$sce.trustAsResourceUrl("https://helsingborg.opendatasoft.com/api/records/1.0/search/?dataset=smileygodkanda-platser-i-helsingborg&rows=25&facet=kategori_text&refine.kategori_text=Caf%C3%A9&geofilter.distance="+coordinate_noBracket+","+coordinates_second);
        $location.path('/cafe-map/'+coordinate_noBracket+ ',' +coordinates_second);
    };
    });
}]);
//map diaplay of cafe after passing coordinates and location value along with location zoom level no services made directly from one controller to another controller value is passed
cafeHelsingborg .controller('cafeSearchMapCtrl',['$scope','$routeParams','$sce',function ($scope,$routeParams,$sce) {
        var coordinate =$routeParams.coordinate_noBracket;
    console.log(coordinate)
    $scope.url=$sce.trustAsResourceUrl("https://helsingborg.opendatasoft.com/explore/embed/dataset/smileygodkanda-platser-i-helsingborg/map/?geofilter.distance=" + coordinate + "&location=17," + coordinate + "&basemap=jawg.light&static=false&datasetcard=false&scrollWheelZoom=true");
    //$scope.url=$sce.trustAsResourceUrl("https://helsingborg.opendatasoft.com/explore/embed/dataset/leder/map/?rows=65&location=10,56.09118,12.73625&basemap=jawg.streets&static=false&datasetcard=false&scrollWheelZoom=true");
}]);

//displaying data after calling api of restaurant if selected from drop down menu 
cafeHelsingborg.controller('restaurantServiceCtrl',['$scope','restaurantService','$location','$sce',function ($scope,restaurantService,$location,$sce) {
   
        restaurantService.restaurantResult()
        .then(function (output){
            var  array=output.data.records;
            $scope.outputArray = array;
           $scope.cafeMaps = function(selectedNamn) {
            var coordinates=selectedNamn;
            console.log(coordinates)
            var coordinate_noBracket= coordinates[0]
            var coordinates_second= coordinates[1];
            console.log(coordinate_noBracket,coordinates_second)
            var url=$sce.trustAsResourceUrl(" https://helsingborg.opendatasoft.com/api/records/1.0/search/?dataset=smileygodkanda-platser-i-helsingborg&rows=14&facet=kategori_text&refine.kategori_text=Restaurang&geofilter.distance="+coordinate_noBracket+","+coordinates_second);
            $location.path('/restaurant-map/'+coordinate_noBracket+ ',' +coordinates_second);
        };
        });
}]);

//displaying restaurant location on map 
cafeHelsingborg.controller('restaurantMapCtrl',['$scope','$routeParams','$sce',function ($scope,$routeParams,$sce) {
        var coordinate=$routeParams.coordinate_noBracket; 
        console.log(coordinate)
        $scope.url=$sce.trustAsResourceUrl("https://helsingborg.opendatasoft.com/explore/embed/dataset/smileygodkanda-platser-i-helsingborg/map/?rows=14&geofilter.distance=" + coordinate + "&refine.kategori_text=Restaurang&location=17," + coordinate + "&basemap=jawg.light&static=false&datasetcard=false&scrollWheelZoom=true")

}]);











