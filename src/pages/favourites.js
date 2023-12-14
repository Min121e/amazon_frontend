import { StarIcon } from '@heroicons/react/24/solid'
import Header from '@/components/Header'
import Image from 'next/legacy/image'
import React, { useRef, useState, useEffect } from 'react'
import prime from '../../images/prime.png'
import emptyCart from '../../images/emptyCart.png'
import checkoutbanner from '../../images/checkoutbanner.webp'
import { useSelector } from 'react-redux'
import { removeFromFavorite, selectFavourties, selectTotal } from '@/slices/amazonSlice'
import Currency from 'react-currency-formatter'
// import { useSession } from 'next-auth/react'
import Footer from '@/components/footer/Footer.js';
import { removeFromCart, clearFavourite, quantityIncrement, quantityDecrement, sendProductsToCart } from '../slices/amazonSlice'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { motion, AnimatePresence } from 'framer-motion';
import { AiFillCheckCircle } from 'react-icons/ai';
import axios from 'axios';


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

    

    const products = useSelector(selectFavourties)
    const dispatch = useDispatch()
    
    const total = useSelector(selectTotal)
    // const { data: session } = useSession()

    const router = useRouter()

    

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
                                    <p className='font-bold text-xl'>Your Favourites Cart feels lonely.</p>
                                    <p className='text-sm text-center pt-2'>Your Favourites Shopping cart lives to serve. Give it purpose - fill it with books, electronics, videos, etc. and make it happy.</p>
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
                                    <p>Favourite Basket</p>
                                    {/* <p>Subtotal</p> */}
                                </div> 
                        

                        {/* <div> */}
                            {products.map((item, i) => (


                                    <div className='grid grid-cols-5 border-b-[1px] border-b-gray-200 pb-10 mb-10'>
                                        <img src={item.src} alt='shit' height={200} width={200} objectFit='contain' />

                                        {/* Middle */}
                                        <div className='col-span-4 mx-5'>
                                            <p className='font-medium'>{item.title}</p>
                                            
                                            <p className='text-sm my-2 line-clamp-3 text-justify'>{item.description}</p>
                                            
                                            
                                            <div className='flex mt-5 justify-between'>
                                                <p>Unit price : <span className='font-semibold'><Currency quantity={item.price}/></span></p>
                                            </div>

                                            <button
                                                onClick={() => dispatch(removeFromFavorite(item.id))} 
                                                className=' bg-red-500 text-white flex justify-center items-center gap-3 px-10 py-2 mt-5 mb-2 hover:bg-red-700 active:bg-red-900 drop-shadow-lg rounded-md'>Remove item
                                            </button>
                                        </div>
                                        
                                    </div>
                                                                
                            ))}
                        {/* </div> */}
                        {products.length > 0 
                            && <div>
                                    <button
                                        onClick={() => dispatch(clearFavourite())}
                                        className='bg-red-500 w-48 font-semibold text-lg text-white flex justify-center items-center gap-3 px-2 py-2 mb-2 hover:bg-red-700 active:bg-red-900 drop-shadow-lg rounded-md' >Clear Favourite
                                    </button>
                                </div>}
                        

                    </div>
                }
            </div>

            
        </main>

        <Footer />
    </div>
  )
}

export default Checkout
