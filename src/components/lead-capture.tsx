import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Phone, Mail, Clock } from 'lucide-react';
import { saveInquiry } from '@/app/actions/save-inquiry';

interface LeadCaptureProps {
  title: string;
  subtitle: string;
  fields: string[];
}

export default function LeadCapture({ title, subtitle, fields }: LeadCaptureProps) {
  async function handleSubmit(formData: FormData) {
    'use server';
    const result = await saveInquiry(formData);
    
    if (result.success) {
      // You could add a toast notification here
      console.log('Inquiry saved successfully');
    } else {
      console.error('Failed to save inquiry:', result.error);
    }
  }

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50" id="contact">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              Get Started
            </Badge>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {title}
            </h2>
            <p className="text-lg text-gray-600">
              {subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Free Consultation Request
                </CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you within 24 hours.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form action={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name *
                      </label>
                      <Input name="first_name" placeholder="John" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name *
                      </label>
                      <Input name="last_name" placeholder="Smith" required />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email *
                      </label>
                      <Input name="email" type="email" placeholder="john@example.com" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone
                      </label>
                      <Input name="phone" placeholder="(555) 123-4567" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Number of Properties
                      </label>
                      <Select name="property_count">
                        <SelectTrigger>
                          <SelectValue placeholder="Select number" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Property</SelectItem>
                          <SelectItem value="2-5">2-5 Properties</SelectItem>
                          <SelectItem value="6-10">6-10 Properties</SelectItem>
                          <SelectItem value="11-25">11-25 Properties</SelectItem>
                          <SelectItem value="25+">25+ Properties</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Property Value Range
                      </label>
                      <Select name="property_value">
                        <SelectTrigger>
                          <SelectValue placeholder="Select range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="under_100k">Under $100k</SelectItem>
                          <SelectItem value="100k_250k">$100k - $250k</SelectItem>
                          <SelectItem value="250k_500k">$250k - $500k</SelectItem>
                          <SelectItem value="500k_1m">$500k - $1M</SelectItem>
                          <SelectItem value="over_1m">Over $1M</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <Textarea 
                      name="message"
                      placeholder="Tell us about your properties and what you're looking for in a property manager..."
                      rows={4}
                    />
                  </div>

                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                    Get Free Quote
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-6">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900">
                    Why Choose Us?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Phone className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">24/7 Support</h4>
                      <p className="text-gray-600 text-sm">
                        Emergency maintenance and tenant issues handled around the clock.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Mail className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Transparent Communication</h4>
                      <p className="text-gray-600 text-sm">
                        Regular updates and detailed reports on your property performance.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Clock className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Quick Response</h4>
                      <p className="text-gray-600 text-sm">
                        Average response time of under 2 hours for urgent matters.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900">
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-700">(555) 123-4567</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-700">info@propertymanagement.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-700">Mon-Fri 8AM-6PM</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 