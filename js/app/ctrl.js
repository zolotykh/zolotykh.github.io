/* global angular, $ */

;(function(){
    "use strict";

    angular
        .module('app')
        .controller('App', App)
        .controller('Contacts', Contacts)
        .controller('Index', Index)
        .controller('Projects', Projects)
    ;


    App.$inject = ['$location', '$rootScope', '$scope', 'AppRoutes'];

    function App($location, $rootScope, $scope, AppRoutes){
        var app = this
            , routes = AppRoutes.routes
            , $head_nav_links = $('#head_nav').find('a')
            ;

        app.title = 'Золотых Александр, web-разработчик';

        app.route = route;

        $rootScope.$applyAsync(true);

        $scope.$on('$routeChangeStart', function(next, current) {
            //processing(true);

            $head_nav_links.removeClass('active');

            var currentPath = '#' + $location.path()
                , regEx
                ;

            angular.forEach($head_nav_links, function(a){
                regEx = new RegExp('^' + a.hash);

                if (a.hash && regEx.test(currentPath) && a.hash.length <= currentPath.length){
                    if (("#/" === a.hash && a.hash === currentPath) || "#/" !== a.hash){
                        return $(a).addClass('active');
                    }
                }
            });
        });

        //$scope.$on('$routeChangeSuccess', function () {
        //    processing(false);
        //});

        //$rootScope.$on('processing', function(event, active){
        //    processing(active);
        //});
        //
        //
        //function processing(active){
        //    app.processing = !!active;
        //}

        function route(name, options){
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

    function Contacts(){
        this.p = ["+", "7", " ", "9", "2", "7", " ", "8", "8", "1", "3", "4", "7", "6"].join('');
        this.e = ["z", "a", "n", "a", "r", "t", "@", "y", "a", ".", "r", "u"].join('');
        this.s = ["g", "o", "l", "d", "-", "s", "a", "s", "h", "a"].join('');
    }

    function Index(){
        this.skills = [
            {name: 'JavaScript', desc: '(Node.js, AngularJS, jQuery, Sails.js, express, GulpJS)'},
            {name: 'PHP', desc: '(Silex + Twig, Composer, PHPUnit)'},
            {name: 'Ruby', desc: '(без RoR)'},
            {name: 'HTML5 & CSS3', desc: '(SASS: bourbon, LESS)'},
            {name: 'Верстка по .psd', desc: ''},
            {name: 'Адаптивная верстка', desc: ''},
            {name: 'Проверка верстки во всех распространенных браузерах', desc: ''},
            {name: 'DNS', desc: '(Yandex, AWS Route 53)'},
            {name: 'Интеграция сторонних API', desc: '(sms, email, crm, calltracking, аналитика и т.п.)'},
            {name: 'Установка и настройка серверного ПО', desc: '(Nginx, Apache, php, MySQL, Node.js)'},
            {name: 'Настройка аналитики', desc: '(Mixpanel, Яндекс.Метрика, Google Analytics)'}
        ];
    }

    function Projects(){}
})();