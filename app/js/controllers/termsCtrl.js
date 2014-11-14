'use strict';

angular.module('app.terms', [])

.controller('termsCtrl',
  
  [
             '$scope', '$rootScope', 'appTermsFactory',
    function ($scope,   $rootScope,   appTermsFactory) {
     
      appTermsFactory.getTermsFlow().then(function(pages) {
        $scope.terms = pages;
      });

      $scope.active = null;
      $scope.setActive = function(key) {
        $scope.active = $scope.active === key ? null : key;
      }

      // watch
      $scope.$watch(function () {
          return location.hash
      }, function (value) {
          if(value && value.length) {
            $scope.setActive(value.substring(1));
          }
      });

    }
  ]
)

