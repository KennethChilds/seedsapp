import React, { useState, useEffect } from "react";
import { Card } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";
import { Progress } from "./components/ui/progress";
import { TransactionCard } from "./components/TransactionCard";
import { CharityCard } from "./components/CharityCard";
import { CharityDetailView } from "./components/CharityDetailView";
import { StatsCard } from "./components/StatsCard";
import { FriendCard } from "./components/FriendCard";
import { IPhoneFrame } from "./components/IPhoneFrame";
import { OnboardingFlow } from "./components/OnboardingFlow";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import {
  Heart,
  DollarSign,
  TrendingUp,
  Settings,
  Home,
  Search,
  Trophy,
  User,
  Users,
  Target,
  Zap,
  Calendar,
  UserPlus,
  Gift,
  Leaf,
  Droplets,
  BookOpen,
  Shield,
  TreePine,
  Filter,
  Star,
  Lock,
  Clock,
  Ticket,
  Crown,
  Sparkles,
  Info,
  History,
  ChevronRight,
  Globe,
  RefreshCw,
  BarChart3,
  ArrowLeft,
  Bookmark,
  MapPin,
  Award,
} from "lucide-react";

// Mock data
const mockTransactions = [
  {
    id: "1",
    merchant: "Starbucks",
    amount: 4.35,
    roundUp: 0.65,
    date: "Today, 2:30 PM",
    category: "Food & Drink",
  },
  {
    id: "2",
    merchant: "Uber",
    amount: 12.8,
    roundUp: 0.2,
    date: "Today, 10:15 AM",
    category: "Transportation",
  },
  {
    id: "3",
    merchant: "Target",
    amount: 23.45,
    roundUp: 0.55,
    date: "Yesterday, 6:45 PM",
    category: "Shopping",
  },
  {
    id: "4",
    merchant: "Amazon",
    amount: 39.99,
    roundUp: 0.01,
    date: "Yesterday, 3:20 PM",
    category: "Shopping",
  },
  {
    id: "5",
    merchant: "Chipotle",
    amount: 8.75,
    roundUp: 1.25,
    date: "Yesterday, 12:30 PM",
    category: "Food & Drink",
  },
];

const mockCharities = [
  {
    id: "1",
    name: "Red Cross",
    tagline: "Help for those who need it most",
    description:
      "Providing emergency assistance, disaster relief and disaster preparedness education worldwide.",
    fullDescription: {
      mission: "The American Red Cross prevents and alleviates human suffering in the face of emergencies by mobilizing the power of volunteers and the generosity of donors.",
      impact: "Every year, we respond to nearly 60,000 disasters across the United States. From home fires to hurricanes, we help families and communities prepare, respond and recover from emergencies.",
      usage: "Your donations help us provide shelter, food, and emotional support to disaster victims. We also use funds to train volunteers and maintain emergency response capabilities nationwide."
    },
    category: "Humanitarian Aid",
    image:
      "https://images.unsplash.com/photo-1593113702251-272b1bc414a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGFyaXR5JTIwdm9sdW50ZWVyJTIwaGVscGluZ3xlbnwxfHx8fDE3NTcxOTMxNTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    logo: "🏥",
    impactStats: [
      { label: "Families helped last year", value: "157,000" },
      { label: "Volunteers nationwide", value: "19,000" },
      { label: "Disasters responded to", value: "59,000" }
    ],
    impactPerDollar: "$10 provides one night of emergency shelter",
    isSelected: true,
    colors: {
      primary: "#DC2626",
      secondary: "#FEE2E2"
    }
  },
  {
    id: "2",
    name: "World Wildlife Fund",
    tagline: "Protecting wildlife and wild places",
    description:
      "Working to conserve nature and reduce the most pressing threats to the diversity of life on Earth.",
    fullDescription: {
      mission: "WWF works to sustain the natural world for the benefit of people and wildlife, collaborating with partners from local to global levels.",
      impact: "We've helped protect over 3 million square miles of land and sea, and work in 100+ countries to tackle climate change and preserve biodiversity.",
      usage: "Donations fund conservation projects, anti-poaching efforts, and sustainable community development programs that protect both wildlife and local livelihoods."
    },
    category: "Environment",
    image:
      "https://images.unsplash.com/photo-1593702824843-303991284119?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbnZpcm9ubWVudGFsJTIwY29uc2VydmF0aW9uJTIwZm9yZXN0fGVufDF8fHx8MTc1NzE5MzE1N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    logo: "🐼",
    impactStats: [
      { label: "Species protected", value: "5,000+" },
      { label: "Countries active in", value: "100+" },
      { label: "Land & sea protected", value: "3M sq miles" }
    ],
    impactPerDollar: "$25 protects 1 acre of critical habitat",
    isSelected: false,
    colors: {
      primary: "#059669",
      secondary: "#D1FAE5"
    }
  },
  {
    id: "3",
    name: "Teach for America",
    tagline: "Educational equity for all children",
    description:
      "Growing the movement of leaders who work to ensure educational equity for all children.",
    fullDescription: {
      mission: "We recruit and develop diverse leaders to work within schools and across all sectors to ensure students have access to excellent education.",
      impact: "Our corps members and alumni teach and lead in high-need schools, reaching more than 380,000 students annually across 52 regions.",
      usage: "Your support helps us recruit, train, and support teachers in high-need communities, providing classroom resources and ongoing professional development."
    },
    category: "Education",
    image:
      "https://images.unsplash.com/photo-1599689868384-59cb2b01bb21?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZHVjYXRpb24lMjBjaGlsZHJlbiUyMGxlYXJuaW5nfGVufDF8fHx8MTc1NzE5MzE2MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    logo: "📚",
    impactStats: [
      { label: "Students reached annually", value: "380,000" },
      { label: "Active regions", value: "52" },
      { label: "Alumni in education", value: "65,000+" }
    ],
    impactPerDollar: "$50 provides school supplies for one classroom",
    isSelected: true,
    colors: {
      primary: "#7C3AED",
      secondary: "#EDE9FE"
    }
  },
  {
    id: "4",
    name: "Doctors Without Borders",
    tagline: "Emergency medical aid worldwide",
    description:
      "Providing medical care to people affected by conflict, epidemics, disasters, or exclusion from healthcare.",
    fullDescription: {
      mission: "We provide independent, impartial medical humanitarian assistance to people affected by conflict, epidemics, disasters, or exclusion from healthcare.",
      impact: "Our teams work in over 70 countries, treating more than 11 million patients each year and responding rapidly to medical emergencies worldwide.",
      usage: "Donations fund medical supplies, emergency response teams, and healthcare infrastructure in crisis zones where medical care is most needed."
    },
    category: "Healthcare",
    image:
      "https://images.unsplash.com/photo-1722235623141-86bb9b38fca1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxtZWRpY2FsJTIwaGVhbHRoY2FyZSUyMGhlbHB8ZW58MXx8fHwxNzU3MTkzMTY0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    logo: "🩺",
    impactStats: [
      { label: "Patients treated yearly", value: "11M+" },
      { label: "Countries with projects", value: "70+" },
      { label: "Medical staff deployed", value: "45,000" }
    ],
    impactPerDollar: "$35 provides essential medicines for one patient",
    isSelected: false,
    colors: {
      primary: "#DC2626",
      secondary: "#FEE2E2"
    }
  },
];

