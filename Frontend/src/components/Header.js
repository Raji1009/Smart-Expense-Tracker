import React, { useEffect, useState } from 'react';

const categories = ['All', 'Food', 'Travel', 'Bills', 'Shopping', 'Other'];

const Header = ({ query, onQueryChange, filterCategory, onFilterChange, expenses, setExpenses }) => {
  const [dark, setDark] = useState(() => !!localStorage.getItem('smart_dark_mode'));

  useEffect(() => {
    document.body.classList.toggle('dark-mode', dark);
    if (dark) localStorage.setItem('smart_dark_mode', '1');
    else localStorage.removeItem('smart_dark_mode');
  }, [dark]);

  // export CSV (all expenses)
  const exportCSV = () => {
    const all = expenses;
    if (!all.length) return alert('No expenses to export.');
    const rows = [
      ['id','title','amount','category','date'].join(','),
      ...all.map(e => [e.id, `"${e.title.replace(/"/g,'""')}"`, e.amount, e.category, e.date.toISOString()].join(','))
    ].join('\n');

    const blob = new Blob([rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `smart-expenses-${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearAll = () => {
    if (window.confirm('Clear all saved expenses? This cannot be undone.')) {
      setExpenses([]);
    }
  };

  return (
    <header className="app-header">
      <div className="header-left">
        <h1>Smart Expense Tracker</h1>
        <p className="sub">Frontend · React · No backend required</p>
      </div>

      <div className="header-controls">
        <input 
          className="search" 
          placeholder="Search title..." 
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
        />

        <select value={filterCategory} onChange={(e) => onFilterChange(e.target.value)}>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        <button className="btn" onClick={exportCSV} title="Export CSV">Export CSV</button>
        <button className="btn ghost" onClick={clearAll} title="Clear all">Clear</button>

        <div className="dark-toggle">
          <label className="switch">
            <input type="checkbox" checked={dark} onChange={e => setDark(e.target.checked)} />
            <span className="slider" />
          </label>
          <small>Dark</small>
        </div>
      </div>
    </header>
  );
};

export default Header;
