"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Sprout, TrendingUp, Building2, Leaf, Users } from "lucide-react"
import CropDiagnosis from "@/components/crop-diagnosis"
import MarketPrices from "@/components/market-prices"
import GovtSchemes from "@/components/govt-schemes"
import FarmerJobs from "@/components/farmer-jobs"
import { translations } from "@/lib/translations"

export default function ProjectKisan() {
  const [activeTab, setActiveTab] = useState("crop-diagnosis")
  const [language, setLanguage] = useState("english")

  const t = translations[language as keyof typeof translations]

  const languages = {
    english: "English",
    kannada: "ಕನ್ನಡ",
    hindi: "हिंदी",
    tamil: "தமிழ்",
    telugu: "తెలుగు",
  }

  const tabs = [
    {
      id: "crop-diagnosis",
      label: t.tabs.cropDiagnosis,
      icon: Sprout,
      color: "bg-emerald-500 hover:bg-emerald-600",
      description: t.tabs.cropDiagnosisDesc,
    },
    {
      id: "market-prices",
      label: t.tabs.marketPrices,
      icon: TrendingUp,
      color: "bg-blue-500 hover:bg-blue-600",
      description: t.tabs.marketPricesDesc,
    },
    {
      id: "govt-schemes",
      label: t.tabs.govtSchemes,
      icon: Building2,
      color: "bg-purple-500 hover:bg-purple-600",
      description: t.tabs.govtSchemesDesc,
    },
    {
      id: "farmer-jobs",
      label: t.tabs.farmerJobs,
      icon: Users,
      color: "bg-orange-500 hover:bg-orange-600",
      description: t.tabs.farmerJobsDesc,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-green-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <Leaf className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  {t.header.title}
                </h1>
                <p className="text-sm text-gray-600">{t.header.subtitle}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                🌱 {t.header.poweredBy}
              </Badge>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(languages).map(([key, value]) => (
                    <SelectItem key={key} value={key}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            {t.hero.title1}{" "}
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              {t.hero.title2}
            </span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">{t.hero.description}</p>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <Button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`${tab.color} text-white px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                    activeTab === tab.id ? "ring-4 ring-white/30 shadow-lg" : ""
                  }`}
                  size="lg"
                >
                  <Icon className="w-5 h-5 mr-2" />
                  {tab.label}
                </Button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-12">
        <div className="max-w-4xl mx-auto">
          {activeTab === "crop-diagnosis" && <CropDiagnosis language={language} />}
          {activeTab === "market-prices" && <MarketPrices language={language} />}
          {activeTab === "govt-schemes" && <GovtSchemes language={language} />}
          {activeTab === "farmer-jobs" && <FarmerJobs language={language} />}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-green-200 py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Leaf className="w-6 h-6 text-green-600" />
            <span className="text-lg font-semibold text-gray-800">{t.header.title}</span>
          </div>
          <p className="text-gray-600 mb-4">{t.footer.description}</p>
          <div className="flex justify-center space-x-6 text-sm text-gray-500">
            <span>🌾 {t.footer.features.cropDiagnosis}</span>
            <span>📈 {t.footer.features.marketAnalysis}</span>
            <span>🏛️ {t.footer.features.govtSchemes}</span>
            <span>🎤 {t.footer.features.voiceSupport}</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
