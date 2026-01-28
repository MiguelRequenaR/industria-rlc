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
    padding: 14,
    fontFamily: 'Helvetica',
    flexDirection: 'column',
  },
  decorativeBorder: {
    border: '3px solid #2563EB',
    borderRadius: 6,
    padding: 18,
    margin: 8,
    flex: 1,
    position: 'relative',
  },
  innerBorder: {
    border: '1px solid #93C5FD',
    borderRadius: 4,
    padding: 16,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: 52,
    height: 52,
  },
  cpeText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'right',
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 8,
  },
  certificateTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2563EB',
    textAlign: 'center',
    marginVertical: 10,
    letterSpacing: 2,
  },
  section: {
    marginVertical: 6,
    textAlign: 'center',
  },
  label: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
  },
  studentName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 10,
  },
  courseName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 6,
  },
  description: {
    fontSize: 11,
    color: '#666',
    textAlign: 'center',
    marginBottom: 6,
  },
  dateLocation: {
    fontSize: 11,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
  },
  signatureSection: {
    alignItems: 'center',
    paddingTop: 12,
  },
  signatureLine: {
    width: 180,
    borderBottomWidth: 2,
    borderBottomColor: '#000',
    marginBottom: 8,
  },
  signatureName: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  signatureTitle: {
    fontSize: 11,
    color: '#666',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  certificateCode: {
    fontSize: 9,
    color: '#999',
  },
  durationBox: {
    padding: 6,
    borderRadius: 6,
    marginVertical: 6,
  },
  durationText: {
    fontSize: 12,
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
                <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#1F2937' }}>
                  Industrial RLC
                </Text>
                <Text style={{ fontSize: 10, color: '#666' }}>
                  Academia 360
                </Text>
              </View>
            </View>

            <View style={styles.mainContent}>
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
            </View>

            <View>
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
        </View>
      </Page>
    </Document>
  )
}
