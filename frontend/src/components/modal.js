import React from 'react';
import '../components/modal.css'; 

const Modal = ({ isOpen, onClose, onSubmit, data, handleChange, type }) => {
  if (!isOpen) return null;

  const title = type === 'income' ? 'Add Income' : 'Add Expense';
  const editTitle = type === 'income' ? 'Edit Income' : 'Edit Expense';

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{data ? editTitle : title}</h2>
        <form onSubmit={onSubmit}>
          <input
            name="title"
            value={data.title}
            onChange={handleChange}
            placeholder="Title"
            required
          />
          <input
            name="amount"
            type="number"
            value={data.amount}
            onChange={handleChange}
            placeholder="Amount"
            required
          />
          <input
            name="category"
            value={data.category}
            onChange={handleChange}
            placeholder="Category"
            required
          />
        

          <input
            name="description"
            value={data.description}
            onChange={handleChange}
            placeholder="Description"
          />
          <input
            name="date"
            type="date"
            value={data.date ? data.date.split('T')[0] : ''}
            onChange={handleChange}
            required
          />
          <button type="submit">{data ? (type === 'income' ? 'Update Income' : 'Update Expense') : (type === 'income' ? 'Add Income' : 'Add Expense')}</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
