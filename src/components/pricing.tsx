import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';

interface PricingPlan {
  name: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
}

interface PricingProps {
  plans: PricingPlan[];
}

export default function Pricing({ plans }: PricingProps) {
  return (
    <section className="py-16 bg-white" id="pricing">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            Pricing
          </Badge>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Transparent Pricing Plans
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Choose the perfect plan for your property portfolio. All plans include our core services 
            with additional features as you scale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative hover:shadow-xl transition-shadow duration-300 ${
                plan.popular ? 'border-blue-500 shadow-lg' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-600 text-white px-4 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl font-bold text-gray-900">
                  {plan.name}
                </CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-blue-600">{plan.price}</span>
                  <span className="text-gray-600 ml-2">of monthly rent</span>
                </div>
                <CardDescription className="text-gray-600 mt-2">
                  {plan.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-8">
                  <a
                    href="#contact"
                    className={`w-full inline-flex items-center justify-center px-6 py-3 font-semibold rounded-lg transition-colors duration-200 ${
                      plan.popular
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'border border-blue-600 text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    Get Started
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-gray-50 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Custom Solutions Available
            </h3>
            <p className="text-gray-600 mb-6">
              Have a large portfolio or special requirements? We offer custom pricing and 
              dedicated solutions for enterprise clients.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors duration-200"
            >
              Contact Sales
            </a>
          </div>
        </div>
      </div>
    </section>
  );
} 