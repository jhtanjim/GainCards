import { Plus } from "lucide-react"
import { Link } from "react-router-dom"
import MyCards from "../../../Shared/MyCards/MyCards"

const AdminCards = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">My Pokemon Cards</h1>
        <Link to="/vendor/upload">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <Plus size={18} />
            <span>Add New Card</span>
          </button>
        </Link>
      </div>

      {/* Use the existing MyCards component */}
      <MyCards />
    </div>
  )
}

export default AdminCards
