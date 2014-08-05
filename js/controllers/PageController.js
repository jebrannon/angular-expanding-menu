app.controller("pageController", function($scope, $window, $timeout){
	$scope.understand = "Now lets play with infinite scrollers!";
	$scope.items = [
		{name: 'Darnell'},
		{name: 'Jesica'},
		{name: 'Derrick'},
		{name: 'Kori'},
		{name: 'Kiana'},
		{name: 'Bruno'},
		{name: 'Adolfo'},
		{name: 'Francisca'},
		{name: 'Shanta'},
		{name: 'Lamonica'}
	];

	$scope.$watch('items', function (data) {
  	$scope.$broadcast('loadComplete', data);
  }, true);

	$scope.$on('loadMoreItems', function() {
		
		$timeout(function() {
			$scope.items.push(
				{name: 'Ghandi'},
				{name: 'Jerry'},
				{name: 'Peter'},
				{name: 'Keith'},
				{name: 'Roberto'}
			);
			console.log('loadMoreItems');
		}, 2000);
	});
});