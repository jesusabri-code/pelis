"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Search, Bell, ChevronDown, Play, X, Plus, Menu, Grid3X3, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import Link from "next/link"

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showVideo, setShowVideo] = useState(false)
  const [viewMode, setViewMode] = useState("grid") // grid or list
  const videoRef = useRef(null)

  const portfolioItems = [
    {
      title: "The Great Chocolate Run",
      image: "/images/chocolate-warehouse.png",
      video: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Video%202025-07-07%20at%2012.37.11%20AM-OZRWczD6AurRtcxEIAeKY5SWzW2B6p.mp4",
      dialogVideo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Video%202025-07-07%20at%2012.37.11%20AM-OZRWczD6AurRtcxEIAeKY5SWzW2B6p.mp4",
      badge: "Recently Added",
      badgeColor: "bg-red-600",
      year: "2022",
      duration: "48 hours",
      cast: "Safinaz Elhadary, 150 Warehouse workers",
      location: "Egypt",
      challenge: "Impossible timeline. Fragile product. Zero room for error.",
      description:
        "A new client came to us with a challenge that sounded borderline impossible: Relabel and ocean-ship 500,000 chocolate pieces from Egypt to Europe — in just 48 hours. I said yes. I sourced a temperature-controlled warehouse overnight, assembled and trained 150 temporary workers, and designed a full-blown process flow from scratch: labeling, sealing, packing, and real-time QC. Every label mattered. Every second counted. And we did it. We didn't just deliver. We impressed. That 48-hour sprint sparked the creation of an entirely new FMCG division, now powering fast-turn fulfillment for multiple global clients. It started as a trial. It became a whole new line of business.",
      category: "Warehouse Process Engineering",
      status: "Live in Production",
      impact: "Half a million Chocolate Pieces in 48 hours",
      type: "warehouse",
    },
    {
      title: "Format Me if You Can",
      image: "/images/format-me-pilot.png",
      video: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/20250707_0209_From%20Chaos%20to%20Calm_simple_compose_01jzhr23mrff8ttxvy34zgntep-NTL2wCB9K4l8BZUwGTKipMsLlIq1Sw.mp4",
      dialogVideo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/20250707_0209_From%20Chaos%20to%20Calm_simple_compose_01jzhr23mrff8ttxvy34zgntep-NTL2wCB9K4l8BZUwGTKipMsLlIq1Sw.mp4",
      badge: "Featured",
      badgeColor: "bg-yellow-600",
      year: "2025",
      cast: "Safinaz Elhadary",
      challenge: "Manual data entry to create warehouse order under SLA pressure. Every. Single. Day.",
      technologies: ["V0", "OpenAI API"],
      description:
        "Order intake was chaos: scattered PDFs, broken Excel sheets, and buried email threads that had to be cleaned and restructured just to process a single warehouse order. Four ops team members were manually reformatting orders every day to meet tight SLAs. I built a custom solution using V0 and the OpenAI API that parses unstructured order data and generates clean, system-ready warehouse orders in minutes. Today, one person processes tens of orders in under 20 minutes with complete accuracy and zero formatting stress. What used to be a daily bottleneck is now a seamless flow.",
      category: "Web Application",
      status: "Live in production",
      impact: "What used to drain a team now runs on vibes.",
      type: "automation",
    },
    {
      title: "Kill 8 Minutes",
      image: "/images/kill-8-minutes.png",
      video: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/20250723_0152_Tablet%20Assembly%20Workflow_simple_compose_01k0txdtq3epsrcw839h7pty1e-V4twGAtcIfEzJsaeygmMao2LHpbuV5.mp4",
      dialogVideo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/20250723_0152_Tablet%20Assembly%20Workflow_simple_compose_01k0txdtq3epsrcw839h7pty1e-V4twGAtcIfEzJsaeygmMao2LHpbuV5.mp4",
      badge: "Ops Redesign",
      badgeColor: "bg-blue-600",
      year: "2023",
      cast: "Safinaz Elhadary, Process Operators, Tech Partners",
      location: "Erie, PA",
      challenge: "Outdated flow. Inconsistent prep. 8 minutes per tablet.",
      description:
        "The leading food delivery company in the U.S. needed help streamlining their device configuration workflow. Each tablet setup was taking over 8 minutes, with constant confusion between functional devices, faulty ones, and those still needing prep. I redesigned the entire process from the ground up. I created a color-coded system to flag device states, designed clearly defined workstation zones for unpacking, charging, inserting SIM cards, and config. We implemented image recognition software to instantly detect device models — no more wasted time manually identifying hardware. Most importantly, I rebuilt the configuration flow itself — cutting setup time down to under 3 minutes per device. What used to be slow and chaotic became scalable, fast, and clean — a new standard for tech rollouts.",
      category: "Ops Redesign & Workflow Optimization",
      status: "Live in Production",
      impact: "From 8 Minutes to 3 — Rebuilt, Recolored, Reimagined",
      type: "process",
    },
    {
      title: "The Inventory Games",
      image: "/images/inventory-games.png",
      video: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/20250723_0301_Warehouse%20Chaos%20Unfolds_simple_compose_01k0v1cag9fp3bs0n5yt826f9j-JsJ0plembDzWcuVwgjeaiJwyxhiOGY.mp4",
      dialogVideo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/20250723_0301_Warehouse%20Chaos%20Unfolds_simple_compose_01k0v1cag9fp3bs0n5yt826f9j-JsJ0plembDzWcuVwgjeaiJwyxhiOGY.mp4",
      badge: "Global Scale",
      badgeColor: "bg-purple-600",
      year: "2022",
      cast: "Safinaz Elhadary, Inventory Managers, Warehouse Leads",
      location: "Global deployment across 7 warehouses",
      challenge: "Too many SKUs. Not enough time. No clear priorities.",
      description:
        "Warehouse teams were trying to count everything. Every SKU. Every location. Every cycle. With thousands of items and limited resources, the process was exhausting and completely unsustainable. I built a smarter system. Using volume, movement frequency, and value, I developed a formula that assigns each SKU to one of four categories: A items – counted every 2 weeks, B items – monthly, C items – every 6 months, D items – twice per year. The result was a targeted cycle count strategy that kept inventory accurate without overwhelming the teams. The system was deployed across 7 countries, giving global teams a clear, scalable framework that actually works.",
      category: "Inventory Prioritization & Cycle Count Design",
      status: "Live in Production",
      impact: "From Chaos to Clarity in 7 Countries",
      type: "warehouse",
    },
    {
      title: "Thirteen Thousand Reasons Why",
      image: "/images/thirteen-thousand-reasons.png",
      video: "/videos/thirteen-thousand-reasons.mp4",
      dialogVideo: "/videos/thirteen-thousand-reasons.mp4",
      badge: "Workflow Engineering",
      badgeColor: "bg-green-600",
      year: "2025",
      duration: "2 weeks",
      cast: "Safinaz Elhadary, Fulfillment Team",
      location: "Erie, PA",
      challenge:
        "No tracking logic. No batch label system. Two-week deadline. 13,000 devices. All of them had to be right.",
      description:
        "A major U.S.-based tech client needed to ship 13,000 tablets to stores across the country. Each tablet required a valid courier label, a scanned serial number, and a confirmed match to a store ID. There was no scalable system to make that happen and no margin for error. I built the entire workflow. I created a system to batch generate thousands of courier labels automatically. Then I designed 13 connected workstations where each operator could print labels, scan and tag serial numbers, and instantly verify that the courier label was still valid. The logic ensured zero duplication and mapped each tablet to the right destination with complete visibility. The flow worked. We shipped 13,000 tablets in under two weeks. No label failures. No mismatched serials. No confusion. Just a clean system that worked at scale and became the new standard.",
      category: "Courier Workflow Engineering & Asset Fulfillment",
      status: "Live in Production",
      impact: "Every Serial Mattered. Every Label Counted.",
      type: "process",
    },
    {
      title: "Mission: Expansion",
      image: "/images/mission-expansion.png",
      video: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/newv-PDLs4EPORX5LO21n1MwZ8QhCRODCEY.mp4",
      dialogVideo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/newv-PDLs4EPORX5LO21n1MwZ8QhCRODCEY.mp4",
      badge: "Global Expansion",
      badgeColor: "bg-orange-600",
      year: "2021 - Present",
      duration: "Ongoing",
      cast: "Safinaz Elhadary, Regional Ops Leads, LP Global Leadership",
      location: "Cairo, Egypt & Dubai, UAE",
      challenge: "No office. No entity. No team. Just a mandate to build.",
      description:
        "Logistics Plus wanted to expand operations into the Middle East — and I was asked to lead it. I opened full operations in Egypt and the UAE from scratch. That meant handling everything from legal entity setup to hiring the right team, launching warehouses, and onboarding clients. In Egypt, I became the founding team member and built out both commercial and operational infrastructure. In the UAE, I led the launch strategy, local licensing, staffing plans, and built client-specific SOPs to go live quickly. I navigated compliance, built trust with global leadership, and turned two blank pages into active, revenue-generating offices.",
      category: "Market Expansion & Entity Launch",
      status: "Live in Production",
      impact: "Two Countries. Zero Playbook. One Global Launch.",
      type: "expansion",
    },
    {
      title: "Gone with the Charge",
      subtitle: "No Money Left Behind",
      image: "/images/gone-with-the-charge.png",
      video: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wdw-34vDje0dNnuAeICMhCaEj0gY2YjAlM.mp4",
      dialogVideo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wdw-34vDje0dNnuAeICMhCaEj0gY2YjAlM.mp4",
      badge: "Revenue Recovery",
      badgeColor: "bg-green-600",
      year: "2024",
      cast: "Safinaz Elhadary, Finance Ops, Warehouse Leads",
      location: "Global client implementation",
      challenge: "Missed service codes. Lost revenue. Slow processing.",
      description:
        "Warehouses were manually entering service codes to trigger charges, but the process was inconsistent and error-prone. Missed entries meant missed revenue — and manual cleanup was eating time. I designed a system that automatically calculates logistics service charges using smart formulas based on order data. Now, instead of depending on warehouse staff to record codes, the system tracks service triggers and applies the correct charge instantly. The result is increased profitability, faster turnaround, and cleaner invoicing with less human input. No more guesswork. No more missed revenue. No more slowdowns.",
      category: "Invoicing Automation & Profit Recovery",
      status: "Live in Production",
      impact: "Profit Up. Entry Time Down. Accuracy Locked.",
      type: "automation",
    },
  ]

  // Organize projects by categories
  const recentProjects = portfolioItems.filter((item) => ["2024", "2025"].includes(item.year))
  const automationProjects = portfolioItems.filter((item) => item.type === "automation")
  const warehouseProjects = portfolioItems.filter((item) => item.type === "warehouse")
  const processProjects = portfolioItems.filter((item) => item.type === "process")
  const globalProjects = portfolioItems.filter(
    (item) => item.type === "expansion" || item.location?.includes("Global") || item.location?.includes("countries"),
  )

  const handleProjectClick = (project) => {
    setSelectedProject(project)
    setIsDialogOpen(true)
    setShowVideo(false)

    if (project.dialogVideo) {
      setTimeout(() => {
        setShowVideo(true)
      }, 2000)
    }
  }

  const handleViewLive = () => {
    if (selectedProject?.dialogVideo) {
      setShowVideo(true)
      if (videoRef.current) {
        videoRef.current.currentTime = 0
        videoRef.current.play().catch(console.error)
      }
    }
  }

  const handleDialogClose = () => {
    setIsDialogOpen(false)
    setSelectedProject(null)
    setShowVideo(false)
  }

  useEffect(() => {
    if (showVideo && videoRef.current) {
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.currentTime = 0
          videoRef.current.play().catch((error) => {
            console.log("Video autoplay failed:", error)
          })
        }
      }, 100)
    }
  }, [showVideo])

  const ProjectRow = ({ title, projects }) => (
    <section className="mb-8 md:mb-12">
      <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 px-4 md:px-8 lg:px-16">{title}</h2>
      <div className="px-4 md:px-8 lg:px-16">
        <div className="flex space-x-3 md:space-x-4 overflow-x-auto pb-4 scrollbar-hide">
          {projects.map((item, index) => (
            <div
              key={index}
              className="relative flex-shrink-0 group cursor-pointer"
              onClick={() => handleProjectClick(item)}
            >
              <div className="relative w-36 h-52 md:w-48 md:h-72 rounded-lg overflow-hidden">
                {item.video ? (
                  <video
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    muted
                    loop
                    preload="metadata"
                    poster={item.image}
                    onMouseEnter={(e) => {
                      e.target.currentTime = 0
                      e.target.play().catch(console.error)
                    }}
                    onMouseLeave={(e) => {
                      e.target.pause()
                      e.target.currentTime = 0
                    }}
                  >
                    <source src={item.video} type="video/mp4" />
                  </video>
                ) : (
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                {item.badge && (
                  <Badge className={`absolute top-2 left-2 ${item.badgeColor} text-white text-xs`}>{item.badge}</Badge>
                )}

                <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4 right-2 md:right-4">
                  <h3 className="font-semibold text-xs md:text-sm mb-2">{item.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-sm">
        <div className="flex items-center justify-between px-4 md:px-8 lg:px-16 py-3 md:py-4">
          <div className="flex items-center space-x-4 md:space-x-8">
            <Link href="/">
              <div
                className="text-red-600 text-xl md:text-2xl font-bold tracking-tight font-sans uppercase cursor-pointer"
                style={{ fontFamily: "Arial Black, sans-serif", letterSpacing: "-0.05em" }}
              >
                Safinaz
              </div>
            </Link>
            <nav className="hidden lg:flex space-x-6">
              <Link href="/" className="hover:text-gray-300 transition-colors text-sm">
                Home
              </Link>
              <Link href="/projects" className="text-white font-semibold text-sm">
                Projects
              </Link>
              <Link href="/contact" className="hover:text-gray-300 transition-colors text-sm">
                Contact
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-3 md:space-x-4">
            <Search className="w-5 h-5 md:w-6 md:h-6 cursor-pointer hover:text-gray-300" />
            <div className="relative">
              <Bell className="w-5 h-5 md:w-6 md:h-6 cursor-pointer hover:text-gray-300" />
              <span className="absolute -top-1 -right-1 bg-red-600 text-xs rounded-full w-3 h-3 md:w-4 md:h-4 flex items-center justify-center text-[10px] md:text-xs">
                3
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-2 cursor-pointer">
              <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded"></div>
              <ChevronDown className="w-4 h-4" />
            </div>
            <button className="lg:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-black/95 backdrop-blur-sm border-t border-gray-800">
            <nav className="flex flex-col space-y-4 px-4 py-6">
              <Link
                href="/"
                className="hover:text-gray-300 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link href="/projects" className="text-white font-semibold" onClick={() => setIsMobileMenuOpen(false)}>
                Projects
              </Link>
              <Link
                href="/contact"
                className="hover:text-gray-300 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Page Header */}
      <div className="pt-20 md:pt-24 pb-8">
        <div className="flex items-center justify-between px-4 md:px-8 lg:px-16">
          <div className="flex items-center space-x-4">
            <h1 className="text-3xl md:text-4xl font-bold">Projects</h1>
            <div className="relative">
              <select className="bg-transparent border border-gray-600 rounded px-3 py-1 text-sm appearance-none pr-8">
                <option value="all">All Categories</option>
                <option value="automation">Automation</option>
                <option value="warehouse">Warehouse</option>
                <option value="process">Process</option>
                <option value="expansion">Expansion</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none" />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant={viewMode === "list" ? "default" : "outline"}
              className="p-2"
              onClick={() => setViewMode("list")}
            >
              <List className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant={viewMode === "grid" ? "default" : "outline"}
              className="p-2"
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Project Rows */}
      <div className="pb-8">
        <ProjectRow title="Latest Projects" projects={recentProjects} />
        <ProjectRow title="Automation & AI Solutions" projects={automationProjects} />
        <ProjectRow title="Warehouse Operations" projects={warehouseProjects} />
        <ProjectRow title="Process Engineering" projects={processProjects} />
        <ProjectRow title="Global Scale Projects" projects={globalProjects} />
        <ProjectRow title="All Projects" projects={portfolioItems} />
      </div>

      {/* Project Detail Modal */}
      <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
        <DialogContent className="max-w-5xl w-[95vw] max-h-[95vh] bg-black text-white border-gray-800 p-0 overflow-hidden overflow-y-auto">
          {selectedProject && (
            <div className="relative">
              {/* Hero Section */}
              <div className="relative h-48 md:h-64 lg:h-80 dialog-hero-section">
                {selectedProject.dialogVideo ? (
                  <div className="relative w-full h-full">
                    <Image
                      src={selectedProject.image || "/placeholder.svg?height=400&width=800"}
                      alt={selectedProject.title}
                      fill
                      className={`object-cover transition-opacity duration-500 ${
                        showVideo ? "opacity-0" : "opacity-100"
                      }`}
                    />
                    <video
                      ref={videoRef}
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                        showVideo ? "opacity-100" : "opacity-0"
                      }`}
                      muted
                      loop
                      playsInline
                      poster={selectedProject.image}
                      controls={showVideo}
                    >
                      <source src={selectedProject.dialogVideo} type="video/mp4" />
                    </video>
                  </div>
                ) : (
                  <Image
                    src={selectedProject.image || "/placeholder.svg?height=400&width=800"}
                    alt={selectedProject.title}
                    fill
                    className="object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                <button
                  onClick={handleDialogClose}
                  className="absolute top-2 right-2 md:top-4 md:right-4 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors z-50"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
                  <div className="mb-2 md:mb-4">
                    <Badge className={`${selectedProject.badgeColor} text-white mb-2 text-xs`}>
                      {selectedProject.badge}
                    </Badge>
                  </div>

                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">{selectedProject.title}</h2>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-4">
                    <Button
                      size="lg"
                      className="bg-white text-black hover:bg-gray-200 font-semibold w-full sm:w-auto"
                      onClick={handleViewLive}
                    >
                      <Play className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                      {showVideo ? "Restart Video" : "View Live"}
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-gray-500 text-white hover:bg-gray-800 bg-transparent w-full sm:w-auto"
                    >
                      <Plus className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                      Add to List
                    </Button>
                  </div>
                </div>
              </div>

              {/* Details Section */}
              <div className="p-4 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                  <div className="md:col-span-2">
                    <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-4 text-sm">
                      <span className="text-green-500 font-semibold">{selectedProject.status}</span>
                      <span>{selectedProject.year}</span>
                      <Badge variant="outline" className="border-gray-500 text-white text-xs">
                        {selectedProject.category}
                      </Badge>
                    </div>

                    <h3 className="text-lg md:text-xl font-semibold mb-3">{selectedProject.impact}</h3>
                    <p className="text-gray-300 mb-4 text-sm md:text-base leading-relaxed">
                      {selectedProject.description}
                    </p>
                  </div>

                  <div className="space-y-4 md:pl-4 border-l-0 md:border-l border-gray-800">
                    {selectedProject.cast && (
                      <div>
                        <h4 className="text-sm font-semibold text-gray-400 mb-2">Cast:</h4>
                        <p className="text-gray-300 text-sm">{selectedProject.cast}</p>
                      </div>
                    )}

                    {selectedProject.technologies && selectedProject.technologies.length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold text-gray-400 mb-2">Technologies:</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.technologies.map((tech, index) => (
                            <Badge key={index} variant="outline" className="border-gray-500 text-white text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedProject.location && (
                      <div>
                        <h4 className="text-sm font-semibold text-gray-400 mb-2">Location:</h4>
                        <p className="text-gray-300 text-sm">{selectedProject.location}</p>
                      </div>
                    )}

                    {selectedProject.challenge && (
                      <div>
                        <h4 className="text-sm font-semibold text-gray-400 mb-2">The Challenge:</h4>
                        <p className="text-gray-300 text-sm">{selectedProject.challenge}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
