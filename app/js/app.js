'use strict';

//***************************************

// Main Application

//***************************************

angular.module('app', [
	'app.terms',
  'app.page',
	'app.use',
  'app.shop',
  'metaInfo',
  'scrollTo',
  'ui.router',
  'ngSanitize',
  'ngAnimate',
  'ngTouch'
])

.run(
	[					 '$rootScope', '$state', '$stateParams', 'metaInfo', '$window', '$location', 
		function ($rootScope,   $state,   $stateParams,   metaInfo,   $window,   $location) {

      // Set Url
      //$rootScope.pageUrl = 'http://localhost:9000';
      $rootScope.pageUrl = 'http://segurotu.org';

			// It's very handy to add references to $state and $stateParams to the $rootScope
			$rootScope.$state = $state;
			$rootScope.$stateParams = $stateParams;

      // Share42 script
      var share42 = document.createElement('script');
		
      // Apply meta data if available
      $rootScope.$on('$stateChangeStart', 
        function(event, toState, toParams, fromState, fromParams){

          // Metatag info
          // ---------------------------------

          //If we have any incoming data
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
          }
          // we're coming from a state with meta info, reset
          else if(fromState.data) {
            metaInfo.resetAll();
          }

          // Did we already load share42 script?
          if(!share42.src) {
            // Load sharing
            share42.src = '/vendor/share42.js';
            share42.type = 'text/javascript';
            share42.async = 'true';
            document.body.appendChild(share42);
          }
        }
      );

      $rootScope.$on('$stateChangeSuccess', 
        function(event, toState, toParams, fromState, fromParams){

          // send tracking
          if ($window.ga){
            $window.ga('send', 'pageview', { 
              page: $location.path(),
              title: toState.data && toState.data.title ? toState.data.title : 'SeguroTU'
            });
          }

          // first time, and are we changing the main / secondary route
          if(  fromState.name && fromState.name.length
            && (!toState.data  || !(toState.data && toState.data.skipScroll))) {

            $rootScope.scrollTo('main');
          }
        }
      );
    }
	]
)

.config(
  [          '$locationProvider', '$stateProvider', '$urlRouterProvider', 'metaInfoProvider',
    function ($locationProvider,   $stateProvider,   $urlRouterProvider,   metaInfoProvider) {

      // Set base meta info
      metaInfoProvider.setBaseTitle('SeguroTU');
      metaInfoProvider.setBaseDescription('SeguroTu es un sitio web educativo con información simple y directa sobre opciones para el cuidado de la salud.');
      metaInfoProvider.setBaseKeywords('educación sobre la salud, salud, educación, Colorado, cuidado de la salud');


      // // Set up analytics tracking
      // AnalyticsProvider.setAccount('UA-XXXXX-xx');
      // AnalyticsProvider.trackPages(true);
      // // change page event name
      // AnalyticsProvider.setPageEvent('$stateChangeSuccess');


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