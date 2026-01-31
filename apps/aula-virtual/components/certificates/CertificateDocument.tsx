"use client"

import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer'
import { Font } from '@react-pdf/renderer'

Font.register({
  family: 'Eyesome Script',
  src: '/fonts/Eyesome Script.otf',
})

interface CertificateDocumentProps {
  studentName: string
  courseName: string
  issueDate: string
  certificateCode: string
  durationHours: number
}

// Dimensiones A4 Landscape estándar
const PAGE_WIDTH = 842
const PAGE_HEIGHT = 595

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
    top: 225,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 50,
    fontFamily: 'Eyesome Script',
    color: '#000000',
  },
  courseName: {
    position: 'absolute',
    top: 350,
    left: 40,
    right: 40,
    textAlign: 'center',
    fontSize: 24,
    fontFamily: 'Eyesome Script',
    color: '#1a1a1a',
  },
  durationText: {
    position: 'absolute',
    top: 400,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 14,
    color: '#1a1a1a',
  },
  issueDate: {
    position: 'absolute',
    top: 550,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 12,
    fontFamily: 'Helvetica',
    textTransform: 'uppercase',
  },
  certificateCode: {
    position: 'absolute',
    top: 526,
    left: 486,
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

          <Text style={styles.courseName}>
            {courseName}
          </Text>

          <Text style={styles.durationText}>
            {durationText}
          </Text>

          <Text style={styles.issueDate}>
            {issueDate}
          </Text>

          <Text style={styles.certificateCode}>
            ID: {certificateCode}
          </Text>

        </View>
      </Page>
    </Document>
  )
}