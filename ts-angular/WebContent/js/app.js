function userListController($scope, $http) {

	$http({
		method : 'GET',
		url : '//localhost:3000/users'
	}).success(function(data, status, headers, config) {
		$scope.users = data;
	});
}

function userDetailController($scope, $routeParams, $http) {
	$http({
		method : 'GET',
		url : '//localhost:3000/users/' + $routeParams.userId
	}).success(function(data, status, headers, config) {
		$scope.user = data;
	});
}

function trajetListController($scope, $routeParams, $http) {

	$http({
		method : 'GET',
		url : '//localhost:3000/users/' + $routeParams.userId,
	}).success(function(data, status, headers, config) {
		$scope.user = data;
	});

	$http({
		method : 'GET',
		url : '//localhost:3000/trajets',
	}).success(function(data, status, headers, config) {
		$scope.trajets = data;
	});

}

function billetListController($scope, $http) {
	$http({
		method : 'GET',
		url : '//localhost:3000/billets',
	}).success(function(data, status, headers, config) {
		$scope.billets = data;
	});
}

function billetListForUserController($scope, $routeParams, $http) {

	$http({
		method : 'GET',
		url : '//localhost:3000/users/' + $routeParams.userId,
	}).success(function(data, status, headers, config) {
		$scope.user = data;
	});

	$http({
		method : 'GET',
		url : '//localhost:3000/billets/user/' + $routeParams.userId,
	}).success(function(data, status, headers, config) {
		$scope.billets = data;
	});
}