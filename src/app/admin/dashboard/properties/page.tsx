import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Home, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye,
  MapPin,
  DollarSign,
  Users
} from 'lucide-react';
import Link from 'next/link';
import { getProperties } from '@/lib/db';

export default async function PropertiesPage() {
  const properties = await getProperties();

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Properties</h1>
          <p className="text-gray-600">Manage your property portfolio</p>
        </div>
        <Link href="/admin/dashboard/properties/new">
          <Button className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add Property</span>
          </Button>
        </Link>
      </div>

      {/* Search and Filters */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Search properties..." 
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">All Properties</Button>
              <Button variant="outline">Available</Button>
              <Button variant="outline">Occupied</Button>
              <Button variant="outline">Maintenance</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <Card key={property.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <Home className="h-5 w-5" />
                    <span>{property.name}</span>
                  </CardTitle>
                  <CardDescription className="flex items-center space-x-1 mt-2">
                    <MapPin className="h-4 w-4" />
                    <span>{property.address}</span>
                  </CardDescription>
                </div>
                <Badge 
                  variant={
                    property.status === 'available' ? 'default' : 
                    property.status === 'occupied' ? 'secondary' : 
                    'destructive'
                  }
                >
                  {property.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-medium">{property.property_type}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Bedrooms:</span>
                  <span className="font-medium">{property.bedrooms || 'N/A'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Bathrooms:</span>
                  <span className="font-medium">{property.bathrooms || 'N/A'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Rent:</span>
                  <span className="font-medium flex items-center">
                    <DollarSign className="h-3 w-3 mr-1" />
                    {property.rent_amount?.toLocaleString() || 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Owner:</span>
                  <span className="font-medium">
                    {property.owner_first_name} {property.owner_last_name}
                  </span>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Link href={`/admin/dashboard/properties/${property.id}`}>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                </Link>
                <Link href={`/admin/dashboard/properties/${property.id}/edit`}>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                </Link>
                <Button variant="outline" size="sm" className="flex-1 text-red-600 hover:text-red-700">
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {properties.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Home className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Properties Found</h3>
            <p className="text-gray-600 mb-4">
              Get started by adding your first property to the portfolio.
            </p>
            <Link href="/admin/dashboard/properties/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Property
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 