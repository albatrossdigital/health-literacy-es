'use strict';

angular.module('app.terms')

.directive('termLink', function factory() {
  return {
    restrict: 'A',
    scope: {
      'termLink': '@'
    },
    link: function($scope, $element, $attrs) {
      // listen for a click
      $element.on('click', function() {
        // set hash
        location.hash = $scope.termLink;
        // open menu
        jQuery('.off-canvas-wrap').foundation('offcanvas', 'show', 'move-right');
      });
    }
  }
});
