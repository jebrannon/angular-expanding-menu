app.directive('ngExpandingMenu', ['$window', '$interval', function($window, $interval) {
	return {
		restrict: 'A',
		replace: false,
		link: function(scope, elem, attrs) {
			var _isNestedMenu = (attrs.ngExpandingMenuIsNested && attrs.ngExpandingMenuIsNested === 'true') ? true : false;
			var _bubbleLimit = 5;


			var _handleEvent = function (e) {
				var eventType = e.type ? e.type : e.name;
				switch(eventType) {
					case 'click':
						_onMouseEventClick(angular.element(e.target));
						break;
					case 'mouseover':
						// _mouseOverEvent(angular.element(e.target));
						break;
					case 'mouseout':
						// _mouseOutEvent(angular.element(e.target));
						break;
				}
			};
			var _handleAttributeBubbling = function ($el, _attr) {
				/*
					This method's purpose is to determine if there is a parent filter for any item selected
				*/
				var _limit = _bubbleLimit;
				var _$el = $el.parent();
				while (_limit--) {
					if (_$el && _$el.attr('data-ng-filter')) {
						return _$el.attr('data-ng-filter');
					}
					_$el = _$el.parent();
				}
				return false;
			};
			var _onMouseOverEvent = function ($el) {
				if ($el.hasClass(isMenuSelector)) console.log('mouseover:', 'menu');
				if ($el.hasClass(isNestedSelector)) console.log('mouseover:', 'nested');
			};
			var _onMouseOutEvent = function ($el) {
				if ($el.hasClass(isMenuSelector)) console.log('mouseout:', 'menu');
				if ($el.hasClass(isNestedSelector)) console.log('mouseout:', 'nested');
			};
			var _onMouseEventClick = function ($el) {
				var _filter = $el.attr('data-ng-filter');
				var _parentFilder = _handleAttributeBubbling($el, 'data-ng-filter');

				if (_isNestedMenu && _filter && _parentFilder) {
					_filter = _parentFilder + '|' + _filter;
					console.log('_filter: ', _filter);
				}
				else if (!_isNestedMenu && _filter) {
					_filter = _filter;
					console.log('_filter: ', _filter);
				}
			};


			//  Listeners
			elem.on('click', _handleEvent);
			// elem.on('mouseover', _handleEvent);
			// elem.on('mouseout', _handleEvent);
		}
  };
}]);