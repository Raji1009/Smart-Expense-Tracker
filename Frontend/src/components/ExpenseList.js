import React from 'react';
import { categoryColors } from './utils';

const ExpenseList = ({ expenses, onDelete, onEdit }) => {
  if (!expenses.length) {
    return <p className="muted">No expenses found. Add some using the form above.</p>;
  }

  return (
    <div className="expense-list">
      {expenses.map(e => (
        <div key={e.id} className="expense-card animate-in">
          <div className="left">
            <div 
              className="cat-dot" 
              style={{ background: categoryColors[e.category] || '#777' }}
              aria-hidden
            />
            <div>
              <div className="title">{e.title}</div>
              <div className="meta">
                <span className="amount">₹{Number(e.amount).toFixed(2)}</span>
                <span className="sep">•</span>
                <span className="date">{new Date(e.date).toLocaleDateString()}</span>
                <span className="sep">•</span>
                <span className="cat">{e.category}</span>
              </div>
            </div>
          </div>

          <div className="right">
            <button className="btn small" onClick={() => onEdit(e.id)}>Edit</button>
            <button className="btn small danger" onClick={() => {
              if (window.confirm('Delete this expense?')) onDelete(e.id);
            }}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExpenseList;
