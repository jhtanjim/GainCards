import React, { useState } from 'react';
import { Users, Shield, Gift, Truck, TrendingUp } from 'lucide-react';

const WhyChooseUs = () => {
  const [hoveredFeature, setHoveredFeature] = useState(null);

  const features = [
    {
      id: 1,
      icon: Users,
      title: "Community-based marketplace",
      description: "Connect with passionate collectors worldwide",
      color: "from-blue-500 to-purple-600",
      bgColor: "bg-blue-50"
    },
    {
      id: 2,
      icon: Shield,
      title: "Secure transactions",
      description: "Protected payments and verified sellers",
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-50"
    },
    {
      id: 3,
      icon: Gift,
      title: "Donation + new collectors born",
      description: "Give back while growing the community",
      color: "from-orange-500 to-red-600",
      bgColor: "bg-orange-50"
    },
    {
      id: 4,
      icon: Truck,
      title: "Shippo = faster, reliable delivery",
      description: "Quick and secure shipping solutions",
      color: "from-purple-500 to-pink-600",
      bgColor: "bg-purple-50"
    },
    {
      id: 5,
      icon: TrendingUp,
      title: "Transparent, growth-friendly for sellers",
      description: "Fair fees and tools to help you succeed",
      color: "from-teal-500 to-cyan-600",
      bgColor: "bg-teal-50"
    }
  ];

  const backgroundPattern =
    "bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%227%22%20cy%3D%227%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-16 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Main Content With Image */}
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-20">
          {/* Left Side Image */}
          <div className="w-full lg:w-1/2">
            <img
              src="https://i.pinimg.com/736x/cb/a5/24/cba5241c4db2faa1cc1cd7c092ade9a2.jpg"
              alt="Card Collecting"
              className="w-full rounded-3xl shadow-xl transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Right Side Content */}
          <div className="w-full lg:w-1/2">
            <div className="text-center lg:text-left mb-12">
              <span className="text-sm font-semibold text-blue-600 bg-blue-100 px-4 py-2 rounded-full mb-4 inline-block">
                Why Choose
              </span>
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-6">
                Why GainCards
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed">
                Experience the future of card collecting with our innovative platform designed for collectors, by collectors.
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.id}
                    className={`group relative p-6 rounded-2xl border border-slate-200 bg-white/70 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2 cursor-pointer ${feature.bgColor} hover:bg-white`}
                    onMouseEnter={() => setHoveredFeature(feature.id)}
                    onMouseLeave={() => setHoveredFeature(null)}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>

                    <div className={`relative w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>

                    <div className="relative">
                      <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-slate-900">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-slate-600 group-hover:text-slate-700">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Join Community Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 rounded-3xl opacity-90"></div>
          <div className={`absolute inset-0 ${backgroundPattern} rounded-3xl`}></div>

          <div className="relative p-12 md:p-16 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Join the GainCards Community
              </h2>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Get Drops, Tips, and Collector Perks — Straight to Your Inbox
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="group bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Join the community
                  <div className="w-0 group-hover:w-2 transition-all duration-300 overflow-hidden">
                    <div className="w-2 h-0.5 bg-blue-600 rounded"></div>
                  </div>
                </button>

                <button className="group bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                  View your Collections
                  <div className="w-0 group-hover:w-2 transition-all duration-300 overflow-hidden inline-block ml-0 group-hover:ml-2">
                    <div className="w-2 h-0.5 bg-current rounded"></div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Floating Effects */}
          <div className="absolute top-8 left-8 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-8 right-8 w-32 h-32 bg-purple-400/20 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-blue-300/20 rounded-full blur-lg"></div>
        </div>
      </div>

      {/* Global Animation Bubbles */}
      <div className="fixed top-20 left-10 w-4 h-4 bg-blue-400/30 rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
      <div className="fixed top-40 right-20 w-3 h-3 bg-purple-400/40 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
      <div className="fixed bottom-32 left-1/4 w-2 h-2 bg-teal-400/50 rounded-full animate-bounce" style={{ animationDelay: '2s', animationDuration: '5s' }}></div>
    </div>
  );
};

export default WhyChooseUs;
