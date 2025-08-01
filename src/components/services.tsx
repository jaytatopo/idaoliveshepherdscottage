import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, DollarSign, Wrench, BarChart, FileText, Home } from 'lucide-react';

interface Service {
  icon: string;
  title: string;
  description: string;
}

interface ServicesProps {
  services: Service[];
}

const iconMap: { [key: string]: React.ComponentType<any> } = {
  Shield,
  DollarSign,
  Wrench,
  BarChart,
  FileText,
  Home,
};

export default function Services({ services }: ServicesProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            Our Services
          </Badge>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Comprehensive Property Management Solutions
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We handle every aspect of property management so you can focus on what matters most. 
            From tenant screening to maintenance coordination, we've got you covered.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon];
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    {IconComponent && <IconComponent className="w-6 h-6 text-blue-600" />}
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 text-center">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">
            Ready to experience hassle-free property management?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Get Started Today
          </a>
        </div>
      </div>
    </section>
  );
} 