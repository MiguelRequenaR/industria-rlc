"use client";

import React from 'react';
import { Shield, Lock, Eye, Database, UserCheck } from 'lucide-react';

export default function PoliticaPrivacidad() {
  return (
    <div className='min-h-screen bg-linear-to-b from-gray-50 to-white py-25'>
      <div className='max-w-4xl mx-auto px-6'>
        {/* Header */}
        <div className='text-center mb-12'>
          <div className='flex justify-center mb-4'>
            <div className='bg-primary p-4 rounded-full'>
              <Shield className='w-12 h-12 text-white' />
            </div>
          </div>
          <h1 className='text-4xl font-bold text-primary mb-4'>
            Política de Privacidad
          </h1>
          <p className='text-gray-600'>
            Última actualización: Enero 2026
          </p>
        </div>

        {/* Content */}
        <div className='bg-white rounded-xl shadow-lg p-8 md:p-12 space-y-8'>
          {/* Intro */}
          <section>
            <p className='text-gray-700 leading-relaxed'>
              En RLC Academy 360° respetamos tu privacidad y estamos comprometidos con la protección de tus datos personales. 
              Esta política describe cómo recopilamos, usamos, almacenamos y protegemos tu información en cumplimiento con la 
              Ley N° 29733 - Ley de Protección de Datos Personales del Perú y su reglamento.
            </p>
          </section>

          {/* Section 1 */}
          <section>
            <h2 className='text-2xl font-bold text-primary mb-4 flex items-center gap-2'>
              <Database className='w-6 h-6' />
              1. Información que Recopilamos
            </h2>
            <div className='text-gray-700 space-y-4 leading-relaxed'>
              <p>
                <strong>1.1. Datos Personales de Identificación</strong>
              </p>
              <ul className='list-disc list-inside space-y-2 ml-4'>
                <li>Nombre completo</li>
                <li>Documento de identidad (DNI, CE o Pasaporte)</li>
                <li>Fecha de nacimiento</li>
                <li>Fotografía (para credenciales y certificados)</li>
                <li>Género</li>
              </ul>

              <p className='mt-4'>
                <strong>1.2. Datos de Contacto</strong>
              </p>
              <ul className='list-disc list-inside space-y-2 ml-4'>
                <li>Dirección de correo electrónico</li>
                <li>Número de teléfono móvil y/o fijo</li>
                <li>Dirección física</li>
                <li>Ciudad y país de residencia</li>
              </ul>

              <p className='mt-4'>
                <strong>1.3. Datos Académicos y Profesionales</strong>
              </p>
              <ul className='list-disc list-inside space-y-2 ml-4'>
                <li>Nivel educativo alcanzado</li>
                <li>Experiencia profesional</li>
                <li>Cursos realizados e historial académico</li>
                <li>Calificaciones y evaluaciones</li>
                <li>Certificaciones obtenidas</li>
              </ul>

              <p className='mt-4'>
                <strong>1.4. Datos de Navegación y Uso</strong>
              </p>
              <ul className='list-disc list-inside space-y-2 ml-4'>
                <li>Dirección IP</li>
                <li>Tipo de navegador y dispositivo</li>
                <li>Páginas visitadas y tiempo de permanencia</li>
                <li>Cookies y tecnologías similares</li>
                <li>Interacciones con la plataforma virtual</li>
              </ul>

              <p className='mt-4'>
                <strong>1.5. Datos Financieros</strong>
              </p>
              <ul className='list-disc list-inside space-y-2 ml-4'>
                <li>Información de pago (procesada de forma segura por proveedores externos)</li>
                <li>Historial de transacciones</li>
                <li>Datos de facturación</li>
              </ul>
            </div>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className='text-2xl font-bold text-primary mb-4 flex items-center gap-2'>
              <Eye className='w-6 h-6' />
              2. Cómo Usamos tu Información
            </h2>
            <div className='text-gray-700 space-y-3 leading-relaxed'>
              <p>
                Utilizamos tus datos personales para los siguientes propósitos:
              </p>
              
              <p>
                <strong>2.1. Prestación de Servicios Educativos</strong>
              </p>
              <ul className='list-disc list-inside space-y-2 ml-4'>
                <li>Gestionar tu matrícula e inscripción en cursos</li>
                <li>Proporcionar acceso a la plataforma virtual de aprendizaje</li>
                <li>Enviar material educativo y recursos de los cursos</li>
                <li>Evaluar tu desempeño académico</li>
                <li>Emitir certificados y diplomas</li>
              </ul>

              <p className='mt-4'>
                <strong>2.2. Comunicación</strong>
              </p>
              <ul className='list-disc list-inside space-y-2 ml-4'>
                <li>Enviar información sobre tus cursos, horarios y cambios</li>
                <li>Responder tus consultas y solicitudes de soporte</li>
                <li>Notificar sobre nuevos cursos y promociones (si has dado tu consentimiento)</li>
                <li>Enviar encuestas de satisfacción y feedback</li>
              </ul>

              <p className='mt-4'>
                <strong>2.3. Procesamiento de Pagos</strong>
              </p>
              <ul className='list-disc list-inside space-y-2 ml-4'>
                <li>Procesar pagos y emitir comprobantes</li>
                <li>Gestionar reembolsos cuando corresponda</li>
                <li>Mantener registros financieros y contables</li>
              </ul>

              <p className='mt-4'>
                <strong>2.4. Mejora de Servicios</strong>
              </p>
              <ul className='list-disc list-inside space-y-2 ml-4'>
                <li>Analizar el uso de nuestra plataforma</li>
                <li>Mejorar la experiencia del usuario</li>
                <li>Desarrollar nuevos cursos y servicios</li>
                <li>Realizar investigaciones y análisis estadísticos</li>
              </ul>

              <p className='mt-4'>
                <strong>2.5. Cumplimiento Legal</strong>
              </p>
              <ul className='list-disc list-inside space-y-2 ml-4'>
                <li>Cumplir con obligaciones legales y regulatorias</li>
                <li>Responder a requerimientos de autoridades competentes</li>
                <li>Proteger nuestros derechos legales</li>
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className='text-2xl font-bold text-primary mb-4 flex items-center gap-2'>
              <Lock className='w-6 h-6' />
              3. Cómo Protegemos tu Información
            </h2>
            <div className='text-gray-700 space-y-3 leading-relaxed'>
              <p>
                Implementamos medidas de seguridad técnicas, administrativas y físicas para proteger tus datos:
              </p>
              <ul className='list-disc list-inside space-y-2 ml-4'>
                <li><strong>Encriptación:</strong> Usamos SSL/TLS para proteger la transmisión de datos sensibles.</li>
                <li><strong>Acceso Restringido:</strong> Solo personal autorizado tiene acceso a datos personales.</li>
                <li><strong>Firewalls y Antivirus:</strong> Protección contra accesos no autorizados y malware.</li>
                <li><strong>Backups Regulares:</strong> Copias de seguridad para prevenir pérdida de información.</li>
                <li><strong>Auditorías de Seguridad:</strong> Revisiones periódicas de nuestros sistemas.</li>
                <li><strong>Capacitación del Personal:</strong> Formación continua en protección de datos.</li>
                <li><strong>Políticas de Contraseñas:</strong> Requisitos de contraseñas seguras.</li>
              </ul>
              <p className='mt-3'>
                Sin embargo, ningún método de transmisión por internet o almacenamiento electrónico es 100% seguro. 
                Aunque nos esforzamos por proteger tu información, no podemos garantizar su seguridad absoluta.
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className='text-2xl font-bold text-primary mb-4 flex items-center gap-2'>
              <UserCheck className='w-6 h-6' />
              4. Compartir tu Información
            </h2>
            <div className='text-gray-700 space-y-3 leading-relaxed'>
              <p>
                No vendemos ni alquilamos tu información personal a terceros. Solo compartimos tus datos en los siguientes casos:
              </p>
              
              <p>
                <strong>4.1. Proveedores de Servicios</strong>
              </p>
              <p>
                Compartimos información con proveedores externos que nos ayudan a operar nuestro negocio:
              </p>
              <ul className='list-disc list-inside space-y-2 ml-4'>
                <li>Procesadores de pago (para transacciones seguras)</li>
                <li>Servicios de hosting y almacenamiento en la nube</li>
                <li>Proveedores de email marketing (con tu consentimiento)</li>
                <li>Plataformas de videoconferencia para clases virtuales</li>
                <li>Servicios de análisis web</li>
              </ul>
              <p className='mt-2'>
                Todos estos proveedores están obligados a proteger tu información y solo pueden usarla según nuestras instrucciones.
              </p>

              <p className='mt-4'>
                <strong>4.2. Requisitos Legales</strong>
              </p>
              <p>
                Podemos divulgar tu información si es requerido por ley o para:
              </p>
              <ul className='list-disc list-inside space-y-2 ml-4'>
                <li>Cumplir con procesos legales (orden judicial, citación, etc.)</li>
                <li>Proteger los derechos y seguridad de RLC Academy, nuestros usuarios u otros</li>
                <li>Prevenir fraudes o investigar posibles infracciones</li>
                <li>Responder a solicitudes de autoridades gubernamentales</li>
              </ul>

              <p className='mt-4'>
                <strong>4.3. Con tu Consentimiento</strong>
              </p>
              <p>
                Podemos compartir tu información con terceros cuando nos des tu consentimiento explícito para hacerlo.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className='text-2xl font-bold text-primary mb-4 flex items-center gap-2'>
              <Shield className='w-6 h-6' />
              5. Tus Derechos
            </h2>
            <div className='text-gray-700 space-y-3 leading-relaxed'>
              <p>
                De acuerdo con la Ley de Protección de Datos Personales del Perú, tienes los siguientes derechos:
              </p>
              
              <ul className='list-disc list-inside space-y-2 ml-4'>
                <li><strong>Derecho de Acceso:</strong> Conocer qué datos personales tenemos sobre ti.</li>
                <li><strong>Derecho de Rectificación:</strong> Corregir datos incorrectos o desactualizados.</li>
                <li><strong>Derecho de Cancelación:</strong> Solicitar la eliminación de tus datos (sujeto a obligaciones legales).</li>
                <li><strong>Derecho de Oposición:</strong> Oponerte al tratamiento de tus datos para ciertos fines.</li>
                <li><strong>Derecho de Información:</strong> Ser informado sobre el tratamiento de tus datos.</li>
                <li><strong>Derecho a Revocar Consentimiento:</strong> Retirar tu consentimiento en cualquier momento.</li>
              </ul>

              <p className='mt-4'>
                Para ejercer cualquiera de estos derechos, puedes contactarnos a través de:
              </p>
              <ul className='list-none space-y-2 ml-4 mt-2'>
                <li><strong>Email:</strong> privacidad@industriarlc.com</li>
                <li><strong>Formulario:</strong> <a href='/contacto' className='text-primary hover:underline'>academia.industriarlc.com/contacto</a></li>
              </ul>

              <p className='mt-3'>
                Responderemos a tu solicitud en un plazo máximo de 20 días hábiles, pudiendo extenderse por 10 días adicionales 
                en casos justificados.
              </p>
            </div>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className='text-2xl font-bold text-primary mb-4'>
              6. Cookies y Tecnologías Similares
            </h2>
            <div className='text-gray-700 space-y-3 leading-relaxed'>
              <p>
                Utilizamos cookies y tecnologías similares para:
              </p>
              <ul className='list-disc list-inside space-y-2 ml-4'>
                <li>Mantener tu sesión iniciada</li>
                <li>Recordar tus preferencias</li>
                <li>Analizar el tráfico del sitio web</li>
                <li>Personalizar tu experiencia</li>
                <li>Mostrar publicidad relevante (si corresponde)</li>
              </ul>
              <p className='mt-3'>
                Puedes configurar tu navegador para rechazar cookies, pero esto puede afectar la funcionalidad del sitio. 
                Al continuar navegando, aceptas el uso de cookies según esta política.
              </p>
            </div>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className='text-2xl font-bold text-primary mb-4'>
              7. Retención de Datos
            </h2>
            <div className='text-gray-700 space-y-3 leading-relaxed'>
              <p>
                Conservamos tus datos personales durante el tiempo necesario para cumplir con los fines descritos en esta política:
              </p>
              <ul className='list-disc list-inside space-y-2 ml-4'>
                <li><strong>Datos de estudiantes activos:</strong> Durante la relación contractual y hasta 5 años después.</li>
                <li><strong>Datos académicos:</strong> De forma indefinida para verificación de certificados.</li>
                <li><strong>Datos financieros:</strong> Según lo requiera la normativa tributaria (mínimo 5 años).</li>
                <li><strong>Datos de navegación:</strong> Generalmente por 12 meses.</li>
              </ul>
              <p className='mt-3'>
                Después de estos períodos, los datos serán eliminados de forma segura o anonimizados para análisis estadísticos.
              </p>
            </div>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className='text-2xl font-bold text-primary mb-4'>
              8. Transferencias Internacionales
            </h2>
            <div className='text-gray-700 space-y-3 leading-relaxed'>
              <p>
                Algunos de nuestros proveedores de servicios pueden estar ubicados fuera de Perú. En estos casos, nos aseguramos de que:
              </p>
              <ul className='list-disc list-inside space-y-2 ml-4'>
                <li>El país de destino tenga un nivel de protección adecuado</li>
                <li>Existan garantías contractuales apropiadas</li>
                <li>Se cumplan los requisitos de la normativa peruana</li>
              </ul>
            </div>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className='text-2xl font-bold text-primary mb-4'>
              9. Menores de Edad
            </h2>
            <div className='text-gray-700 space-y-3 leading-relaxed'>
              <p>
                Nuestros servicios están dirigidos a personas mayores de 18 años. Si un menor desea inscribirse, 
                requerimos la autorización y supervisión de un padre o tutor legal. No recopilamos intencionalmente 
                datos de menores sin el debido consentimiento.
              </p>
            </div>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className='text-2xl font-bold text-primary mb-4'>
              10. Cambios a esta Política
            </h2>
            <div className='text-gray-700 space-y-3 leading-relaxed'>
              <p>
                Podemos actualizar esta política de privacidad periódicamente para reflejar cambios en nuestras prácticas 
                o por razones legales. Te notificaremos sobre cambios importantes a través de:
              </p>
              <ul className='list-disc list-inside space-y-2 ml-4'>
                <li>Un aviso destacado en nuestro sitio web</li>
                <li>Correo electrónico (si los cambios son significativos)</li>
                <li>Actualización de la fecha "Última actualización" al inicio de esta política</li>
              </ul>
              <p className='mt-3'>
                Te recomendamos revisar esta página periódicamente para estar informado sobre cómo protegemos tu información.
              </p>
            </div>
          </section>

          {/* Section 11 */}
          <section>
            <h2 className='text-2xl font-bold text-primary mb-4'>
              11. Contacto
            </h2>
            <div className='text-gray-700 space-y-3 leading-relaxed'>
              <p>
                Si tienes preguntas, inquietudes o solicitudes sobre esta política de privacidad o el tratamiento de tus datos personales, 
                puedes contactarnos:
              </p>
              <ul className='list-none space-y-2 ml-4 mt-4'>
                <li><strong>Responsable de Protección de Datos:</strong> RLC Academy 360°</li>
                <li><strong>Email:</strong> privacidad@industriarlc.com</li>
                <li><strong>Formulario web:</strong> <a href='/contacto' className='text-primary hover:underline'>academia.industriarlc.com/contacto</a></li>
                <li><strong>Teléfono:</strong> +51 987 654 321</li>
                <li><strong>Dirección:</strong> [Dirección física de la academia]</li>
              </ul>
              <p className='mt-4'>
                También tienes derecho a presentar una reclamación ante la Autoridad Nacional de Protección de Datos Personales 
                si consideras que tus derechos han sido vulnerados.
              </p>
            </div>
          </section>

          {/* Footer */}
          <div className='pt-8 border-t border-gray-200'>
            <p className='text-center text-gray-600 text-sm'>
              Al utilizar nuestros servicios, confirmas que has leído y comprendido esta Política de Privacidad y 
              aceptas el tratamiento de tus datos personales conforme a lo establecido en este documento.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
