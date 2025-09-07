import { useState } from "react";
import {
  ChevronRight,
  ChevronLeft,
  Coins,
  Users,
  Gift,
  Leaf,
} from "lucide-react";
import { Button } from "./ui/button";

// Google Logo SVG Component
const GoogleLogo = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    className="mr-2"
  >
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

// Apple Logo SVG Component
const AppleLogo = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    className="mr-2"
    fill="currentColor"
  >
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
  </svg>
);

interface OnboardingFlowProps {
  onComplete: () => void;
}

export function OnboardingFlow({
  onComplete,
}: OnboardingFlowProps) {
  const [step, setStep] = useState(0);

  const introSlides = [
    {
      icon: <Coins className="w-12 h-12 text-white" />,
      title: "Round-up Donations",
      description:
        "Turn your spare change into meaningful impact. Every purchase rounds up to the nearest dollar.",
    },
    {
      icon: <Users className="w-12 h-12 text-white" />,
      title: "Give with Friends",
      description:
        "See what causes your friends support, earn badges together, and inspire each other to make a difference.",
    },
    {
      icon: <Gift className="w-12 h-12 text-white" />,
      title: "Win Prizes",
      description:
        "Earn raffle entries with every donation. Win amazing prizes while supporting great causes.",
    },
  ];

  if (step === 0) {
    // Welcome Screen
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 bg-background">
        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-emerald-600 rounded-full flex items-center justify-center mb-6 mx-auto">
            <Leaf className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl text-emerald-800 mb-4">
            Seeds
          </h1>
          <p className="text-xl text-emerald-800">Plant Your Change</p>
          
        </div>

        <Button
          onClick={() => setStep(1)}
          className="w-full max-w-xs bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-full"
        >
          Get Started
          <ChevronRight className="ml-2 w-5 h-5" />
        </Button>
      </div>
    );
  }

  if (step >= 1 && step <= 3) {
    // Intro Carousel
    const slideIndex = step - 1;
    const slide = introSlides[slideIndex];

    return (
      <div className="h-full flex flex-col items-center justify-center p-8 bg-background">
        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-emerald-600 rounded-full flex items-center justify-center mb-8 mx-auto">
            {slide.icon}
          </div>
          <h2 className="text-3xl mb-4 text-gray-800">
            {slide.title}
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed max-w-sm">
            {slide.description}
          </p>
        </div>

        {/* Dots indicator */}
        <div className="flex space-x-2 mb-12">
          {introSlides.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === slideIndex
                  ? "bg-emerald-600"
                  : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        <div className="flex space-x-4 w-full max-w-xs">
          {step > 1 && (
            <Button
              variant="outline"
              onClick={() => setStep(step - 1)}
              className="flex-1 py-4 rounded-full border-emerald-600 text-emerald-600 hover:bg-emerald-50"
            >
              <ChevronLeft className="mr-2 w-5 h-5" />
              Back
            </Button>
          )}
          <Button
            onClick={() => setStep(step + 1)}
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-full"
          >
            {step === 3 ? "Continue" : "Next"}
            <ChevronRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    );
  }

  // Sign-up Screen
  return (
    <div className="h-full flex flex-col justify-center p-8 bg-background">
      <div className="max-w-sm mx-auto w-full">
        <h2 className="text-3xl text-center mb-8 text-gray-800">
          Welcome to Seeds
        </h2>

        <div className="text-center mb-12">
          <p className="text-lg text-gray-600 leading-relaxed">
            Ready to start making a difference with your spare
            change?
          </p>
        </div>

        <div className="space-y-3">
          <Button
            onClick={onComplete}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-full"
          >
            Get Started
            <ChevronRight className="ml-2 w-5 h-5" />
          </Button>

          <Button
            variant="outline"
            onClick={onComplete}
            className="w-full py-4 rounded-full border-gray-300 text-gray-700 hover:bg-gray-50 flex items-center justify-center"
          >
            <GoogleLogo />
            Continue with Google
          </Button>

          <Button
            variant="outline"
            onClick={onComplete}
            className="w-full py-4 rounded-full border-gray-300 text-gray-700 hover:bg-gray-50 flex items-center justify-center"
          >
            <AppleLogo />
            Continue with Apple
          </Button>
        </div>

        <p className="text-center text-xs text-gray-500 mt-6">
          By continuing, you agree to our Terms of Service and
          Privacy Policy
        </p>
      </div>
    </div>
  );
}