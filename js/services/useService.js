'use strict';

angular.module('healthLiteracy.use')

// use factory
.factory('healthLiteracyUseFactory', 

  [         '$http', '$q', '$cacheFactory',
    function($http,   $q,   $cacheFactory) {

      var useFactory = {};
      var cache = $cacheFactory('useFactory');

      useFactory.getUseFlow = function () {
        var callUrl  = 'useFlow',
            deferred = $q.defer(),
            data     = cache.get(callUrl);

        // Nothing in cache
        if(!data) {
          var result = {
            'scenario': {
              'title': 'Pick a scenario',
              'options': [
                {
                  'title': 'Feeling a little sick',
                  'id': 'sick'
                },
                {
                  'title': 'Got a nasty cut',
                  'id': 'cut'
                },
                {
                  'title': 'Might have appendicitis',
                  'id': 'major'
                }
              ],
            },
            'action': {
              'title': 'Where do you go?',
              'options': [
                {
                  'title': 'Doctor\'s Office',
                  'id': 'doctor'
                },
                {
                  'title': 'Immediate Care Clinic',
                  'id': 'clinic'
                },
                {
                  'title': 'Emergency Room',
                  'id': 'emergency'
                }
              ],
            },
          };
          cache.put(callUrl, result);
          deferred.resolve(result);
        }
        // just return cached data
        else {
          deferred.resolve(data);
        }

        return deferred.promise;
      }

      return useFactory;
    }
  ]
);