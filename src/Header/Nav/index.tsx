'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { SearchIcon, Menu, X } from 'lucide-react'
import { ThemeSelector } from '@/providers/Theme/ThemeSelector'

interface HeaderNavProps {
  data: HeaderType
  isMobileMenuOpen: boolean
  onMobileMenuToggle: () => void
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  data,
  isMobileMenuOpen,
  onMobileMenuToggle,
}) => {
  const navItems = data?.navItems || []

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex gap-6 items-center">
        {navItems.map(({ link }, i) => {
          return <CMSLink key={i} {...link} appearance="link" />
        })}
        <Link href="/search">
          <span className="sr-only">Search</span>
          <SearchIcon className="w-5 h-5" />
        </Link>
        <ThemeSelector />
      </nav>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center gap-3">
        <Link href="/search">
          <span className="sr-only">Search</span>
          <SearchIcon className="w-5 h-5" />
        </Link>
        <button
          onClick={onMobileMenuToggle}
          className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative z-60"
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 transition-transform duration-200 rotate-90" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 bg-black/20 backdrop-blur-sm"
          onClick={onMobileMenuToggle}
        />
      )}

      {/* Mobile Menu Slide Panel */}
      <div
        className={`md:hidden fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white dark:bg-gray-900 shadow-xl z-55 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <ThemeSelector />
            </div>
            <button
              onClick={onMobileMenuToggle}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile Navigation Items */}
          <nav className="flex-1 overflow-y-auto p-4">
            <div className="flex flex-col space-y-2">
              {navItems.map(({ link }, i) => {
                return (
                  <div key={i} onClick={onMobileMenuToggle} className="cursor-pointer">
                    <CMSLink
                      {...link}
                      appearance="link"
                      className="text-lg font-medium py-3 px-4 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 hover:scale-[1.02] block"
                    />
                  </div>
                )
              })}
            </div>
          </nav>

          {/* Mobile Menu Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="text-sm text-gray-500 dark:text-gray-400 text-center">
              © 2024 Fountain Movers
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
