"use client"
import { useState } from "react"
import { Crown, Rocket, Diamond, Star, Check, Zap, Heart } from "lucide-react"

const Subscription = () => {
  const [hoveredCard, setHoveredCard] = useState(null)
  
  // Mock data - replace with your API call
  const plans = [
    {
      id: 1,
      name: "Starter",
      price: 9,
      discountPct: 0,
      cardLimit: 100,
      isActive: false,
      icon: Rocket,
      color: "blue",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-500/30 to-cyan-500/30",
      features: ["100 Cards", "Basic Support", "Standard Analytics"]
    },
    {
      id: 2,
      name: "Professional",
      price: 19,
      discountPct: 25,
      cardLimit: 500,
      isActive: true,
      icon: Crown,
      color: "purple",
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-500/30 to-pink-500/30",
      features: ["500 Cards", "Priority Support", "Advanced Analytics", "Custom Themes"]
    },
    {
      id: 3,
      name: "Enterprise",
      price: 39,
      discountPct: 15,
      cardLimit: -1,
      isActive: false,
      icon: Diamond,
      color: "emerald",
      gradient: "from-emerald-500 to-teal-500",
      bgGradient: "from-emerald-500/30 to-teal-500/30",
      features: ["Unlimited Cards", "24/7 Support", "Premium Analytics", "White Label"]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-pink-400/20 to-red-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
            <Star className="text-yellow-400" size={20} />
            <span className="text-white font-medium">Premium Plans</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-6">
            Choose Your Plans
          </h1>
          
          <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            Unlock unlimited potential with our premium subscription plans designed for modern creators
          </p>
        </div>

        {/* Cards Grid */}
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {plans.map((plan, index) => {
              const Icon = plan.icon
              const isPopular = index === 1
              
              return (
                <div
                  key={plan.id}
                  className={`group relative ${isPopular ? 'lg:scale-110 lg:-translate-y-8' : ''}`}
                  onMouseEnter={() => setHoveredCard(plan.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Popular Badge */}
                  {isPopular && (
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-30">
                      <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-2xl border-2 border-white/20 backdrop-blur-sm">
                        <span className="flex items-center gap-2">
                          <Crown size={16} />
                          Most Popular
                        </span>
                      </div>
                    </div>
                  )}

                  {/* 3D Card Glow */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${plan.bgGradient} rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-700 opacity-50 group-hover:opacity-80`}></div>
                  
                  {/* Main Card */}
                  <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-700 hover:scale-[1.02] hover:border-white/20 overflow-hidden h-full">
                    
                    {/* Background Decorations */}
                    <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-30 transition-opacity duration-700">
                      <Icon size={80} className={`text-${plan.color}-400`} />
                    </div>
                    <div className="absolute -bottom-6 -left-6 opacity-5 group-hover:opacity-20 transition-opacity duration-700">
                      <Zap size={120} className={`text-${plan.color}-300`} />
                    </div>

                    {/* Card Content */}
                    <div className="relative z-10 h-full flex flex-col">
                      {/* Header */}
                      <div className="flex items-center gap-4 mb-8">
                        <div className={`w-16 h-16 bg-gradient-to-br ${plan.gradient} rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-700 shadow-2xl`}>
                          <Icon size={28} className="text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                          <div className={`w-8 h-1 bg-gradient-to-r ${plan.gradient} rounded-full group-hover:w-20 transition-all duration-700`}></div>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="mb-8">
                        <div className="flex items-baseline gap-2 mb-3">
                          <span className="text-5xl font-black text-white">${plan.price}</span>
                          <span className="text-white/60 text-lg">/month</span>
                        </div>
                        
                        {plan.discountPct > 0 && (
                          <div className="flex items-center gap-3">
                            <span className="text-white/40 line-through text-lg">
                              ${Math.round(plan.price / (1 - plan.discountPct / 100))}
                            </span>
                            <span className={`bg-gradient-to-r ${plan.gradient} text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg`}>
                              {plan.discountPct}% OFF
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Features */}
                      <div className="space-y-4 mb-8 flex-grow">
                        {plan.features.map((feature, idx) => (
                          <div 
                            key={idx}
                            className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors duration-300"
                          >
                            <div className={`w-6 h-6 bg-gradient-to-r ${plan.gradient} rounded-full flex items-center justify-center`}>
                              <Check size={14} className="text-white" />
                            </div>
                            <span className="text-white/80 font-medium">{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* Status */}
                      {plan.isActive && (
                        <div className="mb-6">
                          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-400/30 rounded-full">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span className="text-green-300 text-sm font-semibold">Current Plan</span>
                          </div>
                        </div>
                      )}

                      {/* CTA Button */}
                      <button className={`group/btn relative w-full px-8 py-4 bg-gradient-to-r ${plan.gradient} rounded-2xl text-white font-semibold text-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 overflow-hidden`}>
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          {plan.isActive ? (
                            <>
                              <Heart size={20} />
                              Current Plan
                            </>
                          ) : (
                            <>
                              <Zap size={20} />
                              Get Started
                            </>
                          )}
                        </span>
                        <div className={`absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500`}></div>
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <div className="group relative max-w-4xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-12 hover:bg-white/10 transition-all duration-500">
              <h3 className="text-3xl font-bold text-white mb-4">Questions? We're Here to Help!</h3>
              <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
                Get personalized recommendations from our expert team
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="group/cta relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl text-white font-semibold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden">
                  <span className="relative z-10">Schedule Call</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover/cta:opacity-100 transition-opacity duration-300"></div>
                </button>
                <button className="px-8 py-4 border-2 border-white/20 text-white rounded-2xl font-semibold hover:bg-white/10 hover:border-white/30 transition-all duration-300">
                  Compare Plans
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Subscription