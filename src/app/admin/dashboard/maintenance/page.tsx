import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Wrench, 
  Plus, 
  Search, 
  Edit, 
  Eye,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react';
import Link from 'next/link';
import { getMaintenanceRequests } from '@/lib/db';

export default async function MaintenancePage() {
  const maintenanceRequests = await getMaintenanceRequests();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'emergency':
        return 'destructive';
      case 'high':
        return 'default';
      case 'medium':
        return 'secondary';
      case 'low':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'default';
      case 'in_progress':
        return 'secondary';
      case 'completed':
        return 'outline';
      case 'cancelled':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Maintenance Requests</h1>
          <p className="text-gray-600">Track and manage property maintenance</p>
        </div>
        <Link href="/admin/dashboard/maintenance/new">
          <Button className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>New Request</span>
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
                  placeholder="Search maintenance requests..." 
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">All Requests</Button>
              <Button variant="outline">Open</Button>
              <Button variant="outline">In Progress</Button>
              <Button variant="outline">Completed</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Maintenance Requests List */}
      <div className="space-y-4">
        {maintenanceRequests.map((request) => (
          <Card key={request.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <Wrench className="h-5 w-5 text-blue-600" />
                    <h3 className="text-lg font-semibold">{request.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-2">{request.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {new Date(request.created_at).toLocaleDateString()}
                    </span>
                    <span>{request.property_name}</span>
                    {request.tenant_first_name && (
                      <span>Tenant: {request.tenant_first_name} {request.tenant_last_name}</span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <Badge variant={getPriorityColor(request.priority)}>
                    {request.priority}
                  </Badge>
                  <Badge variant={getStatusColor(request.status)}>
                    {request.status}
                  </Badge>
                </div>
              </div>

              <div className="flex gap-2">
                <Link href={`/admin/dashboard/maintenance/${request.id}`}>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View Details
                  </Button>
                </Link>
                <Link href={`/admin/dashboard/maintenance/${request.id}/edit`}>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                </Link>
                {request.status === 'open' && (
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Mark In Progress
                  </Button>
                )}
                {request.status === 'in_progress' && (
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Mark Complete
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {maintenanceRequests.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Wrench className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Maintenance Requests</h3>
            <p className="text-gray-600 mb-4">
              All maintenance requests are up to date.
            </p>
            <Link href="/admin/dashboard/maintenance/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create New Request
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 