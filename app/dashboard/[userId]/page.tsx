"use client"

import React from "react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, CreditCard, DollarSign, Users } from "lucide-react"
import axios from "axios"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DashboardPage({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = React.use(params)
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [userData, setUserData] = useState<any>(null)

  useEffect(() => {
    async function fetchUser() {
      setLoading(true)
      setError(null)
      try {
        const res = await axios.get(`http://localhost:5000/get_user_data?user=${userId}`)
        const data = res.data
        if (!data || !data.user_data) throw new Error("User not found")
        setUserData(data)
      } catch (e: any) {
        setError("User not found")
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [userId])

  useEffect(() => {
    if (error) {
      router.replace("/not-found")
    }
  }, [error, router])

  if (loading || !userData) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg text-slate-500">Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg text-red-500">{error}</div>
      </div>
    )
  }

  // Safely access API response data with optional chaining and defaults
  const userArr = userData?.user_data ?? []
  const iscore = userData?.iscore ?? {
    paymentScore: 0,
    debtScore: 0,
    historyScore: 0,
    mixScore: 0,
    iscore: 0
  }
  const currentDebtArr = userData?.current_debt ?? ["0.00", "0.00"]
  const lastPaymentArr = userData?.last_payment ?? ["", "pending"]

  const user = {
    id: userArr[0],
    name: userArr[1],
    email: userArr[2],
    phone: userArr[3],
    accountOpenDate: new Date(userArr[4]).toISOString().split('T')[0],
    accountType: "Standard",
    currentDebt: parseFloat(currentDebtArr[0]),
    creditLimit: parseFloat(currentDebtArr[1]),
    lastPaymentDate: new Date(lastPaymentArr[0]).toISOString().split('T')[0],
    lastPaymentAmount: lastPaymentArr[1] === "pending" ? "Pending" : parseFloat(lastPaymentArr[1]),
  }

  // iScore breakdown
  const paymentScore = iscore.paymentScore * 100
  const debtScore = iscore.debtScore * 100
  const historyScore = iscore.historyScore * 100
  const mixScore = iscore.mixScore * 100
  const finalScore = iscore.iscore * 100
  const scaledScore = Math.round(300 + (iscore.iscore * 550))
  const formattedScore = scaledScore

  // Score category
  let scoreCategory = "Poor"
  let scoreColor = "text-red-500"
  if (scaledScore >= 800) {
    scoreCategory = "Excellent"
    scoreColor = "text-green-600"
  } else if (scaledScore >= 740) {
    scoreCategory = "Very Good"
    scoreColor = "text-green-500"
  } else if (scaledScore >= 670) {
    scoreCategory = "Good"
    scoreColor = "text-blue-500"
  } else if (scaledScore >= 580) {
    scoreCategory = "Fair"
    scoreColor = "text-yellow-500"
  }

  // Only include the actual payment as a transaction if it's not pending
  const transactions = [
    {
      description: "Last Payment",
      date: user.lastPaymentDate,
      amount: user.lastPaymentAmount === "Pending" ? null : user.lastPaymentAmount
    }
  ].filter(t => t.amount !== null)

  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-white text-slate-900 py-4 px-6 flex items-center justify-between border-b border-slate-200">
        <div className="flex items-center gap-2">
          <DollarSign className="h-6 w-6 text-blue-600" />
          <h1 className="text-xl font-bold">BankScore</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="text-blue-600 border-blue-200 bg-white hover:bg-blue-50 transition-colors" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Logout
            </Link>
          </Button>
        </div>
      </header>

      <main className="flex-1 p-6 bg-gray-50">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Welcome back,</span>
              <span className="font-medium">{user.name}</span>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-white text-slate-900 border border-slate-200 shadow-md transition-shadow hover:shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">iScore</CardTitle>
                <CreditCard className="h-4 w-4 text-blue-400" />
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2">
                  <div className={`text-3xl font-bold ${scoreColor}`}>{formattedScore}</div>
                  <div className="text-sm text-muted-foreground">/ 850</div>
                </div>
                <div className="text-xs text-muted-foreground mt-1">{scoreCategory}</div>
                <Progress value={(scaledScore - 300) / 5.5} className="mt-3 h-2" />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>300</span>
                  <span>850</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white text-slate-900 border border-slate-200 shadow-md transition-shadow hover:shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Current Debt</CardTitle>
                <DollarSign className="h-4 w-4 text-blue-400" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">EGP {user.currentDebt.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {/* No credit limit in API, so just show debt */}
                  {/* If you have credit limit, show it here */}
                </div>
                <Progress value={100} className="mt-3 h-2" />
              </CardContent>
            </Card>

            <Card className="bg-white text-slate-900 border border-slate-200 shadow-md transition-shadow hover:shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Last Payment</CardTitle>
                <Users className="h-4 w-4 text-blue-400" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{user.lastPaymentDate}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Amount: {user.lastPaymentAmount === "Pending" ? "Pending" : `EGP ${user.lastPaymentAmount.toLocaleString()}`}
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="score" className="space-y-4">
            <TabsList>
              <TabsTrigger value="score">Score Breakdown</TabsTrigger>
              <TabsTrigger value="transactions">Transaction History</TabsTrigger>
              <TabsTrigger value="details">User Details</TabsTrigger>
            </TabsList>

            <TabsContent value="score" className="space-y-4">
              <Card className="bg-white text-slate-900 border border-slate-200 shadow transition-shadow hover:shadow-lg">
                <CardHeader>
                  <CardTitle>Credit Score Calculation</CardTitle>
                  <CardDescription>Your iScore is calculated based on four main factors</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Payment History (35%)</div>
                        <div className="text-sm text-muted-foreground">
                          {/* No payment count in API */}
                        </div>
                      </div>
                      <div className="font-medium">{paymentScore.toFixed(0)}/100</div>
                    </div>
                    <Progress value={paymentScore} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Outstanding Debt (30%)</div>
                        <div className="text-sm text-muted-foreground">
                          {/* No credit limit in API */}
                        </div>
                      </div>
                      <div className="font-medium">{debtScore.toFixed(0)}/100</div>
                    </div>
                    <Progress value={debtScore} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Credit History Age (15%)</div>
                        <div className="text-sm text-muted-foreground">
                          {/* No account age in API */}
                        </div>
                      </div>
                      <div className="font-medium">{historyScore.toFixed(0)}/100</div>
                    </div>
                    <Progress value={historyScore} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Credit Mix (20%)</div>
                        <div className="text-sm text-muted-foreground">
                          {/* No credit mix details in API */}
                        </div>
                      </div>
                      <div className="font-medium">{mixScore.toFixed(0)}/100</div>
                    </div>
                    <Progress value={mixScore} className="h-2" />
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between font-medium">
                      <div>Final Score (0-100)</div>
                      <div>{finalScore.toFixed(1)}</div>
                    </div>
                    <div className="flex items-center justify-between font-medium mt-2">
                      <div>Scaled Score (300-850)</div>
                      <div className={scoreColor}>{formattedScore}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="transactions" className="space-y-4">
              <Card className="bg-white text-slate-900 border border-slate-200 shadow transition-shadow hover:shadow-lg">
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>Your transaction history for the last 30 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {transactions.length > 0 ? (
                      transactions.map((transaction, index) => (
                        <div key={index} className="flex items-center justify-between border-b pb-2">
                          <div>
                            <div className="font-medium">{transaction.description}</div>
                            <div className="text-sm text-muted-foreground">{transaction.date}</div>
                          </div>
                          <div className={typeof transaction.amount === 'number' ? (transaction.amount < 0 ? "text-red-500" : "text-green-500") : "text-yellow-500"}>
                            {typeof transaction.amount === 'number' ? 
                              `${transaction.amount < 0 ? "-" : "+"} EGP ${Math.abs(transaction.amount).toLocaleString()}` : 
                              "Pending"
                            }
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center text-muted-foreground py-4">No recent transactions</div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="details" className="space-y-4">
              <Card className="bg-white text-slate-900 border border-slate-200 shadow transition-shadow hover:shadow-lg">
                <CardHeader>
                  <CardTitle>User Information</CardTitle>
                  <CardDescription>Your personal and account details</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm font-medium text-muted-foreground">Full Name</div>
                        <div>{user.name}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-muted-foreground">User ID</div>
                        <div>{user.id}</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm font-medium text-muted-foreground">Phone Number</div>
                        <div>{user.phone}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-muted-foreground">Email</div>
                        <div>{user.email}</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm font-medium text-muted-foreground">Account Opened</div>
                        <div>{user.accountOpenDate}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-muted-foreground">Account Type</div>
                        <div>{user.accountType}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <footer className="bg-white text-slate-500 py-4 px-6 text-center border-t border-slate-200">
        <p className="text-sm">© 2025 BankScore. All rights reserved.</p>
      </footer>
    </div>
  )
}
