import React, { createContext, useState, useEffect } from "react";

export const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);

  // 🔥 FETCH FROM BACKEND
  const fetchTransactions = async () => {
    try {
      const res = await fetch("https://finanace-vercel.vercel.app/api/transactions");
      const data = await res.json();
      setTransactions(data);
    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 AUTO REFRESH (REAL-TIME SYNC)
  useEffect(() => {
    fetchTransactions();

    const interval = setInterval(() => {
      fetchTransactions();
    }, 1000); // every 1 sec

    return () => clearInterval(interval);
  }, []);

  // 🔥 LOCAL INSTANT UPDATE
  const addTransactionLocal = (newTx) => {
    setTransactions((prev) => [newTx, ...prev]);
  };

  const updateTransactionLocal = (updatedTx) => {
    setTransactions((prev) =>
      prev.map((item) =>
        item._id === updatedTx._id ? updatedTx : item
      )
    );
  };

  const deleteTransactionLocal = (id) => {
    setTransactions((prev) =>
      prev.filter((item) => item._id !== id)
    );
  };

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        fetchTransactions,
        addTransactionLocal,
        updateTransactionLocal,
        deleteTransactionLocal,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};