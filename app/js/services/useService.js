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
            'results': [
              [// Feeling Sick
                {// PRIMARY
                  'stories': [
                    {
                      text: 'You’ve been paying your monthly premium for health insurance, so you have coverage when you need to be seen.',
                      costs: {
                        'insured': [
                          {
                            label: "Premium",
                            group: 'premium',
                            amount: 220,
                            suffix: '/month'
                          }
                        ],
                        'uninsured': [
                          {
                            group: "premium",
                            amount: 0
                          }
                        ]
                      },
                      showCosts: false,
                      hint: false
                    },
                    {
                      text: 'Seeing your Primary Care Provider when you’re sick may mean you will need to pay a small copay.',
                      costs: {
                        'insured': [
                          {
                            label: "Copay",
                            group: 'copay',
                            amount: 25,
                          },
                        ],
                        'uninsured' : [
                          {
                            group: "visit",
                            amount: 125
                          }
                        ]
                      },
                      showCosts: true,
                      hint: false
                    },
                    {
                      text: 'Your Primary Care Provider recommends you see a specialist. The specialist has you do a blood test and an MRI. You’ll pay a larger copay when you see this specialist and owe coinsurance for the MRI and blood test.',
                      costs: {
                        'insured': [
                          {
                            label: "Copay",
                            group: 'copay',
                            amount: 50,
                          },
                          {
                            label: "Coinsurance",
                            group: 'coinsurance',
                            amount: 350,
                          },
                        ],
                        'uninsured' : [
                          {
                            group: "visit",
                            amount: 300 
                          },
                          {
                            group: 'bloodmri',
                            amount: 2125,
                          },
                        ]
                      },
                      showCosts: true,
                      hint: false
                    },
                  ],
                  'groups': {
                    'premium': {
                      'label': 'Premium',
                      'weight': 0
                    },
                    'copay': {
                      'label': 'Copays',
                      'weight': 1
                    },
                    'coinsurance': {
                      'label': 'Coinsurance',
                      'weight': 2
                    },
                    'visit': {
                      'label': 'Doctor visits',
                      'weight': 1
                    },
                    'bloodmri': {
                      'label': 'Blood test/MRI',
                      'weight': 2
                    }
                  },
                  'results': {
                    'text': 'You check out as healthy after the tests. You just had a bad virus, but your Primary Care Provider wants you to keep an eye on your cholesterol.'
                  }
                },
                {// URGENT
                  'stories': [
                    {
                      text: 'You’ve been paying your monthly premium for health insurance, so you have coverage when you need to be seen.',
                      costs: {
                        'insured': [
                          {
                            label: "Premium",
                            group: 'premium',
                            amount: 220,
                            suffix: '/month'
                          }
                        ],
                        'uninsured': [
                          {
                            group: "premium",
                            amount: 0
                          }
                        ]
                      },
                      showCosts: false,
                      hint: false
                    },
                    {
                      text: 'Going to Urgent Care will mean you owe a larger copay or coinsurance.',
                      costs: {
                        'insured': [
                          {
                            label: "Coinsurance",
                            group: 'coinsurance',
                            amount: 150
                          },
                        ],
                        'uninsured' : [
                          {
                            group: "visit",
                            amount: 300 
                          }
                        ]
                      },
                      showCosts: true,
                      hint: "See what you’d pay if you went to your primary care provider"
                    },
                    {
                      text: 'The doctor/nurse practitioner sends you to get an MRI and blood test, for which you will owe more coinsurance.',
                      costs: {
                        'insured': [
                          {
                            label: "Blood test",
                            group: 'bloodmri',
                            amount: 75
                          },
                          {
                            label: "MRI Coinsurance",
                            group: 'bloodmri',
                            amount: 1200
                          },
                        ],
                        'uninsured' : [
                          {
                            group: "bloodmri",
                            amount: 1800 
                          },
                        ]
                      },
                      showCosts: true,
                      hint: false
                    },
                  ],
                  'groups': {
                    'premium': {
                      'label': 'Premium',
                      'weight': 0
                    },
                    'coinsurance': {
                      'label': 'Coinsurance',
                      'weight': 1
                    },
                    'visit': {
                      'label': 'Urgent Care visit',
                      'weight': 1
                    },
                    'bloodmri': {
                      'label': 'Blood test/MRI',
                      'weight': 2
                    }
                  },
                  'results': {
                    'hint': 'If you’d gone to your Primary Care Provider?',
                    'text': 'You check out as healthy after the tests. You just had a bad virus, but your Primary Care Provider wants you to keep an eye on your cholesterol.'
                  }
                },
                {//ER
                  'stories': [
                    {
                      text: 'You’ve been paying your monthly premium for health insurance, so you have coverage when you need to be seen.',
                      costs: {
                        'insured': [
                          {
                            label: "Premium",
                            group: 'premium',
                            amount: 220,
                            suffix: '/month'
                          }
                        ],
                        'uninsured': [
                          {
                            group: "premium",
                            amount: 0
                          }
                        ]
                      },
                      showCosts: false,
                      hint: false
                    },
                    {
                      text: 'Going to the ER will mean you will owe coinsurance to be seen.',
                      costs: {
                        'insured': [
                          {
                            label: "Coinsurance",
                            group: 'coinsurance',
                            amount: 400
                          },
                        ],
                        'uninsured' : [
                          {
                            group: "visit",
                            amount: 600 
                          }
                        ]
                      },
                      showCosts: true,
                      hint: "See what you’d pay if you went to your primary care provider"
                    },
                    {
                      text: 'The doctor/nurse practitioner sends you to get an MRI and blood test, for which you will owe more coinsurance.',
                      costs: {
                        'insured': [
                          {
                            label: "Blood test",
                            group: 'bloodmri',
                            amount: 150
                          },
                          {
                            label: "MRI Coinsurance",
                            group: 'bloodmri',
                            amount: 2500
                          },
                          {
                            label: "Facility fee coinsurance",
                            group: 'facility',
                            amount: 1000
                          },
                        ],
                        'uninsured' : [
                          {
                            group: "bloodmri",
                            amount: 3000 
                          },
                          {
                            group: 'facility',
                            amount: 1500
                          },
                        ]
                      },
                      showCosts: true,
                      hint: false
                    },
                  ],
                  'groups': {
                    'premium': {
                      'label': 'Premium',
                      'weight': 0
                    },
                    'coinsurance': {
                      'label': 'Coinsurance',
                      'weight': 1
                    },
                    'visit': {
                      'label': ' ER visit',
                      'weight': 1
                    },
                    'bloodmri': {
                      'label': 'Blood test/MRI',
                      'weight': 2
                    },
                    'facility': {
                      'label': 'Facility fee',
                      'weight': 3
                    }
                  },
                  'results': {
                    'hint': 'If you’d gone to your Primary Care Provider?',
                    'text': 'You check out as healthy after the tests. You just had a bad virus, but your Primary Care Provider wants you to keep an eye on your cholesterol.'
                  }
                } 
              ]
            ]
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