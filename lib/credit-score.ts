import { getPaymentData, getDebtData, getHistoryData, getMixData } from "./database"

export function calculateCreditScore(userId: string) {
  // Get data from our simulated databases
  const paymentData = getPaymentData(userId)
  const debtData = getDebtData(userId)
  const historyData = getHistoryData(userId)
  const mixData = getMixData(userId)

  // Calculate individual scores (0-100 scale)

  // 1. Payment History (35% of the score)
  const paymentScore = (paymentData.onTimePayments / paymentData.totalPayments) * 100

  // 2. Outstanding Debt (30% of the score)
  const debtScore = (1 - debtData.usedCredit / debtData.creditLimit) * 100

  // 3. Credit History Age (15% of the score)
  const historyScore = (historyData.accountAge / historyData.maxPossibleAge) * 100

  // 4. Credit Mix (20% of the score)
  const mixScore = (mixData.creditTypesUsed / mixData.totalTypesTracked) * 100

  // Calculate final score (weighted average)
  const finalScore = 0.35 * paymentScore + 0.3 * debtScore + 0.15 * historyScore + 0.2 * mixScore

  // Scale to 300-850 range
  const scaledScore = 300 + (finalScore / 100) * (850 - 300)

  return {
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
  }
}
