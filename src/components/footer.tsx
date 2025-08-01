import Link from 'next/link';
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <span className="text-xl font-bold">PropertyPro Management</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Professional property management services that maximize your rental income while minimizing your stress. 
              Let us handle everything from tenant screening to maintenance coordination.
            </p>
            <div className="flex space-x-4">
              <Link href="#" passHref target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
                  <Facebook className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="#" passHref target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
                  <Instagram className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="#" passHref target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
                  <Linkedin className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="#services" className="hover:text-white transition-colors">Tenant Screening</Link></li>
              <li><Link href="#services" className="hover:text-white transition-colors">Rent Collection</Link></li>
              <li><Link href="#services" className="hover:text-white transition-colors">Maintenance Coordination</Link></li>
              <li><Link href="#services" className="hover:text-white transition-colors">Financial Reporting</Link></li>
              <li><Link href="#services" className="hover:text-white transition-colors">Legal Compliance</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>info@propertymanagement.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>123 Business Ave, Suite 100<br />City, State 12345</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-gray-300">&copy; {new Date().getFullYear()} PropertyPro Management. All Rights Reserved.</p>
            </div>
            <div className="flex gap-6 text-sm text-gray-300">
              <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link href="/admin" className="hover:text-white transition-colors">Admin Login</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
