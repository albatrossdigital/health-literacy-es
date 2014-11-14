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
          url: "/about",
          data: { title: 'About' },
          templateUrl: 'views/about.html'
        })

        .state("resources", {
          url: "/resources",
          data: { title: 'Resources' },
          templateUrl: 'views/resources.html'
        })

        .state("get-insurance", {
          url: "/get-insurance",
          data: { title: 'Get Insurance' },
          templateUrl: 'views/get-insurance.html'
        })


    }
  ]
);