import { Outlet } from "react-router-dom"
import VendorSidebar from "../Pages/DashBoard/VendorDashBoard/VendorSidebar"
import VendorHeader from "../Pages/DashBoard/VendorDashBoard/VendorHeader"

const VendorLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <VendorSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <VendorHeader />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default VendorLayout
