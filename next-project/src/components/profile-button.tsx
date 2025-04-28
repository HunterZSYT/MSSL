"use client"

import * as React from "react"
import { User } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ProfileButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="rounded-full bg-gray-800 border border-gray-700 text-gray-200 hover:text-white hover:bg-gray-700"
        >
          <User className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Profile</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-gray-900 border border-gray-700" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none text-gray-200">Account</p>
            <p className="text-xs leading-none text-gray-400">
              Sign in to access your profile
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-gray-700" />
        <DropdownMenuGroup>
          <DropdownMenuItem className="text-gray-300 focus:text-white focus:bg-gray-800">
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem className="text-gray-300 focus:text-white focus:bg-gray-800">
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem className="text-gray-300 focus:text-white focus:bg-gray-800">
            Billing
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-gray-700" />
        <DropdownMenuItem className="text-gray-300 focus:text-white focus:bg-gray-800">
          Sign In
        </DropdownMenuItem>
        <DropdownMenuItem className="text-gray-300 focus:text-white focus:bg-gray-800">
          Sign Up
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}