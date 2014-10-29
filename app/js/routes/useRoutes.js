

angular.module('healthLiteracy.use', [
  'ui.router',
])

.config(
  [          '$stateProvider', '$urlRouterProvider',
    function ($stateProvider,   $urlRouterProvider) {


      // Use $urlRouterProvider to configure any redirects (when) and invalid urls (otherwise).
      $urlRouterProvider
        .when('/use', '/use/scenario/0');


      // Use $stateProvider to configure your states.
      $stateProvider

        //////////
        // Home //
        //////////

        .state("use", {

          // Use a url of "/" to set a state as the "index".
          url: "/use",
          templateUrl: 'views/use.html',
          resolve: {
            useData: function(healthLiteracyUseFactory) {
              return healthLiteracyUseFactory.getUseFlow().then(function(pages) {
                return pages;
              });
            },
          },
          controller: function($scope, useData) {
            $scope.useData = useData;
          }
        })
        .state("use.option", {

          url: '/scenario',
          templateUrl: 'views/use.scenario.html',
          controller: function($scope, useData) {
            $scope.pageData = useData;
            $scope.currentPage = 'scenario';

            $scope.nextPageVal = function(key) {
              return 'use.action({scenarioId: ' + key + '})'
            }
          }
        })
        .state("use.action", {

          url: '/action?scenarioId',
          templateUrl: 'views/use.action.html',
          controller: function($scope, $stateParams, useData) {
            $scope.pageData = useData;
            $scope.currentPage = 'action';

            $scope.nextPageVal = function(key) {
              return 'use.premium({scenarioId: '
                   + $stateParams.scenarioId + ', actionId: '
                   + key + '})';
            }
          }
        })
        .state("use.premium", {
          url: '/premium?scenarioId&actionId',
          templateUrl: 'views/use.premium.html'
        });
        /*.state("use.scenario.action.premium.result", {
          url: '/result',
          templateUrl: 'views/use.scenario.action.premium.result.html'
        });*/


    }
  ]
);