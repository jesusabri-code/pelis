"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const deviceSizes = [
  { name: "iPhone SE", width: 375, height: 667, type: "mobile" },
  { name: "iPhone 12/13/14", width: 390, height: 844, type: "mobile" },
  { name: "iPhone 14 Plus", width: 428, height: 926, type: "mobile" },
  { name: "iPhone 14 Pro Max", width: 430, height: 932, type: "mobile" },
  { name: "Samsung Galaxy S21", width: 384, height: 854, type: "mobile" },
  { name: "Google Pixel 6", width: 393, height: 851, type: "mobile" },
  { name: "iPad Mini", width: 744, height: 1133, type: "tablet" },
  { name: "iPad Air", width: 820, height: 1180, type: "tablet" },
  { name: 'iPad Pro 11"', width: 834, height: 1194, type: "tablet" },
  { name: 'iPad Pro 12.9"', width: 1024, height: 1366, type: "tablet" },
  { name: "Surface Duo", width: 540, height: 720, type: "mobile" },
  { name: "Galaxy Fold", width: 280, height: 653, type: "mobile" },
]

export default function MobileTestOverlay() {
  const [selectedDevice, setSelectedDevice] = useState(null)
  const [isVisible, setIsVisible] = useState(false)

  if (!isVisible) {
    return (
      <Button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 left-4 z-50 bg-blue-600 hover:bg-blue-700"
        size="sm"
      >
        📱 Test Devices
      </Button>
    )
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white text-black rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Mobile Device Testing</h2>
          <Button onClick={() => setIsVisible(false)} variant="outline" size="sm">
            ✕ Close
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {deviceSizes.map((device) => (
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
                <Badge variant={device.type === "mobile" ? "default" : "secondary"} className="text-xs">
                  {device.type}
                </Badge>
              </div>
              <p className="text-xs text-gray-600">
                {device.width} × {device.height}px
              </p>
              <div className="mt-2 bg-gray-200 rounded h-16 flex items-center justify-center">
                <div
                  className="bg-gray-800 rounded"
                  style={{
                    width: `${Math.min(device.width / 10, 40)}px`,
                    height: `${Math.min(device.height / 15, 50)}px`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {selectedDevice && (
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">
              Testing: {selectedDevice.name} ({selectedDevice.width} × {selectedDevice.height}px)
            </h3>

            <div className="bg-gray-100 p-4 rounded-lg mb-4">
              <h4 className="font-semibold mb-2">✅ Test Checklist:</h4>
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
                  <span>Buttons are touch-friendly</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span>Cards scroll horizontally</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span>Videos play on hover/touch</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span>Modal opens properly</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span>Modal content is readable</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span>No horizontal overflow</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span>Touch targets are 44px+</span>
                </label>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">📋 Testing Instructions:</h4>
              <ol className="text-sm space-y-1 list-decimal list-inside">
                <li>Open browser developer tools (F12)</li>
                <li>Click the device toggle icon (📱)</li>
                <li>Select "{selectedDevice.name}" or set custom dimensions</li>
                <li>Test all interactive elements</li>
                <li>Check for layout issues and text readability</li>
                <li>Verify touch interactions work properly</li>
                <li>Test both portrait and landscape orientations</li>
              </ol>
            </div>
          </div>
        )}

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-semibold mb-2">🔧 Common Mobile Issues to Check:</h4>
          <ul className="text-sm space-y-1 list-disc list-inside">
            <li>
              <strong>Text too small:</strong> Ensure minimum 16px font size
            </li>
            <li>
              <strong>Touch targets too small:</strong> Minimum 44px × 44px
            </li>
            <li>
              <strong>Horizontal scrolling:</strong> Content should fit viewport width
            </li>
            <li>
              <strong>Video autoplay:</strong> May be blocked on mobile browsers
            </li>
            <li>
              <strong>Hover effects:</strong> Should work with touch interactions
            </li>
            <li>
              <strong>Modal sizing:</strong> Should not exceed viewport dimensions
            </li>
            <li>
              <strong>Performance:</strong> Check loading times on slower connections
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
