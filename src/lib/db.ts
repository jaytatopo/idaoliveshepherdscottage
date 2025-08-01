import { sql } from '@vercel/postgres';

// By using the `sql` template literal from `@vercel/postgres`,
// Vercel automatically handles the database connection using the
// `POSTGRES_URL` environment variable. You do not need to
// create a connection pool manually.
//
// This makes the code cleaner and more secure in a serverless environment.

export const db = {
    // We are creating a db object that is compatible with the `mysql2/promise` API
    // that the rest of the application uses.
    // The `sql` template literal is the modern way to query with `@vercel/postgres`.
    // The query method is provided for compatibility with existing code.
    query: (query: string, values?: any[]) => sql.query(query, values),
    execute: (query: string, values?: any[]) => sql.query(query, values),
};

// Property Management Data Access Functions

export async function getOwners() {
    const result = await sql`
        SELECT * FROM owners 
        ORDER BY created_at DESC
    `;
    return result.rows;
}

export async function getOwnerById(id: number) {
    const result = await sql`
        SELECT * FROM owners 
        WHERE id = ${id}
    `;
    return result.rows[0];
}

export async function createOwner(ownerData: {
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;
    address?: string;
    tax_id?: string;
    bank_account?: string;
}) {
    const result = await sql`
        INSERT INTO owners (first_name, last_name, email, phone, address, tax_id, bank_account)
        VALUES (${ownerData.first_name}, ${ownerData.last_name}, ${ownerData.email}, 
                ${ownerData.phone}, ${ownerData.address}, ${ownerData.tax_id}, ${ownerData.bank_account})
        RETURNING *
    `;
    return result.rows[0];
}

export async function getProperties(ownerId?: number) {
    let query = `
        SELECT p.*, o.first_name as owner_first_name, o.last_name as owner_last_name,
               COUNT(pi.id) as image_count
        FROM properties p
        LEFT JOIN owners o ON p.owner_id = o.id
        LEFT JOIN property_images pi ON p.id = pi.property_id
    `;
    
    if (ownerId) {
        query += ` WHERE p.owner_id = ${ownerId}`;
    }
    
    query += ` GROUP BY p.id ORDER BY p.created_at DESC`;
    
    const result = await sql.unsafe(query);
    return result.rows;
}

export async function getPropertyById(id: number) {
    const result = await sql`
        SELECT p.*, o.first_name as owner_first_name, o.last_name as owner_last_name
        FROM properties p
        LEFT JOIN owners o ON p.owner_id = o.id
        WHERE p.id = ${id}
    `;
    return result.rows[0];
}

export async function createProperty(propertyData: {
    owner_id: number;
    name: string;
    address: string;
    city: string;
    state: string;
    zip_code: string;
    property_type: string;
    bedrooms?: number;
    bathrooms?: number;
    square_feet?: number;
    year_built?: number;
    rent_amount?: number;
    deposit_amount?: number;
    description?: string;
    amenities?: string;
}) {
    const result = await sql`
        INSERT INTO properties (owner_id, name, address, city, state, zip_code, property_type,
                              bedrooms, bathrooms, square_feet, year_built, rent_amount, 
                              deposit_amount, description, amenities)
        VALUES (${propertyData.owner_id}, ${propertyData.name}, ${propertyData.address}, 
                ${propertyData.city}, ${propertyData.state}, ${propertyData.zip_code}, 
                ${propertyData.property_type}, ${propertyData.bedrooms}, ${propertyData.bathrooms},
                ${propertyData.square_feet}, ${propertyData.year_built}, ${propertyData.rent_amount},
                ${propertyData.deposit_amount}, ${propertyData.description}, ${propertyData.amenities})
        RETURNING *
    `;
    return result.rows[0];
}

export async function getTenants() {
    const result = await sql`
        SELECT * FROM tenants 
        ORDER BY created_at DESC
    `;
    return result.rows;
}

export async function getTenantById(id: number) {
    const result = await sql`
        SELECT * FROM tenants 
        WHERE id = ${id}
    `;
    return result.rows[0];
}

export async function createTenant(tenantData: {
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;
    emergency_contact?: string;
    emergency_phone?: string;
    date_of_birth?: string;
    ssn?: string;
    income?: number;
    employment?: string;
}) {
    const result = await sql`
        INSERT INTO tenants (first_name, last_name, email, phone, emergency_contact, 
                           emergency_phone, date_of_birth, ssn, income, employment)
        VALUES (${tenantData.first_name}, ${tenantData.last_name}, ${tenantData.email},
                ${tenantData.phone}, ${tenantData.emergency_contact}, ${tenantData.emergency_phone},
                ${tenantData.date_of_birth}, ${tenantData.ssn}, ${tenantData.income}, ${tenantData.employment})
        RETURNING *
    `;
    return result.rows[0];
}

export async function getLeases(propertyId?: number) {
    let query = `
        SELECT l.*, p.name as property_name, p.address as property_address,
               t.first_name as tenant_first_name, t.last_name as tenant_last_name,
               t.email as tenant_email, t.phone as tenant_phone
        FROM leases l
        LEFT JOIN properties p ON l.property_id = p.id
        LEFT JOIN tenants t ON l.tenant_id = t.id
    `;
    
    if (propertyId) {
        query += ` WHERE l.property_id = ${propertyId}`;
    }
    
    query += ` ORDER BY l.created_at DESC`;
    
    const result = await sql.unsafe(query);
    return result.rows;
}

