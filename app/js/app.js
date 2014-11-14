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
  'ui.router',
  'ngSanitize',
  'ngAnimate'
])

.run(
	[					 '$sce', '$browser', '$rootScope', '$state', '$stateParams', 'metaInfo', 
		function ($sce,   $browser,   $rootScope,   $state,   $stateParams,   metaInfo) {

      // Set Url
      //$rootScope.pageUrl = 'http://localhost:9000';
      $rootScope.pageUrl = 'health-literacy.albatrossdemos.com';

			// It's very handy to add references to $state and $stateParams to the $rootScope
			$rootScope.$state = $state;
			$rootScope.$stateParams = $stateParams;

      // Share42 script
      var share42 = document.createElement('script');

      /* scrollTo -
      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
      $rootScope.scrollTo = function(eID) {

        /* currentYPosition -
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
        function currentYPosition() {
          // Firefox, Chrome, Opera, Safari
          if (window.pageYOffset) {
            return window.pageYOffset;
          }
          // Internet Explorer 6 - standards mode
          if (document.documentElement && document.documentElement.scrollTop) {
            return document.documentElement.scrollTop;
          }
          // Internet Explorer 6, 7 and 8
          if (document.body.scrollTop) {
            return document.body.scrollTop;
          }
          return 0;
        }

        /* scrollTo -
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
        function elmYPosition(eID) {
          if(eID) {
            var elm = document.getElementById(eID);
            var y = elm.offsetTop;
            var node = elm;
            while (node.offsetParent && node.offsetParent != document.body) {
              node = node.offsetParent;
              y += node.offsetTop;
            } return y;
          }
        }

        // This scrolling function 
        // is from http://www.itnewb.com/tutorial/Creating-the-Smooth-Scroll-Effect-with-JavaScript
        
        var i;
        var startY = currentYPosition();
        var stopY = elmYPosition(eID);
        var distance = stopY > startY ? stopY - startY : startY - stopY;
        if (distance < 100) {
          scrollTo(0, stopY); return;
        }
        var speed = Math.round(distance / 100);
        if (speed >= 20) speed = 20;
        var step = Math.round(distance / 25);
        var leapY = stopY > startY ? startY + step : startY - step;
        var timer = 0;
        if (stopY > startY) {
          for (i = startY; i < stopY; i += step) {
            setTimeout('window.scrollTo(0, '+leapY+')', timer * speed);
            leapY += step; if (leapY > stopY) leapY = stopY; timer++;
          } return;
        }
        for (i = startY; i > stopY; i -= step) {
          setTimeout('window.scrollTo(0, '+leapY+')', timer * speed);
          leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
        }
      }
		
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