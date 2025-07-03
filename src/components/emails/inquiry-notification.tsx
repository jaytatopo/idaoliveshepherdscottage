import {
  Body,
  Container,
  Column,
  Head,
  Heading,
  Html,
  Text,
  Row,
  Section,
} from '@react-email/components';
import * as React from 'react';

interface InquiryEmailProps {
  name: string;
  email: string;
  phone?: string;
  checkIn?: string;
  checkOut?: string;
  guests: number;
  message: string;
}

const InquiryNotificationEmail: React.FC<Readonly<InquiryEmailProps>> = ({
  name,
  email,
  phone,
  checkIn,
  checkOut,
  guests,
  message
}) => (
  <Html>
    <Head />
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>New Inquiry for Ida Olive Cottage</Heading>
        <Text style={paragraph}>You have received a new inquiry from the website. Details are below:</Text>
        <Section style={section}>
          <Row style={row}>
            <Column style={label}>Name:</Column>
            <Column>{name}</Column>
          </Row>
          <Row style={row}>
            <Column style={label}>Email:</Column>
            <Column><a href={`mailto:${email}`}>{email}</a></Column>
          </Row>
          {phone && (
            <Row style={row}>
              <Column style={label}>Phone:</Column>
              <Column>{phone}</Column>
            </Row>
          )}
          {checkIn && (
            <Row style={row}>
              <Column style={label}>Check-in:</Column>
              <Column>{new Date(checkIn).toLocaleDateString()}</Column>
            </Row>
          )}
          {checkOut && (
            <Row style={row}>
              <Column style={label}>Check-out:</Column>
              <Column>{new Date(checkOut).toLocaleDateString()}</Column>
            </Row>
          )}
          <Row style={row}>
            <Column style={label}>Guests:</Column>
            <Column>{guests}</Column>
          </Row>
           <Row style={row}>
            <Column style={label}>Message:</Column>
            <Column>{message}</Column>
          </Row>
        </Section>
        <Text style={paragraph}>Please respond to them as soon as possible.</Text>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: '#f5f5dc', // light tan
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  border: '1px solid #e5e5e5',
  borderRadius: '3px',
  margin: '0 auto',
  padding: '20px',
  maxWidth: '580px',
};

const heading = {
  color: '#808000', // olive green
  fontSize: '24px',
  fontWeight: 'bold',
  textAlign: 'center' as const,
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
};

const section = {
  padding: '12px 0',
};

const row = {
    padding: '4px 0'
}

const label = {
  fontWeight: 'bold',
  width: '120px',
};

export default InquiryNotificationEmail;
