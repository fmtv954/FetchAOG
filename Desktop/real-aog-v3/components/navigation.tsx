import Link from "next/link"
import { Plane } from 'lucide-react'

export function Navigation() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-blue-600 text-white">
      <div className="container flex h-14 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Plane className="h-6 w-6" />
          <span className="text-xl font-bold">Real-AOG.info</span>
        </Link>
        <nav className="flex gap-6">
          <Link href="/" className="text-sm font-medium hover:text-blue-100">
            Home
          </Link>
          <Link href="/about" className="text-sm font-medium hover:text-blue-100">
            About
          </Link>
          <Link href="/contact" className="text-sm font-medium hover:text-blue-100">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  )
}