export async function createLease(leaseData: {
    property_id: number;
    tenant_id: number;
    start_date: string;
    end_date: string;
    rent_amount: number;
    deposit_amount: number;
    late_fee?: number;
    pet_deposit?: number;
    lease_document_url?: string;
    notes?: string;
}) {
    const result = await sql`
        INSERT INTO leases (property_id, tenant_id, start_date, end_date, rent_amount,
                          deposit_amount, late_fee, pet_deposit, lease_document_url, notes)
        VALUES (${leaseData.property_id}, ${leaseData.tenant_id}, ${leaseData.start_date},
                ${leaseData.end_date}, ${leaseData.rent_amount}, ${leaseData.deposit_amount},
                ${leaseData.late_fee}, ${leaseData.pet_deposit}, ${leaseData.lease_document_url},
                ${leaseData.notes})
        RETURNING *
    `;
    return result.rows[0];
}

export async function getMaintenanceRequests(propertyId?: number) {
    let query = `
        SELECT mr.*, p.name as property_name, p.address as property_address,
               t.first_name as tenant_first_name, t.last_name as tenant_last_name
        FROM maintenance_requests mr
        LEFT JOIN properties p ON mr.property_id = p.id
        LEFT JOIN tenants t ON mr.tenant_id = t.id
    `;
    
    if (propertyId) {
        query += ` WHERE mr.property_id = ${propertyId}`;
    }
    
    query += ` ORDER BY mr.created_at DESC`;
    
    const result = await sql.unsafe(query);
    return result.rows;
}

export async function createMaintenanceRequest(requestData: {
    property_id: number;
    tenant_id?: number;
    title: string;
    description: string;
    priority?: string;
    category?: string;
    estimated_cost?: number;
    vendor_name?: string;
    vendor_phone?: string;
    scheduled_date?: string;
}) {
    const result = await sql`
        INSERT INTO maintenance_requests (property_id, tenant_id, title, description, priority,
                                       category, estimated_cost, vendor_name, vendor_phone, scheduled_date)
        VALUES (${requestData.property_id}, ${requestData.tenant_id}, ${requestData.title},
                ${requestData.description}, ${requestData.priority}, ${requestData.category},
                ${requestData.estimated_cost}, ${requestData.vendor_name}, ${requestData.vendor_phone},
                ${requestData.scheduled_date})
        RETURNING *
    `;
    return result.rows[0];
}

export async function getFinancialTransactions(propertyId?: number) {
    let query = `
        SELECT ft.*, p.name as property_name,
               l.start_date as lease_start, l.end_date as lease_end
        FROM financial_transactions ft
        LEFT JOIN properties p ON ft.property_id = p.id
        LEFT JOIN leases l ON ft.lease_id = l.id
    `;
    
    if (propertyId) {
        query += ` WHERE ft.property_id = ${propertyId}`;
    }
    
    query += ` ORDER BY ft.transaction_date DESC`;
    
    const result = await sql.unsafe(query);
    return result.rows;
}

export async function createFinancialTransaction(transactionData: {
    property_id: number;
    lease_id?: number;
    transaction_type: string;
    amount: number;
    description: string;
    transaction_date: string;
    payment_method?: string;
    reference_number?: string;
    notes?: string;
}) {
    const result = await sql`
        INSERT INTO financial_transactions (property_id, lease_id, transaction_type, amount,
                                         description, transaction_date, payment_method, reference_number, notes)
        VALUES (${transactionData.property_id}, ${transactionData.lease_id}, ${transactionData.transaction_type},
                ${transactionData.amount}, ${transactionData.description}, ${transactionData.transaction_date},
                ${transactionData.payment_method}, ${transactionData.reference_number}, ${transactionData.notes})
        RETURNING *
    `;
    return result.rows[0];
}

export async function getInquiries() {
    const result = await sql`
        SELECT i.*, au.first_name as assigned_first_name, au.last_name as assigned_last_name
        FROM inquiries i
        LEFT JOIN admin_users au ON i.assigned_to = au.id
        ORDER BY i.created_at DESC
    `;
    return result.rows;
}

export async function createInquiry(inquiryData: {
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;
    property_count?: number;
    property_value?: string;
    message?: string;
    source?: string;
}) {
    const result = await sql`
        INSERT INTO inquiries (first_name, last_name, email, phone, property_count, 
                             property_value, message, source)
        VALUES (${inquiryData.first_name}, ${inquiryData.last_name}, ${inquiryData.email},
                ${inquiryData.phone}, ${inquiryData.property_count}, ${inquiryData.property_value},
                ${inquiryData.message}, ${inquiryData.source})
        RETURNING *
    `;
    return result.rows[0];
}

// Dashboard Statistics
export async function getDashboardStats() {
    const stats = await sql`
        SELECT 
            (SELECT COUNT(*) FROM properties) as total_properties,
            (SELECT COUNT(*) FROM properties WHERE status = 'available') as available_properties,
            (SELECT COUNT(*) FROM properties WHERE status = 'occupied') as occupied_properties,
            (SELECT COUNT(*) FROM tenants) as total_tenants,
            (SELECT COUNT(*) FROM maintenance_requests WHERE status = 'open') as open_maintenance,
            (SELECT COUNT(*) FROM inquiries WHERE status = 'new') as new_inquiries,
            (SELECT COALESCE(SUM(amount), 0) FROM financial_transactions 
             WHERE transaction_type = 'rent_payment' AND status = 'completed') as total_rent_collected
    `;
    return stats.rows[0];
}
