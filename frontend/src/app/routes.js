app.config(["$routeProvider", function($routeProvider){
    // $locationProvider.html5Mode(true);

    $routeProvider
    .when("/home", {
        templateUrl : "../views/home.html"
    })
    .when("/calendario", {
        controller: "CalendarioCtrl",
        templateUrl : "../views/calendario.html"
    })
    .when("/config", {
        templateUrl : "../views/configDashboard.html"
    })
    .when("/perfil", {
        templateUrl : "../views/perfil.html"
    })
    .otherwise({
        redirectTo: "home"
    });
}]);



