/* global chai, expect, assert, should */

var expect = chai.expect
    , assert = chai.assert
    , should = chai.should()
    , utils = chai.util
    ;

describe('angular.module("app")', function() {
    beforeEach(module('app', 'ngRoute'));

    var $compile,
        $controller,
        $document,
        $filter,
        $httpBackend,
        $injector,
        $routeParams,
        $rootScope
        , $scope
        , $window


        , ctrl
        , mockDoc = angular.element('<html><head></head><body></body></html>')
        ;

    beforeEach(function(){
        module(function($provide) { // надо ли?
            $provide.value('$document', angular.element(document));
            $provide.value('$window', angular.element(window));
        });
    });

    beforeEach(inject(function(_$document_, _$injector_, _$compile_, _$controller_, _$filter_, _$httpBackend_, _$rootScope_, _$window_){
        $compile = _$compile_;
        $controller = _$controller_;
        $document = _$document_;
        $filter = _$filter_;
        $httpBackend = _$httpBackend_;
        $injector = _$injector_;
        $rootScope = _$rootScope_;
        $scope = _$rootScope_.$new();
        $window = _$window_;
    }));

    function beforeEachCtrl(ctrl_name){
        beforeEach(function(){
            $scope = $rootScope.$new();

            ctrl = $controller(ctrl_name, {$scope: $scope});
        });
    }

    function createDirective(html, fromRootScope) {
        if (fromRootScope){
            // digest from root scope
            var el = $compile(html)($scope);

            $scope.$apply();

            return el;
        }

        // digest from current scope and children
        var compiledElem = $compile(angular.element(html))($scope);

        $scope.$digest();

        return compiledElem;
    }

    describe('App', function(){
        it('app.title is String', function(){
            var app = $controller('App', {$scope: $scope});

            expect(angular.isString(app.title)).be.ok;
        })
    });

    describe('Index', function(){
        beforeEachCtrl('Index');

        it('.skills is []', function(){
            expect(angular.isArray(ctrl.skills)).be.ok;
        });

        it('.skills.length > 0', function(){
            expect(ctrl.skills.length > 0).be.ok;
        });
    });

    describe('Contacts', function(){
        beforeEachCtrl('Contacts');

        it('vm.p is String', function(){
            expect(angular.isString(ctrl.p)).be.ok;
        });

        it('vm.e matches @', function(){
            expect(ctrl.e).to.match(/@/);
            expect(angular.isString(ctrl.s)).be.ok;
        });

        it('vm.s is String', function(){
            expect(angular.isString(ctrl.s)).be.ok;
        });
    });

    describe('HighlightActiveMenuItem', function(){
        it('is fn', function(){
            expect(angular.isFunction($injector.get('HighlightActiveMenuItem'))).be.ok;
        });
    });
});
