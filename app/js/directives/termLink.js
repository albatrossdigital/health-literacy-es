'use strict';

angular.module('app.terms')

.directive('termLink', function factory($rootScope) {
  return {
    restrict: 'A',
    scope: {
      'termLink': '@'
    },
    link: function($scope, $element, $attrs) {
      // listen for a click
      $element.on('click', function() {
        // open menu
        jQuery('.off-canvas-wrap').foundation('offcanvas', 'toggle', 'move-right');
        // if a term, open
        if($scope.termLink) {  
          // set hash
          location.hash = $scope.termLink;
          var poop = document.getElementById('term-' + $scope.termLink);
          document.getElementById('term-' + $scope.termLink).scrollIntoView();
        }
      });
    }
  }
});
