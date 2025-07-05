"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Mic, Building2, Search, ExternalLink, CheckCircle, Clock, Users, Loader2 } from "lucide-react"

export default function GovtSchemes() {
  const [isListening, setIsListening] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [voiceQuery, setVoiceQuery] = useState("")
  const [schemes, setSchemes] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const startVoiceRecording = () => {
    setIsListening(true)
    // Simulate voice recording
    setTimeout(() => {
      setVoiceQuery("Tell me about subsidies for drip irrigation")
      setIsListening(false)
      fetchSchemes("drip irrigation")
    }, 3000)
  }

  const fetchSchemes = async (query: string) => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setSchemes([
        {
          id: 1,
          name: "Pradhan Mantri Krishi Sinchayee Yojana (PMKSY)",
          category: "Irrigation",
          subsidy: "90%",
          maxAmount: "₹50,000",
          description: "Financial assistance for micro irrigation systems including drip and sprinkler irrigation.",
          eligibility: [
            "Small and marginal farmers",
            "Minimum 0.5 acres of land",
            "Valid land documents required",
            "No previous subsidy for irrigation in last 5 years",
          ],
          documents: ["Land ownership documents", "Aadhaar card", "Bank account details", "Passport size photographs"],
          applicationProcess: [
            "Visit nearest agriculture office",
            "Fill application form",
            "Submit required documents",
            "Technical inspection of land",
            "Approval and subsidy disbursement",
          ],
          deadline: "31st March 2024",
          status: "Active",
          applyLink: "https://pmksy.gov.in",
        },
        {
          id: 2,
          name: "Karnataka State Horticulture Development Scheme",
          category: "Horticulture",
          subsidy: "75%",
          maxAmount: "₹75,000",
          description: "Support for setting up drip irrigation systems for horticultural crops.",
          eligibility: [
            "Farmers growing fruits/vegetables",
            "Minimum 1 acre under horticulture",
            "Karnataka state residents only",
          ],
          documents: ["Revenue records", "Caste certificate (if applicable)", "Income certificate", "Bank passbook"],
          applicationProcess: [
            "Online application on state portal",
            "Document verification",
            "Field inspection",
            "Approval and payment",
          ],
          deadline: "15th April 2024",
          status: "Active",
          applyLink: "https://raitamitra.karnataka.gov.in",
        },
        {
          id: 3,
          name: "National Mission on Sustainable Agriculture",
          category: "Sustainable Farming",
          subsidy: "80%",
          maxAmount: "₹40,000",
          description: "Promotes water-efficient irrigation technologies for sustainable agriculture.",
          eligibility: [
            "All categories of farmers",
            "Focus on water-stressed areas",
            "Commitment to sustainable practices",
          ],
          documents: ["Land records", "Identity proof", "Address proof", "Bank details"],
          applicationProcess: [
            "Contact district collector office",
            "Submit application with documents",
            "Technical evaluation",
            "Subsidy approval and release",
          ],
          deadline: "30th June 2024",
          status: "Active",
          applyLink: "https://nmsa.dac.gov.in",
        },
      ])
      setIsLoading(false)
    }, 2000)
  }

  const handleSearch = () => {
    if (searchQuery.trim()) {
      fetchSchemes(searchQuery)
    }
  }

  return (
    <div className="space-y-6">
      <Card className="border-purple-200 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-purple-800">Government Schemes</CardTitle>
              <CardDescription>Find and apply for agricultural subsidies and government schemes</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {/* Search and Voice Input */}
          <div className="space-y-4">
            <div className="flex space-x-3">
              <div className="flex-1">
                <Input
                  placeholder="Search for schemes (e.g., drip irrigation, seeds, fertilizer)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  className="border-purple-200 focus:border-purple-400"
                />
              </div>
              <Button onClick={handleSearch} disabled={isLoading} className="bg-purple-600 hover:bg-purple-700">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>

            <div className="flex items-center justify-center">
              <Button
                onClick={startVoiceRecording}
                disabled={isListening || isLoading}
                variant="outline"
                className="border-purple-300 text-purple-700 hover:bg-purple-50 bg-transparent"
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
                    Ask About Schemes
                  </>
                )}
              </Button>
            </div>

            {voiceQuery && (
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <p className="text-purple-800">
                  <strong>You said:</strong> "{voiceQuery}"
                </p>
              </div>
            )}
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
              <span className="ml-2 text-purple-600">Finding relevant schemes...</span>
            </div>
          )}

          {/* Schemes Results */}
          {schemes.length > 0 && !isLoading && (
            <div className="mt-8 space-y-6">
              <h3 className="text-xl font-bold text-gray-800">Available Schemes ({schemes.length})</h3>

              {schemes.map((scheme) => (
                <Card key={scheme.id} className="border-l-4 border-l-purple-500">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-purple-800 mb-2">{scheme.name}</CardTitle>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <Badge className="bg-purple-100 text-purple-700">{scheme.category}</Badge>
                          <Badge className="bg-green-100 text-green-700">{scheme.subsidy} Subsidy</Badge>
                          <Badge className="bg-blue-100 text-blue-700">Max: {scheme.maxAmount}</Badge>
                          <Badge className="bg-orange-100 text-orange-700">
                            <Clock className="w-3 h-3 mr-1" />
                            {scheme.deadline}
                          </Badge>
                        </div>
                        <CardDescription className="text-gray-600">{scheme.description}</CardDescription>
                      </div>
                      <Button
                        className="bg-purple-600 hover:bg-purple-700 ml-4"
                        onClick={() => window.open(scheme.applyLink, "_blank")}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Apply Now
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6">
                      {/* Eligibility */}
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                          <Users className="w-4 h-4 mr-2 text-green-600" />
                          Eligibility
                        </h4>
                        <ul className="space-y-1">
                          {scheme.eligibility.map((criteria: string, index: number) => (
                            <li key={index} className="flex items-start space-x-2 text-sm">
                              <CheckCircle className="w-3 h-3 text-green-600 mt-1 flex-shrink-0" />
                              <span className="text-gray-600">{criteria}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Required Documents */}
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-3">Required Documents</h4>
                        <ul className="space-y-1">
                          {scheme.documents.map((doc: string, index: number) => (
                            <li key={index} className="flex items-start space-x-2 text-sm">
                              <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                              <span className="text-gray-600">{doc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Application Process */}
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-3">Application Steps</h4>
                        <ol className="space-y-1">
                          {scheme.applicationProcess.map((step: string, index: number) => (
                            <li key={index} className="flex items-start space-x-2 text-sm">
                              <span className="w-5 h-5 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5 flex-shrink-0">
                                {index + 1}
                              </span>
                              <span className="text-gray-600">{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Quick Links */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Access</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: "PM-KISAN", desc: "Direct income support", color: "bg-green-500" },
                { name: "Crop Insurance", desc: "Risk protection", color: "bg-blue-500" },
                { name: "Soil Health Card", desc: "Soil testing", color: "bg-orange-500" },
                { name: "KCC Loans", desc: "Credit facilities", color: "bg-purple-500" },
              ].map((item, index) => (
                <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 ${item.color} rounded-lg flex items-center justify-center`}>
                        <Building2 className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">{item.name}</h4>
                        <p className="text-sm text-gray-600">{item.desc}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
