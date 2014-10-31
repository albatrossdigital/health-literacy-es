'use strict';

//***************************************

// Main Application

//***************************************

angular.module('healthLiteracy', [
	'healthLiteracy.use',
  'healthLiteracy.shop',
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
      $urlRouterProvider.otherwise('/');

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