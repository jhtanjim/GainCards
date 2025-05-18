// components/UserList/UserTable.jsx


const getRoleBadgeClass = (role) => {
  switch (role?.toLowerCase()) {
    case 'vendor':
      return 'bg-purple-100 text-purple-800'
    case 'user':
      return 'bg-blue-100 text-blue-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const UserTable = ({ users }) => (
  <div className="bg-white shadow rounded-lg overflow-hidden">
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {['Name', 'Email', 'Role', 'Status', 'Join Date', 'Actions'].map((heading, idx) => (
              <th
                key={idx}
                className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${heading === 'Actions' ? 'text-right' : ''}`}
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map(user => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <img
                    src={user.profilePicture}
                    alt={user.username}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div className="ml-4 text-sm font-medium text-gray-900">
                    {user.username}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">{user.email}</td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 inline-flex text-xs font-semibold rounded-full ${getRoleBadgeClass(user.role)}`}>
                  {user.role}
                </span>
              </td>
              <td className="px-6 py-4">
                <span className="px-2 py-1 inline-flex text-xs font-semibold rounded-full bg-green-100 text-green-800">
                  Active
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {new Date(user.createdAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 text-right text-sm font-medium">
                <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                <button className="text-gray-600 hover:text-gray-900 mr-3">Edit</button>
                <button className="text-red-600 hover:text-red-900">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)

export default UserTable