const mockFriends = [
  {
    id: "1",
    name: "Sarah Chen",
    avatar:
      "https://images.unsplash.com/photo-1589220286904-3dcef62c68ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHdvbWFuJTIwcHJvZmVzc2lvbmFsJTIwaGVhZHNob3R8ZW58MXx8fHwxNzU3MTE5ODYwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    totalDonated: 127.5,
    charitiesSupported: [
      "Red Cross",
      "World Wildlife Fund",
      "Local Food Bank",
    ],
    badges: [
      {
        id: "b1",
        name: "First $100",
        description: "Donated your first $100",
        icon: <Trophy className="w-3 h-3" />,
        rarity: "epic" as const,
        earnedDate: "2024-08-15",
      },
      {
        id: "b2",
        name: "Tree Hugger",
        description: "Supported environmental causes",
        icon: <Heart className="w-3 h-3" />,
        rarity: "rare" as const,
        earnedDate: "2024-08-20",
      },
      {
        id: "b3",
        name: "Early Bird",
        description: "First 100 users on seeds",
        icon: <Zap className="w-3 h-3" />,
        rarity: "legendary" as const,
        earnedDate: "2024-07-01",
      },
    ],
    joinedDate: "2024-07-01",
  },
  {
    id: "2",
    name: "Alex Rivera",
    avatar:
      "https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMG1hbiUyMHByb2Zlc3Npb25hbCUyMHBvcnRyYWl0fGVufDF8fHx8MTc1NzE5OTM4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    totalDonated: 89.25,
    charitiesSupported: [
      "Doctors Without Borders",
      "Teach for America",
    ],
    badges: [
      {
        id: "b4",
        name: "Helping Hands",
        description: "Donated to healthcare charities",
        icon: <Heart className="w-3 h-3" />,
        rarity: "rare" as const,
        earnedDate: "2024-08-10",
      },
      {
        id: "b5",
        name: "Streak Master",
        description: "7 days of continuous donations",
        icon: <Target className="w-3 h-3" />,
        rarity: "epic" as const,
        earnedDate: "2024-08-25",
      },
    ],
    joinedDate: "2024-07-15",
  },
  {
    id: "3",
    name: "Maya Patel",
    avatar:
      "https://images.unsplash.com/photo-1718965018802-897e94ce7f15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBvcnRyYWl0JTIwY2FzdWFsJTIwZnJpZW5kbHl8ZW58MXx8fHwxNzU3MTk5Mzg5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    totalDonated: 45.75,
    charitiesSupported: [
      "Red Cross",
      "Teach for America",
      "Animal Shelter",
      "Local Library",
    ],
    badges: [
      {
        id: "b6",
        name: "First Dollar",
        description: "Made your first donation",
        icon: <DollarSign className="w-3 h-3" />,
        rarity: "common" as const,
        earnedDate: "2024-08-01",
      },
      {
        id: "b7",
        name: "Community Hero",
        description: "Supporting 4+ charities",
        icon: <UserPlus className="w-3 h-3" />,
        rarity: "epic" as const,
        earnedDate: "2024-08-22",
      },
      {
        id: "b8",
        name: "Month One",
        description: "Active for one month",
        icon: <Calendar className="w-3 h-3" />,
        rarity: "rare" as const,
        earnedDate: "2024-09-01",
      },
    ],
    joinedDate: "2024-08-01",
  },
  {
    id: "4",
    name: "Jordan Kim",
    avatar:
      "https://images.unsplash.com/photo-1755519024555-a660fefc8dc3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwb3J0cmFpdCUyMGNhc3VhbCUyMHNtaWxpbmd8ZW58MXx8fHwxNzU3MTk5Mzg5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    totalDonated: 156.8,
    charitiesSupported: [
      "World Wildlife Fund",
      "Ocean Cleanup",
    ],
    badges: [
      {
        id: "b9",
        name: "Green Warrior",
        description: "Champion of environmental causes",
        icon: <Heart className="w-3 h-3" />,
        rarity: "legendary" as const,
        earnedDate: "2024-08-18",
      },
      {
        id: "b10",
        name: "Big Spender",
        description: "Donated over $150",
        icon: <Trophy className="w-3 h-3" />,
        rarity: "epic" as const,
        earnedDate: "2024-08-28",
      },
    ],
    joinedDate: "2024-07-10",
  },
];

const charityCategories = [
  {
    id: "all",
    name: "All",
    icon: <Heart className="w-4 h-4" />,
  },
  {
    id: "environment",
    name: "Environment",
    icon: <TreePine className="w-4 h-4" />,
  },
  {
    id: "education",
    name: "Education",
    icon: <BookOpen className="w-4 h-4" />,
  },
  {
    id: "healthcare",
    name: "Healthcare",
    icon: <Shield className="w-4 h-4" />,
  },
  {
    id: "humanitarian",
    name: "Aid",
    icon: <Droplets className="w-4 h-4" />,
  },
];

// Monthly Raffle system data
const currentRaffle = {
  id: "monthly-raffle-001",
  title: "Monthly Raffle",
  subtitle: "Give to enter. Win to give more.",
  prizePool: 1428.12,
  description: "This will be awarded to one donor as Seeds Balance",
  endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
  totalEntries: 2847,
  userEntries: 4,
  isActive: true,
  nextMilestone: 5, // Next entry milestone
  entriesUntilMilestone: 1, // $5 more needed for next entry
};

// Sponsored Rewards data
const sponsoredRewards = [
  {
    id: "reward-001",
    sponsor: {
      name: "EarthSupply",
      logo: "🌱", // Using emoji for demo, would be actual logo
    },
    title: "20% Off Eco Apparel",
    description: "Sustainable clothing made from organic materials and recycled fibers.",
    eligibility: "Unlocked with 1 Entry",
    isUnlocked: true,
    badges: ["NEW"],
    ctaText: "Claim Discount",
  },
  {
    id: "reward-002", 
    sponsor: {
      name: "KindBean Coffee",
      logo: "☕", 
    },
    title: "Free Sample Bag with Purchase",
    description: "Ethically sourced coffee beans that support farming communities worldwide.",
    eligibility: "Free for all participants",
    isUnlocked: true,
    badges: ["LIMITED"],
    ctaText: "Get Sample",
  },
  {
    id: "reward-003",
    sponsor: {
      name: "TrailMate Gear", 
      logo: "🎒",
    },
    title: "Entry into $250 Giveaway",
    description: "Win premium outdoor equipment perfect for your next adventure.",
    eligibility: "Unlocked with 3 Entries",
    isUnlocked: currentRaffle.userEntries >= 3,
    badges: ["EXCLUSIVE"],
    ctaText: "Enter Giveaway",
  },
  {
    id: "reward-004",
    sponsor: {
      name: "GreenTech",
      logo: "🔋",
    },
    title: "15% Off Solar Chargers",
    description: "Portable renewable energy solutions for eco-conscious consumers.",
    eligibility: "Unlocked with 2 Entries", 
    isUnlocked: currentRaffle.userEntries >= 2,
    badges: [],
    ctaText: "Shop Now",
  },
];

