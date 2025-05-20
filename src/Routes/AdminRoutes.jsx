// routes/AdminRoutes.jsx
import React from 'react';
import useUserRole from '../Hooks/useUserRole';

const AdminRoutes = ({ children }) => {
  const { isAdmin } = useUserRole();

  if (!isAdmin) {
    return <p>Access denied. Admins only.</p>;
  }

  return <>{children}</>;
};

export default AdminRoutes;
