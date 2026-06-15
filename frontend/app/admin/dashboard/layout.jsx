'use client';

import ProtectedRoute from '../../../src/components/ProtectedRoute';
import AdminLayout from '../../../src/admin/AdminLayout';

export default function DashboardLayout({ children }) {
  return (
    <ProtectedRoute>
      <AdminLayout>{children}</AdminLayout>
    </ProtectedRoute>
  );
}
