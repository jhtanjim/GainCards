import { useQuery } from "@tanstack/react-query"
import { getAllActivePlan } from "../../../api/subscription"
import { useState } from "react"
import { Crown, Rocket, Diamond, Star, Check, Zap, Heart } from "lucide-react"
import { Link } from "react-router-dom"
import useUserRole from "../../../Hooks/useUserRole"

const Subscription = () => {
  const [hoveredCard, setHoveredCard] = useState(null)
  const { isVendor, isAdmin } = useUserRole();

  const {
    data: activePlans = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["subscription-plans"],
    queryFn: getAllActivePlan,
  })

  // Filter only active plans

  // Clean mapping function using only actual API data
  const getEnhancedPlans = (apiPlans) => {
    const iconMap = [Rocket, Crown, Diamond, Star, Zap]
    const colorSchemes = [
      {
        color: "blue",
        gradient: "from-blue-500 to-cyan-500",
        bgGradient: "from-blue-500/30 to-cyan-500/30"
      },
      {
        color: "purple", 
        gradient: "from-purple-500 to-pink-500",
        bgGradient: "from-purple-500/30 to-pink-500/30"
      },
      {
        color: "emerald",
        gradient: "from-emerald-500 to-teal-500", 
        bgGradient: "from-emerald-500/30 to-teal-500/30"
      },
      {
        color: "orange",
        gradient: "from-orange-500 to-red-500",
        bgGradient: "from-orange-500/30 to-red-500/30"
      },
      {
        color: "indigo",
        gradient: "from-indigo-500 to-purple-500",
        bgGradient: "from-indigo-500/30 to-purple-500/30"
      }
    ]

    return apiPlans.map((plan, index) => {
      // Generate features based on actual plan data
      const features = []
      
      // Card limit feature
      if (plan.cardLimit === -1) {
        features.push("Unlimited Cards")
      } else {
        features.push(`${plan.cardLimit} Cards`)
      }
      
      // Support level based on price
      if (plan.price === 0) {
        features.push("Community Support")
    
      } else {
        features.push("24/7 Premium Support")
      }
      
    
      
      // Additional features for paid plans
  
      return {
        ...plan,
        icon: iconMap[index % iconMap.length],
        ...colorSchemes[index % colorSchemes.length],
        features
      }
    })
  }

  // Use filtered active plans instead of all plans
  const enhancedPlans = getEnhancedPlans(activePlans)

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading plans...</div>
      </div>
    )
  }

  // Show error state
  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-red-400 text-xl">Error loading plans</div>
      </div>
    )
  }

  // Show message if no active plans
  if (activePlans.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">No active plans available</div>
      </div>
    )
  }

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
            <span className="text-white font-medium">Active Plans</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-6">
             Start Selling Your Collection

          </h1>
          
          <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed px-4">
            Flexible plans for every type of collector — whether you're just starting or a seasoned vendor.

          </p>
        </div>

        {/* Cards Grid */}
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch px-4">
            {enhancedPlans.map((plan, index) => {
              const Icon = plan.icon
              const isPopular = index === 1 && enhancedPlans.length > 2 // Middle plan is popular only if there are more than 2 plans
              const isCurrent = plan.isActive
              
              return (
                <div
                  key={plan.id}
                  className={`group relative ${isPopular ? 'lg:scale-105 lg:-translate-y-4' : ''} ${isCurrent ? '' : ''}`}
                  onMouseEnter={() => setHoveredCard(plan.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Popular Badge */}
                  {isPopular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-30">
                      <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-4 py-2 rounded-full text-xs sm:text-sm font-bold shadow-2xl border-2 border-white/20 backdrop-blur-sm">
                        <span className="flex items-center gap-2">
                          <Crown size={14} />
                          Most Popular
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Current Plan Badge */}
                  {isCurrent && !isPopular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-30">
                      <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full text-xs sm:text-sm font-bold shadow-2xl border-2 border-white/20 backdrop-blur-sm">
                      
                       <span className="flex items-center gap-2">

                         <Heart size={14} />
                          Active Plan
                          
                        </span>
                       
                      </div>
                    </div>
                  )}

                  {/* 3D Card Glow */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${plan.bgGradient} rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-700 opacity-50 group-hover:opacity-80`}></div>
                  
                  {/* Main Card */}
                  <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-8 hover:bg-white/10 transition-all duration-700 hover:scale-[1.02] hover:border-white/20 overflow-hidden h-full">
                    
                    {/* Background Decorations */}
                    <div className="absolute top-4 right-4 sm:top-6 sm:right-6 opacity-10 group-hover:opacity-30 transition-opacity duration-700">
                      <Icon size={60} className={`text-${plan.color}-400 sm:w-20 sm:h-20`} />
                    </div>
                    <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 opacity-5 group-hover:opacity-20 transition-opacity duration-700">
                      <Zap size={80} className={`text-${plan.color}-300 sm:w-30 sm:h-30`} />
                    </div>

                    {/* Card Content */}
                    <div className="relative z-10 h-full flex flex-col">
                      {/* Header */}
                      <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                        <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${plan.gradient} rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-700 shadow-2xl`}>
                          <Icon size={20} className="text-white sm:w-7 sm:h-7" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 capitalize truncate">{plan.name}</h3>
                          <div className={`w-6 sm:w-8 h-1 bg-gradient-to-r ${plan.gradient} rounded-full group-hover:w-16 sm:group-hover:w-20 transition-all duration-700`}></div>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="mb-6 sm:mb-8">
                        <div className="flex items-baseline gap-2 mb-3">
                          <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">
                            ${plan.price}
                          </span>
                          <span className="text-white/60 text-base sm:text-lg">
                            {plan.price === 0 ? '' : '/month'}
                          </span>
                        </div>
                        
                        {plan.discountPct > 0 && (
                          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                            <span className="text-white/40 line-through text-sm sm:text-lg">
                              ${Math.round(plan.price / (1 - plan.discountPct / 100))}
                            </span>
                            <span className={`bg-gradient-to-r ${plan.gradient} text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold shadow-lg`}>
                              {plan.discountPct}% OFF
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Features */}
                      <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 flex-grow">
                        {plan.features.map((feature, idx) => (
                          <div 
                            key={idx}
                            className="flex items-center gap-3 p-2 sm:p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors duration-300"
                          >
                            <div className={`w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r ${plan.gradient} rounded-full flex items-center justify-center flex-shrink-0`}>
                              <Check size={12} className="text-white sm:w-3.5 sm:h-3.5" />
                            </div>
                            <span className="text-white/80 font-medium text-sm sm:text-base">{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* CTA Button */}

{ !isVendor && !isAdmin && (

 <button className={`group/btn relative w-full px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r ${plan.gradient} rounded-2xl text-white font-semibold text-base sm:text-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 overflow-hidden`}>
                      <Link to={"/vendorSignup"}>  
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          <Heart size={18} />
                          Active Plan
                        </span>
                        </Link>
                        <div className={`absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500`}></div>
                      </button>
)}


                     
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

  
      </div>
    </div>
  )
}

export default Subscription