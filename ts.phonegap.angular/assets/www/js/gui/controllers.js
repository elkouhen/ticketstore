function userListController($scope) {
	$scope.users = userDaoModule.all();
}

function userDetailController($scope, $routeParams) {
	$scope.user = userDaoModule.findById($routeParams.userId);
}

function trajetListController($scope, $routeParams) {

	$scope.user = userDaoModule.findById($routeParams.userId);

	$scope.trajets = trajetDaoModule.all();
}

function billetListController($scope) {
	$scope.billets = billetDaoModule.all();
}

function billetListForUserController($scope, $routeParams) {
	
	$scope.user = userDaoModule.findById($routeParams.userId);
	$scope.billets = billetDaoModule.allForUser($routeParams.userId);
}