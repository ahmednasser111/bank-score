"use client"
import Link from "next/link"
import { DollarSign } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-white text-slate-900 py-4 px-6 flex items-center justify-between border-b border-slate-200">
        <div className="flex items-center gap-2">
          <DollarSign className="h-6 w-6 text-blue-600" />
          <h1 className="text-xl font-bold">BankScore</h1>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6 bg-gray-50">
        <h2 className="text-3xl font-bold mb-4 text-slate-900">User Not Found</h2>
        <p className="text-muted-foreground mb-6 text-slate-500">The user ID you entered could not be found in our system.</p>
        <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white transition-colors">
          <Link href="/">Return to Login</Link>
        </Button>
      </main>

      <footer className="bg-white text-slate-500 py-4 px-6 text-center border-t border-slate-200">
        <p className="text-sm">© 2025 BankScore. All rights reserved.</p>
      </footer>
    </div>
  )
}
