app.config(["$routeProvider", function($routeProvider){
    // $locationProvider.html5Mode(true);

    $routeProvider
    .when("/home", {
    templateUrl : "../views/home.html",
    })
    .when("/calendario", {
    templateUrl : "../views/calendario.html",
    })
    .when("/config", {
    templateUrl : "../views/configDashboard.html",
    })
    .when("/perfil", {
    templateUrl : "../views/perfil.html",
    })
    .otherwise({
    redirectTo: "home",
    });
}]);


app.controller('controller', ['$scope',function($scope){
    $scope.adicionar = function(){
        console.log($scope.nome);
    };
}]);

// angular.module("app" , []);
// angular.module("app").controller("ExampleController" , function($scope){
//     $scope.adicionar = function(){
//        console.log($scope.nome);
//     };
// });
