/* global angular, $ */

;(function(){
    'use strict';

    angular.module('app')
        .service('HighlightActiveMenuItem', HighlightActiveMenuItem)
    ;


    HighlightActiveMenuItem.$inject = ['$location', '$rootScope'];

    function HighlightActiveMenuItem($location, $rootScope){
        var $head_nav_links = $('#head_nav').find('a');

        $rootScope.$applyAsync(true);

        return function(){
            $rootScope.$on('$routeChangeStart', function() {
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
        }
    }

})();