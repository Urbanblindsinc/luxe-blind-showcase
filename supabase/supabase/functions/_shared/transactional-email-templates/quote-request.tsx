import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Hr, Html, Preview, Section, Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface QuoteRequestProps {
  name?: string
  email?: string
  phone?: string
  zip?: string
  numberOfBlinds?: string
  totalQuantity?: string
  configuration?: string
}

const QuoteRequestEmail = ({
  name, email, phone, zip, numberOfBlinds, totalQuantity, configuration,
}: QuoteRequestProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>New Build Your Blind quote from {name || 'a customer'}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>New Quote Request</Heading>
        <Text style={text}>You've received a new quote request from the Build Your Blind page.</Text>
        <Hr style={hr} />
        <Section>
          <Heading as="h2" style={h2}>Customer</Heading>
          <Text style={row}><strong>Name:</strong> {name || 'Not provided'}</Text>
          <Text style={row}><strong>Email:</strong> {email || 'Not provided'}</Text>
          <Text style={row}><strong>Phone:</strong> {phone || 'Not provided'}</Text>
          <Text style={row}><strong>ZIP:</strong> {zip || 'Not provided'}</Text>
        </Section>
        <Hr style={hr} />
        <Section>
          <Heading as="h2" style={h2}>Order Summary</Heading>
          <Text style={row}><strong>Number of Blinds:</strong> {numberOfBlinds || '0'}</Text>
          <Text style={row}><strong>Total Quantity:</strong> {totalQuantity || '0'}</Text>
        </Section>
        <Hr style={hr} />
        <Section>
          <Heading as="h2" style={h2}>Configuration</Heading>
          <pre style={pre}>{configuration || '(none)'}</pre>
        </Section>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: QuoteRequestEmail,
  subject: (d: Record<string, any>) =>
    `New Quote Request — ${d?.name || 'Customer'} (${d?.numberOfBlinds || '?'} blind(s))`,
  to: 'urban.blinds.inc@gmail.com',
  displayName: 'Quote request (Build Your Blind)',
  previewData: {
    name: 'Jane Doe', email: 'jane@example.com', phone: '555-1234', zip: '98101',
    numberOfBlinds: '2', totalQuantity: '5',
    configuration: 'Blind #1: Roller — Ivory Mist 36x60 cordless x2\n\nBlind #2: Zebra — Fog Gray 48x72 motor-smart x3',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '20px 25px', maxWidth: '600px' }
const h1 = { fontSize: '22px', fontWeight: 'bold', color: '#1a1a1a', margin: '0 0 16px' }
const h2 = { fontSize: '16px', fontWeight: 'bold', color: '#1a1a1a', margin: '0 0 8px' }
const text = { fontSize: '14px', color: '#55575d', lineHeight: '1.5', margin: '0 0 12px' }
const row = { fontSize: '14px', color: '#1a1a1a', margin: '4px 0' }
const hr = { borderColor: '#e6e6e6', margin: '20px 0' }
const pre = { fontSize: '13px', color: '#1a1a1a', background: '#f6f6f4', padding: '12px', borderRadius: '6px', whiteSpace: 'pre-wrap' as const, fontFamily: 'monospace' }