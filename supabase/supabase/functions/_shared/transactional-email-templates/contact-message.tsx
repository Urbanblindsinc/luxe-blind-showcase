import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Hr, Html, Preview, Section, Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface ContactMessageProps {
  source?: string
  name?: string
  email?: string
  phone?: string
  product?: string
  productInterest?: string
  address?: string
  zip?: string
  subject?: string
  message?: string
  preferredContact?: string
  promoCode?: string
  numberOfBlinds?: string
  totalQuantity?: string
  configuration?: string
}

const LABELS: { key: keyof ContactMessageProps; label: string }[] = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone' },
  { key: 'address', label: 'Address' },
  { key: 'zip', label: 'ZIP' },
  { key: 'preferredContact', label: 'Preferred Contact' },
  { key: 'product', label: 'Product Interest' },
  { key: 'productInterest', label: 'Product Interest' },
  { key: 'subject', label: 'Subject' },
  { key: 'promoCode', label: 'Promo Code' },
  { key: 'numberOfBlinds', label: 'Number of Blinds' },
  { key: 'totalQuantity', label: 'Total Quantity' },
]

const ContactMessageEmail = (props: ContactMessageProps) => {
  const source = props.source || 'Website Contact Form'
  const rows = LABELS.filter(({ key }) => props[key] != null && String(props[key]).trim() !== '')
  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>New {source} submission from {props.name || 'a customer'}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>New Lead — {source}</Heading>
          <Text style={text}>A new submission was received from the Urban Blinds website.</Text>
          <Hr style={hr} />
          <Section>
            {rows.map(({ key, label }) => (
              <Text key={key} style={row}>
                <strong>{label}:</strong> {String(props[key])}
              </Text>
            ))}
          </Section>
          {props.message && (
            <>
              <Hr style={hr} />
              <Section>
                <Heading as="h2" style={h2}>Message</Heading>
                <pre style={pre}>{props.message}</pre>
              </Section>
            </>
          )}
          {props.configuration && (
            <>
              <Hr style={hr} />
              <Section>
                <Heading as="h2" style={h2}>Configuration</Heading>
                <pre style={pre}>{props.configuration}</pre>
              </Section>
            </>
          )}
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: ContactMessageEmail,
  subject: (d: Record<string, any>) =>
    `${d?.source || 'New Lead'} — ${d?.name || 'Customer'}`,
  to: 'urban.blinds.inc@gmail.com',
  displayName: 'Lead notification (contact / consultation / quote)',
  previewData: {
    source: 'Consultation Request',
    name: 'Jane Doe', email: 'jane@example.com', phone: '555-1234',
    productInterest: 'Zebra Blinds',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '20px 25px', maxWidth: '600px' }
const h1 = { fontSize: '22px', fontWeight: 'bold', color: '#1a1a1a', margin: '0 0 16px' }
const text = { fontSize: '14px', color: '#55575d', lineHeight: '1.5', margin: '0 0 16px' }
const row = { fontSize: '14px', color: '#1a1a1a', margin: '4px 0' }
const hr = { borderColor: '#e6e6e6', margin: '20px 0' }
const h2 = { fontSize: '16px', fontWeight: 'bold', color: '#1a1a1a', margin: '0 0 8px' }
const pre = { fontSize: '13px', color: '#1a1a1a', background: '#f6f6f4', padding: '12px', borderRadius: '6px', whiteSpace: 'pre-wrap' as const, fontFamily: 'monospace' }