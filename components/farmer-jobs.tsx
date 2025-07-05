"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, MapPin, Clock, IndianRupee, Search, Plus, Briefcase, Filter } from "lucide-react"

export default function FarmerJobs() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")

  // Dummy job data
  const jobs = [
    {
      id: 1,
      title: "Farm Manager",
      company: "Green Valley Farms",
      location: "Bangalore Rural, Karnataka",
      type: "Full-time",
      experience: "2-5 years",
      salary: "₹25,000 - ₹35,000",
      category: "Management",
      description: "Looking for an experienced farm manager to oversee daily operations of our 50-acre organic farm.",
      requirements: [
        "Bachelor's degree in Agriculture",
        "Experience in organic farming",
        "Knowledge of modern farming techniques",
        "Leadership skills",
      ],
      postedDate: "2 days ago",
      applicants: 12,
      urgent: false,
    },
    {
      id: 2,
      title: "Tractor Operator",
      company: "Karnataka Agri Services",
      location: "Mysore, Karnataka",
      type: "Contract",
      experience: "1-3 years",
      salary: "₹18,000 - ₹22,000",
      category: "Equipment Operation",
      description: "Skilled tractor operator needed for seasonal farming operations across multiple locations.",
      requirements: [
        "Valid driving license",
        "Experience with modern tractors",
        "Knowledge of farming equipment",
        "Flexible with travel",
      ],
      postedDate: "1 day ago",
      applicants: 8,
      urgent: true,
    },
    {
      id: 3,
      title: "Crop Specialist",
      company: "AgriTech Solutions",
      location: "Hubli, Karnataka",
      type: "Full-time",
      experience: "3-7 years",
      salary: "₹30,000 - ₹45,000",
      category: "Technical",
      description: "Agricultural expert needed to provide technical guidance to farmers on crop management.",
      requirements: [
        "M.Sc in Agriculture/Horticulture",
        "Field experience with various crops",
        "Good communication skills",
        "Knowledge of pest management",
      ],
      postedDate: "3 days ago",
      applicants: 15,
      urgent: false,
    },
    {
      id: 4,
      title: "Dairy Farm Worker",
      company: "Nandini Dairy Cooperative",
      location: "Mandya, Karnataka",
      type: "Full-time",
      experience: "0-2 years",
      salary: "₹15,000 - ₹20,000",
      category: "Livestock",
      description: "Entry-level position for dairy farm operations including milking, feeding, and general care.",
      requirements: [
        "Basic education",
        "Interest in animal husbandry",
        "Physical fitness",
        "Willingness to work early hours",
      ],
      postedDate: "5 days ago",
      applicants: 6,
      urgent: false,
    },
    {
      id: 5,
      title: "Greenhouse Technician",
      company: "Modern Horticulture Ltd",
      location: "Kolar, Karnataka",
      type: "Full-time",
      experience: "1-4 years",
      salary: "₹22,000 - ₹28,000",
      category: "Horticulture",
      description: "Maintain and operate greenhouse systems for vegetable production.",
      requirements: [
        "Diploma in Agriculture/Horticulture",
        "Knowledge of greenhouse operations",
        "Understanding of irrigation systems",
        "Attention to detail",
      ],
      postedDate: "1 week ago",
      applicants: 9,
      urgent: true,
    },
  ]

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "Management", label: "Farm Management" },
    { value: "Equipment Operation", label: "Equipment Operation" },
    { value: "Technical", label: "Technical/Advisory" },
    { value: "Livestock", label: "Livestock" },
    { value: "Horticulture", label: "Horticulture" },
  ]

  const locations = [
    { value: "all", label: "All Locations" },
    { value: "Bangalore", label: "Bangalore" },
    { value: "Mysore", label: "Mysore" },
    { value: "Hubli", label: "Hubli" },
    { value: "Mandya", label: "Mandya" },
    { value: "Kolar", label: "Kolar" },
  ]

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || job.category === selectedCategory
    const matchesLocation = selectedLocation === "all" || job.location.includes(selectedLocation)

    return matchesSearch && matchesCategory && matchesLocation
  })

  return (
    <div className="space-y-6">
      <Card className="border-orange-200 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-orange-800">Farmer Jobs</CardTitle>
              <CardDescription>Find farming opportunities or post job openings</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs defaultValue="browse" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="browse" className="flex items-center space-x-2">
                <Search className="w-4 h-4" />
                <span>Browse Jobs</span>
              </TabsTrigger>
              <TabsTrigger value="post" className="flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Post Jobs</span>
              </TabsTrigger>
            </TabsList>

            {/* Browse Jobs Tab */}
            <TabsContent value="browse" className="space-y-6">
              {/* Search and Filters */}
              <div className="space-y-4">
                <div className="flex space-x-3">
                  <div className="flex-1">
                    <Input
                      placeholder="Search jobs by title, company, or keywords..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="border-orange-200 focus:border-orange-400"
                    />
                  </div>
                  <Button className="bg-orange-600 hover:bg-orange-700">
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </Button>
                </div>

                <div className="flex space-x-3">
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((location) => (
                        <SelectItem key={location.value} value={location.value}>
                          {location.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Button
                    variant="outline"
                    className="border-orange-300 text-orange-700 hover:bg-orange-50 bg-transparent"
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    More Filters
                  </Button>
                </div>
              </div>

              {/* Job Results */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-800">{filteredJobs.length} Jobs Found</h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>Updated 2 hours ago</span>
                  </div>
                </div>

                {filteredJobs.map((job) => (
                  <Card key={job.id} className="border-l-4 border-l-orange-400 hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="text-xl font-bold text-gray-800">{job.title}</h3>
                            {job.urgent && <Badge className="bg-red-100 text-red-700">Urgent</Badge>}
                          </div>
                          <div className="flex items-center space-x-4 text-gray-600 mb-3">
                            <div className="flex items-center space-x-1">
                              <Briefcase className="w-4 h-4" />
                              <span>{job.company}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-4 h-4" />
                              <span>{job.location}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <IndianRupee className="w-4 h-4" />
                              <span>{job.salary}</span>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2 mb-3">
                            <Badge variant="outline" className="border-orange-300 text-orange-700">
                              {job.type}
                            </Badge>
                            <Badge variant="outline" className="border-blue-300 text-blue-700">
                              {job.experience}
                            </Badge>
                            <Badge variant="outline" className="border-green-300 text-green-700">
                              {job.category}
                            </Badge>
                          </div>
                          <p className="text-gray-600 mb-4">{job.description}</p>
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <div className="flex items-center space-x-4">
                              <span>Posted {job.postedDate}</span>
                              <span>{job.applicants} applicants</span>
                            </div>
                          </div>
                        </div>
                        <div className="ml-6 space-y-2">
                          <Button className="bg-orange-600 hover:bg-orange-700 w-full">Apply Now</Button>
                          <Button
                            variant="outline"
                            className="border-orange-300 text-orange-700 hover:bg-orange-50 w-full bg-transparent"
                          >
                            Save Job
                          </Button>
                        </div>
                      </div>

                      {/* Requirements */}
                      <div className="border-t pt-4">
                        <h4 className="font-semibold text-gray-800 mb-2">Requirements:</h4>
                        <div className="grid md:grid-cols-2 gap-2">
                          {job.requirements.map((req, index) => (
                            <div key={index} className="flex items-start space-x-2 text-sm">
                              <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                              <span className="text-gray-600">{req}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Post Jobs Tab */}
            <TabsContent value="post" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-orange-800">Post a New Job</CardTitle>
                  <CardDescription>Fill out the form below to post a job opportunity for farmers</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Basic Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-800">Basic Information</h3>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Job Title *</label>
                        <Input placeholder="e.g., Farm Manager, Tractor Operator" />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Company/Farm Name *</label>
                        <Input placeholder="Your company or farm name" />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                        <Input placeholder="City, District, State" />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Job Category *</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="management">Farm Management</SelectItem>
                            <SelectItem value="equipment">Equipment Operation</SelectItem>
                            <SelectItem value="technical">Technical/Advisory</SelectItem>
                            <SelectItem value="livestock">Livestock</SelectItem>
                            <SelectItem value="horticulture">Horticulture</SelectItem>
                            <SelectItem value="labor">Farm Labor</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Employment Type *</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="full-time">Full-time</SelectItem>
                            <SelectItem value="part-time">Part-time</SelectItem>
                            <SelectItem value="contract">Contract</SelectItem>
                            <SelectItem value="seasonal">Seasonal</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Job Details */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-800">Job Details</h3>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Experience Required</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select experience level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0-1">0-1 years</SelectItem>
                            <SelectItem value="1-3">1-3 years</SelectItem>
                            <SelectItem value="3-5">3-5 years</SelectItem>
                            <SelectItem value="5+">5+ years</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Salary Range *</label>
                        <div className="flex space-x-2">
                          <Input placeholder="Min salary" />
                          <span className="flex items-center text-gray-500">to</span>
                          <Input placeholder="Max salary" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Contact Person *</label>
                        <Input placeholder="Your name" />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Contact Phone *</label>
                        <Input placeholder="Your phone number" />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
                        <Input placeholder="Your email address" />
                      </div>
                    </div>
                  </div>

                  {/* Job Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Job Description *</label>
                    <Textarea
                      placeholder="Describe the job responsibilities, work environment, and any other relevant details..."
                      rows={4}
                    />
                  </div>

                  {/* Requirements */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Requirements & Qualifications
                    </label>
                    <Textarea placeholder="List the required qualifications, skills, and experience..." rows={3} />
                  </div>

                  {/* Additional Options */}
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm text-gray-700">Mark as urgent</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm text-gray-700">Allow remote applications</span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end space-x-3">
                    <Button
                      variant="outline"
                      className="border-orange-300 text-orange-700 hover:bg-orange-50 bg-transparent"
                    >
                      Save as Draft
                    </Button>
                    <Button className="bg-orange-600 hover:bg-orange-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Post Job
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Pricing Information */}
              <Card className="border-green-200">
                <CardHeader className="bg-green-50">
                  <CardTitle className="text-green-800">Posting Plans</CardTitle>
                  <CardDescription>Choose the best plan for your job posting</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-3 gap-4">
                    <Card className="border-2 border-green-300">
                      <CardContent className="p-4 text-center">
                        <h4 className="font-bold text-green-800 mb-2">Basic</h4>
                        <div className="text-2xl font-bold text-green-600 mb-2">Free</div>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• 30 days visibility</li>
                          <li>• Basic listing</li>
                          <li>• Email notifications</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border-2 border-orange-300 bg-orange-50">
                      <CardContent className="p-4 text-center">
                        <h4 className="font-bold text-orange-800 mb-2">Premium</h4>
                        <div className="text-2xl font-bold text-orange-600 mb-2">₹299</div>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• 60 days visibility</li>
                          <li>• Featured listing</li>
                          <li>• Priority support</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border-2 border-purple-300">
                      <CardContent className="p-4 text-center">
                        <h4 className="font-bold text-purple-800 mb-2">Enterprise</h4>
                        <div className="text-2xl font-bold text-purple-600 mb-2">₹599</div>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• 90 days visibility</li>
                          <li>• Top placement</li>
                          <li>• Analytics dashboard</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
