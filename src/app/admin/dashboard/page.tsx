import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Home, 
  Users, 
  DollarSign, 
  Wrench, 
  TrendingUp, 
  AlertCircle,
  Plus,
  FileText,
  Calendar,
  BarChart3
} from 'lucide-react';
import Link from 'next/link';
import { getDashboardStats, getProperties, getMaintenanceRequests, getInquiries } from '@/lib/db';

export default async function AdminDashboard() {
  const [stats, properties, maintenanceRequests, inquiries] = await Promise.all([
    getDashboardStats(),
    getProperties(),
    getMaintenanceRequests(),
    getInquiries()
  ]);

  const recentProperties = properties.slice(0, 5);
  const recentMaintenance = maintenanceRequests.slice(0, 5);
  const recentInquiries = inquiries.slice(0, 5);

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Property Management Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's an overview of your property portfolio.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
            <Home className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total_properties}</div>
            <p className="text-xs text-muted-foreground">
              {stats.available_properties} available, {stats.occupied_properties} occupied
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tenants</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total_tenants}</div>
            <p className="text-xs text-muted-foreground">
              Active tenants across all properties
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Maintenance</CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.open_maintenance}</div>
            <p className="text-xs text-muted-foreground">
              Requests requiring attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.total_rent_collected?.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Total rent collected this month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Link href="/admin/dashboard/properties/new">
          <Button className="w-full h-20 flex flex-col items-center justify-center space-y-2">
            <Plus className="h-6 w-6" />
            <span>Add Property</span>
          </Button>
        </Link>
        
        <Link href="/admin/dashboard/tenants/new">
          <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center space-y-2">
            <Users className="h-6 w-6" />
            <span>Add Tenant</span>
          </Button>
        </Link>
        
        <Link href="/admin/dashboard/maintenance/new">
          <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center space-y-2">
            <Wrench className="h-6 w-6" />
            <span>Create Maintenance Request</span>
          </Button>
        </Link>
        
        <Link href="/admin/dashboard/financials">
          <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center space-y-2">
            <BarChart3 className="h-6 w-6" />
            <span>View Financials</span>
          </Button>
        </Link>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Properties */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Home className="h-5 w-5" />
              <span>Recent Properties</span>
            </CardTitle>
            <CardDescription>
              Latest properties added to your portfolio
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentProperties.map((property) => (
                <div key={property.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-semibold">{property.name}</h4>
                    <p className="text-sm text-gray-600">{property.address}</p>
                  </div>
                  <Badge variant={property.status === 'available' ? 'default' : 'secondary'}>
                    {property.status}
                  </Badge>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Link href="/admin/dashboard/properties">
                <Button variant="outline" className="w-full">View All Properties</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Recent Maintenance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Wrench className="h-5 w-5" />
              <span>Recent Maintenance Requests</span>
            </CardTitle>
            <CardDescription>
              Latest maintenance issues requiring attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentMaintenance.map((request) => (
                <div key={request.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-semibold">{request.title}</h4>
                    <p className="text-sm text-gray-600">{request.property_name}</p>
                  </div>
                  <Badge 
                    variant={
                      request.priority === 'emergency' ? 'destructive' : 
                      request.priority === 'high' ? 'default' : 'secondary'
                    }
                  >
                    {request.priority}
                  </Badge>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Link href="/admin/dashboard/maintenance">
                <Button variant="outline" className="w-full">View All Requests</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Recent Inquiries */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <span>Recent Inquiries</span>
            </CardTitle>
            <CardDescription>
              Latest leads from the website
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentInquiries.map((inquiry) => (
                <div key={inquiry.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-semibold">{inquiry.first_name} {inquiry.last_name}</h4>
                    <p className="text-sm text-gray-600">{inquiry.email}</p>
                  </div>
                  <Badge variant={inquiry.status === 'new' ? 'default' : 'secondary'}>
                    {inquiry.status}
                  </Badge>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Link href="/admin/dashboard/inquiries">
                <Button variant="outline" className="w-full">View All Inquiries</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Quick Reports */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Quick Reports</span>
            </CardTitle>
            <CardDescription>
              Generate reports and analytics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Link href="/admin/dashboard/reports/occupancy">
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Occupancy Report
                </Button>
              </Link>
              <Link href="/admin/dashboard/reports/financial">
                <Button variant="outline" className="w-full justify-start">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Financial Report
                </Button>
              </Link>
              <Link href="/admin/dashboard/reports/maintenance">
                <Button variant="outline" className="w-full justify-start">
                  <Wrench className="h-4 w-4 mr-2" />
                  Maintenance Report
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
