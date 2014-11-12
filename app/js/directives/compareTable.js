'use strict';

angular.module('app')

.directive('compareTable', function factory() {
  return {
    restrict: 'A',
    scope: {
      key: '=compareKey',
      group: '=compareGroup'
    },
    templateUrl: '../views/compareTable.html'
  }
});
