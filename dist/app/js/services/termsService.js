'use strict';

angular.module('app')

// terms factory
.factory('appTermsFactory', 

  [         '$http', '$q', '$cacheFactory',
    function($http,   $q,   $cacheFactory) {

      var termsFactory = {};
      var cache = $cacheFactory('termsFactory');

      termsFactory.getTermsFlow = function () {
        var callUrl  = 'termsFlow',
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
              'text': 'The amount you have to pay for your health care before the insurance company begins to pay. For example, if your deductible is $1,000, you need to spend $1,000 on your health care costs before your insurance begins to cover some of the costs. All plans must provide many preventative services and screenings at no charge to you, so these services do not apply to the deductible. Plans may also offer other services that are free of charge and do not apply to the deductible.'
            },
            {
              'key': 'copay',
              'label': 'Co-pay',
              'text': 'The amount you pay every time you get a health service. For example, if your co-pay for a visit to your family doctor is $20, you will pay that amount every time to visit the doctor. You health insurance plan must cover many preventive services and screenings at no charge to you, so these services to not have a copay.'
            },
            {
              'key': 'coinsurance',
              'label': 'Co-insurance',
              'text': 'A percent you pay for a health service once you\'ve met your deductible. For example, if your co-insurance is 20% of a $1,000 medical bill, you will pay $200 and insurance will cover the rest.'
            },
            {
              'key': 'out-of-pocket-max',
              'label': 'Out-of-pocket maximum/limit',
              'text': 'The total amount you have to pay during the year before your health insurance pays 100% of your medical costs. The out-of-pocket maximum is only for one year and resets each year.'
            },
            {
              'key': 'in-network',
              'label': 'In-Network',
              'text': 'A group of providers (doctors), facilities (places), and suppliers (pharmacies and medical supplies) that work with your health insurance plan. You will pay less to use services in-network than out-of-network. Some health insurance plans will not pay at all for out-of-network services.'
            },
            {
              'key': 'out-of-network',
              'label': 'Out-of-Network',
              'text': 'A group of providers who DO NOT work with your health plan. You will pay more to see them, and some insurance plans will not pay for these services at all.'
            },
            {
              'key': 'primary-care',
              'label': 'Primary Care Provider',
              'text': 'Your main health care doctor or nurse practitioner. This is usually who you see first for most health problems, screenings, and check-ups (preventive care). Sometimes, you will have to see your Primary Care Provider to get a referral to specialist.'
            },
            {
              'key': 'preventive',
              'label': 'Preventive services',
              'text': 'Regular health care, like screenings, check-ups, and patient counseling, to find sicknesses or problems before they get worse. Most preventive care is fully covered by your monthly premiums and you do not have to pay anything else.'
            },
            {
              'key': 'explanation-of-benefits',
              'label': 'Explanation of Benefits (EOB)',
              'text': 'A form sent to you by your insurance company after you get health care. It is not a bill, but it is important to read it. It tells you the services that were billed by a health care provider and how much of the costs you will have to pay when a bill is sent to you.'
            },
            {
              'key': 'specialist',
              'label': 'Specialist',
              'text': 'A doctor who focuses on a special or specific kind of health care. For example, a cardiologist focuses on heart diseases and an oncologist focuses on treating cancer.'
            },
            {
              'key': 'open-enrollment',
              'label': 'Open enrollment period',
              'text': 'A time period, typically several months, in a given year when eligible persons or employees are able to sign up for health coverage through health insurance marketplaces. If you do not enroll in insurance during the open enrollment period, you may not be able to get health insurance coverage until the following year.'
            },
            {
              'key': 'special-enrollment',
              'label': 'Special enrollment period',
              'text': 'A period of time outside open enrollment when you can enroll in health insurance if you have a special event in your life. These events include losing your job, getting married/divorced, moving, or you turn 26 and can\'t be on your parent\'s health insurance anymore. '
            },
            {
              'key': 'claim',
              'label': 'Claim',
              'text': 'A bill that the health care provider sends to the health insurance company for the medical services given to a patient.'
            },
            {
              'key': 'referral',
              'label': 'Referral',
              'text': 'A recommendation from a Primary Care Provider to see a specialist. For example, your doctor may give you a referral to see an Ear, Nose, and Throat specialist. With some health insurance plans, you must get a referral from you Primary Care Provider before you can see a specialist.'
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

      return termsFactory;
    }
  ]
);