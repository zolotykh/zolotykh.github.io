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

    xdescribe('Projects', function(){
        it('vm.projects &> 0', function(){
            var $scope = {}
                , ctrl = $controller('Projects', {$scope: $scope});

            expect(ctrl.projects && angular.isArray(ctrl.projects) && ctrl.projects.length > 0).toBeTruthy();
        });
    });

    describe('Example', function(){

        it('ex', function(){
            expect(1).toEqual(1);
            pending('this is why it is pending');
        });

        it('spy', function(){
            spyOn(window, 'alert');
            //spyOn(window, 'alert').and.callThrough(); // .and.returnValue .and.callFake(fn) .and.throwError

            window.alert(1);

            expect(window.alert).toHaveBeenCalled();
            expect(window.alert.calls.any()).toBeTruthy();
            expect(window.alert.calls.count()).toEqual(1);

            // .calls.argsFor(index) http://jasmine.github.io/edge/introduction.html#section-28
            // .calls.allArgs()
            // .calls.all()
            // .calls.mostRecent()
            // .calls.first()
            // .calls.first().object
            // .calls.reset()
        })
    });

    describe("A spy", function() {
        var foo, bar = null, whatAmI, tape;

        beforeEach(function() {
            foo = {
                setBar: function(value) {
                    bar = value;
                }
            };

            spyOn(foo, 'setBar').and.callThrough();
        });

        beforeEach(function() {
            whatAmI = jasmine.createSpy('whatAmI');

            whatAmI("I", "am", "a", "spy");
        });

        beforeEach(function() {
            tape = jasmine.createSpyObj('tape', ['play', 'pause', 'stop', 'rewind']);

            tape.play();
            tape.pause();
            tape.rewind(0);
        });

        it("is named, which helps in error reporting", function() {
            expect(whatAmI.and.identity()).toEqual('whatAmI');
        });

        it("can call through and then stub in the same spec", function() {
            foo.setBar(123);
            expect(bar).toEqual(123);

            foo.setBar.and.stub();
            bar = null;

            foo.setBar(123);
            expect(bar).toBe(null);
        });

        var timerCallback;

        beforeEach(function() {
            timerCallback = jasmine.createSpy("timerCallback");
            jasmine.clock().install();
        });

        afterEach(function() {
            jasmine.clock().uninstall();
        });

        it("causes a timeout to be called synchronously", function() {
            setTimeout(function() {
                timerCallback();
            }, 100);

            expect(timerCallback).not.toHaveBeenCalled();

            jasmine.clock().tick(101);

            expect(timerCallback).toHaveBeenCalled();
        });
    });

    describe('Done', function(){
        var value = 0;

        beforeEach(function(done) {
            setTimeout(function() {
                value = 1;

                done();
            }, 100);
        });

        afterEach(function(done) {
            done();
        }, 1000);

        it("mocks the Date object and sets it to a given time", function(done) {
            expect(value).toEqual(1);

            done();
        });
    });
});