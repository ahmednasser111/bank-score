// This file simulates database connections
// In a real application, these would be actual database connections

// Simulated payment database
export function getPaymentData(userId: string) {
  // In a real app, this would query a database
  // For this demo, we'll return mock data
  const mockData = {
    user1: { onTimePayments: 18, totalPayments: 20 },
    user2: { onTimePayments: 15, totalPayments: 20 },
    user3: { onTimePayments: 20, totalPayments: 20 },
    user4: { onTimePayments: 12, totalPayments: 20 },
    user5: { onTimePayments: 8, totalPayments: 20 },
  }

  // Return data for the user, or default data if user not found
  return mockData[userId as keyof typeof mockData] || { onTimePayments: 18, totalPayments: 20 }
}

// Simulated debt database
export function getDebtData(userId: string) {
  // In a real app, this would query a database
  const mockData = {
    user1: { usedCredit: 3000, creditLimit: 10000 },
    user2: { usedCredit: 5000, creditLimit: 10000 },
    user3: { usedCredit: 1000, creditLimit: 10000 },
    user4: { usedCredit: 7000, creditLimit: 10000 },
    user5: { usedCredit: 9000, creditLimit: 10000 },
  }

  return mockData[userId as keyof typeof mockData] || { usedCredit: 3000, creditLimit: 10000 }
}

// Simulated history database
export function getHistoryData(userId: string) {
  // In a real app, this would query a database
  const mockData = {
    user1: { accountAge: 3, maxPossibleAge: 10 },
    user2: { accountAge: 5, maxPossibleAge: 10 },
    user3: { accountAge: 8, maxPossibleAge: 10 },
    user4: { accountAge: 1, maxPossibleAge: 10 },
    user5: { accountAge: 2, maxPossibleAge: 10 },
  }

  return mockData[userId as keyof typeof mockData] || { accountAge: 3, maxPossibleAge: 10 }
}

// Simulated mix database
export function getMixData(userId: string) {
  // In a real app, this would query a database
  const mockData = {
    user1: { creditTypesUsed: 2, totalTypesTracked: 4 },
    user2: { creditTypesUsed: 3, totalTypesTracked: 4 },
    user3: { creditTypesUsed: 4, totalTypesTracked: 4 },
    user4: { creditTypesUsed: 1, totalTypesTracked: 4 },
    user5: { creditTypesUsed: 2, totalTypesTracked: 4 },
  }

  return mockData[userId as keyof typeof mockData] || { creditTypesUsed: 2, totalTypesTracked: 4 }
}
