import * as React from 'react';

interface InquiryEmailProps {
  name: string;
  email: string;
  phone?: string;
  checkIn: string;
  checkOut: string;
  guests: number;
}

const InquiryNotificationEmail: React.FC<Readonly<InquiryEmailProps>> = ({
  name,
  email,
  phone,
  checkIn,
  checkOut,
  guests
}) => (
  <div>
    <h1>New Accommodation Inquiry</h1>
    <p>You have received a new inquiry from the website. Details are below:</p>
    <ul>
      <li><strong>Name:</strong> {name}</li>
      <li><strong>Email:</strong> {email}</li>
      {phone && <li><strong>Phone:</strong> {phone}</li>}
      <li><strong>Check-in:</strong> {new Date(checkIn).toLocaleDateString()}</li>
      <li><strong>Check-out:</strong> {new Date(checkOut).toLocaleDateString()}</li>
      <li><strong>Guests:</strong> {guests}</li>
    </ul>
    <p>Please respond to them as soon as possible.</p>
  </div>
);

export default InquiryNotificationEmail;
