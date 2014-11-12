'use strict';

angular.module('app')

.directive("bindCompiledHtml", function($compile) {
  return {
    scope: {
      rawHtml: '=bindCompiledHtml'
    },
    link: function(scope, elem, attrs) {
      scope.$watch('rawHtml', function(value) {
        if (!value) return;
        var newElem = $compile(value)(scope);
        elem.contents().remove();
        elem.append(newElem);
      });
    }
  };
});