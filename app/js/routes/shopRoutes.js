

angular.module('healthLiteracy.shop', [
  'ui.router',
])

.config(
  [          '$stateProvider', '$urlRouterProvider',
    function ($stateProvider,   $urlRouterProvider) {


      // shop $urlRouterProvider to configure any redirects (when) and invalid urls (otherwise).
      $urlRouterProvider
        .when('/shop', '/shop/intro')
        .when('/question', '/question/1')
        .when('/question/0', '/question/1');


      // shop $stateProvider to configure your states.
      $stateProvider

        //////////
        // Home //
        //////////

        .state("shop", {

          // shop a url of "/" to set a state as the "index".
          url: "/shop",
          templateUrl: 'views/shop.html',
          resolve: {
            shopData: function(healthLiteracyShopFactory) {
              return healthLiteracyShopFactory.getshopFlow().then(function(pages) {
                return pages;
              });
            },
          },
          controller: function($scope, shopData) {
            $scope.shopData = shopData;
            $scope.answers = {
              'total': shopData.questions.length,
              'answered': 0,
              '-1': 0,
              '0': 0,
              '1': 0,
              'special': 0
            };

            $scope.getChildByKey = function(obj, key) {
              var returnItem = false
              angular.forEach(obj, function(item) {
                console.log(item);
                console.log(key);
                if (item.key == key) {
                  returnItem = item;
                }
              });
              return returnItem;
            }
          }
        })

        .state("shop.intro", {
          url: '/intro',
          templateUrl: 'views/shop.intro.html',
          controller: function($scope, shopData) {
            //$scope.pageData = shopData;
            $scope.currentPage = 'intro';

            $scope.nextPageVal = function(key) {
              return 'shop.action({scenarioId: ' + key + '})'
            }

            // @todo: reset $scope.answers here??
          }
        })

        .state("shop.question", {
          url: '/question/:questionId',
          templateUrl: 'views/shop.question.html',
          controller: function($scope, $stateParams, shopData, $state) {
            //$scope.pageData = shopData;
            $scope.currentPage = 'question';
            $scope.questionId = $stateParams.questionId - 1;
            $scope.question = shopData.questions[$scope.questionId];
            $scope.colClass = 12 / $scope.question.options.length;

            $scope.answer = function(key) {
              $scope.answers[key] ++;
              $scope.answers.answered ++;
              // Done with the questions
              if ($scope.questionId+1 >= $scope.answers.total) {
                $state.go('shop.tier');
              }
              // Go to next question
              else {
                $state.go('shop.question', {questionId: $scope.questionId + 2});
              }
            }
          }
        })

        .state("shop.tier", {
          url: '/tier',
          templateUrl: 'views/shop.tier.html',
          controller: function($scope, $stateParams, shopData, $state, $anchorScroll, $location) {
            $scope.tiers = shopData.tiers;

            // Make sure they have answered all of the questions
            if ($scope.answers.answered < $scope.answers.total) {
              // @todo
              //$state.go('shop.question', {questionId: $scope.answers.answered});
            }

            // Calculate the tier
            if ($scope.answers.special > 0) {
              $scope.suggestedTier = 'silver';
            }
            else if ($scope.answers['-1'] >= 6) {
              $scope.suggestedTier = 'bronze';
            }
            else if ($scope.answers['1'] >= 3) {
              $scope.suggestedTier = 'gold';
            }
            else {
              $scope.suggestedTier = 'silver';
            }
            $scope.activeTier = $scope.getChildByKey(shopData.tiers, $scope.suggestedTier);

            $state.go('shop.tier.tab', {tierId: $scope.suggestedTier});

            $scope.goToPlan = function() {
              // @todo?
              //$location.hash('plan');
              //$anchorScroll();
              $state.go('shop.plan.tab', {planId: shopData.plans[0].key});
            }

            //$scope.pageData = shopData['results'][$stateParams.scenarioId][$stateParams.actionId];

          }
        })
        .state("shop.tier.tab", {
          url: '/:tierId',
          templateUrl: 'views/shop.tier.tab.html',
          controller: function($scope, $stateParams, shopData, $state) {
            $scope.stats = $scope.getChildByKey(shopData.tiers, $stateParams.tierId).stats;
          }
        })

        .state("shop.plan", {
          url: '/plan',
          templateUrl: 'views/shop.plan.html',
          controller: function($scope, $stateParams, shopData, $state) {
            $scope.plans = shopData.plans;
          }
        })
        .state("shop.plan.tab", {
          url: '/:planId',
          templateUrl: 'views/shop.plan.tab.html',
          controller: function($scope, $stateParams, shopData, $state) {
            $scope.plan = $scope.getChildByKey(shopData.plans, $stateParams.planId);
          }
        });


    }
  ]
);