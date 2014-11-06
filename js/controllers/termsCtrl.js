'use strict';

angular.module('app.terms', [])

.controller('termsCtrl',
  
  ['$scope', '$rootScope', 'healthLiteracyTermsFactory',
    function ($scope, $rootScope, healthLiteracyTermsFactory) {
     
      healthLiteracyTermsFactory.getTermsFlow().then(function(pages) {
        $scope.terms = pages;
      });

      $rootScope.active = null;
      $scope.setActive = function(key) {
        $rootScope.active = $rootScope.active === key ? null : key;
      }

    }
  ]
)

