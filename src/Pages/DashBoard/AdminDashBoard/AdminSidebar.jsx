import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, ShoppingCart, CreditCard, Users, Store, User, X, Menu, Home } from 'lucide-react'

const AdminSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation()
  
  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Order List', href: '/admin/orders', icon: ShoppingCart },
    { name: 'Payment List', href: '/admin/payments', icon: CreditCard },
    { name: 'Home', href: '/', icon: Home },
    { 
      name: 'Users', 
      href: '/admin/users', 
      icon: Users,
      children: [
        { name: 'All Users', href: '/admin/users' },
        { name: 'Vendors', href: '/admin/users/vendors' },
        { name: 'Normal Users', href: '/admin/users/normal' },
      ]
    },
  ]
  
  const isActive = (path) => location.pathname === path
  
  return (
    <>
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-40 md:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75" 
          onClick={() => setSidebarOpen(false)}
        ></div>
        
        {/* Sidebar */}
        <div className="fixed inset-y-0 left-0 flex flex-col w-64 max-w-xs bg-[#131e2c] text-white">
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-700">
            <span className="text-xl font-bold">Admin Panel</span>
            <button onClick={() => setSidebarOpen(false)}>
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="flex-1 px-4 py-4 overflow-y-auto">
            <nav className="space-y-1">
              {navigation.map((item) => (
                <div key={item.name}>
                  <Link
                    to={item.href}
                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg ${
                      isActive(item.href) 
                        ? 'bg-[#1a2639] text-white' 
                        : 'text-gray-300 hover:bg-[#1a2639] hover:text-white'
                    }`}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </Link>
                  
                  {item.children && (
                    <div className="ml-8 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          to={child.href}
                          className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg ${
                            isActive(child.href) 
                              ? 'bg-[#1a2639] text-white' 
                              : 'text-gray-300 hover:bg-[#1a2639] hover:text-white'
                          }`}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      </div>
      
      {/* Desktop sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col flex-1 min-h-0 bg-[#131e2c] text-white">
            <div className="flex items-center h-16 px-6 border-b border-gray-700">
              <span className="text-xl font-bold">Admin Panel</span>
            </div>
            
            <div className="flex-1 px-4 py-4 overflow-y-auto">
              <nav className="space-y-1">
                {navigation.map((item) => (
                  <div key={item.name}>
                    <Link
                      to={item.href}
                      className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg ${
                        isActive(item.href) 
                          ? 'bg-[#1a2639] text-white' 
                          : 'text-gray-300 hover:bg-[#1a2639] hover:text-white'
                      }`}
                    >
                      <item.icon className="w-5 h-5 mr-3" />
                      {item.name}
                    </Link>
                    
                    {item.children && (
                      <div className="ml-8 mt-1 space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            to={child.href}
                            className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg ${
                              isActive(child.href) 
                                ? 'bg-[#1a2639] text-white' 
                                : 'text-gray-300 hover:bg-[#1a2639] hover:text-white'
                            }`}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminSidebar