'use strict';

angular.module('app.use')

// use factory
.factory('appUseFactory', 

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
                {// Feeling Sick - PRIMARY
                  'stories': [
                    {
                      text: 'You’ve been paying your monthly premium of $220 for health insurance, so you have coverage when you need health care.',
                      costs: {
                        'insured': [/*
                          {
                            label: "Premium",
                            group: 'premium',
                            amount: 220,
                            suffix: '/month'
                          }
                        */],
                        'uninsured': [/*
                          {
                            group: "premium",
                            amount: 0
                          }
                        */]
                      },
                      img: 'PayingPremium_1.png',
                      showCosts: false,
                      hint: false
                    },
                    {
                      text: 'You may have to pay a copay to see your Primary Care Provider (doctor) when you\'re sick.',
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
                            group: "primary",
                            amount: 160 
                          },
                        ]
                      },
                      img: 'FeelingSick_Primary_2.png',
                      showCosts: true,
                      hint: false
                    },
                    {
                      text: 'Your Primary Care Provider recommends you see a specialist. The specialist wants you to get a blood test and an MRI*. Your copay for the spcialist is more than your copay for your Primary Care Provider. You’ll also have to pay coinsurance for the MRI and blood test.',
                      costs: {
                        'insured': [
                          {
                            label: "Copay",
                            group: 'copay',
                            amount: 60,
                          },
                          {
                            label: "Coinsurance for blood test & MRI",
                            group: 'coinsurance',
                            amount: 450,
                          },
                        ],
                        'uninsured' : [
                          {
                            group: "specialty",
                            amount: 265 
                          },
                          {
                            group: 'blood',
                            amount: 200,
                          },
                          {
                            group: 'mri',
                            amount: 1500,
                          }
                        ]
                      },
                      img: 'FeelingSick_Primary_3.png',
                      showCosts: true,
                      hint: [
                        '*MRI (Magnetic Resonance Imaging) is a body imaging test.'
                      ]
                    },
                  ],
                  'groups': {
                    'premium': {
                      'label': 'Premium',
                      'weight': 0
                    },
                    'copay': {
                      'label': '2 Copays',
                      'weight': 1
                    },
                    'coinsurance': {
                      'label': 'Coinsurance for Blood test & MRI',
                      'weight': 2
                    },
                    'primary': {
                      'label': 'Primary Care visit',
                      'weight': 1
                    },
                    'specialty': {
                      'label': 'Specialty Care visit',
                      'weight': 2
                    },
                    'blood': {
                      'label': 'Blood test/MRI',
                      'weight': 3
                    },
                    'mri': {
                      'label': 'MRI',
                      'weight': 4
                    }
                  },
                  'results': {
                    'text': 'Good news! Your tests show you are healthy. But your blood test shows that your cholesterol is a little high, and your Primary Care Provider wants you to keep an eye on it.',
                    'hint': 'Please note: These costs are an example. Actual costs will vary based on your health insurance plan, level of coverage, and where you get your care.'
                  }
                },
                {// Feeling Sick - URGENT
                  'stories': [
                    {
                      text: 'You’ve been paying your monthly premium of $220 for health insurance, so you have coverage when you need health care.',
                      costs: {
                        'insured': [/*
                          {
                            label: "Premium",
                            group: 'premium',
                            amount: 220,
                            suffix: '/month'
                          }
                        */],
                        'uninsured': [/*
                          {
                            group: "premium",
                            amount: 0
                          }
                        */]
                      },
                      img: 'PayingPremium_1.png',
                      showCosts: false,
                      hint: false
                    },
                    {
                      text: 'It costs more to go to Urgent Care than to your Pirmary Care Provider. You owe a larger copay or coinsurance.',
                      costs: {
                        'insured': [
                          {
                            label: "Coinsurance",
                            group: 'coinsurance',
                            amount: 75
                          },
                        ],
                        'uninsured' : [
                          {
                            group: "visit",
                            amount: 150
                          }
                        ]
                      },
                      img: 'FeelingSick_Urgent_2.png',
                      showCosts: true,
                      hint: false
                    },
                    {
                      text: 'The doctor or nurse practitioner at Urgent Care sends you to get an MRI* and blood test. You have to pay coinsurance for these tests, too.',
                      costs: {
                        'insured': [
                          {
                            label: "Blood test",
                            group: 'blood',
                            amount: 55
                          },
                          {
                            label: "MRI Coinsurance",
                            group: 'mri',
                            amount: 1000
                          },
                        ],
                        'uninsured' : [
                          {
                            group: 'blood',
                            amount: 200
                          },
                          {
                            group: 'mri',
                            amount: 1600
                          },
                        ]
                      },
                      img: 'FeelingSick_Primary_3.png',
                      showCosts: true,
                      hint:  [
                        '*MRI (Magnetic Resonance Imaging) is a body imaging test.'
                      ]
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
                    'blood': {
                      'label': 'Blood test',
                      'weight': 2
                    },
                    'mri': {
                      'label': 'MRI',
                      'weight': 3
                    }
                  },
                  'results': {
                    'text': 'Good news! Your tests show you are healthy. But your blood test shows that your cholesterol is a little high, and your provider wants you to keep an eye on it.',
                    'hint': 'Please note: These costs are an example. Actual costs will vary based on your health insurance plan, level of coverage, and where you get your care.'
                  }
                },
                {// Feeling Sick - ER
                  'stories': [
                    {
                      text: 'It costs more to go to the Emergency Room than to you Primary Care Provider of Urgent Care. You will owe higher coinsurance or a large copay to be seen.',
                      costs: {
                        'insured': [/*
                          {
                            label: "Copay",
                            group: 'premium',
                            amount: 500,
                            suffix: '/month'
                          }
                        */],
                        'uninsured': [/*
                          {
                            group: "premium",
                            amount: 0
                          }
                        */]
                      },
                      img: 'PayingPremium_1.png',
                      showCosts: false,
                      hint: false
                    },
                    {
                      text: 'Going to the ER will mean you will owe coinsurance or a large copay to be seen.',
                      costs: {
                        'insured': [
                          {
                            label: "Copay",
                            group: 'copay',
                            amount: 500
                          },
                        ],
                        'uninsured' : [
                          {
                            group: "visit",
                            amount: 800 
                          }
                        ]
                      },
                      img: 'FeelingSick_Urgent_2.png',
                      showCosts: true,
                      hint: false
                    },
                    {
                      text: 'The doctor or nurse practitioner at the ER sends you to get an MRI* and blood test. You have to pay coinsurance for these tests, too.',
                      costs: {
                        'insured': [
                          {
                            label: "Blood test",
                            group: 'blood',
                            amount: 150
                          },
                          {
                            label: "MRI Coinsurance",
                            group: 'mri',
                            amount: 1750
                          },
                        ],
                        'uninsured' : [
                          {
                            group: "blood",
                            amount: 300 
                          },
                          {
                            group: "mri",
                            amount: 2700 
                          },
                          {
                            group: 'facility',
                            amount: 1500
                          },
                        ]
                      },
                      img: 'FeelingSick_Primary_3.png',
                      showCosts: true,
                      hint: [
                        '*MRI (Magnetic Resonance Imaging) is a body imaging test.'
                      ]
                    },
                  ],
                  'groups': {
                    'premium': {
                      'label': 'Premium',
                      'weight': 0
                    },
                    'copay': {
                      'label': 'Copay',
                      'weight': 1
                    },
                    'visit': {
                      'label': ' ER visit',
                      'weight': 1
                    },
                    'blood': {
                      'label': 'Blood test',
                      'weight': 2
                    },
                    'mri': {
                      'label': 'MRI',
                      'weight': 3
                    },
                    'facility': {
                      'label': 'Facility fee',
                      'weight': 4
                    }
                  },
                  'results': {
                    'text': 'You check out as healthy after the tests. You just had a bad virus, but your Primary Care Provider wants you to keep an eye on your cholesterol.',
                    'hint': 'Please note: These costs are an example. Actual costs will vary based on your health insurance plan, level of coverage, and where you get your care.'
                  }
                } 
              ],
              [// Nasty Cut
                {// Nasty Cut - PRIMARY
                  'stories': [
                    {
                      text: 'You\'ve been paying your monthly premium for health insurance, so you have coverage when you need to be seen.',
                      costs: {
                        'insured': [
                          /*{
                            label: "Premium",
                            group: 'premium',
                            amount: 220,
                            suffix: '/month'
                          }*/
                        ],
                        'uninsured': [
                          /*{
                            group: "premium",
                            amount: 0
                          }*/
                        ]
                      },
                      img: 'PayingPremium_1.png',
                      showCosts: false,
                      hint: false
                    },
                    {
                      text: 'If the cut is not too bad, your regular Primary Care Provider may be able to stitch you up. Call them first to find out.',
                      costs: {
                        'insured': [
                          {
                            label: "Copay",
                            group: 'copay',
                            amount: 25,
                          },
                          {
                            label: "Cleaning wound / stitches",
                            group: 'coinsurance',
                            amount: 75,
                          },
                        ],
                        'uninsured' : [
                          {
                            group: "visit",
                            amount: 150
                          },
                          {
                            group: 'stitches',
                            amount: 150,
                          },
                        ]
                      },
                      img: 'NastyCut_Primary_2.png',
                      showCosts: true,
                      hint: false
                    },
                    {
                      text: 'Oh no! Your cut starts to look a little like something from a horror film. It\'s getting infected. It happens, so don\'t freak out. Just get it taken care of! You go back to your provider to get it cleaned and stitched again.',
                      costs: {
                        'insured': [
                          {
                            label: "Copay",
                            group: 'copay',
                            amount: 25,
                          },
                          {
                            label: "Thorough cleaning / stitching",
                            group: 'coinsurance',
                            amount: 90,
                          },
                        ],
                        'uninsured' : [
                          {
                            group: "visit",
                            amount: 200
                          },
                          {
                            group: 'stitches',
                            amount: 350,
                          },
                        ]
                      },
                      img: 'NastyCut_ER_3.png',
                      showCosts: true,
                      hint: false
                    },
                  ],
                  'groups': {
                    'premium': {/*
                      'label': 'Premium',
                      'weight': 0
                    */},
                    'copay': {
                      'label': '2 Copays',
                      'weight': 1
                    },
                    'coinsurance': {
                      'label': 'Coinsurance for 2 visits',
                      'weight': 2
                    },
                    'visit': {
                      'label': '2 Doctor visits',
                      'weight': 1
                    },
                    'stitches': {
                      'label': '2 rounds of stitches',
                      'weight': 2
                    }
                  },
                  'results': {
                    'text': 'After about a week, your stitches are ready to come out and you\'re on the mend.',
                    'hint': 'Please note: These costs are an example. Actual costs will vary based on your health insurance plan, level of coverage, and where you get your care.'
                  }
                },
                {// Nasty Cut - URGENT
                  'stories': [
                    {
                      text: 'You’ve been paying your monthly premium for health insurance, so you have coverage when you need to be seen.',
                      costs: {
                        'insured': [/*
                          {
                            label: "Premium",
                            group: 'premium',
                            amount: 220,
                            suffix: '/month'
                          }
                        */],
                        'uninsured': [/*
                          {
                            group: "premium",
                            amount: 0
                          }
                        */]
                      },
                      img: 'PayingPremium_1.png',
                      showCosts: false,
                      hint: false
                    },
                    {
                      text: 'You head to Urgent Care to get stitched up.',
                      costs: {
                        'insured': [
                          {
                            label: "Copay",
                            group: 'copay',
                            amount: 75,
                          },
                          {
                            label: "Coinsurance / Stitches",
                            group: 'coinsurance',
                            amount: 175,
                          },
                        ],
                        'uninsured' : [
                          {
                            group: "visit",
                            amount: 200
                          },
                          {
                            group: 'stitches',
                            amount: 400,
                          },
                        ]
                      },
                      img: 'NastyCut_Urgent_2.png',
                      showCosts: true,
                      hint: false
                    },
                    {
                      text: 'Oh no! Your cut starts to look a little like something from a horror film. It\'s getting infected. It happens, so don\'t freak out. Just get it taken care of! You go back to Urgent Care to get it cleaned and stitched again.',
                      costs: {
                        'insured': [
                          {
                            label: "Copay",
                            group: 'copay',
                            amount: 75,
                          },
                          {
                            label: "Coinsurance / Stitches",
                            group: 'coinsurance',
                            amount: 200,
                          },
                        ],
                        'uninsured' : [
                          {
                            group: "visit",
                            amount: 200
                          },
                          {
                            group: 'stitches',
                            amount: 500,
                          },
                        ]
                      },
                      img: 'NastyCut_ER_3.png',
                      showCosts: true,
                      hint: false
                    },
                  ],
                  'groups': {
                    'premium': {/*
                      'label': 'Premium',
                      'weight': 0
                    */},
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
                    'stitches': {
                      'label': 'Cleanings / Stitches',
                      'weight': 2
                    }
                  },
                  'results': {
                    'text': 'After about a week, your stitches are ready to come out and you\'re on the mend.',
                    'hint': 'Please note: These costs are an example. Actual costs will vary based on your health insurance plan, level of coverage, and where you get your care.'
                  }
                },
                {// Nasty Cut - ER
                  'stories': [
                    {
                      text: 'You’ve been paying your monthly premium for health insurance, so you have coverage when you need to be seen.',
                      costs: {
                        'insured': [/*
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
                        */]
                      },
                      img: 'PayingPremium_1.png',
                      showCosts: false,
                      hint: false
                    },
                    {
                      text: 'You head to the Emergency Room (especially if you\'re bleeding badly) to get that gash taken care of.',
                      costs: {
                        'insured': [
                          {
                            label: "Copay",
                            group: 'copay',
                            amount: 500,
                          },
                          {
                            label: "Coinsurance / Stitches",
                            group: 'coinsurance',
                            amount: 250,
                          },
                        ],
                        'uninsured' : [
                          {
                            group: "visit",
                            amount: 700
                          },
                          {
                            group: 'stitches',
                            amount: 800,
                          },
                        ]
                      },
                      img: 'NastyCut_ER_2.png',
                      showCosts: true,
                      hint: false
                    },
                    {
                      text: 'Oh no! Your cut starts to look a little like something from a horror film. It\'s getting infected. It happens, so don\'t freak out. Just get it taken care of! You go back to the ER to get it cleaned and stitched again.',
                      costs: {
                        'insured': [
                          {
                            label: "Copay",
                            group: 'copay',
                            amount: 500,
                          },
                          {
                            label: "Coinsurance / Stitches",
                            group: 'coinsurance',
                            amount: 250,
                          },
                        ],
                        'uninsured' : [
                          {
                            group: "visit",
                            amount: 800
                          },
                          {
                            group: 'stitches',
                            amount: 1000,
                          },
                        ]
                      },
                      img: 'NastyCut_ER_3.png',
                      showCosts: true,
                      hint: false
                    },
                  ],
                  'groups': {
                    'premium': {/*
                      'label': 'Premium',
                      'weight': 0
                    */},
                    'copay': {
                      'label': '2 Copays',
                      'weight': 1
                    },
                    'coinsurance': {
                      'label': 'Coinsurance for 2 rounds of stitches',
                      'weight': 2
                    },
                    'visit': {
                      'label': '2 visits to ER',
                      'weight': 1
                    },
                    'stitches': {
                      'label': '2 rounds of stitches',
                      'weight': 2
                    },
                  },
                  'results': {
                    'text': 'After a few days to a week, your stitches are ready to come out and you\'re on the mend.',
                    'hint': 'Please note: These costs are an example. Actual costs will vary based on your health insurance plan, level of coverage, and where you get your care.'
                  }
                } 
              ],
              [// Appendicitis
                {// Appendicitis - PRIMARY
                  'stories': [],
                  'override': true,
                  'results': {
                    'text': 'Don\'t be stupid! That sharp, intense pain on the right side of your stomach could be serious. If you think you have appendicitis, GO TO THE EMERGENCY ROOM!!.'
                  },
                  img: 'Appendicitis_Primary_1.png'
                },
                {// Appendicitis -  URGENT
                  'stories': [],
                  'override': true,
                  'results': {
                    'text': 'Don\'t be stupid! That sharp, intense pain on the right side of your stomach could be serious. If you think you have appendicitis, GO TO THE EMERGENCY ROOM!!.'
                  },
                  img: 'Appendicitis_Primary_1.png'
                },
                {// Appendicitis - ER
                  'stories': [
                    {
                      text: 'You’ve been paying your monthly premium for health insurance, so you have coverage when you need to be seen.',
                      costs: {
                        'insured': [
                          /*{
                            label: "Premium",
                            group: 'premium',
                            amount: 220,
                            suffix: '/month'
                          },*/
                          {
                            label: "Pocket",
                            group: 'outofpocket',
                            amount: 4600
                          },
                        ],
                        'uninsured': [/*
                          {
                            group: "premium",
                            amount: 0
                          }*/
                        ]
                      },
                      img: 'PayingPremium_1.png',
                      showCosts: false,
                      hint: false
                    },
                    {
                      text: 'In the Emergency Room, a CT scan shows your appendix is ready to burst. You have to stay in the hospital.',
                      costs: {
                        'insured': [
                          {
                            label: "CT scan",
                            group: 'scan',
                            amount: 2000
                          }
                        ],
                        'uninsured' : []
                      },
                      img: 'Appendicitis_ER_2.png',
                      showCosts: true,
                      hint: ["You just hit your health insurance deductible."]
                    },
                    {
                      text: 'You have your appendix removed and you\'re in the hospital for 3 days to recover. Since you met your deductible, you pay 20% of the rest of the costs until you reach your out-of-pocket maximum.',
                      costs: {
                        'insured': [
                          {
                            label: "Overall Cost",
                            group: 'overall',
                            amount: 30000,
                            skipCount: true
                          },
                        ],
                        'uninsured' : [
                          {
                            group: "supplies",
                            amount: 6832
                          },
                          {
                            group: 'surgery',
                            amount: 15168
                          },
                          {
                            group: 'hospital',
                            amount: 9000
                          },
                          {
                            group: 'pharmacy',
                            amount: 1000
                          }
                        ]
                      },
                      img: 'Appendicitis_ER_3.png',
                      showCosts: true,
                      hint: ['You pay $4,600 to reach your out-of-pocket maximum and your health insurance pays for the rest!']
                    },
                  ],
                  'groups': {
                    'premium': {
                      'label': 'Premium',
                      'weight': 0
                    },
                    'scan': {
                      'label': 'Deductible / CT scan',
                      'weight': 1
                    },
                    'outofpocket': {
                      'label': 'Costs to reach Out-of-pocket Max',
                      'weight': 2,
                    },
                    'overall': {
                      'label': 'Overall',
                      'weight': 3,
                      'hide': true
                    },
                    'supplies': {
                      'label': 'Testing/supplies',
                      'weight': 0
                    },
                    'surgery': {
                      'label': 'Surgery',
                      'weight': 1
                    },
                    'hospital': {
                      'label': 'Hospital stay',
                      'weight': 2
                    },
                    'pharmacy': {
                      'label': 'Pharmacy costs',
                      'weight': 3
                    },
                  },
                  'results': {
                    'text': 'That was a close call, but thankfully your insurance helped protect you from going into debt to pay for an emergency you had no control over.',
                    'hint': 'Please note: These costs are an example. Actual costs will vary based on your health insurance plan, level of coverage, and where you get your care.'
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