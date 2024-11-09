import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import "./Profile.css"
import { useNavigate } from 'react-router-dom';
const Profile = () => {
  const [profile, setProfile] = useState({
    name: '',
    email:'',
    phone:'',
    gender: '',
    birthday: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
        const userId = localStorage.getItem('userId');
  
        if (!authToken || !userId) {
          throw new Error("Authentication token or user ID missing");
        }
  
        const response = await axios.get(`http://localhost:5000/user/profile`, {
          headers: { Authorization: `Bearer ${authToken}` },
          params: { userId }  // Send userId as query param
        });
setProfile({
          name: response.data.name,
          email: response.data.email,
          phone:response.data.phone,
          gender: response.data.gender || '',      // Handle gender if not present
          birthday: response.data.birthday ? new Date(response.data.birthday).toISOString().split('T')[0] : ''
        });
       
      } catch (err) {
        setError('Failed to fetch profile data');
       
      }
      finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);
  const handleUpdate = async  () =>{
    try {
      const authToken = localStorage.getItem('authToken');
      const userId = localStorage.getItem('userId');

      if (!authToken || !userId) throw new Error("Authentication token or user ID missing");

      const response = await axios.put(`http://localhost:5000/user/profile`, {
        userId,
        ...profile, // Sending updated profile data
        
      }, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
   
      console.log('Profile updated successfully:', response.data);
      navigate('/dashboard')
      toast(" Successful profile updated");
     
     
    } catch (error) {
      console.error('Error updating profile:', error.response ? error.response.data : error);
      toast("Failed to update profile");
      
    }
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="profile-container">
      <h2>Your Profile</h2>
      <form  className="profile-form">
        <label>Name:</label>
        <input
          type="text"
          value={profile.name}
          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
        />
      
     
            <label htmlFor="email">Email:</label>
            <input
              type="email"
             value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            />
          
            <label htmlFor="phone">Phone:</label>
            <input
              type="text"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
            />
       
        <label>Gender:</label>
        <select
          value={profile.gender}
          onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
     
        <label>Birthday:</label>
        <input
          type="date"
          value={profile.birthday}
          onChange={(e) => setProfile({ ...profile, birthday: e.target.value })}
        />
      
      <button type="button" className="profile-button" onClick={handleUpdate}>
        Save Changes
      </button>
      </form>
    </div>
  );
};

export default Profile;
