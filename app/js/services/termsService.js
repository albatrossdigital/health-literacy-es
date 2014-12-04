'use strict';

angular.module('app.terms')

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
              'regex': 'cuota',
              'label': 'Cuota',
              'text': 'El monto que paga por el seguro médico todos los meses. Usted lo paga incluso si no usa los servicios de atención médica ese mes.'
            },
            {
              'key': 'copay',
              'regex': 'copago',
              'label': 'Copago',
              'text': 'El monto que paga cada vez que recibe un servicio médico. Por ejemplo, si su copago por una visita al médico de cabecera es de $20, pagará ese monto cada vez que visite al médico. El plan de seguro médico debe cubrir muchos servicios preventivos y exámenes sin costo alguno para usted, de manera que estos servicios no tienen un copago.'
            },
            {
              'key': 'coinsurance',
              'regex': 'coaseguro',
              'label': 'Coaseguro',
              'text': 'El porcentaje que paga por un servicio médico una vez que ha alcanzado el deducible. Por ejemplo, si su coaseguro es del 20% de una factura médica de $1,000, usted pagará $200 y el seguro cubrirá el resto.'
            },
            {
              'key': 'deductible',
              'regex': 'deducible',
              'label': 'Deducible',
              'text': 'El monto que tiene que pagar por la atención médica antes de que la compañía aseguradora comience a pagar. Por ejemplo, si su deducible es de $1,000, deberá gastar $1,000 en los costos de atención médica antes de que el seguro comience a cubrir algunos de los costos. Todos los planes deben proporcionar muchos servicios preventivos y exámenes sin costo alguno para usted, de manera que estos servicios no se aplican al deducible. Es posible que los planes ofrezcan otros servicios sin cargo que no se apliquen al deducible.'
            },
            {
              'key': 'out-of-pocket-max',
              'regex': 'límite de desembolso\/Desembolso máximo máximo',
              'label': 'Límite de desembolso/Desembolso máximo máximo',
              'text': 'El monto total que tiene que pagar durante el año antes de que el seguro médico pague el 100% de sus costos médicos. El desembolso máximo es solo para un año y vuelve a empezar cada año.'
            },
            {
              'key': 'primary-care',
              'regex': 'proveedor de atención médica primaria',
              'label': 'Proveedor de atención médica primaria',
              'text': 'El médico o miembro del personal de enfermería profesional principal que le brinda atención médica. Esta suele ser la primera persona a quien consulta ante la mayoría de los problemas de salud, los exámenes y los chequeos (atención preventiva). A veces, deberá consultar a su proveedor de atención médica primaria para obtener una remisión a un especialista.'
            },
            {
              'key': 'preventive',
              'regex': 'servicios preventivos',
              'label': 'Servicios preventivos',
              'text': 'Atención médica regular, como exámenes, chequeos y asesoramiento para pacientes, para encontrar dolencias o problemas antes de que empeores. La mayor parte de la atención preventiva está cubierta por completo con las cuotas mensuales y no tiene que pagar nada más.'
            },
            {
              'key': 'specialist',
              'regex': 'epecialista',
              'label': 'Especialista',
              'text': 'Un médico que se enfoca en un tipo de atención médica especial o específica. Por ejemplo, un cardiólogo se enfoca en enfermedades cardíacas y un oncólogo se enfoca en el tratamiento del cáncer.'
            },
            {
              'key': 'in-network',
              'regex': 'dentro de la red',
              'label': 'Dentro de la red',
              'text': 'Un grupo de proveedores (médicos), centros (lugares) y abastecedores (farmacias y suministros médicos) que trabajan con el plan de seguro médico. Pagará menos para usar los servicios dentro de la red que los servicios fuera de la red. Algunos planes de seguro médico no pagarán en absoluto por los servicios fuera de la red.'
            },
            {
              'key': 'out-of-network',
              'regex': 'fuera de la red',
              'label': 'Fuera de la red',
              'text': 'Un grupo de proveedores que NO trabajan con el plan de salud. Pagará más por las consultas con estos proveedores y hay algunos planes de seguro que no pagarán en absoluto por estos servicios.'
            },
            {
              'key': 'open-enrollment',
              'regex': 'período de inscripción abierta',
              'label': 'Período de inscripción abierta',
              'text': 'Un período, que por lo general incluye varios meses, en un determinado año en el que los empleados o las personas elegibles pueden inscribirse para obtener cobertura médica mediante el mercado de seguros de salud. Si no se inscribe en el seguro durante el período de inscripción abierta, es posible que no pueda obtener cobertura de seguro médico hasta el año siguiente.'
            },
            {
              'key': 'special-enrollment',
              'regex': 'período de inscripción especial',
              'label': 'Período de inscripción especial',
              'text': 'Un período ajeno a la inscripción abierta en el que puede inscribirse en un seguro médico en caso de que se produzca un evento especial en su vida. Estos eventos incluyen la pérdida del trabajo, el matrimonio/divorcio, una mudanza o si cumple 26 años de edad y ya no puede estar incluido en el seguro médico de sus padres.'
            },
            {
              'key': 'explanation-of-benefits',
              'regex': 'explicación de beneficios',
              'label': 'Explicación de beneficios (Explanation of Benefits, EOB)',
              'text': 'Un formulario que le envía su compañía aseguradora después de haber recibido atención médica. No es una factura, pero es importante leerla. Le informa sobre los servicios que un proveedor de atención médica facturó y qué cantidad de los costos deberá pagar cuando se le envíe la factura.'
            },
            {
              'key': 'claim',
              'regex': 'reclamo',
              'label': 'Reclamo',
              'text': 'Una factura que el proveedor de atención médica le envía a la compañía aseguradora por los servicios médicos prestados a un paciente.'
            },
            {
              'key': 'referral',
              'regex': 'remisión',
              'label': 'Remisión',
              'text': 'Una recomendación de un proveedor de atención médica primaria para visitar a un especialista. Por ejemplo, el médico podría remitirlo para que visite a un otorrinolaringólogo. Con algunos planes de seguro médico, debe obtener una remisión de su proveedor de atención médica primaria antes de poder visitar a un especialista.'
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