

angular.module('healthLiteracy.use', [
  'ui.router',
])

.config(
  [          '$stateProvider', '$urlRouterProvider',
    function ($stateProvider,   $urlRouterProvider) {


      // Use $urlRouterProvider to configure any redirects (when) and invalid urls (otherwise).
      $urlRouterProvider
        .when('/use', '/use/scenario')
        .when('/use/action', ['$match', '$stateParams', function ($match, $stateParams) {
          console.log('oooooo');
        }]);


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
              return 'use.premium({premuimId:0, scenarioId: '
                   + $stateParams.scenarioId + ', actionId: '
                   + key + '})';
            }
          }
        })
        .state("use.premium", {
          url: '/premium/:premuimId?scenarioId&actionId',
          templateUrl: 'views/use.premium.html',
          controller: function($scope, $stateParams, useData, $location) {
            var pageData = useData['results'][$stateParams.scenarioId][$stateParams.actionId];
            var premuimId = $stateParams.premuimId;
            // Actually print story?
            $scope.override = pageData.override;
            // If not, then what do we print
            $scope.resultsText = pageData.results.text;
            // Load story
            $scope.story = pageData.stories[premuimId];
            
            $scope.resultYet = function() {
              return (premuimId + 1) >= pageData.stories.length;
            }
            $scope.goToPage = function() {
              var url = '';
              // If we're not the last story
              if(!$scope.resultYet()) {
                url = 'use.premium({premuimId: ' + (premuimId + 1) + ', ';
              }
              else {
                url = 'use.result({';
              }

              return url + 'scenarioId: '
                         + $stateParams.scenarioId 
                         + ', actionId: ' 
                         + $stateParams.actionId 
                         + '})';
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
                    // if we're skipping, just set to 0
                    if(cost.skipCount) {
                      cost.amount = 0;
                    }
                    // Already added
                    if(compare[key].items.hasOwnProperty(cost.group)) {
                      compare[key].items[cost.group].amount += cost.amount;
                    }
                    else {
                      compare[key].items[cost.group] = {
                        label: pageData.groups[cost.group]['label'],
                        suffix: cost.suffix ? cost.suffix : '',
                        amount: cost.amount,
                        weight: pageData.groups[cost.group]['weight'],
                        hide: pageData.groups[cost.group]['hide'] ? pageData.groups[cost.group]['hide'] : false
                      }
                    }
                    compare[key].total += cost.amount;
                  });
                });
              });
              $scope.compare = compare;
              $scope.pageData = pageData;
            //}
          }
        });


    }
  ]
);