const pastWinners = [
  {
    id: "winner-001",
    month: "November 2024",
    winner: {
      name: "Sarah Chen",
      avatar:
        "https://images.unsplash.com/photo-1589220286904-3dcef62c68ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHdvbWFuJTIwcHJvZmVzc2lvbmFsJTIwaGVhZHNob3R8ZW58MXx8fHwxNzU3MTE5ODYwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    amountWon: 1245.67,
    charitiesSupported: [
      "Red Cross",
      "Local Food Bank", 
      "Children's Hospital"
    ],
    totalEntries: 2341,
  },
  {
    id: "winner-002", 
    month: "October 2024",
    winner: {
      name: "Alex Rivera",
      avatar:
        "https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMG1hbiUyMHByb2Zlc3Npb25hbCUyMHBvcnRyYWl0fGVufDF8fHx8MTc1NzE5OTM4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    amountWon: 892.34,
    charitiesSupported: [
      "World Wildlife Fund",
      "Ocean Cleanup"
    ],
    totalEntries: 1876,
  },
  {
    id: "winner-003",
    month: "September 2024", 
    winner: {
      name: "Maya Patel",
      avatar:
        "https://images.unsplash.com/photo-1718965018802-897e94ce7f15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBvcnRyYWl0JTIwY2FzdWFsJTIwZnJpZW5kbHl8ZW58MXx8fHwxNzU3MTk5Mzg5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    amountWon: 756.89,
    charitiesSupported: [
      "Teach for America",
      "Local Library",
      "Animal Shelter"
    ],
    totalEntries: 1542,
  },
];

// Badge system data
const allBadges = [
  {
    id: "b1",
    name: "First Dollar",
    description: "Made your first donation",
    icon: <DollarSign className="w-6 h-6" />,
    rarity: "common" as const,
    isUnlocked: true,
    progress: 100,
  },
  {
    id: "b2",
    name: "Goal Setter",
    description: "Set your first monthly goal",
    icon: <Target className="w-6 h-6" />,
    rarity: "common" as const,
    isUnlocked: true,
    progress: 100,
  },
  {
    id: "b3",
    name: "Kind Heart",
    description: "Donated for 7 consecutive days",
    icon: <Heart className="w-6 h-6" />,
    rarity: "rare" as const,
    isUnlocked: true,
    progress: 100,
  },
  {
    id: "b4",
    name: "Lucky Winner",
    description: "Won a raffle prize",
    icon: <Trophy className="w-6 h-6" />,
    rarity: "epic" as const,
    isUnlocked: false,
    progress: 0,
  },
  {
    id: "b5",
    name: "Tree Hugger",
    description: "Supported 3 environmental causes",
    icon: <TreePine className="w-6 h-6" />,
    rarity: "rare" as const,
    isUnlocked: false,
    progress: 67,
  },
  {
    id: "b6",
    name: "Champion",
    description: "Donated $500 total",
    icon: <Star className="w-6 h-6" />,
    rarity: "legendary" as const,
    isUnlocked: false,
    progress: 8,
  },
];

// Community data
const initialCommunityTotal = 218473.82;
const initialTotalDonations = 38247;
const communityGoal = 250000;

export default function App() {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [activeTab, setActiveTab] = useState("home");
  const [charities, setCharities] = useState(mockCharities);
  const [selectedCategory, setSelectedCategory] =
    useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [autoRoundUp, setAutoRoundUp] = useState(true);
  const [showImpactReport, setShowImpactReport] =
    useState(false);
  const [communityTotal, setCommunityTotal] = useState(
    initialCommunityTotal,
  );
  const [totalDonations, setTotalDonations] = useState(
    initialTotalDonations,
  );
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [seedsBalance, setSeedsBalance] = useState(0.00); // User's Seeds Balance
  const [selectedCharity, setSelectedCharity] = useState(null); // For charity detail view

  const totalDonated = mockTransactions.reduce(
    (sum, transaction) => sum + transaction.roundUp,
    0,
  );
  const selectedCharities = charities.filter(
    (charity) => charity.isSelected,
  );

  const handleCharityToggle = (charityId: string) => {
    setCharities((prev) =>
      prev.map((charity) =>
        charity.id === charityId
          ? { ...charity, isSelected: !charity.isSelected }
          : charity,
      ),
    );
  };

  const handleToggleAutoRoundUp = () => {
    setAutoRoundUp(!autoRoundUp);
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
  };

  const handleCharityClick = (charity) => {
    setSelectedCharity(charity);
  };

  const handleBackToDiscover = () => {
    setSelectedCharity(null);
  };

  // Raffle helper functions
  const getTimeLeft = (endDate: Date) => {
    const now = new Date();
    const diff = endDate.getTime() - now.getTime();

    if (diff <= 0) return "Ended";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );

    if (days > 0) return `${days}d ${hours}h left`;
    return `${hours}h left`;
  };

  const getWinProbability = (
    userEntries: number,
    totalEntries: number,
  ) => {
    if (totalEntries === 0) return 0;
    return ((userEntries / totalEntries) * 100).toFixed(2);
  };

  // Community total live update effect
  useEffect(() => {
    if (activeTab !== "home") return;

    const interval = setInterval(() => {
      // Simulate live donations coming in (small random increments)
      const increment = Math.random() * 25 + 5; // $5-30 random increments
      const donationIncrement = Math.random() < 0.3 ? 1 : 0; // 30% chance of new donation

      setCommunityTotal((prev) => prev + increment);
      setTotalDonations((prev) => prev + donationIncrement);
      setLastUpdated(new Date());
    }, 8000); // Update every 8 seconds

    return () => clearInterval(interval);
  }, [activeTab]);

  // Format community total with smooth animation
  const formatCommunityTotal = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatTotalDonations = (count: number) => {
    return new Intl.NumberFormat("en-US").format(count);
  };

  const getCommunityProgress = () => {
    return Math.min(
      (communityTotal / communityGoal) * 100,
      100,
    );
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "legendary":
        return "from-yellow-400 to-amber-500";
      case "epic":
        return "from-purple-400 to-violet-500";
      case "rare":
        return "from-blue-400 to-cyan-500";
      default:
        return "from-green-400 to-emerald-500";
    }
  };

  const getRarityBg = (rarity: string, isUnlocked: boolean) => {
    if (!isUnlocked) return "bg-gray-200 border-gray-300";
    switch (rarity) {
      case "legendary":
        return "bg-gradient-to-br from-yellow-100 to-amber-100 border-yellow-300";
      case "epic":
        return "bg-gradient-to-br from-purple-100 to-violet-100 border-purple-300";
      case "rare":
        return "bg-gradient-to-br from-blue-100 to-cyan-100 border-blue-300";
      default:
        return "bg-gradient-to-br from-green-100 to-emerald-100 border-green-300";
    }
  };

  const filteredCharities = charities.filter((charity) => {
    const matchesCategory = selectedCategory === "all" || 
      charity.category.toLowerCase().includes(selectedCategory.toLowerCase());
    
    const matchesSearch = searchQuery === "" || 
      charity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      charity.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      charity.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  if (showOnboarding) {
    return (
      <IPhoneFrame>
        <OnboardingFlow onComplete={handleOnboardingComplete} />
      </IPhoneFrame>
    );
  }

  return (
    <IPhoneFrame>
      <div className="h-full bg-gradient-to-b from-green-50/50 via-background to-background flex flex-col relative overflow-hidden">
        {/* Subtle Background Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] z-0"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1709668158987-fa2714cd89e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdWJ0bGUlMjBuYXR1cmUlMjBwYXR0ZXJuJTIwbGVhdmVzJTIwdGV4dHVyZSUyMGJhY2tncm91bmR8ZW58MXx8fHwxNzU3MjAwNzQwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`,
            backgroundSize: "200px 200px",
            backgroundRepeat: "repeat",
          }}
        />

        {/* Status Bar */}
        <div className="bg-transparent px-6 pt-14 pb-2 relative z-10">
          <div className="flex justify-between items-center text-xs text-foreground">
            <span>9:41</span>
            <div className="flex gap-1">
              <div className="w-4 h-2 bg-foreground rounded-sm opacity-80"></div>
              <div className="w-1 h-2 bg-foreground rounded-sm opacity-60"></div>
              <div className="w-6 h-2 bg-foreground rounded-sm"></div>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="px-6 pb-4 relative z-10">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl text-emerald-800">
                seeds
              </h1>
            </div>
            <Badge
              variant="secondary"
              className="text-xs bg-emerald-100 text-emerald-700 border-emerald-200"
            >
              {selectedCharities.length} charities
            </Badge>
          </div>
          {activeTab === "home" && (
            <p className="text-sm text-muted-foreground">
              Good morning! Your spare change is making a
              difference 🌱
            </p>
          )}
          {activeTab === "raffle" && (
            <p className="text-sm text-muted-foreground">
              You have {currentRaffle.userEntries} entries in
              this month's raffle! 🎟️
            </p>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 px-6 overflow-y-auto scrollbar-hide relative z-10">
          {activeTab === "home" && (
            <div className="mt-0 animate-in fade-in-50 duration-200 space-y-6">
              {/* Enhanced Stats Overview */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-5 bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200/50 shadow-sm flex flex-col">
                  <div className="flex items-start gap-3 mb-2 flex-1">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Heart className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-emerald-600 mb-1 leading-tight">
                        Total Impact
                      </p>
                      <p className="text-xl text-emerald-800 leading-tight">
                        ${totalDonated.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-emerald-600/70 mt-auto">
                    This month
                  </p>
                </Card>

                <Card className="p-5 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200/50 shadow-sm flex flex-col">
                  <div className="flex items-start gap-3 mb-2 flex-1">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-blue-600 mb-1 leading-tight">
                        Round-ups
                      </p>
                      <p className="text-xl text-blue-800 leading-tight">
                        {mockTransactions.length}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-blue-600/70 mt-auto">
                    This week
                  </p>
                </Card>
              </div>

              {/* Community Total Section */}
              <Card className="p-6 bg-gradient-to-br from-lime-50 via-emerald-50 to-green-50 border-lime-200/50 shadow-md overflow-hidden relative">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-emerald-400/20 to-green-400/20 rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-br from-green-400/20 to-teal-400/20 rounded-full blur-2xl"></div>

                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 via-green-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-300/40 via-green-400/30 to-teal-500/40 rounded-full"></div>
                        <Globe className="w-6 h-6 text-white relative z-10" />
                      </div>
                      <div>
                        <h3 className="text-lg text-emerald-800 mb-1">
                          Together We've Raised
                        </h3>
                        <div className="flex items-center gap-2">
                          <RefreshCw className="w-3 h-3 text-emerald-600/60 animate-spin" />
                          <span className="text-xs text-emerald-600/70">
                            Updates every few seconds
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center mb-5">
                    <div className="mb-2">
                      <p className="text-4xl text-emerald-800 transition-all duration-1000 ease-out">
                        {formatCommunityTotal(communityTotal)}
                      </p>
                      <p className="text-sm text-emerald-600/80 mt-1">
                        Raised by Seeds users so far
                      </p>
                    </div>

                    <div className="flex items-center justify-center gap-4 text-xs text-emerald-600/70 mb-4">
                      <div className="flex items-center gap-1">
                        <BarChart3 className="w-3 h-3" />
                        <span>
                          Over{" "}
                          {formatTotalDonations(totalDonations)}{" "}
                          donations made
                        </span>
                      </div>
                      <span>•</span>
                      <span>
                        Last updated:{" "}
                        {lastUpdated.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center justify-between text-xs text-emerald-600/80 mb-2">
                        <span>Progress to $250K goal</span>
                        <span>
                          {getCommunityProgress().toFixed(1)}%
                        </span>
                      </div>
                      <div className="w-full bg-emerald-200/40 rounded-full h-3 overflow-hidden shadow-inner">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-400 via-green-500 to-teal-600 rounded-full transition-all duration-1000 ease-out relative shadow-sm"
                          style={{
                            width: `${getCommunityProgress()}%`,
                          }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-emerald-300/30 via-green-400/20 to-teal-400/30 rounded-full"></div>
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse rounded-full"></div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3 mb-4">
                      <div className="text-center p-3 bg-white/60 rounded-xl border border-white/40">
                        <p className="text-lg text-emerald-700">
                          847
                        </p>
                        <p className="text-xs text-emerald-600/80">
                          Communities helped
                        </p>
                      </div>
                      <div className="text-center p-3 bg-white/60 rounded-xl border border-white/40">
                        <p className="text-lg text-emerald-700">
                          12.4K
                        </p>
                        <p className="text-xs text-emerald-600/80">
                          Active users
                        </p>
                      </div>
                      <div className="text-center p-3 bg-white/60 rounded-xl border border-white/40">
                        <p className="text-lg text-emerald-700">
                          156
                        </p>
                        <p className="text-xs text-emerald-600/80">
                          Partner charities
                        </p>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs hover:bg-emerald-50 transition-all duration-200 hover:scale-105 border-emerald-300 text-emerald-700 hover:shadow-md"
                    >
                      <Sparkles className="w-3 h-3 mr-1" />
                      View Global Impact
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Enhanced Impact Summary */}
              <Card className="p-6 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 border-emerald-200/50 shadow-sm">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg text-emerald-800 mb-1">
                      Your Growing Impact
                    </h3>
                    <p className="text-sm text-emerald-600/80 mb-4">
                      Every small donation plants seeds of hope
                      in communities worldwide
                    </p>

                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="text-center p-3 bg-white/60 rounded-xl border border-white/40">
                        <p className="text-2xl text-emerald-700">
                          12
                        </p>
                        <p className="text-xs text-emerald-600/80">
                          Meals provided
                        </p>
                      </div>
                      <div className="text-center p-3 bg-white/60 rounded-xl border border-white/40">
                        <p className="text-2xl text-emerald-700">
                          3
                        </p>
                        <p className="text-xs text-emerald-600/80">
                          Trees planted
                        </p>
                      </div>
                    </div>

                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs hover:bg-emerald-100 transition-all duration-200 border-emerald-300 text-emerald-700 hover:shadow-md"
                    >
                      View Full Report
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Next Goal Progress */}
              <Card className="p-5 bg-gradient-to-br from-violet-50 to-purple-50 border-violet-200/50 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-violet-400 to-purple-600 rounded-full flex items-center justify-center">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm text-violet-800 mb-1">
                      Next Badge: First $100
                    </h3>
                    <div className="flex items-center gap-2">
                      <Progress
                        value={42}
                        className="flex-1 h-2"
                      />
                      <span className="text-xs text-violet-600">
                        $42 / $100
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-violet-600/70">
                  Keep donating to unlock your epic badge!
                </p>
              </Card>

              {/* Recent Activity */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg text-gray-800">
                    Recent Activity
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs text-emerald-600 hover:bg-emerald-50 transition-colors"
                    onClick={() => setActiveTab("discover")}
                  >
                    View All
                  </Button>
                </div>

                <div className="space-y-0">
                  {mockTransactions
                    .slice(0, 3)
                    .map((transaction) => (
                      <TransactionCard
                        key={transaction.id}
                        transaction={transaction}
                      />
                    ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "discover" && (
            <div className="mt-0 animate-in fade-in-50 duration-200 space-y-6">
              <div>
                <h3 className="text-lg text-gray-800 mb-2">
                  Discover Causes
                </h3>
                <p className="text-sm text-muted-foreground">
                  Find organizations making the world a better
                  place
                </p>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search charities, causes, or categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 shadow-sm hover:shadow-md"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-gray-50 rounded-r-xl transition-colors duration-200"
                  >
                    <span className="h-4 w-4 text-gray-400 hover:text-gray-600">✕</span>
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                {charityCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      setSelectedCategory(category.id);
                      // Clear search when changing categories for better UX
                      if (searchQuery) setSearchQuery("");
                    }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs transition-all duration-200 flex-shrink-0 ${
                      selectedCategory === category.id
                        ? "bg-emerald-600 text-white shadow-md"
                        : "bg-white border border-gray-200 text-gray-600 hover:bg-emerald-50 hover:border-emerald-200"
                    }`}
                  >
                    {category.icon}
                    {category.name}
                  </button>
                ))}
              </div>

              {/* Results Summary */}
              {(searchQuery || selectedCategory !== "all") && (
                <div className="flex items-center justify-between text-sm text-gray-600 bg-gray-50 rounded-lg px-4 py-2">
                  <span>
                    {filteredCharities.length} result{filteredCharities.length !== 1 ? 's' : ''} found
                    {searchQuery && ` for "${searchQuery}"`}
                    {selectedCategory !== "all" && ` in ${charityCategories.find(c => c.id === selectedCategory)?.name}`}
                  </span>
                  {(searchQuery || selectedCategory !== "all") && (
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedCategory("all");
                      }}
                      className="text-emerald-600 hover:text-emerald-700 transition-colors duration-200"
                    >
                      Clear filters
                    </button>
                  )}
                </div>
              )}

              {/* Show charity detail or charity list */}
              {selectedCharity ? (
                // Charity Detail View
                <CharityDetailView
                  selectedCharity={selectedCharity}
                  charities={charities}
                  onBackToDiscover={handleBackToDiscover}
                  onCharityToggle={handleCharityToggle}
                />
              ) : (
                // Charity List View
                <div className="space-y-0">
                  {filteredCharities.length > 0 ? (
                    filteredCharities.map((charity) => (
                      <div key={charity.id} onClick={() => handleCharityClick(charity)}>
                        <CharityCard
                          charity={charity}
                          onToggle={handleCharityToggle}
                          clickable={true}
                        />
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Search className="w-8 h-8 text-gray-400" />
                      </div>
                      <h4 className="text-gray-800 mb-2">No charities found</h4>
                      <p className="text-sm text-gray-600 mb-4">
                        {searchQuery 
                          ? `No charities match "${searchQuery}". Try a different search term.`
                          : `No charities found in the ${charityCategories.find(c => c.id === selectedCategory)?.name} category.`
                        }
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSearchQuery("");
                          setSelectedCategory("all");
                        }}
                        className="text-emerald-600 border-emerald-300 hover:bg-emerald-50"
                      >
                        View all charities
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === "raffle" && (
            <div className="mt-0 animate-in fade-in-50 duration-200 space-y-6">
              <div>
                <h3 className="text-lg text-gray-800 mb-2">
                  Monthly Raffle
                </h3>
                <p className="text-sm text-muted-foreground">
                  Give to enter. Win to give more.
                </p>
              </div>

              {/* Prize Pool Display */}
              <Card className="p-6 bg-gradient-to-br from-pink-50 via-purple-50 to-violet-50 border-pink-200/50 shadow-lg overflow-hidden relative">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-pink-400/20 to-purple-400/20 rounded-full blur-xl"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-br from-purple-400/20 to-violet-400/20 rounded-full blur-xl"></div>

                <div className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg text-pink-800 mb-1">
                        Monthly Prize Pool
                      </h3>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-pink-600" />
                        <span className="text-sm text-pink-600">
                          {getTimeLeft(currentRaffle.endDate)} to enter
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-center mb-6">
                    <div className="mb-3">
                      <p className="text-4xl text-pink-800 mb-2">
                        ${currentRaffle.prizePool.toFixed(2)}
                      </p>
                      <p className="text-sm text-pink-600/80">
                        {currentRaffle.description}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="text-center p-3 bg-white/60 rounded-xl border border-white/40">
                      <p className="text-2xl text-pink-700">
                        {currentRaffle.userEntries}
                      </p>
                      <p className="text-xs text-pink-600/80">
                        Your entries
                      </p>
                    </div>
                    <div className="text-center p-3 bg-white/60 rounded-xl border border-white/40">
                      <p className="text-2xl text-pink-700">
                        {getWinProbability(
                          currentRaffle.userEntries,
                          currentRaffle.totalEntries,
                        )}%
                      </p>
                      <p className="text-xs text-pink-600/80">
                        Win chance
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Sponsored Rewards Section */}
              <div>
                <div className="mb-4">
                  <h4 className="text-lg text-gray-800 mb-1">
                    Sponsored Rewards
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Extra perks from our partners — just for participating
                  </p>
                </div>

                <div className="space-y-3">
                  {sponsoredRewards.map((reward) => (
                    <Card
                      key={reward.id}
                      className={`p-4 overflow-hidden relative transition-all duration-200 hover:shadow-md ${
                        reward.isUnlocked
                          ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200/50 shadow-sm"
                          : "bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200/50 opacity-75"
                      }`}
                    >
                      {/* Background decoration */}
                      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-green-400/10 to-emerald-400/10 rounded-full blur-xl"></div>
                      
                      <div className="relative">
                        <div className="flex items-start gap-3 mb-3">
                          {/* Sponsor logo */}
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                            reward.isUnlocked 
                              ? "bg-gradient-to-br from-green-100 to-emerald-100 border border-green-200" 
                              : "bg-gray-100 border border-gray-200"
                          }`}>
                            <span className="text-xl">{reward.sponsor.logo}</span>
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <div>
                                <h5 className={`mb-1 ${
                                  reward.isUnlocked ? "text-green-800" : "text-gray-600"
                                }`}>
                                  {reward.title}
                                </h5>
                                <p className={`text-xs mb-2 ${
                                  reward.isUnlocked ? "text-green-600/80" : "text-gray-500"
                                }`}>
                                  by {reward.sponsor.name}
                                </p>
                              </div>
                              
                              {/* Badges */}
                              <div className="flex flex-wrap gap-1">
                                {reward.badges.map((badge, index) => (
                                  <Badge
                                    key={index}
                                    variant="outline"
                                    className={`text-xs px-2 py-0.5 ${
                                      badge === "NEW" 
                                        ? "bg-blue-100 text-blue-700 border-blue-300"
                                        : badge === "LIMITED"
                                        ? "bg-orange-100 text-orange-700 border-orange-300"
                                        : badge === "EXCLUSIVE"
                                        ? "bg-purple-100 text-purple-700 border-purple-300"
                                        : "bg-green-100 text-green-700 border-green-300"
                                    }`}
                                  >
                                    {badge}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            
                            <p className={`text-xs mb-3 leading-relaxed ${
                              reward.isUnlocked ? "text-green-600/70" : "text-gray-500"
                            }`}>
                              {reward.description}
                            </p>
                            
                            {/* Eligibility and CTA */}
                            <div className="flex items-center justify-between gap-3">
                              <div className="flex items-center gap-2">
                                {reward.isUnlocked ? (
                                  <div className="flex items-center gap-1">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span className="text-xs text-green-600">
                                      {reward.eligibility}
                                    </span>
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-1">
                                    <Lock className="w-3 h-3 text-gray-400" />
                                    <span className="text-xs text-gray-500">
                                      {reward.eligibility}
                                    </span>
                                  </div>
                                )}
                              </div>
                              
                              <Button
                                size="sm"
                                disabled={!reward.isUnlocked}
                                className={`text-xs px-3 py-1.5 transition-all duration-200 ${
                                  reward.isUnlocked
                                    ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-sm hover:shadow-md hover:scale-105"
                                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                }`}
                              >
                                {reward.isUnlocked ? (
                                  <>
                                    <ChevronRight className="w-3 h-3 mr-1" />
                                    {reward.ctaText}
                                  </>
                                ) : (
                                  <>
                                    <Lock className="w-3 h-3 mr-1" />
                                    Locked
                                  </>
                                )}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                {/* Disclaimer */}
                <div className="mt-4 p-3 bg-gray-50/80 rounded-lg border border-gray-200/50">
                  <p className="text-xs text-gray-600/80 text-center">
                    Powered by our trusted partners • Terms and conditions apply • 
                    Rewards subject to availability
                  </p>
                </div>
              </div>

              {/* Seeds Balance Card */}
              <Card className="p-6 bg-gradient-to-br from-teal-50 via-emerald-50 to-green-50 border-teal-200/50 shadow-lg overflow-hidden relative">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-teal-400/20 to-emerald-400/20 rounded-full blur-xl"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-br from-emerald-400/20 to-green-400/20 rounded-full blur-xl"></div>

                <div className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-teal-500 via-emerald-500 to-green-600 rounded-full flex items-center justify-center shadow-lg relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-teal-300/40 via-emerald-400/30 to-green-500/40 rounded-full"></div>
                      <div className="relative z-10 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center shadow-sm">
                        <DollarSign className="w-4 h-4 text-green-800" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg text-teal-800 mb-1">
                        Your Seeds Balance
                      </h3>
                      <p className="text-xs text-teal-600/80">
                        Available for charitable donations
                      </p>
                    </div>
                  </div>

                  <div className="text-center mb-4">
                    <p className="text-3xl text-teal-800 mb-2">
                      ${seedsBalance.toFixed(2)}
                    </p>
                    <p className="text-sm text-teal-600/80 mb-4">
                      Can only be donated to charities inside Seeds
                    </p>
                    
                    {seedsBalance > 0 ? (
                      <Button
                        className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
                        onClick={() => setActiveTab("discover")}
                      >
                        <Heart className="w-4 h-4 mr-2" />
                        Donate Now
                      </Button>
                    ) : (
                      <div className="text-center">
                        <p className="text-xs text-teal-600/70 mb-3">
                          Win Seeds Balance through our monthly raffle!
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs border-teal-300 text-teal-700 hover:bg-teal-50"
                          onClick={() => setActiveTab("raffle")}
                        >
                          <Gift className="w-3 h-3 mr-1" />
                          Enter Raffle
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </Card>

              {/* User Entry Tracker */}
              <Card className="p-5 bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200/50 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-600 rounded-full flex items-center justify-center">
                    <Ticket className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-blue-800 mb-1">
                      You have {currentRaffle.userEntries} entries this month
                    </h4>
                    <p className="text-xs text-blue-600/80">
                      ${currentRaffle.entriesUntilMilestone * 5} more to earn your next entry
                    </p>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs text-blue-600/80 mb-2">
                    <span>Progress to next entry</span>
                    <span>
                      {currentRaffle.userEntries}/{currentRaffle.nextMilestone}
                    </span>
                  </div>
                  <Progress 
                    value={(currentRaffle.userEntries / currentRaffle.nextMilestone) * 100} 
                    className="h-3"
                  />
                  <p className="text-xs text-blue-600/70 mt-1">
                    Entries reset each month
                  </p>
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
                  onClick={() => setActiveTab("discover")}
                >
                  <Gift className="w-4 h-4 mr-2" />
                  Donate to Earn More
                </Button>
              </Card>

              {/* How It Works */}
              <Card className="p-5 bg-gradient-to-r from-purple-50 to-violet-50 border-purple-200/50 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-violet-600 rounded-full flex items-center justify-center">
                    <Info className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-purple-800 mb-1">
                      How it works
                    </h4>
                    <p className="text-xs text-purple-600/80">
                      Simple and transparent
                    </p>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs text-white">•</span>
                    </div>
                    <p className="text-sm text-purple-700">
                      Every $5 donated = 1 raffle entry
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs text-white">•</span>
                    </div>
                    <p className="text-sm text-purple-700">
                      A portion of each donation is added to the monthly prize pool
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs text-white">•</span>
                    </div>
                    <p className="text-sm text-purple-700">
                      1 user is selected monthly
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs text-white">•</span>
                    </div>
                    <p className="text-sm text-purple-700">
                      Winner receives the pool as Seeds Balance
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs text-white">•</span>
                    </div>
                    <p className="text-sm text-purple-700">
                      Seeds Balance can only be used to support charities inside the app
                    </p>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs border-purple-300 text-purple-700 hover:bg-purple-50"
                >
                  View Full Rules
                </Button>
              </Card>

              {/* Past Winners */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-gray-800">
                    Past Winners
                  </h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs text-emerald-600 hover:bg-emerald-50 transition-colors"
                  >
                    <History className="w-3 h-3 mr-1" />
                    View All
                  </Button>
                </div>

                <div className="space-y-3">
                  {pastWinners.map((winner) => (
                    <Card
                      key={winner.id}
                      className="p-4 bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200/50 shadow-sm hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-amber-300 flex-shrink-0">
                          <ImageWithFallback
                            src={winner.winner.avatar}
                            alt={winner.winner.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h5 className="text-amber-800">
                              {winner.winner.name}
                            </h5>
                            <Crown className="w-4 h-4 text-amber-600" />
                          </div>
                          <p className="text-xs text-amber-600 mb-1">
                            {winner.month} • Won ${winner.amountWon.toFixed(2)}
                          </p>
                          <p className="text-xs text-amber-600/70">
                            1 in {winner.totalEntries.toLocaleString()} chance
                          </p>
                        </div>
                      </div>
                      
                      <div className="ml-15">
                        <p className="text-xs text-amber-700 mb-2">
                          Charities they chose to support:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {winner.charitiesSupported.map((charity, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs bg-amber-100/50 text-amber-700 border-amber-300"
                            >
                              {charity}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Social Sharing */}
              <Card className="p-5 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200/50 text-center shadow-sm">
                <Users className="w-10 h-10 text-green-600 mx-auto mb-3" />
                <h4 className="text-green-800 mb-1">
                  Tell friends to increase the pool
                </h4>
                <p className="text-xs text-green-600/80 mb-4">
                  The more people who donate, the bigger the monthly prize pool becomes!
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs hover:bg-green-50 transition-all duration-200 hover:scale-105 border-green-300 text-green-700 hover:shadow-md"
                >
                  <Sparkles className="w-3 h-3 mr-1" />
                  Share with Friends
                </Button>
              </Card>
            </div>
          )}

          {activeTab === "friends" && (
            <div className="mt-0 animate-in fade-in-50 duration-200 space-y-6">
              <div>
                <h3 className="text-lg text-gray-800 mb-2">
                  Friends & Community
                </h3>
                <p className="text-sm text-muted-foreground">
                  Connect with friends and share your impact
                  together
                </p>
              </div>

              {/* Community Stats */}
              <Card className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200/50 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg text-blue-800 mb-1">
                      Your Impact Network
                    </h3>
                    <p className="text-sm text-blue-600/80">
                      Together, you've donated $419.55 this
                      month
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center p-3 bg-white/60 rounded-xl border border-white/40">
                    <p className="text-lg text-blue-700">
                      {mockFriends.length}
                    </p>
                    <p className="text-xs text-blue-600/80">
                      Friends
                    </p>
                  </div>
                  <div className="text-center p-3 bg-white/60 rounded-xl border border-white/40">
                    <p className="text-lg text-blue-700">8</p>
                    <p className="text-xs text-blue-600/80">
                      Shared causes
                    </p>
                  </div>
                  <div className="text-center p-3 bg-white/60 rounded-xl border border-white/40">
                    <p className="text-lg text-blue-700">42</p>
                    <p className="text-xs text-blue-600/80">
                      Group badges
                    </p>
                  </div>
                </div>
              </Card>

              {/* Invite Friends */}
              <Card className="p-5 bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200/50 text-center shadow-sm">
                <UserPlus className="w-10 h-10 text-emerald-600 mx-auto mb-3" />
                <h4 className="text-emerald-800 mb-1">
                  Invite Friends
                </h4>
                <p className="text-xs text-emerald-600/80 mb-4">
                  Share the impact! Invite friends to join seeds
                  and donate together. Every friend you invite
                  gets a $5 bonus donation.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs hover:bg-emerald-50 transition-all duration-200 hover:scale-105 border-emerald-300 text-emerald-700 hover:shadow-md"
                >
                  Share Invite Link
                </Button>
              </Card>

              {/* Friends List */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-gray-800">
                    Your Friends
                  </h4>
                  <Badge
                    variant="secondary"
                    className="text-xs bg-blue-100 text-blue-700 border-blue-200"
                  >
                    {mockFriends.length} connected
                  </Badge>
                </div>

                {mockFriends.map((friend) => (
                  <FriendCard key={friend.id} friend={friend} />
                ))}
              </div>

              {/* Leaderboard */}
              <Card className="p-5 bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200/50 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-full flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-amber-800 mb-1">
                      Monthly Leaderboard
                    </h4>
                    <p className="text-xs text-amber-600/80">
                      See who's making the biggest impact
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-white/60 rounded-lg border border-white/40">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
                        <span className="text-xs text-white">
                          1
                        </span>
                      </div>
                      <span className="text-sm text-amber-800">
                        Jordan Kim
                      </span>
                    </div>
                    <span className="text-xs text-amber-600">
                      $156.80
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white/40 rounded-lg border border-white/30">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center">
                        <span className="text-xs text-white">
                          2
                        </span>
                      </div>
                      <span className="text-sm text-amber-700">
                        Sarah Chen
                      </span>
                    </div>
                    <span className="text-xs text-amber-600">
                      $127.50
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white/40 rounded-lg border border-white/30">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-amber-600 rounded-full flex items-center justify-center">
                        <span className="text-xs text-white">
                          3
                        </span>
                      </div>
                      <span className="text-sm text-amber-700">
                        Alex Rivera
                      </span>
                    </div>
                    <span className="text-xs text-amber-600">
                      $89.25
                    </span>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {activeTab === "profile" && (
            <div className="mt-0 animate-in fade-in-50 duration-200 space-y-6">
              <div>
                <h3 className="text-lg text-gray-800 mb-2">
                  Profile
                </h3>
                <p className="text-sm text-muted-foreground">
                  Manage your account and preferences
                </p>
              </div>

              {/* Profile Header */}
              <Card className="p-6 bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200/50 shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg text-emerald-800 mb-1">
                      John Doe
                    </h3>
                    <p className="text-sm text-emerald-600/80 mb-2">
                      john.doe@email.com
                    </p>
                    <div className="flex items-center gap-4 text-xs text-emerald-600/70">
                      <span>Joined July 2024</span>
                      <span>•</span>
                      <span>3 badges earned</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Seeds Sprouted to Date */}
              <Card className="p-6 bg-gradient-to-br from-lime-50 via-green-50 to-emerald-50 border-lime-200/50 shadow-lg overflow-hidden relative">
                {/* Background decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full blur-3xl"></div>
                </div>
                <div className="absolute bottom-0 left-0 w-24 h-24 opacity-10">
                  <div className="absolute inset-0 bg-gradient-to-br from-lime-400 to-green-500 rounded-full blur-2xl"></div>
                </div>
                
                {/* Subtle leaf patterns */}
                <div className="absolute inset-0 opacity-[0.02]" style={{
                  backgroundImage: `url('data:image/svg+xml,${encodeURIComponent('<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="#10b981" fill-opacity="0.4"><path d="M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20c0-11.046 8.954-20 20-20z"/></g></g></svg>')}')`,
                  backgroundSize: '30px 30px',
                  backgroundRepeat: 'repeat'
                }}></div>

                <div className="relative">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="relative">
                      <div className="w-14 h-14 bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-green-300/40 via-emerald-400/30 to-teal-500/40 rounded-full animate-pulse"></div>
                        <div className="relative z-10 flex items-center justify-center w-8 h-8 bg-white/20 rounded-full backdrop-blur-sm">
                          <Leaf className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      {/* Small sprouting indicator */}
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center shadow-sm animate-bounce">
                        <Sparkles className="w-2 h-2 text-yellow-800" />
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-lg text-green-800 mb-1">
                        Seeds Sprouted to Date
                      </h3>
                      <p className="text-sm text-green-600/80 mb-3 leading-relaxed">
                        Your generosity has planted seeds of hope that continue to grow and flourish 🌱
                      </p>
                    </div>
                  </div>

                  {/* Main donation amount display */}
                  <div className="text-center mb-6">
                    <div className="mb-3">
                      <p className="text-4xl text-green-800 mb-2 relative">
                        ${totalDonated.toFixed(2)}
                        <span className="absolute -top-1 -right-6 text-lg text-green-600/60">🌿</span>
                      </p>
                      <p className="text-sm text-green-600/80">
                        Your total impact across all causes
                      </p>
                    </div>
                  </div>

                  {/* Growth progress visualization */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between text-xs text-green-600/80 mb-2">
                      <span>Growth toward next milestone</span>
                      <span>Seedling → Young Sprout</span>
                    </div>
                    <div className="relative">
                      <div className="w-full bg-green-200/40 rounded-full h-4 overflow-hidden shadow-inner">
                        <div
                          className="h-full bg-gradient-to-r from-green-400 via-emerald-500 to-teal-600 rounded-full transition-all duration-1000 ease-out relative"
                          style={{ width: `${Math.min((totalDonated / 50) * 100, 100)}%` }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-green-300/30 via-emerald-400/20 to-teal-400/30 rounded-full"></div>
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse rounded-full"></div>
                        </div>
                      </div>
                      {/* Growth stages markers */}
                      <div className="flex justify-between mt-2 text-xs text-green-600/60">
                        <span className="flex items-center gap-1">
                          <span className="text-sm">🌱</span>
                          Seed
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="text-sm">🌿</span>
                          Sprout ($50)
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="text-sm">🌳</span>
                          Tree ($100)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Impact metrics grid */}
                  <div className="grid grid-cols-3 gap-3 mb-5">
                    <div className="text-center p-3 bg-white/60 rounded-xl border border-white/40 backdrop-blur-sm">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <span className="text-lg">🍃</span>
                        <p className="text-lg text-green-700">{Math.floor(totalDonated / 2.5)}</p>
                      </div>
                      <p className="text-xs text-green-600/80">Seeds planted</p>
                    </div>
                    <div className="text-center p-3 bg-white/60 rounded-xl border border-white/40 backdrop-blur-sm">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <span className="text-lg">💧</span>
                        <p className="text-lg text-green-700">{mockTransactions.length}</p>
                      </div>
                      <p className="text-xs text-green-600/80">Acts of care</p>
                    </div>
                    <div className="text-center p-3 bg-white/60 rounded-xl border border-white/40 backdrop-blur-sm">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <span className="text-lg">🌍</span>
                        <p className="text-lg text-green-700">{selectedCharities.length}</p>
                      </div>
                      <p className="text-xs text-green-600/80">Gardens tended</p>
                    </div>
                  </div>

                  {/* Motivational milestone display */}
                  <div className="text-center p-4 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl border border-yellow-200/50 mb-4">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Award className="w-5 h-5 text-amber-600" />
                      <span className="text-sm text-amber-800">Next Growth Stage</span>
                    </div>
                    <p className="text-xs text-amber-700 mb-2">
                      ${(50 - totalDonated).toFixed(2)} more to become a Young Sprout
                    </p>
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-xs text-amber-600/70">Unlock new badge:</span>
                      <Badge variant="outline" className="text-xs bg-amber-100/50 text-amber-700 border-amber-300">
                        🌿 Growing Strong
                      </Badge>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs border-green-300 text-green-700 hover:bg-green-50 transition-all duration-200 hover:scale-105"
                      onClick={() => setActiveTab("discover")}
                    >
                      <Heart className="w-3 h-3 mr-1" />
                      Plant More Seeds
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs border-blue-300 text-blue-700 hover:bg-blue-50 transition-all duration-200 hover:scale-105"
                    >
                      <BarChart3 className="w-3 h-3 mr-1" />
                      View Garden Report
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Settings */}
              <div className="space-y-3">
                <Card
                  className="p-4 bg-white border border-gray-200/60 shadow-sm cursor-pointer hover:bg-gray-50/50 transition-all duration-200 hover:shadow-md"
                  onClick={handleToggleAutoRoundUp}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-sm text-gray-800 mb-1">
                        Auto Round-Up
                      </h4>
                      <p className="text-xs text-gray-600">
                        Automatically round up purchases
                      </p>
                    </div>
                    <div
                      className={`w-10 h-6 rounded-full flex items-center px-1 transition-all duration-300 ${
                        autoRoundUp
                          ? "bg-emerald-600 justify-end"
                          : "bg-gray-300 justify-start"
                      }`}
                    >
                      <div className="w-4 h-4 bg-white rounded-full shadow-sm"></div>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 bg-white border border-gray-200/60 shadow-sm hover:shadow-md transition-all duration-200">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-sm text-gray-800 mb-1">
                        Monthly Limit
                      </h4>
                      <p className="text-xs text-gray-600">
                        Maximum donations per month
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-800">
                        $50.00
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs"
                      >
                        Edit
                      </Button>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 bg-white border border-gray-200/60 shadow-sm hover:shadow-md transition-all duration-200">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-sm text-gray-800 mb-1">
                        Connected Cards
                      </h4>
                      <p className="text-xs text-gray-600">
                        •••• •••• •••• 1234
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs"
                    >
                      Manage
                    </Button>
                  </div>
                </Card>

                <Card className="p-4 bg-white border border-gray-200/60 shadow-sm hover:shadow-md transition-all duration-200">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-sm text-gray-800 mb-1">
                        Notifications
                      </h4>
                      <p className="text-xs text-gray-600">
                        Push notifications and emails
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs"
                    >
                      Configure
                    </Button>
                  </div>
                </Card>
              </div>

              {/* Badge Collection */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-gray-800">
                    Badge Collection
                  </h4>
                  <Badge
                    variant="secondary"
                    className="text-xs bg-purple-100 text-purple-700 border-purple-200"
                  >
                    3 of 6 earned
                  </Badge>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {allBadges.slice(0, 6).map((badge) => (
                    <div key={badge.id} className="text-center">
                      <div
                        className={`w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center ${
                          badge.isUnlocked
                            ? `bg-gradient-to-br ${getRarityColor(badge.rarity)} text-white shadow-md`
                            : "bg-gray-200 text-gray-400"
                        }`}
                      >
                        {badge.isUnlocked ? (
                          React.cloneElement(badge.icon, {
                            className: "w-5 h-5",
                          })
                        ) : (
                          <Lock className="w-5 h-5" />
                        )}
                      </div>
                      <p
                        className={`text-xs ${
                          badge.isUnlocked
                            ? "text-gray-700"
                            : "text-gray-400"
                        }`}
                      >
                        {badge.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Bottom Navigation */}
        <div className="bg-white/95 backdrop-blur-md border-t border-gray-200/60 px-3 pt-3 pb-6 shadow-xl relative z-20">
          <div className="grid w-full grid-cols-5 gap-1">
            <button
              onClick={() => setActiveTab("home")}
              className={`flex flex-col items-center gap-1.5 py-2 px-2 rounded-xl transition-all duration-300 ${
                activeTab === "home"
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg scale-105"
                  : "text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 hover:scale-105"
              }`}
            >
              <Home className="w-4 h-4" />
              <span className="text-xs">Home</span>
            </button>

            <button
              onClick={() => setActiveTab("discover")}
              className={`flex flex-col items-center gap-1.5 py-2 px-2 rounded-xl transition-all duration-300 ${
                activeTab === "discover"
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg scale-105"
                  : "text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 hover:scale-105"
              }`}
            >
              <Search className="w-4 h-4" />
              <span className="text-xs">Discover</span>
            </button>

            <button
              onClick={() => setActiveTab("raffle")}
              className={`flex flex-col items-center gap-1.5 py-2 px-2 rounded-xl transition-all duration-300 ${
                activeTab === "raffle"
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg scale-105"
                  : "text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 hover:scale-105"
              }`}
            >
              <Gift className="w-4 h-4" />
              <span className="text-xs">Raffle</span>
            </button>

            <button
              onClick={() => setActiveTab("friends")}
              className={`flex flex-col items-center gap-1.5 py-2 px-2 rounded-xl transition-all duration-300 ${
                activeTab === "friends"
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg scale-105"
                  : "text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 hover:scale-105"
              }`}
            >
              <Users className="w-4 h-4" />
              <span className="text-xs">Friends</span>
            </button>

            <button
              onClick={() => setActiveTab("profile")}
              className={`flex flex-col items-center gap-1.5 py-2 px-2 rounded-xl transition-all duration-300 ${
                activeTab === "profile"
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg scale-105"
                  : "text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 hover:scale-105"
              }`}
            >
              <User className="w-4 h-4" />
              <span className="text-xs">Profile</span>
            </button>
          </div>
        </div>
      </div>
    </IPhoneFrame>
  );
}