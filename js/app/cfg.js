/* global angular */

;(function(){
    'use strict';

    angular
        .module('app')
        .config(['$routeProvider', '$provide', routeProvider])
        .config(httpProvider)
        .config(interpolateProvider)
    ;

    // or httpParamSerializerJQLike
    httpProvider.$inject = ['$httpProvider'];

    function httpProvider($httpProvider) {
        // Use x-www-form-urlencoded Content-Type
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
        $httpProvider.defaults.xsrfCookieName = '';
        $httpProvider.defaults.xsrfHeaderName = '';

        // Override $http service's default transformRequest
        $httpProvider.defaults.transformRequest = [function (data) {
            /**
             * The workhorse; converts an object to x-www-form-urlencoded serialization.
             * @param {Object} obj
             * @return {String}
             */
            var param = function (obj) {
                var query = '';
                var name, value, fullSubName, subName, subValue, innerObj, i;

                for (name in obj) {
                    value = obj[name];

                    if (value instanceof Array) {
                        for (i = 0; i < value.length; ++i) {
                            subValue = value[i];
                            fullSubName = name + '[' + i + ']';
                            innerObj = {};
                            innerObj[fullSubName] = subValue;
                            query += param(innerObj) + '&';
                        }
                    }
                    else if (value instanceof Object) {
                        for (subName in value) {
                            subValue = value[subName];
                            fullSubName = name + '[' + subName + ']';
                            innerObj = {};
                            innerObj[fullSubName] = subValue;
                            query += param(innerObj) + '&';
                        }
                    }
                    else if (value !== undefined && value !== null) {
                        query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
                    }
                }

                return query.length ? query.substr(0, query.length - 1) : query;
            };

            return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
        }];
    }


    interpolateProvider.$inject = ['$interpolateProvider'];

    function interpolateProvider($interpolateProvider) {
        $interpolateProvider.startSymbol('[[');
        $interpolateProvider.endSymbol(']]');
    }

    function routeProvider($routeProvider, $provide){
        $provide.service('AppRoutes', AppRoutes);

        angular.forEach((new AppRoutes).routes, function(routeParams, routeName){
            var ctrlLowerCase = routeParams.ctrl.toLowerCase();

            $routeProvider.when(routeParams.path ? routeParams.path : '/' + ctrlLowerCase, {
                    controller: routeParams.ctrl,
                    controllerAs: 'vm',
                    templateUrl: 'tpl/' + (routeParams.tpl ? routeParams.tpl : ctrlLowerCase) + '.html',
                    tab: routeName // or routeParams.entity
                }
            );
        });

        $routeProvider
            .otherwise({redirectTo: '/'});
    }

    function AppRoutes(){
        this.routes = {
            'index': {
                'ctrl': 'Index',
                'path': '/'
            }
            , projects: {
                'ctrl': 'Projects',
                'path': '/projects/'
            }
            , project: {
                'ctrl': 'Project',
                'path': '/place/:id'
            }
            , contacts: {
                'ctrl': 'Contacts',
                'path': '/contacts'
            }
        }
    }

})();