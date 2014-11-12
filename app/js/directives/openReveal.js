'use strict';

angular.module('app')

.directive('openReveal', function factory() {
  return {
    restrict: 'A',
    scope: {
      'openReveal': '@'
    },
    link: function($scope, $element, $attrs) {
      // listen for a click
      $element.on('click', function() {
        jQuery('#' + $scope.openReveal).foundation('reveal', 'open');
      });
    }
  }
});
