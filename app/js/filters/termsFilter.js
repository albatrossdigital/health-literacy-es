'use strict';

angular.module('app.terms')

.filter('termsFilter', 

  [          'appTermsFactory',
    function (appTermsFactory) {

      var data           = null,
          serviceInvoked = false;

      function realFilter(value) {
        angular.forEach(data, function(term) {
          var replacer = '<a term-link="' + term.key + '">$&</a>',
              regex    = new RegExp("(" + term.regex + ".*?(?=[^a-zA-Z]))", "i");
          value = value.replace(regex, replacer);
        });

        return '<span>' + value + '</span>';
      }

      return function(value) {
        if( data === null ) {
          if( !serviceInvoked ) {
            serviceInvoked = true;
            // CALL THE SERVICE THAT FETCHES THE DATA HERE
            appTermsFactory.getTermsFlow().then(function(pages) {
              data = pages;
            });
          }
          return ""; // PLACEHOLDER WHILE LOADING, COULD BE EMPTY
        }
        else {
          return realFilter(value);
        }
      }
    }
  ]
);