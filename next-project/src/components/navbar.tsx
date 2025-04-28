"use client"

import React from "react"
import Link from "next/link"
import { Sparkles, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"
import { ProfileButton } from "@/components/profile-button"
import { usePathname } from "next/navigation"

const menuItems = {
  Services: [
    { label: "Text Generation", href: "#" },
    { label: "Image Creation", href: "#" },
    { label: "Audio Production", href: "#" },
    { label: "Video Synthesis", href: "#" },
    { label: "3D Model Generation", href: "#" },
  ],
  Company: [
    { label: "About Us", href: "#" },
    { label: "Pricing", href: "#" },
    { label: "FAQ", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
  ],
  Resources: [
    { label: "Documentation", href: "#" },
    { label: "API Reference", href: "#" },
    { label: "Support Center", href: "#" },
    { label: "Contact Sales", href: "#" },
    { label: "Status", href: "#" },
  ],
}

export function Navbar() {
  const pathname = usePathname()
  
  return (
    <header className="sticky top-0 z-50 w-full bg-black/90 backdrop-blur">
      <div className="container px-4 mx-auto flex h-14 items-center">
        <div className="flex items-center mr-auto">
          <Link href="/" className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="font-bold text-white">AI Landing Hub</span>
          </Link>
        </div>
        
        <nav className="flex-1 flex justify-center">
          <div className="hidden md:flex items-center space-x-8">
            {Object.entries(menuItems).map(([category, items]) => (
              <div key={category} className="relative group">
                <button className="flex items-center gap-1 text-sm font-medium text-gray-300 hover:text-white transition-colors">
                  {category}
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-48 rounded-md bg-gray-900 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                  <div className="py-1 border border-gray-700 rounded-md">
                    {items.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </nav>
        
        <div className="flex items-center gap-3 ml-auto">
          <ThemeToggle />
          <ProfileButton />
        </div>
      </div>
    </header>
  )
}