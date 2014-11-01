'use strict';

angular.module('healthLiteracy')

// shop factory
.factory('healthLiteracyTermsFactory', 

  [         '$http', '$q', '$cacheFactory',
    function($http,   $q,   $cacheFactory) {

      var shopFactory = {};
      var cache = $cacheFactory('shopFactory');

      shopFactory.getTermsFlow = function () {
        var callUrl  = 'shopFlow',
            deferred = $q.defer(),
            data     = cache.get(callUrl);

        // Nothing in cache
        if(!data) {
          var result = [
            {
              'key': 'premium',
              'label': 'Premium',
              'text': 'The amount you pay for your insurance plan every month. You pay this even if you don\'t use health care services that month.'
            },
            {
              'key': 'deductible',
              'label': 'Deductible',
              'text': 'The amount you owe before the insurance company begins to pay for particular services. For example, if your deductible is $1,000, you need to spend $1,000 on your health care costs before your insurance begins to cover some of the costs. All plans must provide many preventative services and screenings at no charge to you. '
            },
            {
              'key': 'premium',
              'label': 'Premium',
              'text': 'The amount you pay for your insurance plan every month. You pay this even if you don\'t use health care services that month.'
            },
            {
              'key': 'copay',
              'label': 'Co-pay',
              'text': 'The amount you pay every time you receive a health service. For example, if your co-pay for a visit to your family doctor is $20, you will pay that amount every time to visit him/her unless it is a preventive service with no copay.'
            },
            {
              'key': 'coinsurance',
              'label': 'Co-insurance',
              'text': 'A percent you may pay for a health service (once you\'ve met your deductible.) For example, if your co-insurance is 20% of a $1,000 medical bill, you will pay $200 and insurance will cover the rest.'
            },
            {
              'key': 'out-of-pocket-max',
              'label': 'Out-of-pocket maximum',
              'text': 'The total amount you would have to pay during the year before your health insurance pays 100% of your medical costs. The out-of-pocket maximum resets each year.'
            },
            {
              'key': 'in-network',
              'label': 'In-Network',
              'text': 'A group of providers (doctors), facilities (locations), and suppliers that work with your health insurance plan. You will pay less to see the group of "in-network" than "out-of-network". Some health insurance plans will not pay for services by providers that are "out-of-network."'
            },
            {
              'key': 'out-of-network',
              'label': 'Out-of-Network',
              'text': 'A group of providers who DO NOT work with your health plan. You will pay more to see them.'
            },
            {
              'key': 'primary-care',
              'label': 'Primary Care Provider',
              'text': 'Your main health care doctor/nurse practitioner -- usually who you see first for most health problems and for preventive care and annual exams. Sometimes, you will have to see your primary care doctor to get referrals to specialists for additional services.'
            },
            {
              'key': 'preventive',
              'label': 'Preventive services',
              'text': 'Regular health care that includes screenings, annual check-ups, and patient counseling to detect sicknesses or problems before a condition develops or worsens. Most preventive services are fully covered by your monthly premiums and you will pay no additional costs.'
            },
            {
              'key': 'explanation-of-benefits',
              'label': 'Explanation of Benefits',
              'text': 'A form sent to you by your insurance company after you see a provider or receive a health service. It is not a bill. It tells you the services that were billed by a health care provider, how the charges are processed, and how much of the bill you will have to pay when it is sent to you.'
            },
            {
              'key': 'specialist',
              'label': 'Specialist',
              'text': 'A doctor who is not a primary care provider but provides more specialized/specific kinds of health care services. For example, a cardiologist focuses on heart health and an oncologist focuses on treating cancer.'
            },
            {
              'key': 'open-enrollment',
              'label': 'Open enrollment period',
              'text': 'A time period, typically several months, in a given year when eligible persons or employees are able to sign up for health coverage through health insurance marketplaces. If you do not enroll in insurance during the open enrollment period, you may not be able to get health insurance coverage until the following year.'
            },
            {
              'key': 'special-enrollment',
              'label': 'Special enrollment period',
              'text': 'A period of time outside open enrollment when you can enroll in health insurance if you have a special event in your life. These events include losing your job, getting married/divorced, moving, or aging off your parents plan.'
            },
            {
              'key': 'claim',
              'label': 'Claim',
              'text': 'A bill for the medical services provided to a patient. This will typically be submitted to a health insurance company by a healthcare provider.'
            },
            {
              'key': 'referral',
              'label': 'Referral',
              'text': 'A direction or recommendation by a primary care provider to see a specialist provider for further treatment or evaluation. Depending on the type of network you may or may not be required to get a referral to see a specialist.'
            }
          ];
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