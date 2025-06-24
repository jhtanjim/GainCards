"use client";

import { useEffect, useState } from "react";
import { Edit, Trash2, Plus, ToggleLeft, ToggleRight } from "lucide-react";

// Import your actual API functions
import {
  getAllPlan,
  createPlan,
  updatePlan,
  deletePlan,
} from "../../../../api/subscription";

const ManageSubscription = () => {
  const [plans, setPlans] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    discountPct: 0,
    cardLimit: 0,
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const data = await getAllPlan();
      //console.log(data)
      setPlans(data);
    } catch (error) {
      console.error("Error fetching plans:", error);
      alert("Error fetching plans. Please refresh the page.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "name" ? value : Number(value),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Plan name is required");
      return;
    }

    // Validate data before sending
    const planData = {
      name: formData.name.trim(),
      price: Number(formData.price),
      discountPct: Number(formData.discountPct),
      cardLimit: Number(formData.cardLimit),
    };

    // Additional validation
    if (planData.price < 0) {
      alert("Price cannot be negative");
      return;
    }
    if (planData.discountPct < 0 || planData.discountPct > 100) {
      alert("Discount must be between 0 and 100");
      return;
    }
    if (planData.cardLimit < 0) {
      alert("Card limit cannot be negative");
      return;
    }

    //console.log("Sending plan data:", planData);

    try {
      setLoading(true);

      if (editingId) {
        const updatedPlan = await updatePlan(editingId, planData);
        setPlans(
          plans.map((plan) =>
            plan.id === editingId ? { ...plan, ...planData } : plan
          )
        );
        alert("Plan updated successfully");
      } else {
        const newPlan = await createPlan(planData);
        setPlans([...plans, newPlan]);
        alert("Plan created successfully");
      }

      resetForm();
    } catch (error) {
      console.error("Failed to save plan:", error);
      alert("Failed to save plan. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: "", price: 0, discountPct: 0, cardLimit: 0 });
    setEditingId(null);
  };

  const handleEdit = (plan) => {
    setFormData({
      name: plan.name,
      price: plan.price,
      discountPct: plan.discountPct,
      cardLimit: plan.cardLimit, 
    });
    setEditingId(plan.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this plan?")) {
      try {
        setLoading(true);
        await deletePlan(id);
        setPlans(plans.filter((plan) => plan.id !== id));
        alert("Plan deleted successfully");
      } catch (error) {
        console.error("Failed to delete plan:", error);
        alert("Failed to delete plan. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  const toggleActive = async (plan) => {
    //console.log(plan)
    try {
      const updatedPlan = await updatePlan(plan.id, { isActive: !plan.isActive });

      setPlans(
        plans.map((p) => (p.id === plan.id ? { ...p, isActive: !p.isActive } : p))
      );
      alert(`Plan ${!plan.isActive ? "activated" : "deactivated"} successfully`);
    } catch (error) {
      console.error("Failed to toggle plan status:", error);
      alert("Failed to update plan status. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Plus className="w-8 h-8 text-blue-600" />
            Manage Subscriptions
          </h2>

          <form onSubmit={handleSubmit} className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Plan Name *
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="e.g., Premium Plan"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price ($) *
                </label>
                <input
                  type="number"
                  name="price"
                  placeholder="0"
                  value={formData.price}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Discount (%)
                </label>
                <input
                  type="number"
                  name="discountPct"
                  placeholder="0"
                  value={formData.discountPct}
                  onChange={handleChange}
                  min="0"
                  max="100"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Card Limit
                </label>
                <input
                  type="number"
                  name="cardLimit"
                  placeholder="0"
                  value={formData.cardLimit}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Plus className="w-4 h-4" />
                )}
                {editingId ? "Update Plan" : "Add Plan"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900">
              Subscription Plans
            </h3>
          </div>

          {loading ? (
            <div className="p-8 text-center">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading plans...</p>
            </div>
          ) : plans.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <p>No subscription plans found. Create your first plan above.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Plan Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Discount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Card Limit
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {plans.map((plan) => (
                    <tr
                      key={plan.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {plan.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          ${plan.price}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {plan.discountPct}%
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {plan.cardLimit}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleActive(plan)}
                            className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium transition-colors ${
                              plan.isActive
                                ? "text-green-700 bg-green-100 hover:bg-green-200"
                                : "text-red-700 bg-red-100 hover:bg-red-200"
                            }`}
                            title={plan.isActive ? "Click to deactivate" : "Click to activate"}
                          >
                            {plan.isActive ? (
                              <>
                                <ToggleRight className="w-4 h-4" />
                                Active
                              </>
                            ) : (
                              <>
                                <ToggleLeft className="w-4 h-4" />
                                Inactive
                              </>
                            )}
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap flex items-center gap-3">
                        <button
                          onClick={() => handleEdit(plan)}
                          className="text-green-600 hover:text-green-800 transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(plan.id)}
                          className="text-red-600 hover:text-red-800 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageSubscription;