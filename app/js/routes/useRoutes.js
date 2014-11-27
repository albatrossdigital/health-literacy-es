

angular.module('app.use', [
  'ui.router',
  'metaInfo'
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
            useData: function(appUseFactory) {
              return appUseFactory.getUseFlow().then(function(pages) {
                return pages;
              });
            },
          },
          controller: function($scope, useData) {
            $scope.useData = useData;
          }
        })
        .state("use.option", {
          data: { title: 'Elegir un escenario' },
          url: '/scenario',
          templateUrl: 'views/use.scenario.html',
          controller: function($scope, metaInfo, useData) {
            $scope.pageData = useData;
            $scope.currentPage = 'scenario';

            $scope.nextPageVal = function(key) {
              return 'use.action({scenarioId: ' + key + '})'
            }
          }
        })
        .state("use.action", {
          data: { title: '¿Adónde vas?' },
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
          data: { title: 'Cuotas' },
          url: '/premium/:premuimId?scenarioId&actionId',
          templateUrl: 'views/use.premium.html',
          controller: function($scope, $stateParams, useData, $location) {

            var pageData = useData['results'][$stateParams.scenarioId][$stateParams.actionId];
            var premuimId = $stateParams.premuimId;
            // Actually print story?
            $scope.override = pageData.override;
            // If not, then what do we print
            $scope.resultsText = pageData.results.text;
            $scope.resultsImg = pageData.img;
            // Load story
            $scope.story = pageData.stories[premuimId];

            // Do we show "if you'd gone to doctor" ?
            if($stateParams.scenarioId < 2 && $stateParams.actionId > 0) {

              // Grab doctor data
              var compareData = useData['results'][$stateParams.scenarioId][0];
              // Set compare doctor scope vars
              $scope.showCompareDoctor = true;
              $scope.compareStory = compareData.stories[premuimId];
            }
            
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
          data: { title: "Resultados" },
          url: '/result?scenarioId&actionId',
          templateUrl: 'views/use.result.html',
          controller: function($scope, $stateParams, useData, $location, $anchorScroll) {

            var returnCompare = function() {
              return {
                'insured': {
                  'title': 'Sus costos si no tenía seguro',
                  'items': {},
                  'total': 0
                },
                'uninsured': {
                  'title': 'Sus costos si no tenía seguro',
                  'items': {},
                  'total': 0
                },
              };
            }

            // Calculates costs
            var buildCompare = function(pageData, compare) {
              angular.forEach(pageData.stories, function(story) {
                angular.forEach(story.costs, function(costBucket, key) {
                  angular.forEach(costBucket, function(cost) {
                    // if we're skipping, just set to 0
                    var amount = cost.skipCount ? 0 : cost.amount;
                    // Already added
                    if(compare[key].items.hasOwnProperty(cost.group)) {
                      compare[key].items[cost.group].amount += amount;
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
                    compare[key].total += amount;
                  });
                });
              });
            }

            // Pull page data
            var pageData = useData['results'][$stateParams.scenarioId][$stateParams.actionId];

            // Do we show "if you'd gone to doctor" ?
            if($stateParams.scenarioId < 2 && $stateParams.actionId > 0) {
              var compareDoctor = returnCompare();
              compareDoctor.insured.title = "¿Y si hubiese visitado al proveedor de atención médica primaria?";
              var compareData = useData['results'][$stateParams.scenarioId][0];
              
              // init doctor compare 
              buildCompare(compareData, compareDoctor);

              // Set compare doctor scope vars
              $scope.showCompareDoctor = true;
              $scope.compareDoctor = compareDoctor;
              $scope.compareData = compareData;
            }

            // Get regular compare
            var compare = returnCompare();

            // init main compare 
            buildCompare(pageData, compare);
            
            $scope.compare = compare;
            $scope.pageData = pageData;
          }
        });


    }
  ]
);