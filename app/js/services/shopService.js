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
                'question': '¿Con qué frecuencia consulta a su proveedor de atención médica primaria?',
                'options': [
                  {
                    'label': 'Anualmente para examen físico',
                    'value': -1
                  },
                  {
                    'label': 'De 1 a 3 veces/año',
                    'value': 0
                  },
                  {
                    'label': 'Más de 4 veces/año',
                    'value': 1
                  }
                ]
              },
              {
                'question': '¿Suele consultar a especialistas? (como a un cardiólogo, un neurólogo, un especialista en asma o un neumonólogo)',
                'options': [
                  {
                    'label': 'No',
                    'value': -1
                  },
                  {
                    'label': 'Sí',
                    'value': 1
                  }
                ]
              },
              {
                'question': 'Se puede ver visitando la sala de emergencia por cuestiones de salud o estilo de vida...',
                'options': [
                  {
                    'label': 'Una vez o menos al año',
                    'value': -1
                  },
                  {
                    'label': 'Quizá un par de veces al año',
                    'value': 0
                  },
                  {
                    'label': 'Ana la recepcionista de la sala de emergencia, y yo nos estamos convirtiendo en mejores amigos',
                    'value': 1
                  }
                ]
              },
              {
                'question': '¿Cuántos medicamentos recetados usa/necesita con regularidad?',
                'options': [
                  {
                    'label': 'Ninguno',
                    'value': -1
                  },
                  {
                    'label': 'De 1 a 3 medicamentos recetados',
                    'value': 0
                  },
                  {
                    'label': 'Más de 4 medicamentos recetados',
                    'value': 1
                  }
                ]
              },
              {
                'question': '¿Planea someterse a alguna cirugía este año?',
                'options': [
                  {
                    'label': 'No',
                    'value': -1
                  },
                  {
                    'label': 'Sí',
                    'value': 1
                  }
                ]
              },
              {
                'question': '¿Piensa en tener un bebé este año?',
                'options': [
                  {
                    'label': 'No',
                    'value': -1
                  },
                  {
                    'label': 'Sí',
                    'value': 1
                  }
                ]
              },
              {
                'question': '¿Necesita acceso a equipos médicos (como por ejemplo una pluma de insulina,...)?',
                'options': [
                  {
                    'label': 'No',
                    'value': -1
                  },
                  {
                    'label': 'Sí',
                    'value': 1
                  }
                ]
              },
              {
                'question': '¿Se encuentra su ingreso mensual dentro del rango que se muestra en <a open-reveal="compareModal">esta tabla</a>? (si es menos que estos rangos, posiblemente califique para Medicaid, un programa de seguro estatal de bajo costo)',
                'options': [
                  {
                    'label': 'Sí',
                    'value': 'special' // special (always silver)
                  },
                  {
                    'label': 'No, mi ingreso mensual cae fuera de ese rango',
                    'value': 0
                  }
                ]
              },
            ],
            // TIERS
            'tiers': [
              {
                'key': 'bronze',
                'label': 'Bronce',                
                'text': 'Los planes Bronce tienen cuotas más bajas, pero deducibles y desembolsos más altos.',
                'stats': {
                  'premium': '$128',
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
                'label': 'Plata',
                'text': 'Los planes de nivel Plata suelen ser los más populares debido a que tienen cuotas, deducibles y desembolsos moderados.',
                'stats': {
                  'premium': '$220',
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
                'label': 'Oro',
                'text': 'Un plan de nivel Oro podría ser adecuado para usted si cree que usará más servicios de atención médica. Los planes de nivel Oro tienen cuotas más altas, pero deducibles y desembolsos más bajos.',
                'stats': {
                  'premium': '$270',
                  'deductible': '$1,000',
                  'outOfPocket': '$3,750',
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
                'longLabel': 'Organización para el mantenimiento de la salud',
                'premiums': 'Tienden a ser más económicas',
                'primaryCare': 'Independientemente de lo que esté ocurriendo con su salud, probablemente primero deba seleccionar y consultar a un proveedor de atención médica primaria perteneciente a la red de HMO.',
                'specialty': 'Casi siempre se le exige que primero consulte al proveedor de atención médica primaria antes de poder visitar a un especialista con una remisión.',
                'outOfNetwork': 'Su seguro no cubre a los proveedores fuera de la red, excepto en situaciones de emergencia en la que no hay proveedores HMO disponibles.'
              },
              {
                'key': 'epo',
                'label': 'EPO',
                'longLabel': 'Organización de proveedores exclusivos',
                'premiums': 'Tienden a ser más económicas',
                'primaryCare': 'Elección limitada de proveedores de atención médica primaria a quienes puede consultar dentro de la red.',
                'specialty': 'Elección limitada de especialistas dentro de la red.',
                'outOfNetwork': 'Su seguro no cubre a los proveedores fuera de la red, excepto en situaciones de emergencia en la que no hay proveedores dentro de la red disponibles.'
              },
              {
                'key': 'ppo',
                'label': 'PPO',
                'longLabel': 'Organización de proveedores preferidos',
                'premiums': 'Más altas',
                'primaryCare': 'Amplia elección de proveedores de atención médica primaria en la red.',
                'specialty': 'Puede optar por consultar a un especialista a menudo sin una remisión del proveedor de atención médica primaria. Elección relativamente amplia de especialistas.',
                'outOfNetwork': 'Puede consultar a proveedores fuera de la red, pero deberá cubrir los costos completos hasta alcanzar un desembolso máximo más costoso por separado. (A menudo, del doble del máximo dentro de la red).'
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