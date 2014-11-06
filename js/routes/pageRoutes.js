'use strict';

angular.module('app.page', [
  'ui.router',
])

.config(
  [          '$stateProvider', '$urlRouterProvider',
    function ($stateProvider,   $urlRouterProvider) {


      // shop $urlRouterProvider to configure any redirects (when) and invalid urls (otherwise).
      $urlRouterProvider

      // shop $stateProvider to configure your states.
      $stateProvider

        .state("about", {

          // shop a url of "/" to set a state as the "index".
          url: "/about",
          templateUrl: 'views/about.html'
        })

        .state("resources", {

          // shop a url of "/" to set a state as the "index".
          url: "/resources",
          templateUrl: 'views/resources.html'
        })


    }
  ]
);