import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar } from "./ui/avatar";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Heart, Trophy, Target, Zap, Calendar, Users } from "lucide-react";

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  rarity: "common" | "rare" | "epic" | "legendary";
  earnedDate: string;
}

interface Friend {
  id: string;
  name: string;
  avatar: string;
  totalDonated: number;
  charitiesSupported: string[];
  badges: Badge[];
  joinedDate: string;
}

interface FriendCardProps {
  friend: Friend;
}

export function FriendCard({ friend }: FriendCardProps) {
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "legendary": return "bg-gradient-to-r from-yellow-100 to-amber-100 border-yellow-300 text-yellow-800";
      case "epic": return "bg-gradient-to-r from-purple-100 to-violet-100 border-purple-300 text-purple-800";
      case "rare": return "bg-gradient-to-r from-blue-100 to-cyan-100 border-blue-300 text-blue-800";
      default: return "bg-gradient-to-r from-green-100 to-emerald-100 border-green-300 text-green-800";
    }
  };

  return (
    <Card className="p-5 mb-4 bg-white/90 backdrop-blur-sm border border-gray-200/60 hover:shadow-lg hover:bg-white/95 transition-all duration-300 hover:scale-[1.01]">
      <div className="flex items-start gap-4">
        {/* Enhanced Avatar */}
        <div className="relative">
          <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-emerald-200 flex-shrink-0 shadow-sm">
            <ImageWithFallback
              src={friend.avatar}
              alt={`${friend.name}'s profile picture`}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center shadow-sm">
            <span className="text-xs text-white">{friend.badges.length}</span>
          </div>
        </div>

        <div className="flex-1">
          {/* Friend Info */}
          <div className="flex justify-between items-start mb-3">
            <div>
              <h4 className="text-gray-800 mb-1">{friend.name}</h4>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>${friend.totalDonated.toFixed(2)} donated</span>
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                <span>{friend.charitiesSupported.length} causes</span>
              </div>
            </div>
            <div className="px-3 py-1 bg-gradient-to-r from-emerald-100 to-green-100 rounded-full">
              <p className="text-xs text-emerald-700">{friend.badges.length} badges</p>
            </div>
          </div>

          {/* Supported Charities */}
          <div className="mb-3">
            <p className="text-xs text-gray-500 mb-2">Supporting:</p>
            <div className="flex flex-wrap gap-2">
              {friend.charitiesSupported.slice(0, 2).map((charity, index) => (
                <div key={index} className="px-2 py-1 bg-blue-50 border border-blue-200 rounded-full">
                  <p className="text-xs text-blue-700">{charity}</p>
                </div>
              ))}
              {friend.charitiesSupported.length > 2 && (
                <div className="px-2 py-1 bg-gray-50 border border-gray-200 rounded-full">
                  <p className="text-xs text-gray-600">+{friend.charitiesSupported.length - 2} more</p>
                </div>
              )}
            </div>
          </div>

          {/* Recent Badges */}
          <div>
            <p className="text-xs text-gray-500 mb-2">Recent achievements:</p>
            <div className="flex flex-wrap gap-2">
              {friend.badges.slice(0, 2).map((badge) => (
                <div
                  key={badge.id}
                  className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs border shadow-sm ${getRarityColor(badge.rarity)}`}
                >
                  <div className="w-3 h-3 rounded-full bg-white/50 flex items-center justify-center">
                    {badge.icon}
                  </div>
                  <span>{badge.name}</span>
                </div>
              ))}
              {friend.badges.length > 2 && (
                <div className="px-2 py-1 bg-gray-100 rounded-full">
                  <p className="text-xs text-gray-600">+{friend.badges.length - 2}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}