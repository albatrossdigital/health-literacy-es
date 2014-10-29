'use strict';

//***************************************

// Main Application

//***************************************

angular.module('healthLiteracy', [
	'healthLiteracy.use',
  'ui.router',
  'ngAnimate',
])

.run(
	[					 '$sce', '$timeout', '$rootScope', '$state', '$stateParams', 
		function ($sce,   $timeout,   $rootScope,   $state,   $stateParams) {

			// It's very handy to add references to $state and $stateParams to the $rootScope
			$rootScope.$state = $state;
			$rootScope.$stateParams = $stateParams;
		
		}
	]
)

.config(
  [          '$locationProvider', '$stateProvider', '$urlRouterProvider',
    function ($locationProvider,   $stateProvider,   $urlRouterProvider) {

    	// set location provider as regular urls
    	//$locationProvider.html5Mode(true);

    	/////////////////////////////
      // Redirects and Otherwise //
      /////////////////////////////

      // Use $urlRouterProvider to configure any redirects (when) and invalid urls (otherwise).
      //$urlRouterProvider.otherwise('/');

      //////////////////////////
      // State Configurations //
      //////////////////////////

      // Use $stateProvider to configure your states.
      $stateProvider

        //////////
        // Home //
        //////////

        .state("home", {

          // Use a url of "/" to set a state as the "index".
          url: "/",

          templateUrl: 'views/home.html'
        });

    }
  ]
);


//***************************************

// How to use workflow

//***************************************

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
          	controller: function($scope, useData) {
        			$scope.useData = useData;
          	}
          }
        })
        .state("use.option", {
        	url: '/scenario/{scenarioId:[0-3]{1}}',
        	templateUrl: 'views/use.scenario.html',
        	controller: function($scope, useData) {
        		$scope.pageData = useData;
        		$scope.currentPage = 'scenario';

        		$scope.nextPageVal = function(key) {
        			return 'use.scenario.action';
        		}
          }
        });
        /*.state("use.scenario.action", {
        	url: '/action/{actionId:[0-3]{1}}',
        	templateUrl: 'views/use.scenario.action.html'
        });*/
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


//***************************************

// How to use shop workflow

//***************************************


//***************************************

// Init Jquery / Foundation

//***************************************

var app = (function(document, $) {

	'use strict';
	var docElem = document.documentElement,

		_userAgentInit = function() {
			docElem.setAttribute('data-useragent', navigator.userAgent);
		},
		_init = function() {
			$(document).foundation();
			_userAgentInit();
		};

	return {
		init: _init
	};

})(document, jQuery);

(function() {

	'use strict';
	app.init();

})();