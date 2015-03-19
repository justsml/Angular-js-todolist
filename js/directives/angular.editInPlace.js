
App.directive( 'editInPlace', function() {
  return {
    restrict: 'E',
    scope: { score: '=' },
    template: '<span class="scoreName glyphicon glyphicon-pencil" ng-click="edit()"></span>\n' +
      '<div class=\'col-xs-7\'><input class="form-control" ng-model="score.student" placeholder="Student Name"></div>\n' +
      '<div class=\'col-xs-3\' ng-class=""><input type="number" class="form-control" ng-min="0" ng-max="100" ng-model="score.grade" placeholder="Grade 0-100"></div>\n',
    link: function ( $scope, element, attrs ) {
      // Let's get a reference to the input element, as we'll want to reference it.
      var inputElement = angular.element( element.find('input')[0] );

      // This directive should have a set class so we can style it.
      element.addClass( 'edit-in-place' );

      // Initially, we're not editing.
      $scope.editing = false;

      // ng-click handler to activate edit-in-place
      $scope.edit = function () {
        $scope.editing = true;

        // We control display through a class on the directive itself. See the CSS.
        element.addClass( 'active' );

        // And we must focus the element.
        // `angular.element()` provides a chainable array, like jQuery so to access a native DOM function,
        // we have to reference the first element in the array.
        inputElement.focus();
      };

      // When we leave the input, we're done editing.
      inputElement.on("blur",function  () {
        $scope.editing = false;
        element.removeClass( 'active' );
      });

    }
  };
});