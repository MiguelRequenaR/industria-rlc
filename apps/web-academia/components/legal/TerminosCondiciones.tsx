"use client";

import React from 'react';
import { FileText, CheckCircle } from 'lucide-react';

export default function TerminosCondiciones() {
  return (
    <div className='min-h-screen bg-linear-to-b from-gray-50 to-white py-25'>
      <div className='max-w-4xl mx-auto px-6'>
        {/* Header */}
        <div className='text-center mb-12'>
          <div className='flex justify-center mb-4'>
            <div className='bg-primary p-4 rounded-full'>
              <FileText className='w-12 h-12 text-white' />
            </div>
          </div>
          <h1 className='text-4xl font-bold text-primary mb-4'>
            Términos y Condiciones
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
              Bienvenido a RLC Academy 360°. Al acceder y utilizar nuestro sitio web y servicios educativos, 
              aceptas cumplir con estos términos y condiciones. Te recomendamos leer detenidamente este documento 
              antes de inscribirte en cualquiera de nuestros cursos.
            </p>
          </section>

          {/* Section 1 */}
          <section>
            <h2 className='text-2xl font-bold text-primary mb-4 flex items-center gap-2'>
              <CheckCircle className='w-6 h-6' />
              1. Aceptación de Términos
            </h2>
            <div className='text-gray-700 space-y-3 leading-relaxed'>
              <p>
                Al registrarte y utilizar los servicios de RLC Academy, declaras que:
              </p>
              <ul className='list-disc list-inside space-y-2 ml-4'>
                <li>Tienes al menos 18 años de edad o cuentas con autorización de un tutor legal.</li>
                <li>Proporcionas información veraz, precisa y actualizada.</li>
                <li>Aceptas cumplir con todas las políticas y normas establecidas.</li>
                <li>Te comprometes a utilizar nuestros servicios de manera responsable y ética.</li>
              </ul>
            </div>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className='text-2xl font-bold text-primary mb-4 flex items-center gap-2'>
              <CheckCircle className='w-6 h-6' />
              2. Servicios Educativos
            </h2>
            <div className='text-gray-700 space-y-3 leading-relaxed'>
              <p>
                <strong>2.1. Descripción de Servicios</strong>
              </p>
              <p>
                RLC Academy ofrece cursos de formación técnica especializada en electricidad industrial, 
                automatización y áreas relacionadas. Nuestros servicios incluyen:
              </p>
              <ul className='list-disc list-inside space-y-2 ml-4'>
                <li>Cursos presenciales y virtuales</li>
                <li>Material didáctico digital y físico</li>
                <li>Acceso a plataforma virtual de aprendizaje</li>
                <li>Certificación al completar exitosamente los cursos</li>
                <li>Soporte técnico y académico</li>
              </ul>

              <p className='mt-4'>
                <strong>2.2. Matriculación e Inscripción</strong>
              </p>
              <ul className='list-disc list-inside space-y-2 ml-4'>
                <li>La matrícula se considera válida una vez realizado el pago correspondiente.</li>
                <li>Los cupos son limitados y se asignan por orden de inscripción.</li>
                <li>RLC Academy se reserva el derecho de cancelar o reprogramar cursos por causas justificadas.</li>
                <li>En caso de cancelación por parte de la academia, se realizará la devolución íntegra del pago.</li>
              </ul>

              <p className='mt-4'>
                <strong>2.3. Pagos y Facturación</strong>
              </p>
              <ul className='list-disc list-inside space-y-2 ml-4'>
                <li>Todos los precios están expresados en la moneda local (Soles Peruanos - PEN).</li>
                <li>Los pagos pueden realizarse mediante transferencia bancaria, tarjeta de crédito/débito o efectivo.</li>
                <li>Se emitirá comprobante de pago (boleta o factura) según corresponda.</li>
                <li>Existen opciones de financiamiento para algunos cursos, sujetas a evaluación.</li>
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className='text-2xl font-bold text-primary mb-4 flex items-center gap-2'>
              <CheckCircle className='w-6 h-6' />
              3. Políticas de Cancelación y Reembolso
            </h2>
            <div className='text-gray-700 space-y-3 leading-relaxed'>
              <p>
                <strong>3.1. Cancelación por el Estudiante</strong>
              </p>
              <ul className='list-disc list-inside space-y-2 ml-4'>
                <li>Hasta 15 días antes del inicio: reembolso del 100% del monto pagado.</li>
                <li>Entre 14 y 7 días antes del inicio: reembolso del 50% del monto pagado.</li>
                <li>Menos de 7 días antes o después del inicio: no hay reembolso.</li>
                <li>Las solicitudes de cancelación deben realizarse por escrito.</li>
              </ul>

              <p className='mt-4'>
                <strong>3.2. Cancelación por la Academia</strong>
              </p>
              <p>
                Si RLC Academy cancela un curso, el estudiante tendrá derecho a:
              </p>
              <ul className='list-disc list-inside space-y-2 ml-4'>
                <li>Reembolso íntegro del monto pagado, o</li>
                <li>Transferencia del pago a otro curso de igual o mayor valor.</li>
              </ul>
            </div>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className='text-2xl font-bold text-primary mb-4 flex items-center gap-2'>
              <CheckCircle className='w-6 h-6' />
              4. Uso de la Plataforma Virtual
            </h2>
            <div className='text-gray-700 space-y-3 leading-relaxed'>
              <p>
                <strong>4.1. Acceso y Credenciales</strong>
              </p>
              <ul className='list-disc list-inside space-y-2 ml-4'>
                <li>Cada estudiante recibirá credenciales únicas e intransferibles.</li>
                <li>Eres responsable de mantener la confidencialidad de tus credenciales.</li>
                <li>No está permitido compartir tu cuenta con terceros.</li>
                <li>Debes notificar inmediatamente cualquier uso no autorizado de tu cuenta.</li>
              </ul>

              <p className='mt-4'>
                <strong>4.2. Uso Apropiado</strong>
              </p>
              <p>
                Al utilizar nuestra plataforma, te comprometes a NO:
              </p>
              <ul className='list-disc list-inside space-y-2 ml-4'>
                <li>Compartir, copiar o distribuir el material educativo sin autorización.</li>
                <li>Usar la plataforma para fines distintos al aprendizaje.</li>
                <li>Intentar acceder a áreas restringidas o sistemas de otros usuarios.</li>
                <li>Publicar contenido ofensivo, ilegal o inapropiado.</li>
                <li>Realizar actividades que puedan dañar la plataforma o sus usuarios.</li>
              </ul>
            </div>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className='text-2xl font-bold text-primary mb-4 flex items-center gap-2'>
              <CheckCircle className='w-6 h-6' />
              5. Propiedad Intelectual
            </h2>
            <div className='text-gray-700 space-y-3 leading-relaxed'>
              <p>
                Todo el contenido disponible en RLC Academy, incluyendo pero no limitado a:
              </p>
              <ul className='list-disc list-inside space-y-2 ml-4'>
                <li>Textos, imágenes, videos y material didáctico</li>
                <li>Diseños, logos y marcas</li>
                <li>Software y código fuente de la plataforma</li>
                <li>Metodologías y procesos educativos</li>
              </ul>
              <p className='mt-3'>
                Están protegidos por derechos de autor y son propiedad exclusiva de RLC Academy o sus licenciantes. 
                Está prohibida su reproducción, distribución o uso comercial sin autorización expresa.
              </p>
            </div>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className='text-2xl font-bold text-primary mb-4 flex items-center gap-2'>
              <CheckCircle className='w-6 h-6' />
              6. Certificación
            </h2>
            <div className='text-gray-700 space-y-3 leading-relaxed'>
              <p>
                Para recibir el certificado de culminación, el estudiante debe:
              </p>
              <ul className='list-disc list-inside space-y-2 ml-4'>
                <li>Completar al menos el 80% de las clases programadas.</li>
                <li>Aprobar las evaluaciones con una nota mínima de 14/20.</li>
                <li>Estar al día con los pagos correspondientes.</li>
                <li>Cumplir con los requisitos específicos del curso.</li>
              </ul>
              <p className='mt-3'>
                Los certificados son digitales y/o físicos según el curso, y llevan la firma del director académico 
                y sello de la institución.
              </p>
            </div>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className='text-2xl font-bold text-primary mb-4 flex items-center gap-2'>
              <CheckCircle className='w-6 h-6' />
              7. Limitación de Responsabilidad
            </h2>
            <div className='text-gray-700 space-y-3 leading-relaxed'>
              <p>
                RLC Academy no se hace responsable por:
              </p>
              <ul className='list-disc list-inside space-y-2 ml-4'>
                <li>Problemas técnicos externos a nuestra plataforma (conexión a internet, dispositivos, etc.).</li>
                <li>Pérdida de datos por causas ajenas a nuestro control.</li>
                <li>Resultados laborales o profesionales posteriores a la capacitación.</li>
                <li>Daños indirectos, incidentales o consecuentes derivados del uso de nuestros servicios.</li>
              </ul>
            </div>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className='text-2xl font-bold text-primary mb-4 flex items-center gap-2'>
              <CheckCircle className='w-6 h-6' />
              8. Modificaciones
            </h2>
            <div className='text-gray-700 space-y-3 leading-relaxed'>
              <p>
                RLC Academy se reserva el derecho de modificar estos términos y condiciones en cualquier momento. 
                Los cambios entrarán en vigencia inmediatamente después de su publicación en nuestro sitio web. 
                Es responsabilidad del usuario revisar periódicamente estos términos.
              </p>
            </div>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className='text-2xl font-bold text-primary mb-4 flex items-center gap-2'>
              <CheckCircle className='w-6 h-6' />
              9. Ley Aplicable y Jurisdicción
            </h2>
            <div className='text-gray-700 space-y-3 leading-relaxed'>
              <p>
                Estos términos se rigen por las leyes de la República del Perú. Cualquier controversia será resuelta 
                en primera instancia mediante conciliación y, de no llegarse a un acuerdo, se someterá a los tribunales 
                competentes de Lima, Perú.
              </p>
            </div>
          </section>

          <section>
            <h2 className='text-2xl font-bold text-primary mb-4 flex items-center gap-2'>
              <CheckCircle className='w-6 h-6' />
              10. Contacto
            </h2>
            <div className='text-gray-700 space-y-3 leading-relaxed'>
              <p>
                Para consultas sobre estos términos y condiciones, puedes contactarnos a través de:
              </p>
              <ul className='list-none space-y-2 ml-4'>
                <li><strong>Página de contacto:</strong> <a href='/contacto' className='text-primary hover:underline'>academia.industriarlc.com/contacto</a></li>
                <li><strong>Correo electrónico:</strong> <a href="mailto:proyectos@industria-rlc.com" className="text-primary hover:underline text-base">proyectos@industria-rlc.com</a></li>
                <li><strong>WhatsApp:</strong> <a href="tel:+51940162009" className="text-primary hover:underline text-base">(+51) 940 162 009</a></li>
              </ul>
            </div>
          </section>

          <div className='pt-8 border-t border-gray-200'>
            <p className='text-center text-gray-600 text-sm'>
              Al utilizar nuestros servicios, confirmas que has leído, entendido y aceptado estos términos y condiciones.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
