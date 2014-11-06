'use strict';

//***************************************

// Main Application

//***************************************

angular.module('healthLiteracy', [
	'healthLiteracy.terms',
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
    	$locationProvider.html5Mode(true);

      // trailing slash and url re-rerouting
      $urlRouterProvider.rule(function ($injector, $location) {
        var path = $location.url();

        var argPos = path.indexOf('/?');

        // check to see if the path already has a slash where it should be
        if (path.length > 1) {
          if(path[path.length - 1] === '/') {
            return path.substring(0, path.length - 1);
          }
          else if(argPos > 0) {
            return path.replace('/?', '?');
          }

          return '/';
        }
      });

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