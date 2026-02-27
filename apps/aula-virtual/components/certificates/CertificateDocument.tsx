"use client"

import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer'

Font.register({
  family: 'Times New Roman',
  src: '/fonts/times.ttf'
})

interface CertificateDocumentProps {
  studentName: string
  courseName: string
  issueDate: string
  certificateCode: string
  durationHours: number
  note: number
  periodStartDate: string
  periodEndDate: string
  modality?: string
  modulesDescription?: string
}

function notaEnTexto(valor: number): string {
  const n = Math.round(valor)
  const unidades = [
    'cero', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve',
    'diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve', 'veinte'
  ]
  return unidades[n] ?? String(n)
}

const styles = StyleSheet.create({
  page: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Times New Roman',
    position: 'relative',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  textOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
  studentName: {
    position: 'absolute',
    top: 305,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 19,
    color: '#1e365a',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  noteText: {
    position: 'absolute',
    top: 340,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 12,
    color: '#1e365a',
  },
  noteTextBold: {
    fontWeight: 'bold',
  },
  courseName: {
    position: 'absolute',
    top: 380,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 18,
    color: '#1e365a',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },

  periodText: {
    position: 'absolute',
    top: 450,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 12,
    color: '#1e365a',
  },
  issueDate: {
    position: 'absolute',
    top: 620,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 12,
    color: '#1e365a',
  },
  certificateCodeTop: {
    position: 'absolute',
    top: 225,
    left: 300,
    textAlign: 'center',
    fontSize: 15,
    color: '#1e365a',
  },
  certificateCode: {
    position: 'absolute',
    top: 755,
    left: 309,
    textAlign: 'center',
    fontSize: 10,
    color: '#1e365a',
  },
  modalityText: {
    position: 'absolute',
    top: 500,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 18,
    color: '#1e365a',
  },
  modulesText: {
    position: 'absolute',
    top: 550,
    left: 130,
    right: 130,
    textAlign: 'center',
    fontSize: 12,
    color: '#1e365a',
    lineHeight: 1.4,
  },
})

export function CertificateDocument({
  studentName,
  courseName,
  issueDate,
  certificateCode,
  durationHours,
  note,
  periodStartDate,
  periodEndDate,
  modality = 'Virtual',
  modulesDescription = '',
}: CertificateDocumentProps) {

  const durationText =
    durationHours === 1
      ? 'con una duración de 1 hora.'
      : `con una duración de ${durationHours} horas.`

  return (
    <Document>
      <Page size="A4" orientation="portrait" style={styles.page}>

        <Image
          src="/Certificado.png"
          style={styles.backgroundImage}
          fixed
        />

        <View style={styles.textOverlay}>

          <Text style={styles.certificateCodeTop}>
            {certificateCode}
          </Text>

          <Text style={styles.studentName}>
            {studentName}
          </Text>

          <Text style={styles.noteText}>
            Por haber participado y culminado satisfactoriamente, con una nota de{' '}
            <Text style={styles.noteTextBold}>{Math.round(note)} ({notaEnTexto(note)})</Text>
            {' '}el:
          </Text>

          <Text style={styles.courseName}>
            Programa de Especialización{'\n'}
            {courseName}
          </Text>

          <Text style={styles.periodText}>
            Desarrollado del {periodStartDate} al {periodEndDate},{'\n'}
            {durationText} académicas, bajo la modalidad
          </Text>

          <Text style={styles.modalityText}>
            {modality}
          </Text>

          {modulesDescription ? (
            <Text style={styles.modulesText}>
              {modulesDescription}
            </Text>
          ) : null}

          <Text style={styles.issueDate}>
            Lima, {issueDate}
          </Text>

          <Text style={styles.certificateCode}>
            {certificateCode}
          </Text>
        </View>
      </Page>
    </Document>
  )
}