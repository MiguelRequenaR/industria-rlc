"use client"

import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer'

interface CertificateDocumentProps {
  studentName: string
  courseName: string
  issueDate: string
  certificateCode: string
  durationHours: number
  note: number
  periodStartDate: string
  periodEndDate: string
}

const PAGE_WIDTH = 842
const PAGE_HEIGHT = 595

/** Convierte un número entero (0-20) a su representación en texto en español */
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
    width: PAGE_WIDTH,
    height: PAGE_HEIGHT,
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
    position: 'relative',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: PAGE_WIDTH,
    height: PAGE_HEIGHT,
  },
  textOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: PAGE_WIDTH,
    height: PAGE_HEIGHT,
    backgroundColor: 'transparent',
  },
  studentName: {
    position: 'absolute',
    top: 230,
    left: 50,
    right: 0,
    textAlign: 'center',
    fontSize: 19,
    color: '#000000',
    fontWeight: 'bold',
  },
  noteText: {
    position: 'absolute',
    top: 270,
    left: 50,
    right: 40,
    textAlign: 'center',
    fontSize: 14,
    color: '#1a1a1a',
  },
  noteTextBold: {
    fontWeight: 'bold',
  },
  courseName: {
    position: 'absolute',
    top: 305,
    left: 110,
    right: 40,
    textAlign: 'center',
    fontSize: 18,
    color: '#1a1a1a',
    fontWeight: 'bold',
  },

  periodText: {
    position: 'absolute',
    top: 350,
    left: 110,
    right: 40,
    textAlign: 'center',
    fontSize: 14,
    color: '#1a1a1a',
  },
  issueDate: {
    position: 'absolute',
    top: 405,
    left: 80,
    right: 0,
    textAlign: 'center',
    fontSize: 12,
    fontFamily: 'Helvetica',
  },
  certificateCode: {
    position: 'absolute',
    top: 558,
    left: 525,
    width: 200,
    textAlign: 'center',
    fontSize: 8,
    color: '#666666',
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
}: CertificateDocumentProps) {
  
  const durationText =
    durationHours === 1
      ? 'con una duración de 1 hora.'
      : `con una duración de ${durationHours} horas.`

  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        
        <Image
          src="/Certificado.png" 
          style={styles.backgroundImage}
          fixed
        />

        <View style={styles.textOverlay}>
          
          <Text style={styles.studentName}>
            {studentName}
          </Text>

          <Text style={styles.noteText}>
            Por haber participado y culminado satisfactoriamente, con una nota de{' '}
            <Text style={styles.noteTextBold}>{Math.round(note)} ({notaEnTexto(note)})</Text>
            {' '}el:
          </Text>

          <Text style={styles.courseName}>
            {courseName}
          </Text>

          <Text style={styles.periodText}>
            Desarrollado del {periodStartDate} al {periodEndDate},{'\n'}
            {durationText}
          </Text>

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