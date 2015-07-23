/* global angular, $ */

;(function(){
    "use strict";

    angular
        .module('app')
        .controller('App', App)
        .controller('Contacts', Contacts)
        .controller('Index', Index)
        .controller('Projects', angular.noop)
    ;


    App.$inject = ['HighlightActiveMenuItem'];

    function App(HighlightActiveMenuItem){
        HighlightActiveMenuItem();
        
        this.title = 'Золотых Александр, web-разработчик';
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
})();