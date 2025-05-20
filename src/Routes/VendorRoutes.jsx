import useUserRole from "../Hooks/useUserRole"

const VendorRoutes = ({ children }) => {
  const { isVendor } = useUserRole()

  if (!isVendor) {
    return <p>Access denied. Vendors only.</p>
  }

  return <>{children}</>
}

export default VendorRoutes
