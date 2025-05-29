import React from "react"

export function StepIndicator({ currentStep, totalSteps }) {
  return (
    <div className="flex items-center justify-center mb-8">
      {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
        <React.Fragment key={step}>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              currentStep >= step ? "bg-pink-500 text-white" : "bg-gray-200 text-gray-600"
            }`}
          >
            {step}
          </div>
          {step < totalSteps && (
            <div className={`w-12 h-1 mx-2 ${currentStep > step ? "bg-pink-500" : "bg-gray-200"}`}></div>
          )}
        </React.Fragment>
      ))}
    </div>
  )
}
