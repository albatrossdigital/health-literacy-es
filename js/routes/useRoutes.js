

angular.module('healthLiteracy.use', [
  'ui.router',
])

.config(
  [          '$stateProvider', '$urlRouterProvider',
    function ($stateProvider,   $urlRouterProvider) {


      // Use $urlRouterProvider to configure any redirects (when) and invalid urls (otherwise).
      $urlRouterProvider
        .when('/use', '/use/scenario');


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
          templateUrl: 'views/use.premium.html',
          controller: function($scope, $stateParams, useData, $location, $anchorScroll) {
            $scope.pageData = useData['results'][$stateParams.scenarioId][$stateParams.actionId];
          
            $scope.goToPage = function(key) {
              // If we're not the last story
              if((key + 1) < $scope.pageData.stories.length) {
                $location.hash('premium-'+(key + 1));
                $anchorScroll();
              }
              else {
                $location.hash('');
                $location.path('/use/result');
              }
            }
          }
        })
        .state("use.result", {
          url: '/result?scenarioId&actionId',
          templateUrl: 'views/use.result.html',
          controller: function($scope, $stateParams, useData, $location, $anchorScroll) {
            var pageData = useData['results'][$stateParams.scenarioId][$stateParams.actionId];

            //$scope.initCalc = function() {
              var compare = {
                'insured': {
                  'title': 'Cost with insurance',
                  'items': {},
                  'total': 0
                },
                'uninsured': {
                  'title': 'Cost with NO insurance',
                  'items': {},
                  'total': 0
                },
              };
              angular.forEach(pageData.stories, function(story) {
                angular.forEach(story.costs, function(costBucket, key) {
                  angular.forEach(costBucket, function(cost) {
                    // Already added
                    if(compare[key].items.hasOwnProperty(cost.group)) {
                      compare[key].items[cost.group].amount += cost.amount;
                    }
                    else {
                      compare[key].items[cost.group] = {
                        label: pageData.groups[cost.group]['label'],
                        amount: cost.amount,
                        suffix: cost.suffix ? cost.suffix : '',
                        weight: pageData.groups[cost.group]['weight']
                      }
                    }
                    compare[key].total += cost.amount;
                  });
                });
              });
              pageData.groups = compare;
              $scope.pageData = pageData;
            //}
          }
        });


    }
  ]
);