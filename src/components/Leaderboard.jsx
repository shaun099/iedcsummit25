import React, { useState, useEffect } from 'react'

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Google Sheet CSV export URL - make sure the sheet is set to "Anyone with the link can view"
  const SHEET_URL = 'https://docs.google.com/spreadsheets/d/14Y9ea72JNHZx3XDpY95jSnkzk_uYWdlZrSp_lPnDhwg/export?format=csv&gid=1396061035'

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        setLoading(true)
        const response = await fetch(SHEET_URL)
        
        if (!response.ok) {
          throw new Error('Failed to fetch leaderboard data')
        }
        
        const csvText = await response.text()
        const lines = csvText.trim().split('\n')
        
        const parsedData = lines.slice(1).map(line => {
          const values = line.split(',').map(v => v.replace(/"/g, '').trim())
          return {
            siNo: parseInt(values[0]),
            district: values[1],
            ticketCount: parseInt(values[2])
          }
        }).filter(item => !isNaN(item.ticketCount))
        
        const sortedData = parsedData.sort((a, b) => b.ticketCount - a.ticketCount)
        const formattedData = sortedData.map((item, index) => {
          const rank = index + 1
          return {
            rank,
            district: item.district,
            count: item.ticketCount,
            bgColor: getBgColor(rank),
            textSize: getTextSize(rank),
            width: getWidth(rank)
          }
        })
        
        setLeaderboardData(formattedData)
        setError(null)
      } catch (err) {
        console.error('Error fetching leaderboard data:', err)
        setError('Failed to load leaderboard data. Using fallback data.')
        setLeaderboardData(getFallbackData())
      } finally {
        setLoading(false)
      }
    }

    fetchLeaderboardData()
  }, [])

  const getBgColor = (rank) => {
    switch (rank) {
      case 1: return 'bg-amber-300'
      case 2: return 'bg-teal-400'
      case 3: return 'bg-blue-400'
      default: return 'bg-white'
    }
  }

  const getTextSize = (rank) => {
    return rank <= 7 ? 'text-2xl md:text-4xl' : 'text-xl md:text-3xl'
  }

  const getWidth = (rank) => {
    const widths = ['w-full', 'w-[99%]', 'w-[98%]', 'w-[97%]', 'w-[95%]', 'w-[93%]', 'w-[91%]', 'w-[89%]', 'w-[87%]', 'w-[85%]', 'w-[83%]', 'w-[81%]', 'w-[79%]', 'w-[77%]', 'w-[76%]']
    return widths[rank - 1] || 'w-[75%]'
  }

  const getFallbackData = () => [
    { rank: 1, district: 'Malappuram', count: 93, bgColor: 'bg-amber-300', textSize: 'text-2xl md:text-4xl', width: 'w-full' },
    { rank: 2, district: 'Thiruvananthapuram', count: 78, bgColor: 'bg-teal-400', textSize: 'text-2xl md:text-4xl', width: 'w-[99%]' },
    { rank: 3, district: 'Thrissur', count: 74, bgColor: 'bg-blue-400', textSize: 'text-2xl md:text-4xl', width: 'w-[98%]' },
    { rank: 4, district: 'Palakkad', count: 70, bgColor: 'bg-white', textSize: 'text-2xl md:text-4xl', width: 'w-[97%]' },
    { rank: 5, district: 'Ernakulam', count: 44, bgColor: 'bg-white', textSize: 'text-2xl md:text-4xl', width: 'w-[95%]' },
    { rank: 6, district: 'Kollam', count: 38, bgColor: 'bg-white', textSize: 'text-2xl md:text-4xl', width: 'w-[93%]' },
    { rank: 7, district: 'Alappuzha', count: 35, bgColor: 'bg-white', textSize: 'text-2xl md:text-4xl', width: 'w-[91%]' },
    { rank: 12, district: 'Pathanamthitta', count: 24, bgColor: 'bg-white', textSize: 'text-xl md:text-3xl', width: 'w-[81%]' },
    { rank: 9, district: 'Kozhikode', count: 20, bgColor: 'bg-white', textSize: 'text-xl md:text-3xl', width: 'w-[87%]' },
    { rank: 10, district: 'Kannur', count: 19, bgColor: 'bg-white', textSize: 'text-xl md:text-3xl', width: 'w-[85%]' },
    { rank: 8, district: 'Kasaragod', count: 19, bgColor: 'bg-white', textSize: 'text-xl md:text-3xl', width: 'w-[89%]' },
    { rank: 11, district: 'Kottayam', count: 17, bgColor: 'bg-white', textSize: 'text-xl md:text-3xl', width: 'w-[83%]' },
    { rank: 15, district: 'Idukki', count: 1, bgColor: 'bg-white', textSize: 'text-xl md:text-3xl', width: 'w-[76%]' },
    { rank: 13, district: 'Outside Kerala', count: 1, bgColor: 'bg-white', textSize: 'text-xl md:text-3xl', width: 'w-[79%]' },
    { rank: 14, district: 'Wayanad', count: 0, bgColor: 'bg-white', textSize: 'text-xl md:text-3xl', width: 'w-[77%]' },
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-white relative overflow-hidden flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading leaderboard...</p>
        </div>
      </div>
    )
  }

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
          {error && (
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-2 rounded mb-4 inline-block">
              {error}
              <button 
                onClick={() => window.location.reload()} 
                className="ml-4 bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
              >
                Retry
              </button>
            </div>
          )}
        </div>

        {/* Leaderboard */}
        <div className="max-w-4xl mx-auto">
          {/* Top 3 Podium */}
          <div className="-space-y-2 flex flex-col items-center -mb-3">
            {leaderboardData.slice(0, 3).map((item, index) => (
              <div
                key={item.rank}
                className={`${item.bgColor} ${item.width} mx-auto rounded-3xl md:rounded-4xl shadow-lg p-6 flex items-center justify-between transition-all duration-500 animate-fade-in-up relative`}
                style={{ animationDelay: `${index * 0.2}s`, zIndex: 15 - index }}
              >
                <div className="flex items-center space-x-6 flex-1">
                  <div className={`${item.textSize} font-bold text-black font-gilroy-bold min-w-8`}>
                    {item.rank}
                  </div>
                  <div className="text-xl md:text-3xl font-medium text-black font-clash-display">
                    {item.district}
                  </div>
                </div>
                <div className={`${item.textSize} font-bold text-black font-gilroy-bold absolute right-6 top-1/2 transform -translate-y-1/2`}>
                  {item.count > 0 ? item.count : ''}
                </div>
              </div>
            ))}
          </div>

          {/* Rest of the leaderboard */}
          <div className="-space-y-2 flex flex-col items-center">
            {leaderboardData.slice(3).map((item, index) => (
              <div
                key={item.rank}
                className={`${item.width} mx-auto bg-white rounded-3xl md:rounded-4xl shadow-md border-2 border-blue-600 p-4 flex items-center justify-between transition-all duration-500 animate-fade-in-up relative`}
                style={{ animationDelay: `${(index + 3) * 0.1}s`, zIndex: 12 - index }}
              >
                <div className="flex items-center space-x-4 flex-1">
                  <div className={`${item.textSize} font-bold text-black font-gilroy-bold min-w-8`}>
                    {item.rank}
                  </div>
                  <div className="text-lg md:text-xl font-medium text-black font-clash-display">
                    {item.district}
                  </div>
                </div>
                <div className={`${item.textSize} font-bold text-black font-gilroy-bold absolute right-4 top-1/2 transform -translate-y-1/2`}>
                  {item.count > 0 ? item.count : ''}
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