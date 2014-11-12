'use strict';

angular.module('app.shop')

// shop factory
.factory('appShopFactory', 

  [         '$http', '$q', '$cacheFactory',
    function($http,   $q,   $cacheFactory) {

      var shopFactory = {};
      var cache = $cacheFactory('shopFactory');

      shopFactory.getShopFlow = function () {
        var callUrl  = 'shopFlow',
            deferred = $q.defer(),
            data     = cache.get(callUrl);

        // Nothing in cache
        if(!data) {
          var result = {
            // QUESTIONS
            'questions': [
              {
                'question': 'How often do you see your primary care provider?',
                'options': [
                  {
                    'label': 'Annual Physical',
                    'value': -1
                  },
                  {
                    'label': '1-3 times/year',
                    'value': 0
                  },
                  {
                    'label': '4+ times/year',
                    'value': 1
                  }
                ]
              },
              {
                'question': 'Do you normally see a specialist? (like a heart doctor, brain doctor, asthma or lung doctor)',
                'options': [
                  {
                    'label': 'No',
                    'value': -1
                  },
                  {
                    'label': 'Yes',
                    'value': 1
                  }
                ]
              },
              {
                'question': 'Could you see yourself going to the Emergency Room because of health or lifestyle...',
                'options': [
                  {
                    'label': 'Once or less per year',
                    'value': -1
                  },
                  {
                    'label': 'Maybe a couple times a year',
                    'value': 0
                  },
                  {
                    'label': 'Jane, the ER receptionist, and I are becoming best friends',
                    'value': 1
                  }
                ]
              },
              {
                'question': 'How many prescription drugs do you regularly use/need?',
                'options': [
                  {
                    'label': 'None',
                    'value': -1
                  },
                  {
                    'label': '1-3 prescriptions',
                    'value': 0
                  },
                  {
                    'label': '4+ prescriptions',
                    'value': 1
                  }
                ]
              },
              {
                'question': 'Are you planning to have any surgery this year?',
                'options': [
                  {
                    'label': 'No',
                    'value': -1
                  },
                  {
                    'label': 'Yes',
                    'value': 1
                  }
                ]
              },
              {
                'question': 'Thinking of having a baby this year?',
                'options': [
                  {
                    'label': 'No',
                    'value': -1
                  },
                  {
                    'label': 'Yes',
                    'value': 1
                  }
                ]
              },
              {
                'question': 'Do you need access to medical equipment (such as an insulin pen)?',
                'options': [
                  {
                    'label': 'No',
                    'value': -1
                  },
                  {
                    'label': 'Yes',
                    'value': 1
                  }
                ]
              },
              {
                'question': 'Is your monthly income in the range shown on the cart below? (if below these ranges, you may qualify for Medicaid a low cost state insurance program) (chart showing 138-250% FPL per month by family size to 6)',
                'options': [
                  {
                    'label': 'Yes',
                    'value': 'special' // special (always silver)
                  },
                  {
                    'label': 'No, my monthly income is higher',
                    'value': 0
                  }
                ]
              },
            ],
            // TIERS
            'tiers': [
              {
                'key': 'bronze',
                'label': 'Bronze',                
                'text': 'Sounds like a Bronze level plan might be right for you. Bronze plans have lower premiums, but higher deductibles and out-of-pocket costs.',
                'stats': {
                  'premium': '$127.71',
                  'deductible': '$6,500',
                  'outOfPocket': '$6,500',
                  'preventiveCare': '$0',
                  'primaryCare': '100% *',
                  'specialtyCare': '100% *',
                  'copay': '100% *',
                  'hospital': '100% *',
                  'genericDrugs': '$20/100% *',
                  'specialtyDrugs': '100% *',
                  'xray': '100% *'
                },
                'note': '* Until deductible met'
              },
              {
                'key': 'silver',
                'label': 'Silver',
                'text': 'Sounds like a Silver level plan may be right for you. Silver level plans are often the most popular with moderate premiums and moderate deductibles and out-of-pocket costs.',
                'stats': {
                  'premium': '$220.21',
                  'deductible': '$2,050',
                  'outOfPocket': '$6,600',
                  'preventiveCare': '$0',
                  'primaryCare': '$25',
                  'specialtyCare': '$60',
                  'copay': '$500',
                  'hospital': '40%',
                  'genericDrugs': '$15/$40',
                  'specialtyDrugs': '40%',
                  'xray': '40%'
                }
              },
              {
                'key': 'gold',
                'label': 'Gold',
                'text': 'Sounds like a Gold level plan may be right for you, because you think you will use more health care services. Gold level plans have higher premiums, but lower deductibles and out-of-pocket costs.',
                'stats': {
                  'premium': '$269.52',
                  'deductible': '$3,750',
                  'outOfPocket': '$1,000',
                  'preventiveCare': '$0',
                  'primaryCare': '$30',
                  'specialtyCare': '$60',
                  'copay': '$350',
                  'hospital': '35%',
                  'genericDrugs': '$0/$30',
                  'specialtyDrugs': '35%',
                  'xray': '35%'
                }
              }
            ],
            // PLANS
            'plans': [
              {
                'key': 'hmo',
                'label': 'HMO',
                'longLabel': 'Health Maintenance Organization',
                'premiums': 'Tend to be lower',
                'primaryCare': 'Regardless of what is happening with your health, you will probably have to first select and see a Primary Care Provider within the HMO network.',
                'specialty': 'You are almost always required to first see your Primary Care Provider before you can see a specialist with a referral.',
                'outOfNetwork': 'Your insurance does not cover out-of-network providers except in emergency situations when no HMO providers are available.'
              },
              {
                'key': 'epo',
                'label': 'EPO',
                'longLabel': 'Exclusive Provider Organization',
                'premiums': 'Tend to be lower',
                'primaryCare': 'Limited choice of Primary Care Providers you can see within the network.',
                'specialty': 'Limited choice of specialists within the network.',
                'outOfNetwork': 'Your insurance does not cover out-of-network providers except in emergency situations when no in-network providers are available.'
              },
              {
                'key': 'ppo',
                'label': 'PPO',
                'longLabel': 'Preferred Provider Organization',
                'premiums': 'Higher',
                'primaryCare': 'Broad choice of primary care providers in the network.',
                'specialty': 'You can choose to see a specialist often without a referral from your Primary Care Provider. Relatively broad choice of specialists.',
                'outOfNetwork': 'You can see providers out-of-network, but you will have to cover the full costs until you reach a separate, more expensive out-of-pocket maximum. (often double your in-network maximum)'
              }
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

      return shopFactory;
    }
  ]
);