"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Upload, Camera, Mic, Loader2, CheckCircle, AlertTriangle, Leaf } from "lucide-react"

export default function CropDiagnosis() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [diagnosis, setDiagnosis] = useState<any>(null)
  const [isListening, setIsListening] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const analyzeCrop = async () => {
    if (!selectedImage) return

    setIsAnalyzing(true)
    // Simulate AI analysis
    setTimeout(() => {
      setDiagnosis({
        disease: "Early Blight (Alternaria solani)",
        confidence: 92,
        severity: "Moderate",
        description:
          "Early blight is a common fungal disease affecting tomato plants, characterized by dark spots with concentric rings on leaves.",
        treatment: [
          "Remove affected leaves immediately",
          "Apply copper-based fungicide spray",
          "Improve air circulation around plants",
          "Water at soil level to avoid wetting leaves",
        ],
        prevention: [
          "Rotate crops annually",
          "Use disease-resistant varieties",
          "Maintain proper plant spacing",
          "Apply mulch to prevent soil splash",
        ],
        localRemedies: [
          "Neem oil spray (10ml per liter water)",
          "Baking soda solution (5g per liter)",
          "Turmeric paste application on affected areas",
        ],
      })
      setIsAnalyzing(false)
    }, 3000)
  }

  const startVoiceRecording = () => {
    setIsListening(true)
    // Simulate voice recording
    setTimeout(() => {
      setIsListening(false)
    }, 3000)
  }

  return (
    <div className="space-y-6">
      <Card className="border-green-200 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-green-800">Diagnose Crop Issues</CardTitle>
              <CardDescription>Upload a photo of your crop for instant AI-powered diagnosis</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {/* Image Upload Section */}
          <div className="space-y-4">
            <div className="border-2 border-dashed border-green-300 rounded-xl p-8 text-center bg-green-50/50">
              {selectedImage ? (
                <div className="space-y-4">
                  <img
                    src={selectedImage || "/placeholder.svg"}
                    alt="Uploaded crop"
                    className="max-w-full h-64 object-cover rounded-lg mx-auto shadow-md"
                  />
                  <div className="flex justify-center space-x-3">
                    <Button
                      onClick={() => fileInputRef.current?.click()}
                      variant="outline"
                      className="border-green-300 text-green-700 hover:bg-green-50"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Change Image
                    </Button>
                    <Button onClick={analyzeCrop} disabled={isAnalyzing} className="bg-green-600 hover:bg-green-700">
                      {isAnalyzing ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Analyze Crop
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <Camera className="w-16 h-16 text-green-400 mx-auto" />
                  <div>
                    <h3 className="text-lg font-semibold text-green-800 mb-2">Upload Crop Image</h3>
                    <p className="text-green-600 mb-4">Take a clear photo of the affected plant parts</p>
                    <div className="flex justify-center space-x-3">
                      <Button onClick={() => fileInputRef.current?.click()} className="bg-green-600 hover:bg-green-700">
                        <Upload className="w-4 h-4 mr-2" />
                        Choose File
                      </Button>
                      <Button
                        onClick={startVoiceRecording}
                        disabled={isListening}
                        variant="outline"
                        className="border-green-300 text-green-700 hover:bg-green-50 bg-transparent"
                      >
                        {isListening ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Listening...
                          </>
                        ) : (
                          <>
                            <Mic className="w-4 h-4 mr-2" />
                            Describe Issue
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          </div>

          {/* Diagnosis Results */}
          {diagnosis && (
            <div className="mt-8 space-y-6">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <h3 className="text-xl font-bold text-green-800">Diagnosis Complete</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Disease Information */}
                <Card className="border-orange-200">
                  <CardHeader className="bg-orange-50">
                    <CardTitle className="text-orange-800 flex items-center">
                      <AlertTriangle className="w-5 h-5 mr-2" />
                      Disease Identified
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-gray-800">{diagnosis.disease}</h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="secondary" className="bg-green-100 text-green-700">
                            {diagnosis.confidence}% Confidence
                          </Badge>
                          <Badge variant="outline" className="border-orange-300 text-orange-700">
                            {diagnosis.severity} Severity
                          </Badge>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm">{diagnosis.description}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Treatment Plan */}
                <Card className="border-blue-200">
                  <CardHeader className="bg-blue-50">
                    <CardTitle className="text-blue-800">Immediate Treatment</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <ul className="space-y-2">
                      {diagnosis.treatment.map((step: string, index: number) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                            {index + 1}
                          </span>
                          <span className="text-sm text-gray-700">{step}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Local Remedies */}
                <Card className="border-green-200">
                  <CardHeader className="bg-green-50">
                    <CardTitle className="text-green-800">Local Remedies</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <ul className="space-y-2">
                      {diagnosis.localRemedies.map((remedy: string, index: number) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="w-2 h-2 bg-green-500 rounded-full mt-2"></span>
                          <span className="text-sm text-gray-700">{remedy}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Prevention */}
                <Card className="border-purple-200">
                  <CardHeader className="bg-purple-50">
                    <CardTitle className="text-purple-800">Prevention Tips</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <ul className="space-y-2">
                      {diagnosis.prevention.map((tip: string, index: number) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="w-2 h-2 bg-purple-500 rounded-full mt-2"></span>
                          <span className="text-sm text-gray-700">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
