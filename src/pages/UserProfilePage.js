import React from 'react'
import UserOrder from '../features/user/UserOrders'
import Navbar from '../features/navbar/Navbar'
import UserProfile from '../features/user/UserProfile'

function UserProfilePage() {
  return (
    <Navbar>
        <h1 className="mx-auto text-2xl font-bold">My Profile</h1>
    <UserProfile/>
    </Navbar>
  )
}

export default UserProfilePage