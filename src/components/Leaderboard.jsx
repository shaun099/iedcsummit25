import React from 'react'

const Leaderboard = () => {
  // Leaderboard data - top districts by registration count
  const leaderboardData = [
    { rank: 1, district: 'Malappuram', count: 1, bgColor: 'bg-amber-300', textSize: 'text-2xl md:text-4xl', width: 'w-full' },
    { rank: 2, district: 'Thiruvananthapuram', count: 2, bgColor: 'bg-teal-400', textSize: 'text-2xl md:text-4xl', width: 'w-[99%]' },
    { rank: 3, district: 'Thrissur', count: 3, bgColor: 'bg-blue-400', textSize: 'text-2xl md:text-4xl', width: 'w-[98%]' },
    { rank: 4, district: 'Palakkad', count: 4, bgColor: 'bg-white', textSize: 'text-2xl md:text-4xl', width: 'w-[97%]' },
    { rank: 5, district: 'Ernakulam', count: 5, bgColor: 'bg-white', textSize: 'text-2xl md:text-4xl', width: 'w-[95%]' },
    { rank: 6, district: 'Kollam', count: 6, bgColor: 'bg-white', textSize: 'text-2xl md:text-4xl', width: 'w-[93%]' },
    { rank: 7, district: 'Alappuzha', count: 7, bgColor: 'bg-white', textSize: 'text-2xl md:text-4xl', width: 'w-[91%]' },
    { rank: 8, district: 'Kasaragod', count: 8, bgColor: 'bg-white', textSize: 'text-xl md:text-3xl', width: 'w-[89%]' },
    { rank: 9, district: 'Kozhikode', count: 9, bgColor: 'bg-white', textSize: 'text-xl md:text-3xl', width: 'w-[87%]' },
    { rank: 10, district: 'Kannur', count: 10, bgColor: 'bg-white', textSize: 'text-xl md:text-3xl', width: 'w-[85%]' },
    { rank: 11, district: 'Kottayam', count: 11, bgColor: 'bg-white', textSize: 'text-xl md:text-3xl', width: 'w-[83%]' },
    { rank: 12, district: 'Pathanamthitta', count: 12, bgColor: 'bg-white', textSize: 'text-xl md:text-3xl', width: 'w-[81%]' },
    { rank: 13, district: 'Outside Kerala', count: 13, bgColor: 'bg-white', textSize: 'text-xl md:text-3xl', width: 'w-[79%]' },
    { rank: 14, district: 'Wayanad', count: 14, bgColor: 'bg-white', textSize: 'text-xl md:text-3xl', width: 'w-[77%]' },
    { rank: 15, district: 'Idukki', count: 15, bgColor: 'bg-white', textSize: 'text-xl md:text-3xl', width: 'w-[76%]' },
  ]

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top decorative circles */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-36 h-36 rounded-full border border-blue-600 opacity-75" />
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-48 h-48 rounded-full border border-blue-600 opacity-50" />


      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 py-8 mt-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-blue-500 font-clash-display">
            LeaderBoard
          </h1>
          <p className="text-lg text-gray-600 mb-4 font-normal">
            These are the top districts that have most registrations
          </p>
        </div>

        {/* Leaderboard */}
        <div className="max-w-4xl mx-auto">
          {/* Top 3 Podium */}
          <div className="-space-y-2 flex flex-col items-center -mb-3">
            {leaderboardData.slice(0, 3).map((item, index) => (
              <div
                key={item.rank}
                className={`${item.bgColor} ${item.width} mx-auto rounded-3xl md:rounded-4xl shadow-lg p-6 flex items-center justify-between transition-all duration-500 animate-fade-in-up`}
                style={{ animationDelay: `${index * 0.2}s`, zIndex: 15 - index }}
              >
                <div className="flex items-center space-x-6">
                  <div className={`${item.textSize} font-bold text-black font-gilroy-bold min-w-8`}>
                    {item.rank}
                  </div>
                  <div className="text-xl md:text-3xl font-medium text-black font-clash-display">
                    {item.district}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Rest of the leaderboard */}
          <div className="-space-y-2 flex flex-col items-center">
            {leaderboardData.slice(3).map((item, index) => (
              <div
                key={item.rank}
                className={`${item.width} mx-auto bg-white rounded-3xl md:rounded-4xl shadow-md border-2 border-blue-600 p-4 flex items-center justify-between transition-all duration-500 animate-fade-in-up`}
                style={{ animationDelay: `${(index + 3) * 0.1}s`, zIndex: 12 - index }}
              >
                <div className="flex items-center space-x-4">
                  <div className={`${item.textSize} font-bold text-black font-gilroy-bold min-w-8`}>
                    {item.rank}
                  </div>
                  <div className="text-lg md:text-xl font-medium text-black font-clash-display">
                    {item.district}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <img
        src="/hero-blocks.png"
        alt="Decorative blocks"
        className="w-full h-20 sm:h-24 bottom-0 left-0 object-cover"
      />
    </div>
  )
}

export default Leaderboard