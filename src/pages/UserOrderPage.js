import React from 'react'
import UserOrder from '../features/user/UserOrders'
import Navbar from '../features/navbar/Navbar'

function UserOrderPage() {
  return (
    <Navbar>
        <h1 className="mx-auto text-3xl font-bold">My Orders</h1>
    <UserOrder/>
    </Navbar>
  )
}

export default UserOrderPage