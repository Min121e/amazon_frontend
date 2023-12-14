import React from 'react'
import Header from '@/components/Header'
import { useDispatch } from 'react-redux'
import { clearCart } from '@/slices/amazonSlice'
import { useRouter } from 'next/router'

const success = () => {
    const router = useRouter()

    const dispatch = useDispatch()

    const handleClick = () => {
        router.push('/')
        dispatch(clearCart())
    }
  return (
    <div>
        <Header />
        <div className='flex flex-col gap-2 items-center justify-center py-20'>
            <h1 className='text-2xl font-semibold'>Thank you for shopping at Amazon</h1>
            <button 
                onClick={handleClick}
                className='mt-6 text-lg font-semibold button'>Continue Shopping
            </button>
        </div>
    </div>
  )
}

export default success