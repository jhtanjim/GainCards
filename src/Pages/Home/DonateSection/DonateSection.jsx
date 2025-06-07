import React, { useState } from "react";
import { UserPlus, ListChecks, Repeat2, Sparkles, Heart, Gift } from "lucide-react";
import { Link } from "react-router-dom";

const DonateSection = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 px-6 py-20 max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white/80 text-sm mb-6 animate-fade-in">
            <Sparkles size={16} className="text-yellow-400" />
            <span>Join the Card Community</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-6 animate-slide-up">
            It's Simple to Get Started
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto animate-fade-in-delay">
            Transform your collecting experience with our streamlined platform
          </p>
        </div>

        {/* Steps Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            { icon: UserPlus, title: "Create Account", step: "01" },
            { icon: ListChecks, title: "Choose a Plan / Start Buying Cards", step: "02" },
            { icon: Repeat2, title: "List, Ship, Trade, or Donate", step: "03" }
          ].map((item, index) => (
            <div key={index} className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:border-white/20">
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {item.step}
                </div>
                <div className="mb-6">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-500">
                    <item.icon size={40} className="text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto group-hover:w-20 transition-all duration-500"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Donate Card */}
          <div
            className="group relative"
            onMouseEnter={() => setHoveredCard("donate")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/30 to-pink-500/30 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-500 hover:scale-[1.02] hover:border-white/20 overflow-hidden">
              <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                <Heart size={60} className="text-pink-400" />
              </div>
              <div className="absolute -bottom-4 -left-4 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                <Gift size={80} className="text-orange-400" />
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-pink-600 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-500">
                    <Heart size={28} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">Donate a Card</h3>
                    <div className="w-8 h-1 bg-gradient-to-r from-orange-500 to-pink-600 rounded-full group-hover:w-16 transition-all duration-500"></div>
                  </div>
                </div>

                <p className="text-white/70 mb-8 text-lg leading-relaxed">
                  Have extra cards? Share the joy of collecting — donate your cards and make another collector's day.
                </p>

                <button className="group/btn relative px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-600 rounded-2xl text-white font-semibold text-lg hover:shadow-2xl hover:shadow-pink-500/25 transition-all duration-300 hover:scale-105 overflow-hidden">
                <Link to="/donate">
                  <span className="relative z-10 flex items-center gap-2">
                    <Heart size={20} />
                    Donate Card
                  </span>
                  </Link>
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-orange-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            </div>
          </div>

          {/* Request Card */}
          <div
            className="group relative"
            onMouseEnter={() => setHoveredCard("request")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/30 to-teal-500/30 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-500 hover:scale-[1.02] hover:border-white/20 overflow-hidden">
              <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                <Sparkles size={60} className="text-emerald-400" />
              </div>
              <div className="absolute -bottom-4 -left-4 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                <ListChecks size={80} className="text-teal-400" />
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-500">
                    <Gift size={28} className="text-white" />
                  </div>
                  <div>

                    <h3 className="text-2xl font-bold text-white mb-1">Request a Card</h3>
                    <div className="w-8 h-1 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full group-hover:w-16 transition-all duration-500"></div>
                  </div>
                </div>

                <p className="text-white/70 mb-8 text-lg leading-relaxed">
                  Looking for a card? Browse donated cards — just pay shipping and start building your dream deck .
                </p>

                <button className="group/btn relative px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl text-white font-semibold text-lg hover:shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-105 overflow-hidden">
                                    <Link to="/donateCardReceiver">
                  <span className="relative z-10 flex items-center gap-2">

                    <Sparkles size={20} />
                    Request Card
                  </span>
                  </Link>
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-emerald-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full text-white/80 hover:bg-white/20 transition-all duration-300 cursor-pointer">
            <span>Ready to start your journey?</span>
            <Sparkles size={16} className="text-yellow-400 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Custom Keyframe Styles */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }

        .animate-fade-in-delay {
          animation: fade-in 0.8s ease-out 0.3s forwards;
          opacity: 0;
        }

        .animate-slide-up {
          animation: slide-up 1s ease-out forwards;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default DonateSection;
