import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import UserProfile from '../../components/User/UserProfile'

function UserProfilePage() {
  return (
    <Navbar>
        <h1 className="mx-auto text-2xl font-bold">My Profile</h1>
    <UserProfile/>
    </Navbar>
  )
}

export default UserProfilePage