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
              'title': 'Elija una situación',
              'options': [
                {
                  'title': 'Tiempo para un chequeo anual médica',
                  'id': 'routine'
                },
                {
                  'title': 'Malestar',
                  'id': 'sick'
                },
                {
                  'title': 'Cortada fea',
                  'id': 'cut'
                },
                {
                  'title': 'Cree que puede tener apendicitis',
                  'id': 'major'
                }
              ],
            },
            'action': {
              'title': '¿Adónde va ud.?',
              'options': [
                {
                  'title': 'Atención primaria',
                  'id': 'doctor'
                },
                {
                  'title': 'Atención urgente',
                  'id': 'clinic'
                },
                {
                  'title': 'Sala de emergencia',
                  'id': 'emergency'
                }
              ],
            },
            'results': [
              [// Routine (annual check-up)
                {// Routine - PRIMARY
                  'stories': [
                    {
                      text: 'Ha estado pagando su cuota  mensual de $275 para el seguro médico, para tener cobertura cuando necesite atención médica.',
                      img: 'PayingPremium_1.png',
                      showCosts: false,
                      hint: false
                    },
                    {
                      text: 'Si usted va a recibir su chequeo anual, es un servicio preventivo y no tendrá que pagar un copago.',
                      img: 'Routine_Free.png',
                      showCosts: true,
                      hint: ['*IMPORTANTE: Si se acude a su proveedor por una enfermedad que ya se experimenta, como un resfriado o herida menor, la visita no se considera como preventiva y usted tendría que pagar un copago.']
                    },
                    {
                      text: 'Durante su chequeo anual, su proveedor de atención médica primaria (médico de cabecera) puede proveer otros servicios preventivos sin copago (por ejemplo una prueba para las infecciones de transmisión sexual, chequeo por la depresión, un análisis de sangre para el colesterol y para la diabetes, los anticonceptivos, etc.) Usted recibe su prueba para las infecciones de transmisión sexual, un análisis de sangre, y una vacuna contra la gripe para mantener su sistema inmunológico.',
                      costs: {
                        'insured': [
                          {
                            label: "Copago",
                            group: 'overall',
                            amount: 0,
                            skipCount: true
                          },
                        ]
                      },
                      img: 'Routine_Free2.png',
                      showCosts: true,
                      //hint: ['You pay $4,800 in coinsurance to reach your out-of-pocket maximum and your health insurance pays for the rest!']
                    },
                    {
                      text: 'Su análisis de sangre muestra que su nivel de azúcar está un poco alto. Su proveedor de atención médica primaria le aconseja que usted coma más saludable y haga ejercicio con frecuencia para evitar la diabetes. Su médico quiere que usted regrese el próximo año por otro chequeo. ¡Felicidades! Acaba de establecer una relación con un proveedor de atención médica primaria. Esto puede hacer más fácil obtener una visita en seguida si está enfermo y así puede evitar costos más altos de la atención urgente o sala de emergencia.',
                      costs: {
                        'insured': [
                          {
                            'label': 'Chequeo Anual',
                            group: "annual",
                            amount: 0 
                          },
                          {
                            'label': 'Análisis de sangre',
                            group: 'blood',
                            amount: 0
                          },
                          {
                            'label': 'Prueba por infecciones sexuales',
                            group: 'sti',
                            amount: 0
                          },
                          {
                            'label': 'Vacuna de gripe',
                            group: 'vaccine',
                            amount: 0
                          }
                        ],
                        'uninsured' : [
                          {
                            group: "annual",
                            amount: 160 
                          },
                          {
                            group: 'blood',
                            amount: 200
                          },
                          {
                            group: 'sti',
                            amount: 200
                          },
                          {
                            group: 'vaccine',
                            amount: 35
                          }
                        ]
                      },
                      img: 'Routine_Recurring.png',
                      showCosts: true
                    },
                  ],
                  'override': false,
                  'groups': {
                    'annual': {
                      'label': 'Chequeo Anual',
                      'weight': 1
                    },
                    'blood': {
                      'label': 'Análisis de sangre',
                      'weight': 2
                    },
                    'sti': {
                      'label': 'Prueba por infecciones sexuales',
                      'weight': 3
                    },
                    'vaccine': {
                      'label': 'Vacuna de gripe',
                      'weight': 4
                    },
                    'overall': {
                      'label': 'Total',
                      'weight': 3,
                      'hide': true
                    }
                  },
                  'results': {
                    'text': 'Tenga en cuenta que los costos son ejemplos. Los costos reales variarán en función de su plan de seguro médico, el nivel de cobertura y el lugar en el que obtenga la atención médica.'
                  },
                  img: 'Routine_Recurring.png'
                },
                {// Routine -  URGENT
                  'stories': [],
                  'override': true,
                  'results': {
                    'text': 'Es posible que usted pueda recibir algunos servicios preventivos en un lugar de urgencias como un chequeo anual, pero tendrá que pagar. <a href="/use/action?scenarioId=0">Veamos que pasa</a> cuando usted visita a su proveedor de atención médica primaria.'
                  },
                  img: 'NastyCut_ER_3.png'
                },
                {// Routine -  ER
                  'stories': [],
                  'override': true,
                  'results': {
                    'text': 'Perdón, la sala de emergencia no provee servicios como un chequeo básico o físico anual. <a href="/use/action?scenarioId=0">Vuelva atrás</a> y pruebe con otra opción.'
                  },
                  img: 'NastyCut_ER_3.png'
                }
              ],
              [// Feeling Sick
                {// Feeling Sick - PRIMARY
                  'stories': [
                    {
                      text: 'Ha estado pagando su cuota mensual de $275 para el seguro médico, para tener cobertura cuando necesite atención médica.',
                      costs: {
                        'insured': [/*
                          {
                            label: "Premium",
                            group: 'premium',
                            amount: 275,
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
                      text: 'Es posible que deba pagar un copago para consultar a su proveedor de atención médica primaria (médico) cuando esté enfermo.',
                      costs: {
                        'insured': [
                          {
                            label: "Copago",
                            group: 'copay',
                            amount: 30,
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
                      text: 'Su proveedor de atención médica primaria le recomienda que consulte a un especialista. El especialista le sugiere que se realice un análisis de sangre y una resonancia magnética*. El copago del especialista es más que el copago del proveedor de atención médica primaria. También, deberá pagar un coaseguro por la RM y el análisis de sangre siempre que se haya cumplido con el deducible.',
                      costs: {
                        'insured': [
                          {
                            label: "Copago",
                            group: 'copay',
                            amount: 60,
                          },
                          {
                            label: "Coaseguro para el análisis de sangre y la RM",
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
                        '*La RM (resonancia magnética) es una prueba de diagnóstico por imágenes.'
                      ]
                    },
                  ],
                  'groups': {
                    'premium': {
                      'label': 'Cuota',
                      'weight': 0
                    },
                    'copay': {
                      'label': '2 copagos',
                      'weight': 1
                    },
                    'coinsurance': {
                      'label': 'Coaseguro para análisis de sangre y RM',
                      'weight': 2
                    },
                    'primary': {
                      'label': 'Visita de atención médica primaria',
                      'weight': 1
                    },
                    'specialty': {
                      'label': 'Visita de atención de especialidad',
                      'weight': 2
                    },
                    'blood': {
                      'label': 'Análisis de sangre',
                      'weight': 3
                    },
                    'mri': {
                      'label': 'RM',
                      'weight': 4
                    }
                  },
                  'results': {
                    'text': '¡Buenas noticias! Sus pruebas muestran que está sano. Pero el análisis de sangre muestra que tiene el colesterol un poco alto y su proveedor de atención médica primaria desea que lo monitoree.',
                    'hint': 'Tenga en cuenta que los costos son ejemplos. Los costos reales variarán en función de su plan de seguro médico, el nivel de cobertura y el lugar en el que obtenga la atención médica.'
                  }
                },
                {// Feeling Sick - URGENT
                  'stories': [
                    {
                      text: 'Ha estado pagando su cuota mensual de $275 para el seguro médico, para tener cobertura cuando necesite atención médica.',
                      costs: {
                        'insured': [/*
                          {
                            label: "Premium",
                            group: 'premium',
                            amount: 275,
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
                      text: 'Cuesta más recibir atención urgente que visitar al proveedor de atención médica primaria. Usted tiene un copago mayor.',
                      costs: {
                        'insured': [
                          {
                            label: "Copago",
                            group: 'copay',
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
                      text: 'El médico o la enfermera profesional de atención urgente lo envía para que se realice una RM* y un análisis de sangre. Según su cobertura y si ha cumplido con el deducible, tendrá que pagar un coaseguro por estas pruebas.',
                      costs: {
                        'insured': [
                          {
                            label: "Análisis de sangre",
                            group: 'blood',
                            amount: 55
                          },
                          {
                            label: "RM",
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
                        '*La RM (resonancia magnética) es una prueba de diagnóstico por imágenes.'
                      ]
                    },
                  ],
                  'groups': {
                    'premium': {
                      'label': 'Cuota',
                      'weight': 0
                    },
                    'copay': {
                      'label': 'Copago',
                      'weight': 1
                    },
                    'coinsurance': {
                      'label': 'Coaseguro',
                      'weight': 1
                    },
                    'visit': {
                      'label': 'Visita de atención urgente',
                      'weight': 1
                    },
                    'blood': {
                      'label': 'Análisis de sangre',
                      'weight': 2
                    },
                    'mri': {
                      'label': 'RM',
                      'weight': 3
                    }
                  },
                  'results': {
                    'text': '¡Buenas noticias! Sus pruebas muestran que está sano. Pero el análisis de sangre muestra que tiene el colesterol un poco alto y su proveedor desea que lo monitoree.',
                    'hint': 'Tenga en cuenta que los costos se presentan a modo de ejemplo. Los costos reales variarán en función de su plan de seguro médico, el nivel de cobertura y el lugar en el que obtenga la cobertura.'
                  }
                },
                {// Feeling Sick - ER
                  'stories': [
                    {
                      text: 'Ha estado pagando su cuota mensual de $275 para el seguro médico, para tener cobertura cuando necesite atención médica.',
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
                      text: 'Cuesta más acudir a la sala de emergencia que al proveedor de atención médica primaria o que recibir atención urgente. Según su cobertura y si ha cumplido con el deducible, tendrá un coaseguro más alto o un copago mayor para asistir a una consulta.',
                      costs: {
                        'insured': [
                          {
                            label: "Copago",
                            group: 'copay',
                            amount: 500
                          },
                        ],
                        'uninsured' : [
                          {
                            group: "visit",
                            amount: 1000 
                          }
                        ]
                      },
                      img: 'FeelingSick_Urgent_2.png',
                      showCosts: true,
                      hint: false
                    },
                    {
                      text: 'El médico o la enfermera profesional de la sala de emergencia lo envía para que se realice una RM* y un análisis de sangre. Por estas pruebas también debe pagar un coaseguro.',
                      costs: {
                        'insured': [
                          {
                            label: "Análisis de sangre",
                            group: 'blood',
                            amount: 150
                          },
                          {
                            label: "Coaseguro de la RM",
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
                        '*La RM (resonancia magnética) es una prueba de diagnóstico por imágenes.'
                      ]
                    },
                  ],
                  'groups': {
                    'premium': {
                      'label': 'Cuota',
                      'weight': 0
                    },
                    'copay': {
                      'label': 'Copago',
                      'weight': 1
                    },
                    'visit': {
                      'label': 'Visita a la sala de emergencia',
                      'weight': 1
                    },
                    'blood': {
                      'label': 'Análisis de sangre',
                      'weight': 2
                    },
                    'mri': {
                      'label': 'RM',
                      'weight': 3
                    },
                    'facility': {
                      'label': 'Cargos del centro',
                      'weight': 4
                    }
                  },
                  'results': {
                    'text': '¡Buenas noticias! Sus pruebas muestran que está sano. Pero el análisis de sangre muestra que tiene el colesterol un poco alto y su proveedor desea que lo monitoree.',
                    'hint': 'Tenga en cuenta que los costos se presentan a modo de ejemplo. Los costos reales variarán en función de su plan de seguro médico, el nivel de cobertura y el lugar en el que obtenga la cobertura.'
                  }
                } 
              ],
              [// Nasty Cut
                {// Nasty Cut - PRIMARY
                  'stories': [
                    {
                      text: 'Ha estado pagando su cuota mensual de $275 para el seguro médico, para tener cobertura cuando necesite atención médica.',
                      costs: {
                        'insured': [
                          /*{
                            label: "Premium",
                            group: 'premium',
                            amount: 275,
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
                      text: 'Si la cortada no es muy grave, es posible que el proveedor de atención médica primaria habitual pueda aplicar las puntadas. Llámelo primero para averiguar.',
                      costs: {
                        'insured': [
                          {
                            label: "Copago",
                            group: 'copay',
                            amount: 30,
                          },
                          {
                            label: "Limpieza de herida/suturas",
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
                      text: '¡Oh, no! Su cortada comienza a parecerse a una herida de las que se ven en las películas de terror. Se está infectando. Puede suceder, no entre en pánico. Simplemente, resuélvalo. Regresa al proveedor para que le realice una limpieza y le vuelvan a poner puntadas.',
                      costs: {
                        'insured': [
                          {
                            label: "Copago",
                            group: 'copay',
                            amount: 30,
                          },
                          {
                            label: "Limpieza completa/suturas",
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
                      'label': 'Cuota',
                      'weight': 0
                    */},
                    'copay': {
                      'label': '2 copagos',
                      'weight': 1
                    },
                    'coinsurance': {
                      'label': 'Coaseguro para 2 visitas',
                      'weight': 2
                    },
                    'visit': {
                      'label': '2 visitas al médico',
                      'weight': 1
                    },
                    'stitches': {
                      'label': '2 instancias de puntadas',
                      'weight': 2
                    }
                  },
                  'results': {
                    'text': 'Después de una semana, las puntadas están listas para quitarse y usted está recuperado.',
                    'hint': 'Tenga en cuenta que los costos son ejemplos. Los costos reales variarán en función de su plan de seguro médico, el nivel de cobertura y el lugar en el que obtenga la atención médica.'
                  }
                },
                {// Nasty Cut - URGENT
                  'stories': [
                    {
                      text: 'Ha estado pagando su cuota mensual de $275 para el seguro médico, para tener cobertura cuando necesite atención médica.',
                      costs: {
                        'insured': [/*
                          {
                            label: "Premium",
                            group: 'premium',
                            amount: 275,
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
                      text: 'Se dirige a la atención urgente para que lo suturen.',
                      costs: {
                        'insured': [
                          {
                            label: "Copago",
                            group: 'copay',
                            amount: 75,
                          },
                          {
                            label: "Coaseguro/suturas",
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
                      text: '¡Oh, no! Su cortada comienza a parecerse a una herida de las que se ven en las películas de terror. Se está infectando. Suele suceder, no entre en pánico. Simplemente resuelvalo. Regresa a la atención urgente para que le vuelvan a realizar una limpieza y le vuelvan a poner puntadas.',
                      costs: {
                        'insured': [
                          {
                            label: "Copago",
                            group: 'copay',
                            amount: 75,
                          },
                          {
                            label: "Coaseguro/suturas",
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
                      'label': 'Cuota',
                      'weight': 0
                    */},
                    'copay': {
                      'label': 'Copagos',
                      'weight': 1
                    },
                    'coinsurance': {
                      'label': 'Coaseguros',
                      'weight': 2
                    },
                    'visit': {
                      'label': 'Visitas al médico',
                      'weight': 1
                    },
                    'stitches': {
                      'label': 'Instancias de puntadas',
                      'weight': 2
                    }
                  },
                  'results': {
                    'text': 'Después de una semana, las puntadas están listas para quitarse y usted está recuperado.',
                    'hint': 'Tenga en cuenta que los costos son ejemplos. Los costos reales variarán en función de su plan de seguro médico, el nivel de cobertura y el lugar en el que obtenga la atención médica.'
                  }
                },
                {// Nasty Cut - ER
                  'stories': [
                    {
                      text: 'Ha estado pagando su cuota mensual de $275 para el seguro médico, para tener cobertura cuando necesite atención médica.',
                      costs: {
                        'insured': [/*
                          {
                            label: "Premium",
                            group: 'premium',
                            amount: 275,
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
                      text: 'Se dirige a la sala de emergencia (en especial si sangra mucho) para que le curen la herida. Según su plan de seguro y si ha cumplido con el deducible, tendrá que pagar un mayor copago o coaseguro.',
                      costs: {
                        'insured': [
                          {
                            label: "Copago",
                            group: 'copay',
                            amount: 500,
                          },
                          {
                            label: "Coaseguro/suturas",
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
                      text: '¡Oh, no! Su cortada comienza a parecerse a una herida de las que se ven en las películas de terror. Se está infectando. Suele suceder, no entre en pánico. Simplemente resuélvalo. Regresa a la sala de emergencia para que le vuelvan a realizar una limpieza y le pongan puntadas.',
                      costs: {
                        'insured': [
                          {
                            label: "Copago",
                            group: 'copay',
                            amount: 500,
                          },
                          {
                            label: "Coaseguro/suturas",
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
                      'label': 'Cuota',
                      'weight': 0
                    */},
                    'copay': {
                      'label': '2 copagos',
                      'weight': 1
                    },
                    'coinsurance': {
                      'label': 'Coaseguro para 2 instancias de puntadas',
                      'weight': 2
                    },
                    'visit': {
                      'label': '2 visitas a la sala de emergencia',
                      'weight': 1
                    },
                    'stitches': {
                      'label': '2 instancias de puntadas',
                      'weight': 2
                    },
                  },
                  'results': {
                    'text': 'Después de una semana, las puntadas están listas para quitarse y usted está recuperado.',
                    'hint': 'Tenga en cuenta que los costos son ejemplos. Los costos reales variarán en función de su plan de seguro médico, el nivel de cobertura y el lugar en el que obtenga la atención médica.'
                  }
                } 
              ],
              [// Appendicitis
                {// Appendicitis - PRIMARY
                  'stories': [],
                  'override': true,
                  'results': {
                    'text': '¡Espere un minuto! Ese dolor agudo e intenso del lado derecho del estómago podría ser grave. Si considera que tiene apendicitis, ¡ACUDA A LA SALA DE EMERGENCIA!'
                  },
                  img: 'Appendicitis_Primary_1.png'
                },
                {// Appendicitis -  URGENT
                  'stories': [],
                  'override': true,
                  'results': {
                    'text': '¡Espere un minuto! Ese dolor agudo e intenso del lado derecho del estómago podría ser grave. Si considera que tiene apendicitis, ¡ACUDA A LA SALA DE EMERGENCIA!'
                  },
                  img: 'Appendicitis_Primary_1.png'
                },
                {// Appendicitis - ER
                  'stories': [
                    {
                      text: 'Ha estado pagando su cuota mensual de $275 para el seguro médico, para tener cobertura cuando necesite atención médica.',
                      costs: {
                        'insured': [
                          /*{
                            label: "Premium",
                            group: 'premium',
                            amount: 275,
                            suffix: '/month'
                          },*/
                          {
                            label: "Desembolso máximo",
                            group: 'outofpocket',
                            amount: 4800
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
                      text: 'En la sala de emergencia, la tomografía computarizada muestra que el apéndice está a punto de reventar. Debe permanecer en el hospital.',
                      costs: {
                        'insured': [
                          {
                            label: "Tomografía computarizada",
                            group: 'scan',
                            amount: 2000
                          }
                        ],
                        'uninsured' : []
                      },
                      img: 'Appendicitis_ER_2.png',
                      showCosts: true,
                      hint: ["Con esta cantidad, cumple con el deducible de su seguro médico. Desde ahora, ud. pagará coaseguro por otros servicios."]
                    },
                    {
                      text: 'Le han extraído el apéndice y permanecerá en el hospital durante 3 días para recuperarse. Debido a que alcanzó su deducible, paga el coaseguro o el 30% del resto de los costos hasta alcanzar el desembolso máximo.',
                      costs: {
                        'insured': [
                          {
                            label: "Costo general",
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
                      hint: ['Usted paga $4,800 de coaseguro para alcanzar su desembolso máximo y su seguro médico paga el resto.']
                    },
                  ],
                  'groups': {
                    'premium': {
                      'label': 'Cuota',
                      'weight': 0
                    },
                    'scan': {
                      'label': 'Deducible/Tomografía computarizada',
                      'weight': 1
                    },
                    'outofpocket': {
                      'label': 'Costos para alcanzar el desembolso máximo',
                      'weight': 2,
                    },
                    'overall': {
                      'label': 'Total',
                      'weight': 3,
                      'hide': true
                    },
                    'supplies': {
                      'label': 'Prueba/suministros',
                      'weight': 0
                    },
                    'surgery': {
                      'label': 'Cirugía',
                      'weight': 1
                    },
                    'hospital': {
                      'label': 'Estadía en el hospital',
                      'weight': 2
                    },
                    'pharmacy': {
                      'label': 'Costos de la farmacia',
                      'weight': 3
                    },
                  },
                  'results': {
                    'text': '¡Eso estuvo cerca! Pero su seguro le ayudó a protegerse de entrar en deuda para pagar por una emergencia de la cual no tuvo control.',
                    'hint': 'Tenga en cuenta que los costos son ejemplos. Los costos reales variarán en función de su plan de seguro médico, el nivel de cobertura y el lugar en el que obtenga la atención médica.'
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