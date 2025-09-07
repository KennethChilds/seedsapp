import React from "react";

interface IPhoneFrameProps {
  children: React.ReactNode;
}

export function IPhoneFrame({ children }: IPhoneFrameProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-8">
      {/* iPhone 14 Pro Frame */}
      <div className="relative">
        {/* Device Frame */}
        <div 
          className="relative bg-black rounded-[55px] p-2 shadow-2xl"
          style={{ width: '393px', height: '852px' }}
        >
          {/* Screen */}
          <div 
            className="relative bg-white rounded-[47px] overflow-hidden"
            style={{ width: '377px', height: '836px' }}
          >
            {/* Dynamic Island */}
            <div 
              className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-black rounded-full z-50"
              style={{ width: '126px', height: '37px' }}
            ></div>
            
            {/* App Content */}
            <div className="h-full w-full overflow-hidden">
              {children}
            </div>
            
            {/* Home Indicator */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-36 h-1 bg-black rounded-full opacity-60"></div>
          </div>
        </div>
        
        {/* Side Buttons */}
        {/* Volume Buttons */}
        <div className="absolute left-0 top-32 w-1 h-12 bg-black rounded-r-sm"></div>
        <div className="absolute left-0 top-48 w-1 h-16 bg-black rounded-r-sm"></div>
        <div className="absolute left-0 top-68 w-1 h-16 bg-black rounded-r-sm"></div>
        
        {/* Power Button */}
        <div className="absolute right-0 top-48 w-1 h-20 bg-black rounded-l-sm"></div>
      </div>
    </div>
  );
}