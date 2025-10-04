import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const categories = ['Food', 'Travel', 'Bills', 'Shopping', 'Other'];

const ExpenseForm = ({ onAddExpense, onUpdateExpense, editingExpense }) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [date, setDate] = useState(() => new Date().toISOString().slice(0,10));
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (editingExpense) {
      setIsEditing(true);
      setTitle(editingExpense.title);
      setAmount(editingExpense.amount);
      setCategory(editingExpense.category);
      setDate(new Date(editingExpense.date).toISOString().slice(0,10));
    } else {
      setIsEditing(false);
      setTitle('');
      setAmount('');
      setCategory(categories[0]);
      setDate(new Date().toISOString().slice(0,10));
    }
  }, [editingExpense]);

  const reset = () => {
    setTitle('');
    setAmount('');
    setCategory(categories[0]);
    setDate(new Date().toISOString().slice(0,10));
    setIsEditing(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!title.trim() || !amount) {
      return alert('Please provide title and amount.');
    }

    const payload = {
      id: isEditing ? editingExpense.id : uuidv4(),
      title: title.trim(),
      amount: parseFloat(amount),
      category,
      date: new Date(date)
    };

    if (isEditing) onUpdateExpense(payload);
    else onAddExpense(payload);

    reset();
  };

  return (
    <form className="expense-form card" onSubmit={submitHandler}>
      <div className="form-row">
        <input 
          type="text"
          placeholder="Expense title (e.g., Coffee, Bus ticket)"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <input
          type="number"
          placeholder="Amount"
          min="0"
          step="0.01"
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />

        <select value={category} onChange={e => setCategory(e.target.value)}>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        <input 
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
        />
      </div>

      <div className="form-actions">
        <button className="btn" type="submit">{isEditing ? 'Save Changes' : 'Add Expense'}</button>
        {isEditing && <button type="button" className="btn ghost" onClick={reset}>Cancel</button>}
      </div>
    </form>
  );
};

export default ExpenseForm;
