var app = angular.module("GRASSPApp");
var cafeHelsingborg = angular.module("cafeApp");

app.service('weatherService', ['$http', function ($http) {
    var weatherData = {
        weatherResult: function () {
            var city = "helsingborg"
            var url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=a6c98c5f1512ef700db17185202188c4&units=metric";
            return $http.get(url)
                .then(function (data) {
                    console.log(data)
                    return data;
                })
        }
    };
    return weatherData;
}]);

app.factory('facebookService', function($q) {
    return {
        getMyLastName: function() {
            var deferred = $q.defer();
            FB.api('/me', {
                fields: 'last_name'
            }, function(response) {
                if (!response || response.error) {
                    deferred.reject('Error occured');
                } else {
                    deferred.resolve(response);
                }
            });
            return deferred.promise;
        }
    }
});

cafeHelsingborg.factory('cafeSearch',['$http', function ($http){
    var cafeSearchData = {
        cafeSearchResult: function () {
            var url =" https://helsingborg.opendatasoft.com/api/records/1.0/search/?dataset=smileygodkanda-platser-i-helsingborg&rows=25&facet=kategori_text";
            return $http.get(url)
            .then(function (data){
                console.log(data)
                return data;
            })
        }
    };
    return cafeSearchData;
}]);
 
cafeHelsingborg.service('cafeService',['$http', function ($http) {
    var cafeData = {
        cafeResult: function () {
            var url= "https://helsingborg.opendatasoft.com/api/records/1.0/search/?dataset=smileygodkanda-platser-i-helsingborg&rows=25&facet=kategori_text&refine.kategori_text=Caf%C3%A9";
            return $http.get(url)
            .then(function (data) {
            console.log(data)
            return data;
            })
        }
    };
    return cafeData;
}]);

/*cafeHelsingborg.service('cafeSearchMap',['$http','$sce', function ($http,$sce) {
    var cafeData = {
        cafeMapResult: function (url) {
            var location=url
            console.log(location)
            //console.log(location.join())
            var url= "https://helsingborg.opendatasoft.com/explore/embed/dataset/smileygodkanda-platser-i-helsingborg/map/?rows=25&dataChart=eyJxdWVyaWVzIjpbeyJjb25maWciOnsiZGF0YXNldCI6InNtaWxleWdvZGthbmRhLXBsYXRzZXItaS1oZWxzaW5nYm9yZyIsIm9wdGlvbnMiOnsicm93cyI6IjI1IiwicmVmaW5lLmthdGVnb3JpX3RleHQiOiJDYWZcdTAwRTkifX0sImNoYXJ0cyI6W3siYWxpZ25Nb250aCI6dHJ1ZSwidHlwZSI6ImNvbHVtbiIsImZ1bmMiOiJBVkciLCJ5QXhpcyI6Im9iamVjdGlkIiwic2NpZW50aWZpY0Rpc3BsYXkiOnRydWUsImNvbG9yIjoiIzY2YzJhNSJ9XSwieEF4aXMiOiJrYXRlZ29yaV90ZXh0IiwibWF4cG9pbnRzIjo1MCwic29ydCI6IiJ9XSwidGltZXNjYWxlIjoiIiwiZGlzcGxheUxlZ2VuZCI6dHJ1ZSwiYWxpZ25Nb250aCI6dHJ1ZX0%3D&refine.kategori_text=Caf%C3%A9& "+location+" &basemap=jawg.light";
            return $http.get(url)
            .then(function (data) {
            console.log(data)
            return data;
            })
        }
    };
    return cafeData;
}]);*/
 
cafeHelsingborg.service('restaurantService',['$http', function ($http) {
    var cafeData = {
        restaurantResult: function () {
            var url= "https://helsingborg.opendatasoft.com/api/records/1.0/search/?dataset=smileygodkanda-platser-i-helsingborg&rows=14&facet=kategori_text&refine.kategori_text=Restaurang";
            return $http.get(url)
            .then(function (data) {
            console.log(data)
            return data;
            })
        }
    };
    return cafeData;
}]);


