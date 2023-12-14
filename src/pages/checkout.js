import { StarIcon } from '@heroicons/react/24/solid'
import Header from '@/components/Header'
import Image from 'next/legacy/image'
import React, { useRef, useState, useEffect } from 'react'
import prime from '../../images/prime.png'
import emptyCart from '../../images/emptyCart.png'
import checkoutbanner from '../../images/checkoutbanner.webp'
import { useSelector } from 'react-redux'
import { selectItems, selectTotal } from '@/slices/amazonSlice'
import Currency from 'react-currency-formatter'
// import { useSession } from 'next-auth/react'
import Footer from '@/components/footer/Footer.js';
import { removeFromCart, clearCart, quantityIncrement, quantityDecrement, sendProductsToCart } from '../slices/amazonSlice'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { motion, AnimatePresence } from 'framer-motion';
import { AiFillCheckCircle } from 'react-icons/ai';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js'



const Checkout = () => {

    // const [api_token, setapi_token] = useState('');
    // useEffect(() => {
    //     const storedapi_token = localStorage.getItem('api_token');
    //     if (storedapi_token) {
    //         setapi_token(storedapi_token);
    //     }
    // }, []);

    const [apitoken, setapitoken] = useState('');
    const [userid, setuserid] = useState('');
    useEffect(() => {
        const storedUsername = localStorage.getItem('api_token');
        const storedUserid = localStorage.getItem('user_id');
        if (storedUsername && storedUserid) {
            setapitoken(storedUsername);
            setuserid(storedUserid);
        }
    }, []);


    let user_email = localStorage.getItem('user_email')

    

    const products = useSelector(selectItems)
    const dispatch = useDispatch()
    
    const total = useSelector(selectTotal)
    // const { data: session } = useSession()

    const router = useRouter()

    // Stripe Payment
    // const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
    const stripePromise = loadStripe('pk_test_51NSsgYFK9gsn1FVm8fm24nUjiW4ZfGA4xFXprJgA3GX2mcPrIQfYPh4zpKxQ79q5ajlsTDWPzke7JnldcUMkfrWX00DZLDSwZY');


     const handleCheckout = async(e) => {
        e.preventDefault()

        // 2
        try { 

            const stripe = await stripePromise
            const response = await fetch('/api/payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({item:products, email:user_email})
            })
            const checkoutSession = await response.json()
    
            // Redirecting user to Stripe Checkout
            const result = await stripe?.redirectToCheckout({
                sessionId:checkoutSession.id
            })
            if(result.error) {
                alert(result?.error.message)
            }

            const response2 = dispatch(sendProductsToCart);
      
            // Handle the response as needed
            // if (response2.status === 201) {
            //   // Clear the cart in Redux or handle any other logic
            //   dispatch(clearCart());
            //   console.log('Checkout successful');
            // } else {
            //   alert('Failed to complete the checkout process. Please try again later.');
            // }
          } catch (error) {
            console.error('Error during checkout:', error);
            alert('An error occurred during checkout. Please try again later.');
          }
        





        

                
        
       
        
  


    }

  return (
    <div className='bg-gray-100'>
        <Header />

        <main className='lg:flex max-w-screen-2xl mx-auto'>
            {/* Left */}
            <div className='flex-grow'>
                {products.length === 0 
                    ?<AnimatePresence>
                        <h1 className=''> 
                            <motion.div
                                initial={{ y: 70, opacity:0}} 
                                animate={{y: 0, opacity:1}}
                                transition={{ delay: 0.5, duration: 0.5}}
                                className='flex items-center bg-gray-100 justify-center space-x-10 p-20 text-3xl border-b'
                            >
                                <div>
                                    <Image src={emptyCart}/>
                                </div>
                                <div className='w-96 p-4 bg-white flex flex-col items-center justify-center rounded-md shadow-lg'>
                                    <p className='font-bold text-xl'>Your Cart feels lonely.</p>
                                    <p className='text-sm text-center pt-2'>Your Shopping cart lives to serve. Give it purpose - fill it with books, electronics, videos, etc. and make it happy.</p>
                                    <button 
                                        onClick={() => router.push('/')} 
                                        className='mt-6 text-lg font-semibold button'>Continue Shopping
                                    </button>
                                </div>
                            </motion.div>
                        </h1>
                    </AnimatePresence>

                    :<div className='flex flex-col p-5 space-y-10 bg-white m-5 shadow-sm'>
                                <div className='flex justify-between text-3xl border-b p-5 pb-4 bg-white'>
                                    <p>Shopping Basket</p>
                                    <p>Subtotal</p>
                                </div> 
                        

                        {/* <div> */}
                            {products.map((item, i) => (


                                    <div className='grid grid-cols-5 border-b-[1px] border-b-gray-200 pb-10 mb-10'>
                                        <img src={item.src} alt='shit' height={200} width={200} objectFit='contain' />

                                        {/* Middle */}
                                        <div className='col-span-4 mx-5'>
                                            <p className='font-medium'>{item.title}</p>
                                            
                                            
                                            <p className='text-sm my-2 line-clamp-3 text-justify'>{item.description}</p>
                                            
                                            <div className='flex justify-between'>
                                                <p>Unit price : <span className='font-semibold'><Currency quantity={item.price}/></span></p>
                                                <p className='font-semibold'>${item.price * item.quantity}</p>
                                            </div>

                                            <div className='flex space-x-16 mt-3'>
                                                <div className='flex flex-col space-y-2 my-auto '>
                                                    <div className='bg-[#F0F2F2] flex justify-center items-center gap-3 px-2 py-2 mb-2 drop-shadow-lg rounded-md'>
                                                    <p className=''>Quantity:</p>
                                                    <p 
                                                        onClick={() => dispatch(quantityDecrement(item.id))}
                                                        className='cursor-pointer bg-gray-200 px-3 py-1 rounded-md hover:bg-gray-400 duration-300'
                                                    >
                                                        -
                                                    </p>

                                                    <p>{item.quantity}</p>

                                                    <p 
                                                        onClick={() => dispatch(quantityIncrement(item.id))}
                                                        className='cursor-pointer bg-gray-200 px-3 py-1 rounded-md hover:bg-gray-400 duration-300'
                                                    >
                                                        +
                                                    </p>
                                                    </div>
                                                    <button
                                                        onClick={() => dispatch(removeFromCart(item.id))} 
                                                        className='bg-red-500 text-white flex justify-center items-center gap-3 px-2 py-2 mb-2 hover:bg-red-700 active:bg-red-900 drop-shadow-lg rounded-md'>Delete item</button>
                                                </div>
                                            
                                               
                                            </div>
                                            
                                        </div>
                                        
                                    </div>
                                                                
                            ))}
                        {/* </div> */}
                        {products.length > 0 
                            && <div>
                                    <button
                                        onClick={() => dispatch(clearCart())}
                                        className='bg-red-500 w-48 font-semibold text-lg text-white flex justify-center items-center gap-3 px-2 py-2 mb-2 hover:bg-red-700 active:bg-red-900 drop-shadow-lg rounded-md' >Clear Cart
                                    </button>
                                </div>}
                        

                    </div>
                }
            </div>

            

            {/* Right */}
                {products.length > 0 && (

                    <div>
                        <div className='flex flex-col bg-white w-64 mt-5 mr-5 p-10 shadow-sm'>
                            <div className='whitespace-wrap'>
                                <p className='flex items-start gap-2 text-sm font-medium text-justify'>
                                    <span>
                                        <AiFillCheckCircle className='text-green-500 text-2xl -ml-6 '/>    
                                    </span>
                                    Your order qualifies for FREE Shipping Choose this option at checkout. See detail....
                                </p>
                                <p className='pt-1 pb-2 text-end font-medium'>
                                    Total (<span className='font-semibold'>{products.length}</span> items) : {" "}
                                    <span className='font-bold'>
                                        <Currency quantity={total}/>
                                    </span>
                                </p>
                                
                            </div>

                            <button 
                                onClick={handleCheckout}
                                role='link'
                                className='button mt-2 font-semibold text-md'
                            >
                                <p>Sign in to checkout</p>
                            </button>
                        </div>
                    </div>

                    
                )} 
        </main>

        <Footer />
    </div>
  )
}

export default Checkout
