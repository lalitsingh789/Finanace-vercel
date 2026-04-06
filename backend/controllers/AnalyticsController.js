const Transaction = require("../models/Transaction");

exports.getAnalyticsSummary = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    let query = {};
    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const transactions = await Transaction.find(query);

    let totalIncome = 0;
    let totalExpense = 0;
    const categoryGroup = {};
    const dailyGroup = {};

    transactions.forEach((t) => {
      if (t.type === "income") {
        totalIncome += t.amount;
      } else if (t.type === "expense") {
        totalExpense += t.amount;

        if (!categoryGroup[t.category]) categoryGroup[t.category] = 0;
        categoryGroup[t.category] += t.amount;

        const dateStr = new Date(t.date).toLocaleDateString("en-US", { month: "short", day: "numeric" });
        if (!dailyGroup[dateStr]) dailyGroup[dateStr] = 0;
        dailyGroup[dateStr] += t.amount;
      }
    });

    const breakdown = Object.keys(categoryGroup).map((category) => {
      const amount = categoryGroup[category];
      const percentage = totalExpense > 0 ? ((amount / totalExpense) * 100).toFixed(1) : 0;
      return { category, amount, percentage: parseFloat(percentage) };
    });
    breakdown.sort((a, b) => b.amount - a.amount);

    const dailySpendArray = [];
    let peakSpend = { amount: 0, date: "-" };
    let lowestSpend = { amount: Infinity, date: "-" };

    Object.keys(dailyGroup).forEach((date) => {
      const amt = dailyGroup[date];
      dailySpendArray.push({ date, amount: amt });

      if (amt > peakSpend.amount) peakSpend = { amount: amt, date };
      if (amt < lowestSpend.amount) lowestSpend = { amount: amt, date };
    });

    if (lowestSpend.amount === Infinity) lowestSpend = { amount: 0, date: "-" };

    const activeDaysCount = Object.keys(dailyGroup).length || 1;
    const averageDailySpend = totalExpense / activeDaysCount;

    res.json({
      stats: {
        totalIncome,
        totalSpend: totalExpense,
        averageDailySpend,
        averageMonthlySpend: totalExpense, 
        averageYearlySpend: totalExpense,  
        peakSpend,
        lowestSpend
      },
      breakdown,
      dailySpend: dailySpendArray
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};