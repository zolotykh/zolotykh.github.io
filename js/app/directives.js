/* global window, document */

;(function () {
    'use strict';

    angular.module('app')
        .directive('route', route)
    ;

    route.$inject = ['AppRoutes'];

    function route(AppRoutes){
        var routes = AppRoutes.routes;

        return {
            restrict: 'A'
            , replace: false
            , scope: {
                params: '='
            }
            , link: function($scope, el, attr){
                el.attr('href', _route(attr.route, $scope.params || {}));
            }
        };

        function _route(name, options){
            var path = routes[name];

            if (!path) return '/404';

            path = path.path ? path.path : '/' + name;

            if (angular.isObject(options)){
                angular.forEach(options, function(v, k){
                    path = path.replace(':' + k, v);
                });
            }

            return '#' + path;
        }
    }
})();