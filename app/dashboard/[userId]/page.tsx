"use client"

import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, CreditCard, DollarSign, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { calculateCreditScore } from "@/lib/credit-score"
import { getUserData } from "@/lib/user-data"

import React from "react"

export default function DashboardPage({ params }: { params: { userId: string } }) {
  const { userId } = params

  const userData = getUserData(userId)

  // If user not found, show 404 page
  if (!userData) {
    notFound()
  }

  // Calculate the credit score
  const {
    finalScore,
    scaledScore,
    paymentScore,
    debtScore,
    historyScore,
    mixScore,
    paymentData,
    debtData,
    historyData,
    mixData,
  } = calculateCreditScore(userId)

  // Format the score for display
  const formattedScore = Math.round(scaledScore)

  // Determine score category
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
              <span className="font-medium">{userData.name}</span>
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
                <div className="text-3xl font-bold">EGP {userData.currentDebt.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {debtData.usedCredit} of {debtData.creditLimit} credit limit
                </div>
                <Progress value={(debtData.usedCredit / debtData.creditLimit) * 100} className="mt-3 h-2" />
              </CardContent>
            </Card>

            <Card className="bg-white text-slate-900 border border-slate-200 shadow-md transition-shadow hover:shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Last Payment</CardTitle>
                <Users className="h-4 w-4 text-blue-400" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{userData.lastPaymentDate}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Amount: EGP {userData.lastPaymentAmount.toLocaleString()}
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
                          {paymentData.onTimePayments} on-time payments out of {paymentData.totalPayments}
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
                          Using EGP {debtData.usedCredit.toLocaleString()} of EGP{" "}
                          {debtData.creditLimit.toLocaleString()} limit
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
                          {historyData.accountAge} years out of {historyData.maxPossibleAge} years
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
                          {mixData.creditTypesUsed} types used out of {mixData.totalTypesTracked} possible types
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
                    {userData.transactions.map((transaction, index) => (
                      <div key={index} className="flex items-center justify-between border-b pb-2">
                        <div>
                          <div className="font-medium">{transaction.description}</div>
                          <div className="text-sm text-muted-foreground">{transaction.date}</div>
                        </div>
                        <div className={transaction.amount < 0 ? "text-red-500" : "text-green-500"}>
                          {transaction.amount < 0 ? "-" : "+"} EGP {Math.abs(transaction.amount).toLocaleString()}
                        </div>
                      </div>
                    ))}
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
                        <div>{userData.name}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-muted-foreground">User ID</div>
                        <div>{userData.id}</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm font-medium text-muted-foreground">Phone Number</div>
                        <div>{userData.phone}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-muted-foreground">Email</div>
                        <div>{userData.email}</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm font-medium text-muted-foreground">Account Opened</div>
                        <div>{userData.accountOpenDate}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-muted-foreground">Account Type</div>
                        <div>{userData.accountType}</div>
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
