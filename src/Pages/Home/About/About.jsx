import { Users, Shield, Award, Heart, ArrowRight } from "lucide-react"

const About = () => {
  const features = [
    {
      icon: Users,
      title: "Community-Based Marketplace",
      description: "Connect with fellow collectors and build lasting relationships in our vibrant community",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: Shield,
      title: "Secure Transactions",
      description: "Every transaction is protected with our advanced security measures and buyer protection",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: Award,
      title: "Authenticated Cards",
      description: "All cards are verified for authenticity and condition by our expert team",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      icon: Heart,
      title: "Donation Program",
      description: "Give back to the community by donating cards to new collectors and enthusiasts",
      color: "from-pink-500 to-pink-600",
      bgColor: "bg-pink-50",
    },
  ]

  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Join the GainCards Community</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            More than just a marketplace - we're building the future of Pokemon card collecting
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className={`text-center p-6 rounded-2xl ${feature.bgColor} border border-gray-200 hover:shadow-lg transition-all duration-300 group hover:scale-105`}
              >
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.color} text-white rounded-full mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>

        {/* Community Stats */}
        <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">50K+</div>
              <div className="text-gray-600">Active Members</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">1M+</div>
              <div className="text-gray-600">Cards Traded</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">99.9%</div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-600 mb-2">24/7</div>
              <div className="text-gray-600">Support</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-6 text-gray-900">Ready to Start Your Journey?</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <span className="flex items-center gap-2 justify-center">
                Join Community
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </button>
            <button className="px-8 py-4 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 rounded-xl transition-all duration-300 font-semibold">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
