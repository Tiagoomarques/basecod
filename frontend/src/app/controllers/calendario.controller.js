app.controller('CalendarioCtrl', ['$scope',function($scope){
	$scope.listaDeEventos = [];
    $scope.adicionar = function(compromisso){
        $scope.listaDeEventos.push(compromisso);
        $scope.compromisso = {};
    };
}]);