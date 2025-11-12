"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const mobileDevices = [
  { name: "iPhone SE (2020)", width: 375, height: 667, type: "small" },
  { name: "iPhone 12 Mini", width: 375, height: 812, type: "small" },
  { name: "iPhone 12/13/14", width: 390, height: 844, type: "standard" },
  { name: "iPhone 14 Plus", width: 428, height: 926, type: "large" },
  { name: "iPhone 14 Pro Max", width: 430, height: 932, type: "large" },
  { name: "Samsung Galaxy S21", width: 384, height: 854, type: "standard" },
  { name: "Samsung Galaxy S21 Ultra", width: 412, height: 915, type: "large" },
  { name: "Google Pixel 6", width: 393, height: 851, type: "standard" },
  { name: "Google Pixel 6 Pro", width: 412, height: 892, type: "large" },
  { name: "OnePlus 9", width: 412, height: 919, type: "large" },
]

export default function ContactMobileTest() {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedDevice, setSelectedDevice] = useState(null)

  if (!isVisible) {
    return (
      <Button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 z-50 bg-blue-600 hover:bg-blue-700"
        size="sm"
      >
        📱 Test Contact
      </Button>
    )
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white text-black rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Contact Page Mobile Testing</h2>
          <Button onClick={() => setIsVisible(false)} variant="outline" size="sm">
            ✕ Close
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {mobileDevices.map((device) => (
            <div
              key={device.name}
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                selectedDevice?.name === device.name
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 hover:border-gray-400"
              }`}
              onClick={() => setSelectedDevice(device)}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-sm">{device.name}</h3>
                <Badge
                  variant={device.type === "small" ? "destructive" : device.type === "large" ? "default" : "secondary"}
                  className="text-xs"
                >
                  {device.type}
                </Badge>
              </div>
              <p className="text-xs text-gray-600">
                {device.width} × {device.height}px
              </p>
            </div>
          ))}
        </div>

        {selectedDevice && (
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">
              Testing: {selectedDevice.name} ({selectedDevice.width} × {selectedDevice.height}px)
            </h3>

            <div className="bg-gray-100 p-4 rounded-lg mb-4">
              <h4 className="font-semibold mb-2">📱 Contact Page Mobile Checklist:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span>Header navigation works</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span>Mobile menu opens/closes</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span>Hero text is readable</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span>Social media cards are touch-friendly</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span>Connect buttons are 44px+ tall</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span>Social links open in new tabs</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span>Text is readable (16px+ font)</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span>No horizontal scrolling</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span>Cards stack properly on mobile</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span>Expertise cards are readable</span>
                </label>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 p-4 rounded-lg mb-4">
              <h4 className="font-semibold mb-2">✅ Mobile Optimizations Applied:</h4>
              <ul className="text-sm space-y-1 list-disc list-inside">
                <li>Touch targets are minimum 44px × 44px</li>
                <li>Text size is minimum 16px to prevent zoom</li>
                <li>Social cards stack vertically on mobile</li>
                <li>Proper spacing and padding for small screens</li>
                <li>Safe area handling for newer phones</li>
                <li>Improved button sizing and spacing</li>
                <li>Better mobile navigation experience</li>
              </ul>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">📋 Testing Instructions:</h4>
              <ol className="text-sm space-y-1 list-decimal list-inside">
                <li>Open browser developer tools (F12)</li>
                <li>Click the device toggle icon (📱)</li>
                <li>Select "{selectedDevice.name}" or set custom dimensions</li>
                <li>Test all touch interactions and links</li>
                <li>Verify text readability and button sizes</li>
                <li>Check both portrait and landscape orientations</li>
                <li>Test social media links open correctly</li>
                <li>Ensure no content is cut off or requires horizontal scrolling</li>
              </ol>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
