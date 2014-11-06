'use strict';

//***************************************

// Main Application

//***************************************

angular.module('app', [
	'healthLiteracy.terms',
	'app.use',
  'app.shop',
  'metaInfo',
  'ui.router',
  'ngAnimate',
])

.run(
	[					 '$sce', '$timeout', '$rootScope', '$state', '$stateParams', 'metaInfo', 
		function ($sce,   $timeout,   $rootScope,   $state,   $stateParams,   metaInfo) {

			// It's very handy to add references to $state and $stateParams to the $rootScope
			$rootScope.$state = $state;
			$rootScope.$stateParams = $stateParams;
		
      // Apply meta data if available
      $rootScope.$on('$stateChangeStart', 
        function(event, toState, toParams, fromState, fromParams){

          $rootScope.transitioning = 'transitioning';

          // If we have any data
          if(toState.data) {
            // Set title
            var title = (toState.data.title && toState.data.title.length)
                      ? toState.data.title
                      : '';

            metaInfo.setTitle(title);

            // set description
            var description = (toState.data.description && toState.data.description.length)
                            ? toState.data.description
                            : '';

            metaInfo.setMetaDescription(description);

            // set keywords
            var keywords = (toState.data.keywords && toState.data.keywords.length)
                         ? toState.data.keywords
                         : [];

            metaInfo.setMetaKeywords(keywords, toState.data.keywordAppend);
            
            return;
          }

          metaInfo.resetAll();
        }
      );
      // Remove class
      $rootScope.$on('$stateChangeSuccess', 
        function(event, toState, toParams, fromState, fromParams){
          $rootScope.transitioning = '';
        }
      );
    }
	]
)

.config(
  [          '$locationProvider', '$stateProvider', '$urlRouterProvider', 'metaInfoProvider',
    function ($locationProvider,   $stateProvider,   $urlRouterProvider,   metaInfoProvider) {

      // Set base meta info
      metaInfoProvider.setBaseTitle('Health Literacy');
      metaInfoProvider.setBaseDescription('Health Literacy is an educational site giving straight forward info on healthcare options');
      metaInfoProvider.setBaseKeywords('Health Literacy, Health, Education, Colorado, Healthcare');

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