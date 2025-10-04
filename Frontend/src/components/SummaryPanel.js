import React, { useMemo } from 'react';

const SummaryPanel = ({ expenses }) => {
  const now = new Date();

  const stats = useMemo(() => {
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay()); // sunday start

    let monthTotal = 0, weekTotal = 0, highestCat = null;
    const byCat = {};

    for (const e of expenses) {
      const d = new Date(e.date);
      if (d >= startOfMonth) monthTotal += e.amount;
      if (d >= startOfWeek) weekTotal += e.amount;
      byCat[e.category] = (byCat[e.category] || 0) + e.amount;
    }

    let max = 0;
    for (const k of Object.keys(byCat)) {
      if (byCat[k] > max) {
        max = byCat[k]; highestCat = k;
      }
    }

    const total = expenses.reduce((s, e) => s + e.amount, 0);

    return { monthTotal, weekTotal, total, highestCat, byCat };
  }, [expenses, now]);

  return (
    <section className="summary card">
      <div className="summary-item">
        <div className="label">This month</div>
        <div className="value">₹{stats.monthTotal.toFixed(2)}</div>
      </div>
      <div className="summary-item">
        <div className="label">This week</div>
        <div className="value">₹{stats.weekTotal.toFixed(2)}</div>
      </div>
      <div className="summary-item">
        <div className="label">Total saved (all)</div>
        <div className="value">₹{stats.total.toFixed(2)}</div>
      </div>
      <div className="summary-item">
        <div className="label">Top category</div>
        <div className="value">{stats.highestCat || '—'}</div>
      </div>
    </section>
  );
};

export default SummaryPanel;
