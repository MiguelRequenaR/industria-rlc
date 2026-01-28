"use client"

import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer'

interface CertificateDocumentProps {
  studentName: string
  courseName: string
  issueDate: string
  certificateCode: string
  durationWeeks: number
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    fontFamily: 'Helvetica',
  },
  decorativeBorder: {
    border: '4px solid #2563EB',
    borderRadius: 8,
    padding: 25,
    margin: 15,
    flex: 1,
    position: 'relative',
  },
  innerBorder: {
    border: '1px solid #93C5FD',
    borderRadius: 4,
    padding: 20,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 60,
    height: 60,
  },
  cpeText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'right',
  },
  certificateTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#2563EB',
    textAlign: 'center',
    marginVertical: 15,
    letterSpacing: 2,
  },
  section: {
    marginVertical: 8,
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  studentName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  courseName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  description: {
    fontSize: 11,
    color: '#666',
    textAlign: 'center',
    marginBottom: 12,
  },
  dateLocation: {
    fontSize: 11,
    color: '#666',
    textAlign: 'center',
    marginTop: 12,
  },
  signatureSection: {
    marginTop: 35,
    alignItems: 'center',
  },
  signatureLine: {
    width: 200,
    borderBottomWidth: 2,
    borderBottomColor: '#000',
    marginBottom: 10,
  },
  signatureName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  signatureTitle: {
    fontSize: 12,
    color: '#666',
  },
  footer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  certificateCode: {
    fontSize: 10,
    color: '#999',
  },
  durationBox: {
    padding: 8,
    borderRadius: 8,
    marginVertical: 10,
  },
  durationText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#2563EB',
  },
})

export function CertificateDocument({ 
  studentName, 
  courseName, 
  issueDate, 
  certificateCode,
  durationWeeks 
}: CertificateDocumentProps) {
  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        {/* Borde decorativo externo */}
        <View style={styles.decorativeBorder}>
          {/* Borde decorativo interno */}
          <View style={styles.innerBorder}>
            <View style={styles.header}>
              <Image 
                src="/logo-industriarlc.png"
                style={styles.logo}
              />
              <View style={styles.cpeText}>
                <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#1F2937' }}>
                  Industrial RLC
                </Text>
                <Text style={{ fontSize: 10, color: '#666' }}>
                  Academia 360
                </Text>
              </View>
            </View>

            <Text style={styles.certificateTitle}>CERTIFICADO</Text>

            <View style={styles.section}>
              <Text style={styles.label}>Otorgado a:</Text>
              <Text style={styles.studentName}>{studentName}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.description}>
                Por haber culminado satisfactoriamente el curso a distancia:
              </Text>
              <Text style={styles.courseName}>{courseName}</Text>
            </View>

            <View style={{ alignItems: 'center' }}>
              <View style={styles.durationBox}>
                <Text style={styles.durationText}>
                  con una duración de {durationWeeks} {durationWeeks === 1 ? 'semana' : 'semanas'}.
                </Text>
              </View>
            </View>

            <Text style={styles.dateLocation}>
              Lima, {issueDate}
            </Text>

            <View style={styles.signatureSection}>
              <View style={styles.signatureLine} />
              <Text style={styles.signatureName}>Edward Vilcapoma</Text>
              <Text style={styles.signatureTitle}>Fundador - Industrial RLC</Text>
            </View>

            <View style={styles.footer}>
              <Text style={styles.certificateCode}>
                Código: {certificateCode}
              </Text>
              <Text style={styles.certificateCode}>
                Fecha de emisión: {issueDate}
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  )
}
