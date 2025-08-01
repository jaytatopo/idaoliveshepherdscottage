import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  FileText, 
  Search, 
  Eye, 
  Mail,
  Phone,
  Calendar,
  User,
  Building
} from 'lucide-react';
import Link from 'next/link';
import { getInquiries } from '@/lib/db';

export default async function InquiriesPage() {
  const inquiries = await getInquiries();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'default';
      case 'contacted':
        return 'secondary';
      case 'qualified':
        return 'outline';
      case 'converted':
        return 'default';
      case 'lost':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Lead Inquiries</h1>
        <p className="text-gray-600">Manage and track potential clients</p>
      </div>

      {/* Search and Filters */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Search inquiries..." 
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">All Inquiries</Button>
              <Button variant="outline">New</Button>
              <Button variant="outline">Contacted</Button>
              <Button variant="outline">Qualified</Button>
              <Button variant="outline">Converted</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Inquiries List */}
      <div className="space-y-4">
        {inquiries.map((inquiry) => (
          <Card key={inquiry.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <User className="h-5 w-5 text-blue-600" />
                    <h3 className="text-lg font-semibold">
                      {inquiry.first_name} {inquiry.last_name}
                    </h3>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                    <span className="flex items-center">
                      <Mail className="h-4 w-4 mr-1" />
                      {inquiry.email}
                    </span>
                    {inquiry.phone && (
                      <span className="flex items-center">
                        <Phone className="h-4 w-4 mr-1" />
                        {inquiry.phone}
                      </span>
                    )}
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(inquiry.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  {inquiry.property_count && (
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Building className="h-4 w-4 mr-1" />
                        {inquiry.property_count} properties
                      </span>
                      {inquiry.property_value && (
                        <span>Value: {inquiry.property_value}</span>
                      )}
                    </div>
                  )}
                  {inquiry.message && (
                    <p className="text-gray-600 mt-2 text-sm">
                      {inquiry.message.length > 100 
                        ? `${inquiry.message.substring(0, 100)}...` 
                        : inquiry.message
                      }
                    </p>
                  )}
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <Badge variant={getStatusColor(inquiry.status)}>
                    {inquiry.status}
                  </Badge>
                  {inquiry.assigned_first_name && (
                    <span className="text-xs text-gray-500">
                      Assigned to: {inquiry.assigned_first_name} {inquiry.assigned_last_name}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <Link href={`/admin/dashboard/inquiries/${inquiry.id}`}>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View Details
                  </Button>
                </Link>
                <Button variant="outline" size="sm">
                  <Mail className="h-4 w-4 mr-1" />
                  Send Email
                </Button>
                <Button variant="outline" size="sm">
                  <Phone className="h-4 w-4 mr-1" />
                  Call
                </Button>
                {inquiry.status === 'new' && (
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    Mark Contacted
                  </Button>
                )}
                {inquiry.status === 'contacted' && (
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    Mark Qualified
                  </Button>
                )}
                {inquiry.status === 'qualified' && (
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                    Mark Converted
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {inquiries.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Inquiries Found</h3>
            <p className="text-gray-600 mb-4">
              New inquiries from the website will appear here.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 