import React from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  Heart,
  DollarSign,
  Target,
  ArrowLeft,
  Bookmark,
  BarChart3,
} from "lucide-react";

interface Charity {
  id: string;
  name: string;
  tagline: string;
  description: string;
  fullDescription: {
    mission: string;
    impact: string;
    usage: string;
  };
  category: string;
  image: string;
  logo: string;
  impactStats: Array<{
    label: string;
    value: string;
  }>;
  impactPerDollar: string;
  isSelected: boolean;
  colors: {
    primary: string;
    secondary: string;
  };
}

interface CharityDetailViewProps {
  selectedCharity: Charity;
  charities: Charity[];
  onBackToDiscover: () => void;
  onCharityToggle: (id: string) => void;
}

export function CharityDetailView({
  selectedCharity,
  charities,
  onBackToDiscover,
  onCharityToggle,
}: CharityDetailViewProps) {
  // Get the current charity state from the charities array (this includes updated isSelected status)
  const currentCharity = charities.find(c => c.id === selectedCharity.id) || selectedCharity;

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={onBackToDiscover}
        className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 transition-colors duration-200"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm">Back to Discover</span>
      </button>

      {/* Charity Header */}
      <Card className="p-6 overflow-hidden relative" style={{
        background: `linear-gradient(135deg, ${currentCharity.colors.secondary}20 0%, ${currentCharity.colors.secondary}40 100%)`
      }}>
        <div className="absolute top-0 right-0 w-24 h-24 opacity-20 text-6xl">
          {currentCharity.logo}
        </div>
        
        <div className="relative">
          <div className="flex items-start gap-4 mb-4">
            <div 
              className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl shadow-lg"
              style={{ backgroundColor: currentCharity.colors.primary + '20', border: `2px solid ${currentCharity.colors.primary}30` }}
            >
              {currentCharity.logo}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl text-gray-800 mb-2">
                {currentCharity.name}
              </h2>
              <p className="text-sm text-gray-600 mb-3">
                {currentCharity.tagline}
              </p>
              <Badge 
                variant="outline" 
                className="text-xs"
                style={{ 
                  backgroundColor: currentCharity.colors.secondary, 
                  borderColor: currentCharity.colors.primary + '40',
                  color: currentCharity.colors.primary 
                }}
              >
                {currentCharity.category}
              </Badge>
            </div>
          </div>
        </div>
      </Card>

      {/* Charity Image */}
      <div className="aspect-video w-full rounded-xl overflow-hidden shadow-lg">
        <ImageWithFallback
          src={currentCharity.image}
          alt={`${currentCharity.name} impact`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Impact Stats */}
      <Card className="p-5 bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200/50">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-600 rounded-full flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="text-gray-800 mb-1">Impact by Numbers</h4>
            <p className="text-xs text-gray-600">Real results from your donations</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 mb-4">
          {currentCharity.impactStats.map((stat, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-white/60 rounded-lg border border-white/40">
              <span className="text-sm text-gray-700">{stat.label}</span>
              <span className="text-lg text-gray-800" style={{ color: currentCharity.colors.primary }}>
                {stat.value}
              </span>
            </div>
          ))}
        </div>

        <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="w-4 h-4 text-emerald-600" />
            <span className="text-sm text-emerald-800">Your donation impact</span>
          </div>
          <p className="text-xs text-emerald-600">
            {currentCharity.impactPerDollar}
          </p>
        </div>
      </Card>

      {/* Full Description */}
      <Card className="p-5 bg-white shadow-sm">
        <div className="space-y-4">
          <div>
            <h4 className="text-gray-800 mb-2 flex items-center gap-2">
              <Heart className="w-4 h-4 text-red-500" />
              Our Mission
            </h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              {currentCharity.fullDescription.mission}
            </p>
          </div>

          <div>
            <h4 className="text-gray-800 mb-2 flex items-center gap-2">
              <Target className="w-4 h-4 text-blue-500" />
              What We Do
            </h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              {currentCharity.fullDescription.impact}
            </p>
          </div>

          <div>
            <h4 className="text-gray-800 mb-2 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-green-500" />
              How Donations Help
            </h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              {currentCharity.fullDescription.usage}
            </p>
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 py-3"
          onClick={() => {
            // Handle donate action
            console.log(`Donating to ${currentCharity.name}`);
          }}
        >
          <Heart className="w-5 h-5 mr-2" />
          Donate to This Charity
        </Button>

        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            className="flex items-center justify-center gap-2 py-2 border-emerald-300 text-emerald-700 hover:bg-emerald-50"
            onClick={() => onCharityToggle(currentCharity.id)}
          >
            <Target className="w-4 h-4" />
            {currentCharity.isSelected ? "Remove" : "Add to Round-Up"}
          </Button>

          <Button
            variant="outline"
            className="flex items-center justify-center gap-2 py-2 border-blue-300 text-blue-700 hover:bg-blue-50"
            onClick={() => {
              // Handle bookmark action
              console.log(`Bookmarked ${currentCharity.name}`);
            }}
          >
            <Bookmark className="w-4 h-4" />
            Bookmark
          </Button>
        </div>
      </div>
    </div>
  );
}