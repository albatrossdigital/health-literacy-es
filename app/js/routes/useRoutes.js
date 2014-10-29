

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

          url: '/scenario/{scenarioId:[0-3]{1}}',
          templateUrl: 'views/use.scenario.html',
          controller: function($scope, useData) {
            $scope.pageData = useData;
            $scope.currentPage = 'scenario';

            $scope.nextPageVal = function(key) {
              return 'use.scenario({scenarioId: '
                   + (key + 1) 
                   + '}).action({actionId: 0})';
            }
          }
        })
        .state("use.action", {
          url: '/action/{actionId:[0-3]{1}}',
          templateUrl: 'views/use.scenario.action.html'
        });
        /*.state("use.premium", {
          url: '/premium',
          templateUrl: 'views/use.scenario.action.premium.html'
        })
        .state("use.scenario.action.premium.result", {
          url: '/result',
          templateUrl: 'views/use.scenario.action.premium.result.html'
        });*/


    }
  ]
);