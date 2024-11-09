// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// const Income = ({ id }) => {
//   const [formData, setFormData] = useState({
//     title: '',
//     amount: '',
//     category: '',
//     description: '',
//     date: '',
   
//   });
//   const [editFormData, setEditFormData] = useState({
//     title: '',
//     amount: '',
//     category: '',
//     description: '',
//     date: '',
   
//   });
  
//   const [incomes, setIncomes] = useState([]);
//   const [error, setError] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
//   const [editId, setEditId] = useState(-1);

//   const fetchIncomeEntries = async () => {
//     try {
//         const response = await fetch('http://localhost:3000/api/income');  // Adjust if necessary

//         const data = await response.json();
//         // setIncomes(data);
//         console.log(data);
//     } catch (error) {
//         console.error("Error fetching income entries:", error);
//         setError("Failed to fetch income entries.");
//     }
// };
// const handleUpdate =()=>{

// }
// // Delete income entry
// const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this income entry?")) {
//         try {
//             const response = await fetch(`http://localhost:3001/api/income/${id}`, {
//                 method: 'DELETE',
//             });
//             if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
//             fetchIncomeEntries(); // Refresh the list after deletion
//         } catch (error) {
//             console.error("Error deleting income entry:", error);
//             setError("Failed to delete income entry.");
//         }
//     }
// };

// useEffect(() => {
//     fetchIncomeEntries();
// }, []);
  
//   // Handle input change for form fields
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [name]: value,
//     }));
//     setEditFormData((prevFormData) => ({
//       ...prevFormData,
//       [name]: value,
//     }));
//   };

//   // Submit form data to the backend
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccessMessage('');

//     try {
//       const response = await fetch('http://localhost:3000/api/income',{
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       })

//       if (!response.ok) {
//         throw new Error(`Failed to add income entry: ${response.statusText}`);
//       }

//       const newIncome = await response.json();
//       setSuccessMessage('Income entry added successfully!');
//       setIncomes((prevIncomes) => [...prevIncomes, newIncome]);
//       setFormData({
//         title: '',
//         amount: '',
//         category: '',
//         description: '',
//         date: '',
//       });
//       setEditFormData({
//         title: '',
//         amount: '',
//         category: '',
//         description: '',
//         date: '',
//       });
//     } catch (error) {
//       setError(error.message);
//     }
//   };
//   const handleEdit = async (id, updatedEntry) => {
//     try {
//         const response = await fetch(`http://localhost:3001/api/income/${id}`, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(updatedEntry),
//         });

//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const data = await response.json();
//         console.log("Entry updated successfully:", data);

//         // Update your income list or UI here, for example, refetch entries or update state
//         fetchIncomeEntries();  // Assuming fetchIncomeEntries is your function to load data
//     } catch (error) {
//         console.error("Error updating income entry:", error);
//     }
// };


//   return (
//     <div>
//       <h1>Add Income</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Title:</label>
//           <input
//             type="text"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Amount:</label>
//           <input
//             type="number"
//             name="amount"
//             value={formData.amount}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Category:</label>
//           <input
//             type="text"
//             name="category"
//             value={formData.category}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Description:</label>
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Date:</label>
//           <input
//             type="date"
//             name="date"
//             value={formData.date}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <button type="submit">Add Income</button>
//       </form>
//       {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
//       {error && <p style={{ color: 'red' }}>{error}</p>}

//       <div className="income-container">
//             <h1>Income Entries</h1>
//             {error && <p className="error">{error}</p>}
            
//             <div className="income-list">
//                 {incomes.map(entry => (
//                     <div key={entry._id} className="income-card">
//                     {
//                       editId == -1 ||  editId !== entry._id  ? <>
//                       <h2>{entry.title}</h2>
//                         <p>Amount: ${entry.amount}</p>
//                         <p>Category: {entry.category}</p>
//                         <p>Description: {entry.description}</p>
//                         <p>Date: {new Date(entry.date).toLocaleDateString()}</p>
//                       </>:<>


//                         <div>
//                         <div>
//           <label>Title:</label>
//           <input
//             type="text"
//             name="title"
//             value={editFormData.title}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Amount:</label>
//           <input
//             type="number"
//             name="amount"
//             value={editFormData.amount}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Category:</label>
//           <input
//             type="text"
//             name="category"
//             value={editFormData.category}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Description:</label>
//           <textarea
//             name="description"
//             value={editFormData.description}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Date:</label>
//           <input
//             type="date"
//             name="date"
//             value={editFormData.date}
//             onChange={handleChange}
//             required
//           />
//         </div>
//                         </div>
//                       </>
//                     }
                      
                        
                       
//                         <div className="button-group">
//                            {
//                             editId == -1 || editId !== entry._id ?  <button  className="edit-button" onClick={handleEdit}>Edit</button>:<button onClick={handleUpdate}>Update</button>

//                            }
//                             <button onClick={() => handleDelete(entry._id)} className="delete-button">Delete</button>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     </div>
//   );
// };

// export default Income;
