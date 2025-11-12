"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Bell, ChevronDown, Menu, Mail, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import ContactMobileTest from "../../components/contact-mobile-test"

// Custom X (Twitter) icon component
const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

// Custom LinkedIn icon component
const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

export default function ContactPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const socialLinks = [
    {
      name: "X (Twitter)",
      username: "@Safinazelhadry",
      url: "https://x.com/Safinazelhadry",
      icon: XIcon,
      description: "Follow me for updates on automation, logistics, and process engineering insights",
      color: "hover:bg-gray-800",
      badge: "Active",
      badgeColor: "bg-green-600",
    },
    {
      name: "LinkedIn",
      username: "Safinaz Elhadary",
      url: "https://www.linkedin.com/in/safinaz-elhadary-ba0111140/",
      icon: LinkedInIcon,
      description: "Connect with me professionally and see my career journey",
      color: "hover:bg-blue-900",
      badge: "Professional",
      badgeColor: "bg-blue-600",
    },
  ]

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
              <Link href="/projects" className="hover:text-gray-300 transition-colors text-sm">
                Projects
              </Link>
              <Link href="/contact" className="text-white font-semibold text-sm">
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
              <Link
                href="/projects"
                className="hover:text-gray-300 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Projects
              </Link>
              <Link href="/contact" className="text-white font-semibold" onClick={() => setIsMobileMenuOpen(false)}>
                Contact
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 md:pt-24 pb-8 md:pb-16 px-4 md:px-8 lg:px-16">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/50 to-black"></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="mb-4 md:mb-6">
            <Badge variant="secondary" className="bg-red-600 text-white mb-3 md:mb-4 text-xs px-3 py-1">
              📡 Let's Connect
            </Badge>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight px-2">
            Get in Touch
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed px-4">
            Ready to streamline your operations? Have a process that needs fixing? Let's connect and turn your
            operational chaos into scalable success.
          </p>

          <div className="flex flex-col space-y-3 sm:space-y-4 items-center justify-center">
            <div className="flex items-center space-x-2 text-gray-400">
              <Mail className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span className="text-sm sm:text-base">Available for new projects</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-400">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse flex-shrink-0"></div>
              <span className="text-sm sm:text-base text-center">Usually responds within 24 hours</span>
            </div>
          </div>
        </div>
      </section>

      {/* Social Links Section */}
      <section className="px-4 md:px-8 lg:px-16 py-6 md:py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center px-2">Connect With Me</h2>

          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:gap-8">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative bg-gray-900/50 border border-gray-800 rounded-lg p-4 sm:p-6 md:p-8 transition-all duration-300 ${social.color} hover:border-gray-600 active:scale-95 touch-target`}
              >
                <div className="flex items-start justify-between mb-3 md:mb-4">
                  <div className="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-gray-700 transition-colors flex-shrink-0">
                      <social.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-1 truncate">{social.name}</h3>
                      <p className="text-gray-400 text-sm md:text-base truncate">{social.username}</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end space-y-2 flex-shrink-0 ml-2">
                    <Badge className={`${social.badgeColor} text-white text-xs px-2 py-1`}>{social.badge}</Badge>
                    <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
                  </div>
                </div>

                <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-4 px-1">{social.description}</p>

                <div className="flex items-center justify-between">
                  <Button
                    size="sm"
                    className="bg-white text-black hover:bg-gray-200 font-semibold text-sm px-4 py-2 touch-target"
                  >
                    Connect Now
                  </Button>
                  <span className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors hidden sm:inline">
                    Click to visit →
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Contact Info */}
      <section className="px-4 md:px-8 lg:px-16 py-6 md:py-12 bg-gray-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 md:mb-6 px-2">
            Looking for Something Specific?
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
            <div className="p-4 sm:p-6 bg-gray-800/50 rounded-lg">
              <h4 className="font-semibold mb-2 text-sm sm:text-base">🏭 Warehouse Operations</h4>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                Process optimization, inventory management, and workflow design
              </p>
            </div>

            <div className="p-4 sm:p-6 bg-gray-800/50 rounded-lg">
              <h4 className="font-semibold mb-2 text-sm sm:text-base">🤖 Automation Solutions</h4>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                Custom tools, AI integration, and manual process elimination
              </p>
            </div>

            <div className="p-4 sm:p-6 bg-gray-800/50 rounded-lg sm:col-span-2 lg:col-span-1">
              <h4 className="font-semibold mb-2 text-sm sm:text-base">🌍 Global Expansion</h4>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                Market entry, entity setup, and international operations
              </p>
            </div>
          </div>

          <div className="p-4 sm:p-6 bg-red-600/10 border border-red-600/20 rounded-lg">
            <p className="text-red-400 font-semibold mb-2 text-sm sm:text-base">⚡ Quick Response Guarantee</p>
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed px-2">
              I respond to all professional inquiries within 24 hours. For urgent operational issues, reach out on X for
              faster response.
            </p>
          </div>
        </div>
      </section>

      {/* Mobile Test Component - Remove in production */}
      <ContactMobileTest />
    </div>
  )
}
