import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Home, TrendingUp, Clock } from 'lucide-react';

interface AboutProps {
  content: {
    heading: string;
    description: string;
    stats: Array<{
      number: string;
      label: string;
    }>;
  };
}

export default function About({ content }: AboutProps) {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              About Us
            </Badge>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {content.heading}
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              {content.description}
            </p>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {content.stats.map((stat, index) => (
              <Card key={index} className="text-center border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Company Values */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Our Mission
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  To provide exceptional property management services that maximize returns for property owners 
                  while ensuring quality living experiences for tenants. We believe in building lasting 
                  relationships through transparency, reliability, and professional excellence.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Home className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Our Approach
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  We combine cutting-edge technology with personalized service to deliver comprehensive 
                  property management solutions. Our team of certified professionals handles every aspect 
                  of property management with attention to detail and commitment to excellence.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Our Results
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Our clients consistently see increased rental income, reduced vacancy rates, and 
                  improved property values. We maintain high tenant satisfaction scores while ensuring 
                  properties are well-maintained and compliant with all regulations.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Our Commitment
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  We're committed to providing 24/7 support, transparent communication, and proactive 
                  property management. Your success is our success, and we work tirelessly to ensure 
                  your investment properties perform at their best.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-12">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Ready to Experience Professional Property Management?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Join hundreds of satisfied property owners who trust us with their investments. 
                Get started with a free consultation today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#contact"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Get Free Consultation
                </a>
                <a
                  href="tel:+1-555-0123"
                  className="inline-flex items-center px-6 py-3 border border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors duration-200"
                >
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 