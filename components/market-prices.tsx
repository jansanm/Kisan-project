"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mic, TrendingUp, TrendingDown, Search, MapPin, Calendar, Loader2 } from "lucide-react"

export default function MarketPrices() {
  const [isListening, setIsListening] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [voiceQuery, setVoiceQuery] = useState("")
  const [marketData, setMarketData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const startVoiceRecording = () => {
    setIsListening(true)
    // Simulate voice recording
    setTimeout(() => {
      setVoiceQuery("What is the price of tomatoes today?")
      setIsListening(false)
      fetchMarketData("tomatoes")
    }, 3000)
  }

  const fetchMarketData = async (crop: string) => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setMarketData({
        crop: "Tomatoes",
        currentPrice: 45,
        unit: "per kg",
        trend: "up",
        change: 8.5,
        markets: [
          { name: "Bangalore APMC", price: 45, trend: "up", change: 12 },
          { name: "Mysore Market", price: 42, trend: "up", change: 5 },
          { name: "Hubli Mandi", price: 48, trend: "down", change: -3 },
          { name: "Mangalore Market", price: 44, trend: "up", change: 15 },
        ],
        forecast: [
          { day: "Today", price: 45 },
          { day: "Tomorrow", price: 47 },
          { day: "Day 3", price: 46 },
          { day: "Day 4", price: 49 },
          { day: "Day 5", price: 51 },
        ],
        factors: [
          "Monsoon season affecting supply",
          "High demand from processing units",
          "Transportation costs increased",
          "Quality premium for Grade A produce",
        ],
      })
      setIsLoading(false)
    }, 2000)
  }

  const handleSearch = () => {
    if (searchQuery.trim()) {
      fetchMarketData(searchQuery)
    }
  }

  return (
    <div className="space-y-6">
      <Card className="border-blue-200 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-blue-800">Market Prices</CardTitle>
              <CardDescription>Get real-time market prices and trends for your crops</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {/* Search and Voice Input */}
          <div className="space-y-4">
            <div className="flex space-x-3">
              <div className="flex-1">
                <Input
                  placeholder="Enter crop name (e.g., tomatoes, onions, rice)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  className="border-blue-200 focus:border-blue-400"
                />
              </div>
              <Button onClick={handleSearch} disabled={isLoading} className="bg-blue-600 hover:bg-blue-700">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>

            <div className="flex items-center justify-center">
              <Button
                onClick={startVoiceRecording}
                disabled={isListening || isLoading}
                variant="outline"
                className="border-blue-300 text-blue-700 hover:bg-blue-50 bg-transparent"
                size="lg"
              >
                {isListening ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Listening...
                  </>
                ) : (
                  <>
                    <Mic className="w-5 h-5 mr-2" />
                    Ask About Prices
                  </>
                )}
              </Button>
            </div>

            {voiceQuery && (
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-blue-800">
                  <strong>You said:</strong> "{voiceQuery}"
                </p>
              </div>
            )}
          </div>

          {/* Market Data Results */}
          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
              <span className="ml-2 text-blue-600">Fetching market data...</span>
            </div>
          )}

          {marketData && !isLoading && (
            <div className="mt-8 space-y-6">
              {/* Current Price Overview */}
              <Card className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-green-800">{marketData.crop}</h3>
                      <p className="text-green-600">Current Market Price</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-green-800">
                        ₹{marketData.currentPrice}
                        <span className="text-lg font-normal text-green-600">/{marketData.unit}</span>
                      </div>
                      <div className="flex items-center justify-end space-x-1">
                        {marketData.trend === "up" ? (
                          <TrendingUp className="w-4 h-4 text-green-600" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-red-600" />
                        )}
                        <span
                          className={`text-sm font-semibold ${
                            marketData.trend === "up" ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {marketData.change > 0 ? "+" : ""}
                          {marketData.change}%
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Market Comparison */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                    Regional Markets
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {marketData.markets.map((market: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-semibold text-gray-800">{market.name}</h4>
                          <p className="text-2xl font-bold text-gray-900">₹{market.price}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-1">
                            {market.trend === "up" ? (
                              <TrendingUp className="w-4 h-4 text-green-600" />
                            ) : (
                              <TrendingDown className="w-4 h-4 text-red-600" />
                            )}
                            <span
                              className={`text-sm font-semibold ${
                                market.trend === "up" ? "text-green-600" : "text-red-600"
                              }`}
                            >
                              {market.change > 0 ? "+" : ""}
                              {market.change}%
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Price Forecast */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-purple-600" />
                    5-Day Price Forecast
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-5 gap-4">
                    {marketData.forecast.map((day: any, index: number) => (
                      <div key={index} className="text-center p-3 bg-purple-50 rounded-lg">
                        <p className="text-sm text-purple-600 font-medium">{day.day}</p>
                        <p className="text-xl font-bold text-purple-800">₹{day.price}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Market Factors */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-orange-800">Price Influencing Factors</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {marketData.factors.map((factor: string, index: number) => (
                      <div key={index} className="flex items-start space-x-2">
                        <span className="w-2 h-2 bg-orange-500 rounded-full mt-2"></span>
                        <span className="text-gray-700">{factor}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
