var expect = chai.expect
    , assert = chai.assert;

describe('angular.module("app")', function() {
    beforeEach(module('app'));

    var $controller,
        $filter,
        $rootScope
        ;

    beforeEach(inject(function (_$controller_, _$filter_, _$rootScope_) {
        $controller = _$controller_;
        $filter = _$filter_;
        $rootScope = _$rootScope_;
    }));

    describe('App', function(){
        it('exists | app.route("index") = "#/"', inject(function($controller){
            var ctrl = $controller('App', {$scope: $rootScope.$new()});

            expect(ctrl).is.defined;
            expect(ctrl.route('index')).equal('#/');
            expect(ctrl.title).not.empty;
        }));
    });

    describe('Index', function(){
        it('.skills is array and not empty', inject(function($controller){
            var $scope = $rootScope.$new()
                , ctrl = $controller('Index', {$scope: $scope})
                ;

            expect(ctrl.skills).to.be.an('array');
            expect(ctrl.skills).to.have.length.above(0);
        }));
    });

    describe('Contacts', function(){
        it('phone, email, skype is defined', inject(function($controller){
            var ctrl = $controller('Contacts', {$scope: $rootScope.$new()});

            expect(ctrl.p).to.be.not.empty;
            expect(ctrl.e).to.match(/@/);
            expect(ctrl.s).to.be.not.empty;
        }));
    });

});
