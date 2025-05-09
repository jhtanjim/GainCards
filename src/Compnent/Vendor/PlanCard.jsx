import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const PlanCard = ({ plan, selectedPlan, onSelect }) => {
  const isSelected = selectedPlan?.id === plan.id;

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className={`rounded-lg p-6 shadow-md transition-all ${
        isSelected
          ? "border-2 border-purple-500 bg-purple-50"
          : "border border-gray-200 bg-white"
      }`}
    >
      <div className="mb-4 flex justify-between">
        <h3 className="text-xl font-bold text-gray-800">{plan.name}</h3>
        {isSelected && <CheckCircle className="text-purple-500" size={24} />}
      </div>

      <div className="mb-6 flex items-end">
        <span className="text-3xl font-bold text-gray-900">
          ${plan.price.toFixed(2)}
        </span>
        <span className="text-sm text-gray-500">/month</span>
      </div>

      {plan.discountPct > 0 && (
        <div className="mb-4 rounded-md bg-green-100 px-3 py-1 text-sm text-green-700">
          {plan.discountPct}% discount available
        </div>
      )}

      <ul className="mb-6 space-y-2">
        <li className="flex items-center text-gray-600">
          <CheckCircle className="mr-2 text-green-500" size={16} />
          Up to {plan.cardLimit} Pokémon cards
        </li>
        <li className="flex items-center text-gray-600">
          <CheckCircle className="mr-2 text-green-500" size={16} />
          24/7 Support
        </li>
        <li className="flex items-center text-gray-600">
          <CheckCircle className="mr-2 text-green-500" size={16} />
          Analytics Dashboard
        </li>
      </ul>

      <button
        onClick={() => onSelect(plan)}
        className={`w-full rounded-md py-2 transition-colors ${
          isSelected
            ? "bg-purple-600 text-white hover:bg-purple-700"
            : "bg-gray-100 text-gray-800 hover:bg-gray-200"
        }`}
      >
        {isSelected ? "Selected" : "Select Plan"}
      </button>
    </motion.div>
  );
};

export default PlanCard;
