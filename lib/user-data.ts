// This file simulates a user database
// In a real application, this would be an actual database connection

export function getUserData(userId: string) {
  // In a real app, this would query a database
  // For this demo, we'll return mock data
  const users = {
    user1: {
      id: "user1",
      name: "Ahmed Hassan",
      phone: "+20 123 456 7890",
      email: "ahmed.hassan@example.com",
      currentDebt: 3000,
      lastPaymentDate: "May 5, 2025",
      lastPaymentAmount: 500,
      accountOpenDate: "January 15, 2022",
      accountType: "Premium",
      transactions: [
        { date: "May 5, 2025", description: "Payment", amount: -500 },
        { date: "May 3, 2025", description: "Grocery Store", amount: -120 },
        { date: "May 1, 2025", description: "Salary Deposit", amount: 5000 },
        { date: "April 28, 2025", description: "Restaurant", amount: -250 },
        { date: "April 25, 2025", description: "Online Shopping", amount: -350 },
      ],
    },
    user2: {
      id: "user2",
      name: "Fatima Ali",
      phone: "+20 123 789 4560",
      email: "fatima.ali@example.com",
      currentDebt: 5000,
      lastPaymentDate: "May 3, 2025",
      lastPaymentAmount: 800,
      accountOpenDate: "March 10, 2020",
      accountType: "Gold",
      transactions: [
        { date: "May 3, 2025", description: "Payment", amount: -800 },
        { date: "May 2, 2025", description: "Electronics", amount: -1200 },
        { date: "April 30, 2025", description: "Salary Deposit", amount: 6000 },
        { date: "April 25, 2025", description: "Utility Bill", amount: -300 },
        { date: "April 20, 2025", description: "Clothing Store", amount: -450 },
      ],
    },
    user3: {
      id: "user3",
      name: "Mohamed Ibrahim",
      phone: "+20 111 222 3333",
      email: "mohamed.ibrahim@example.com",
      currentDebt: 1000,
      lastPaymentDate: "May 7, 2025",
      lastPaymentAmount: 1500,
      accountOpenDate: "June 5, 2017",
      accountType: "Platinum",
      transactions: [
        { date: "May 7, 2025", description: "Payment", amount: -1500 },
        { date: "May 5, 2025", description: "Travel Booking", amount: -3000 },
        { date: "May 1, 2025", description: "Salary Deposit", amount: 8000 },
        { date: "April 28, 2025", description: "Furniture", amount: -2000 },
        { date: "April 20, 2025", description: "Bonus", amount: 2000 },
      ],
    },
    user4: {
      id: "user4",
      name: "Layla Mahmoud",
      phone: "+20 109 876 5432",
      email: "layla.mahmoud@example.com",
      currentDebt: 7000,
      lastPaymentDate: "May 1, 2025",
      lastPaymentAmount: 300,
      accountOpenDate: "December 20, 2024",
      accountType: "Standard",
      transactions: [
        { date: "May 1, 2025", description: "Payment", amount: -300 },
        { date: "April 29, 2025", description: "Grocery Store", amount: -150 },
        { date: "April 28, 2025", description: "Salary Deposit", amount: 4000 },
        { date: "April 25, 2025", description: "Mobile Bill", amount: -100 },
        { date: "April 20, 2025", description: "Restaurant", amount: -200 },
      ],
    },
    user5: {
      id: "user5",
      name: "Omar Samir",
      phone: "+20 112 233 4455",
      email: "omar.samir@example.com",
      currentDebt: 9000,
      lastPaymentDate: "April 30, 2025",
      lastPaymentAmount: 200,
      accountOpenDate: "August 15, 2023",
      accountType: "Basic",
      transactions: [
        { date: "April 30, 2025", description: "Payment", amount: -200 },
        { date: "April 28, 2025", description: "Entertainment", amount: -300 },
        { date: "April 25, 2025", description: "Salary Deposit", amount: 3500 },
        { date: "April 20, 2025", description: "Grocery Store", amount: -180 },
        { date: "April 15, 2025", description: "Clothing", amount: -250 },
      ],
    },
  }

  // Return the user data if found, otherwise return null
  return users[userId as keyof typeof users] || null
}
