import React from 'react';
import dynamic from 'next/dynamic';
import Header from '@/components/header';
import Hero from '@/components/hero';
import Footer from '@/components/footer';
import StructuredData from '@/components/structured-data';

export const revalidate = 3600; // Revalidate at most every hour

// Lazy load components that are not critical for the initial view
const Services = dynamic(() => import('@/components/services'));
const Testimonials = dynamic(() => import('@/components/testimonials'));
const LeadCapture = dynamic(() => import('@/components/lead-capture'));
const Features = dynamic(() => import('@/components/features'));
const Pricing = dynamic(() => import('@/components/pricing'));
const About = dynamic(() => import('@/components/about'));

const sectionComponents: { [key: string]: React.ComponentType<any> } = {
  hero: Hero,
  services: Services,
  features: Features,
  testimonials: Testimonials,
  pricing: Pricing,
  leadCapture: LeadCapture,
  about: About,
};

// Default page sections for property management marketing site
const defaultSections = [
  { id: 1, section_type: 'hero', is_visible: true },
  { id: 2, section_type: 'services', is_visible: true },
  { id: 3, section_type: 'features', is_visible: true },
  { id: 4, section_type: 'testimonials', is_visible: true },
  { id: 5, section_type: 'pricing', is_visible: true },
  { id: 6, section_type: 'leadCapture', is_visible: true },
  { id: 7, section_type: 'about', is_visible: true },
];

const getSectionProps = (type: string) => {
  switch (type) {
    case 'hero':
      return { 
        content: {
          heading: 'Hassle-Free Property Management Starts Here',
          subheading: 'Professional property management services that maximize your rental income while minimizing your stress. Let us handle everything from tenant screening to maintenance coordination.',
          ctaText: 'Get Free Management Quote',
          ctaLink: '#contact'
        }
      };
    case 'services':
      return {
        services: [
          {
            icon: 'Shield',
            title: 'Tenant Screening',
            description: 'Comprehensive background checks, credit reports, and rental history verification to ensure quality tenants.'
          },
          {
            icon: 'DollarSign',
            title: 'Rent Collection',
            description: 'Automated rent collection with multiple payment options and late fee management.'
          },
          {
            icon: 'Wrench',
            title: 'Maintenance Coordination',
            description: '24/7 maintenance request handling with trusted vendors and quality control.'
          },
          {
            icon: 'BarChart',
            title: 'Financial Reporting',
            description: 'Detailed monthly statements, expense tracking, and tax preparation support.'
          },
          {
            icon: 'FileText',
            title: 'Legal Compliance',
            description: 'Stay compliant with local, state, and federal rental property regulations.'
          },
          {
            icon: 'Home',
            title: 'Property Marketing',
            description: 'Professional photography, listing optimization, and tenant placement services.'
          }
        ]
      };
    case 'features':
      return {
        features: [
          {
            icon: 'Smartphone',
            title: 'Owner Portal',
            description: 'Real-time access to your property portfolio, financial reports, and maintenance updates.'
          },
          {
            icon: 'Bell',
            title: 'Instant Notifications',
            description: 'Get notified immediately about rent payments, maintenance issues, and important updates.'
          },
          {
            icon: 'TrendingUp',
            title: 'Performance Analytics',
            description: 'Track your property performance with detailed analytics and market insights.'
          },
          {
            icon: 'Users',
            title: 'Dedicated Manager',
            description: 'Personal property manager assigned to your portfolio for personalized service.'
          }
        ]
      };
    case 'testimonials':
      return {
        testimonials: [
          {
            quote: "Since hiring this property management company, my rental income has increased by 25% and I spend zero time dealing with tenant issues.",
            author: "Sarah Johnson",
            rating: 5,
            title: "Property Owner"
          },
          {
            quote: "Their tenant screening process is thorough and their maintenance team is responsive. I couldn't be happier with their service.",
            author: "Michael Chen",
            rating: 5,
            title: "Real Estate Investor"
          },
          {
            quote: "The owner portal gives me complete visibility into my properties. I can see everything from rent payments to maintenance requests in real-time.",
            author: "Lisa Rodriguez",
            rating: 5,
            title: "Multi-Property Owner"
          }
        ]
      };
    case 'pricing':
      return {
        plans: [
          {
            name: 'Basic',
            price: '8%',
            description: 'Perfect for single property owners',
            features: [
              'Tenant screening & placement',
              'Rent collection',
              'Basic maintenance coordination',
              'Monthly financial reports',
              'Owner portal access'
            ]
          },
          {
            name: 'Professional',
            price: '7%',
            description: 'Ideal for growing portfolios',
            features: [
              'Everything in Basic',
              'Priority maintenance response',
              'Advanced financial reporting',
              'Legal compliance support',
              'Dedicated property manager'
            ],
            popular: true
          },
          {
            name: 'Premium',
            price: '6%',
            description: 'For large property portfolios',
            features: [
              'Everything in Professional',
              'Custom marketing strategies',
              'Tax preparation support',
              'Market analysis reports',
              'Concierge-level service'
            ]
          }
        ]
      };
    case 'leadCapture':
      return {
        title: 'Ready to Maximize Your Rental Income?',
        subtitle: 'Get a free property management consultation and quote.',
        fields: ['name', 'email', 'phone', 'property_count', 'message']
      };
    case 'about':
      return {
        content: {
          heading: 'About Our Property Management Services',
          description: 'With over 10 years of experience in property management, we specialize in maximizing rental income while providing exceptional service to both property owners and tenants. Our team of certified property managers uses the latest technology to ensure your properties are well-maintained and profitable.',
          stats: [
            { number: '500+', label: 'Properties Managed' },
            { number: '98%', label: 'Tenant Satisfaction' },
            { number: '25%', label: 'Average Income Increase' },
            { number: '24/7', label: 'Support Available' }
          ]
        }
      };
    default:
      return {};
  }
};

export default async function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <StructuredData />
      <Header />
      <main className="flex-1">
        {defaultSections.map((section) => {
            if (!section.is_visible) return null;
            const Component = sectionComponents[section.section_type];
            if (!Component) return null;

            return (
                <Component key={section.id} {...getSectionProps(section.section_type)} />
            );
        })}
      </main>
      <Footer />
    </div>
  );
}
