import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import ExpenseChart from './components/ExpenseChart';
import SummaryPanel from './components/SummaryPanel';

const LOCAL_KEY = 'smart_expenses_v1';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [query, setQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  // load from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LOCAL_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        // revive Date objects
        const revived = parsed.map(e => ({ ...e, date: new Date(e.date) }));
        setExpenses(revived);
      }
    } catch (e) {
      console.warn('Failed to load saved expenses', e);
    }
  }, []);

  // save to localStorage
  useEffect(() => {
    const toSave = expenses.map(e => ({ ...e, date: e.date.toISOString() }));
    localStorage.setItem(LOCAL_KEY, JSON.stringify(toSave));
  }, [expenses]);

  const addExpense = (expense) => {
    setExpenses(prev => [expense, ...prev]);
    setEditingExpense(null);
  };

  const updateExpense = (updated) => {
    setExpenses(prev => prev.map(e => (e.id === updated.id ? updated : e)));
    setEditingExpense(null);
  };

  const deleteExpense = (id) => {
    setExpenses(prev => prev.filter(e => e.id !== id));
    if (editingExpense && editingExpense.id === id) setEditingExpense(null);
  };

  const startEdit = (id) => {
    const found = expenses.find(e => e.id === id);
    if (found) setEditingExpense(found);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // derived filtered list for list & chart
  const filtered = expenses.filter(e => {
    const matchesQuery = e.title.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = filterCategory === 'All' ? true : e.category === filterCategory;
    return matchesQuery && matchesCategory;
  });

  return (
    <div className="app-root">
      <Header 
        query={query}
        onQueryChange={setQuery}
        filterCategory={filterCategory}
        onFilterChange={setFilterCategory}
        expenses={expenses}
        setExpenses={setExpenses}
      />

      <main className="container">
        <ExpenseForm 
          onAddExpense={addExpense} 
          onUpdateExpense={updateExpense}
          editingExpense={editingExpense}
        />

        <SummaryPanel expenses={filtered} />

        <ExpenseChart expenses={filtered} />

        <ExpenseList 
          expenses={filtered} 
          onDelete={deleteExpense} 
          onEdit={startEdit}
        />
      </main>
    </div>
  );
}

export default App;
