describe('app', function(){
    beforeEach(module('app'));

    var $controller,
        $filter,
        $rootScope
        ;

    beforeEach(inject(function(_$controller_, _$filter_, _$rootScope_){
        $controller = _$controller_;
        $filter = _$filter_;
        $rootScope = _$rootScope_;
    }));

    describe('Projects is defined', function(){
        it('Projects is ok', function(){
            expect($controller('Projects', {$scope: $rootScope.$new()})).toBeDefined();
        });
    });

    describe('App', function(){
        it('app.route index = #/', function(){
            var $scope = $rootScope.$new()
                , App = $controller('App', {$scope: $scope});

            expect(App.route('index')).toEqual('#/');
        });

        it('app.title is string', function(){
            var $scope = $rootScope.$new()
                , app = $controller('App', {$scope: $scope});

            expect(angular.isString(app.title)).toBeTruthy();
        })
    });

    describe('Index', function(){
        it('Index.skills must be an array and not empty', function(){
            var $scope = {}
                , controller = $controller('Index', {$scope: $scope});

            expect(angular.isArray(controller.skills)).toBeTruthy();
            expect(controller.skills.length > 0).toBeTruthy();
        });
    });

    describe('Contacts', function(){
        it('vm.p .e .s must be a String, and .e match "@"', function(){
            var $scope = {}
                , ctrl = $controller('Contacts', {$scope: $scope});

            expect(angular.isString(ctrl.p)).toBeTruthy();
            expect(angular.isString(ctrl.e)).toBeTruthy();
            expect(ctrl.e).toMatch('@');
            expect(angular.isString(ctrl.s)).toBeTruthy();
        });
    });

    //describe('Projects', function(){
    //    it('vm.projects &> 0', function(){
    //        var $scope = {}
    //            , ctrl = $controller('Projects', {$scope: $scope});
    //
    //        expect(ctrl.projects && angular.isArray(ctrl.projects) && ctrl.projects.length > 0).toBeTruthy();
    //    });
    //});
});