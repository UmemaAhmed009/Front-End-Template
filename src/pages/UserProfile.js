import './cssfiles/UserProfile.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
/* eslint-disable */
import jwt_decode from 'jwt-decode';
import account from '../_mock/account';

export default function UserProfilePage() {
    const [user, setUser] = useState(null);
//   // Sample user data
//   const user = {
//     avatar: 'https://example.com/avatar.jpg',
//     name: 'John Doe',
//     age: 30,
//     email: 'johndoe@example.com',
//     address: '123 Street, City',
//     // ... other user details
//   };
    const navigate = useNavigate();

    let userId = null;
    const cookies = new Cookies();
    const accessToken = cookies.get('accessToken');
    useEffect(() => {
    const fetchUserData = async () => {
        if (accessToken) {
        try {
            const decodedToken = jwt_decode(accessToken);
            userId = decodedToken.userId;
            const response = await axios.get(`http://localhost:3000/user/${userId}`);
            const user = response.data;
            console.log('User', user);
            setUser(user);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
        }
    };

    fetchUserData();
    console.log("USER ID", userId)
    }, [accessToken]);

  return (
    <div className="user-profile-container">
      <h1>User Profile</h1>
      <div className="avatar-container">
        <img className="avatar" src={account.photoURL} alt="User Avatar" />
      </div>
      <div className="profile-details">
        <div className="detail">
          <span className="label">Name:</span>
          <span className="value">{user?.name}</span>
        </div>
        <div className="detail">
          <span className="label">Age:</span>
          <span className="value">{user?.age}</span>
        </div>
        <div className="detail">
          <span className="label">Email:</span>
          <span className="value">{user?.email}</span>
        </div>
      </div>
    </div>
  );
};

