'shop strict';

angular.module('healthLiteracy.shop')

// shop factory
.factory('healthLiteracyShopFactory', 

  [         '$http', '$q', '$cacheFactory',
    function($http,   $q,   $cacheFactory) {

      var shopFactory = {};
      var cache = $cacheFactory('shopFactory');

      shopFactory.getshopFlow = function () {
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
                'question': 'Do you typically see a specialist? (like a...)',
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
                'question': 'Could you see yourself in the Emergency Room because of health or lifestyle...',
                'options': [
                  {
                    'label': 'Once or less per year',
                    'value': -1
                  },
                  {
                    'label': ' Maybe a couple times',
                    'value': 0
                  },
                  {
                    'label': 'Jane the ER receptionist and I are becoming best friends',
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
                'question': 'Do you need access to medical equipment (such as an insulin pen, ...)?',
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
                'question': 'Is your income between the following per month? (if below these ranges, you may qualify for Medicaid a low cost state insurance program) (chart showing 138-250% FPL per month by family size to 6)',
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
                'text': 'Sounds like a Bronze level plan might be right for you. These plans have the lowest premiums, but if you end up needing more health care services than anticipated, you\'ll have to pay more out of pocket up front. A bronze plan covers an average of 60% of health care services before you reach your out of pocket maximum.',
                'stats': {
                  'premium': 100,
                  'copay': 100,
                  'deductible': 100,
                  'primaryCare': 100,
                  'er': 100,
                  'prescriptions': 100,
                  'maternity': 100,
                  'devices': 100
                }
              },
              {
                'key': 'silver',
                'label': 'Silver',
                'text': 'Sounds like a Silver level plan may be right for you. Silver level plans are generally the most popular with moderate premiums, and cover an average of 70% of costs of health care services before you reach your out of pocket maximum.',
                'stats': {
                  'premium': 10,
                  'copay': 100,
                  'deductible': 100,
                  'primaryCare': 100,
                  'er': 100,
                  'prescriptions': 100,
                  'maternity': 100,
                  'devices': 100
                }
              },
              {
                'key': 'gold',
                'label': 'Gold',
                'text': 'Sounds like a Gold level plan may be right for you, because you anticipate using more health care services. Gold level plans have higher premiums but cover more expenses up front. Gold plans cover an average of 80% of costs of health care services before you reach your out of pocket maximum.',
                'stats': {
                  'premium': 1,
                  'copay': 100,
                  'deductible': 100,
                  'primaryCare': 100,
                  'er': 100,
                  'prescriptions': 100,
                  'maternity': 100,
                  'devices': 100
                }
              }
            ],
            // PLANS
            'plans': [
              {
                'key': 'hmo',
                'label': 'HMO',
                'premiums': 'Tend to be lower',
                'primaryCare': 'Regardless of what is happening with you\'re health, you will probably have to first select and see a Primary Care Provider within the HMO network.',
                'specialty': 'You are almost always required to first see your Primary Care Provider before you can see a specialist with a referral.',
                'outOfNetwork': 'No out-of-network coverage in your insurance except in emergency situations when no HMO providers are available.'
              },
              {
                'key': 'epo',
                'label': 'EPO',
                'premiums': 'Tend to be lower',
                'primaryCare': 'Limited Choice of Primary Care Providers you can see within the network.',
                'specialty': 'Limited choice of specialists within the network.',
                'outOfNetwork': 'No out-of-network coverage in your insurance except maybe in emergency situations when no in-network providers are available.'
              },
              {
                'key': 'ppo',
                'label': 'PPO',
                'premiums': 'Higher',
                'primaryCare': 'Broad choice of primary care providers in the network.',
                'specialty': 'You can choose to see a specialist often without a referral from your Primary Care Provider. Relatively broad choice of specialists.',
                'outOfNetwork': 'You can see providers out-of-network, but you will have to cover the full costs until you reach a separate, more expensive out-of-pocket maximum. (often double your in-network maximum).'
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