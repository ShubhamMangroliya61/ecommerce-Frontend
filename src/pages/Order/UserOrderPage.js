import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import UserOrder from '../../components/User/UserOrders'

function UserOrderPage() {
  return (
    <Navbar>
        <h1 className="mx-auto text-3xl font-bold">My Orders</h1>
    <UserOrder/>
    </Navbar>
  )
}

export default UserOrderPage