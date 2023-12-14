import Image from 'next/legacy/image'
import logo from '../../images/logo.png'
import { Bars3Icon, MagnifyingGlassIcon, MapPinIcon, ShoppingCartIcon } from '@heroicons/react/24/outline'
import { RiArrowDropDownFill, RiAccountCircleFill, RiArrowRightSLine, RiArrowDownSLine, RiCloseFill } from 'react-icons/ri';
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart } from "react-icons/fa"
import axios from 'axios';

import { useSelector } from 'react-redux'
import { selectItems } from '@/slices/amazonSlice';


const Header = () => {

    const products = useSelector(selectItems)
      
    const [username, setUsername] = useState('');
    useEffect(() => {
        const storedUsername = localStorage.getItem('user_info');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    // const [api_token, setapi_token] = useState('');
    // useEffect(() => {
    //     const storedapi_token = localStorage.getItem('api_token');
    //     if (storedapi_token) {
    //         setapi_token(storedapi_token);
    //     }
    // }, []);

    const api_token = localStorage.getItem('api_token');

    async function logOut() {
        
        const confirmLogout = window.confirm('Are you sure you want to log out?');

        if(confirmLogout) {
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/signout', {}, {
                    headers: {
                        Authorization: `Bearer ${api_token}`
                    }
                })
                // if(response) {
                    console.log(response.data)
                    localStorage.clear();
                    router.push('/');   
                    window.location.reload();   
                // }
            } catch (error) {
                // alert(error.message);
                
                console.error('Axios Error:', error);

                // Alert the error message
                alert(error.message);
            }
        }

    }

    async function loggedinuser() {
        try {
            let response = await axios.get('http://127.0.0.1:8000/api/loggedinuser', {}, {
                    headers: {
                        Authorization: `Bearer ${api_token}`
                    }
                })
                console.log(response.data)
        } catch (error) {
            alert(error);
        }
    }
    


    const ref = useRef()
    useEffect(() => {
        document.body.addEventListener('click',(e) => {
            if(e.target.contains(ref.current)) {
                setSideBar(false)
            }
        })
    }, [ref])
    
    const [showAll, setShowAll] = useState(false) 
    const [sideBar, setSideBar] = useState(false)

    const router = useRouter()


    // try {
    //     const response = axios.get('http://127.0.0.1:8000/api/user/{id}')
    //     console.log(response.data)
    // } catch(error) {
    //     console.log('error')
    // }

    


  return (
    <header>
        {/* Top nav */}
        <div className='flex items-center bg-amazon_blue p-1 flex-grow py-2'>
            <div className='flex items-center mt-2 flex-grow sm:flex-grow-0 '>
                <Image
                    onClick={() => router.push('/')}
                    src={logo}
                    width={150}
                    height={40}
                    objectFit='contain'
                    className='cursor-pointer'
                    alt='logo'
                />
            </div>
            <div onClick={loggedinuser} className='relative flex mx-5 items-center cursor-pointer text-white text-sm whitespace-pre-wrap '>
                    <MapPinIcon className='absolute h-5 mt-4 -ml-5'/>
                    <p className='flex flex-col'>Deliver to <span className='font-bold'>Turkey</span></p>
            </div>

            {/* Search */}
            <div className='hidden sm:flex relative items-center h-10 rounded-md flex-grow cursor-pointer '>
                <span onClick={() => setShowAll(!showAll)} className='flex flex-row items-center justify-center bg-gray-100 h-10 rounded-l-md my-auto pl-2 text-gray-500'>
                    All
                    <span className='text-2xl font-bold'><RiArrowDropDownFill /></span>
                </span>

                {/* Dropdown when clicked */}
                {showAll && ( 
                    <div>
                        <ul className='absolute w- h-80 top-9 left-0.5 overflow-y-scroll overflow-x-hidden bg-white border-[1px] border-amazon_blue text-black flex flex-col gap-1 z-50'>
                            <li className='hover:bg-blue-500 hover:text-white px-1'>All department</li>
                            <li className='hover:bg-blue-500 hover:text-white px-1'>Automotive</li>
                            <li className='hover:bg-blue-500 hover:text-white px-1'>Baby</li>
                            <li className='hover:bg-blue-500 hover:text-white px-1'>Beauty & Personal Care</li>
                            <li className='hover:bg-blue-500 hover:text-white px-1'>Books</li>
                            <li className='hover:bg-blue-500 hover:text-white px-1'>Boys' Fashion</li>
                            <li className='hover:bg-blue-500 hover:text-white px-1'>Computer</li>
                            <li className='hover:bg-blue-500 hover:text-white px-1'>Deals</li>
                            <li className='hover:bg-blue-500 hover:text-white px-1'>Digital Music</li>
                            <li className='hover:bg-blue-500 hover:text-white px-1'>Electronics</li>
                            <li className='hover:bg-blue-500 hover:text-white px-1'>Girls' Fashion</li>
                            <li className='hover:bg-blue-500 hover:text-white px-1'>Health & Household</li>
                            <li className='hover:bg-blue-500 hover:text-white px-1'>Home & Kitchen</li>
                            <li className='hover:bg-blue-500 hover:text-white px-1'>Industrial & Scientific</li>
                            <li className='hover:bg-blue-500 hover:text-white px-1'>Kindle Store</li>
                            <li className='hover:bg-blue-500 hover:text-white px-1'>Luggage</li>
                            <li className='hover:bg-blue-500 hover:text-white px-1'>Men's Fashion</li>
                            <li className='hover:bg-blue-500 hover:text-white px-1'>Movies & TV</li>
                            <li className='hover:bg-blue-500 hover:text-white px-1'>Music, CDs & Vinyl</li>
                            <li className='hover:bg-blue-500 hover:text-white px-1'>Pet Supplies</li>
                            <li className='hover:bg-blue-500 hover:text-white px-1'>Prime Video</li>
                            <li className='hover:bg-blue-500 hover:text-white px-1'>Software</li>
                            <li className='hover:bg-blue-500 hover:text-white px-1'>Sports & Outdoors</li>
                            <li className='hover:bg-blue-500 hover:text-white pl-1'>Tools & Home Improvement</li>
                            <li className='hover:bg-blue-500 hover:text-white px-1'>Toys & Games</li>
                            <li className='hover:bg-blue-500 hover:text-white px-1'>Video Games</li>
                            <li className='hover:bg-blue-500 hover:text-white px-1'>Women's Fashion</li>
                        </ul>
                    </div>
                )}
                
                <input type="text" className='p-2 h-full w-6 flex-grow flex-shrink  focus:outline-none'/>
                <MagnifyingGlassIcon className='h-10 p-2 rounded-r-md bg-yellow-500 hover:bg-yellow-500'/>
            </div>

            {/* Right */}
            <div className='text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap'>
                <div 
                    onClick={username ? undefined : () => router.push('/signin')}
                    className='link'
                >
                    <p className='hover:underline'>
                        { username ? `Hello, ${username}` : 'Hello, Sign In'}
                    </p>
                    
                    <p className='font-extrabold md:text-sm'>Account & Lists</p>
                </div>

                <div  onClick={() => router.push('/favorites')} className='relative link items-center justify-center flex '>
                    {/* <p><FaHeart /></p> */}
                    <span className='absolute top-0 right-0 md:-top-1 md:-right-3 h-4 w-4 bg-yellow-500 rounded-full text-center text-black font-bold'>{products.length}</span>
                    <p className='font-extrabold md:text-sm'>Fav</p>
                </div>

                <div  onClick={() => router.push('/favorites')} className='link items-center justify-center flex '>
                    {/* <p><FaHeart /></p> */}
                    <p className='font-extrabold md:text-sm'>Orders</p>
                </div>

                <div onClick={() => router.push('/checkout')} className='relative link flex items-center'>
                    <span className='absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-500 rounded-full text-center text-black font-bold'>{products.length}</span>
                    <ShoppingCartIcon className='h-10'/>
                    <p className='hidden md:block font-extrabold md:text-sm mt-2'>Basket</p>
                </div>
            </div>

        </div>

        {/* Bottom nav */}
        <div className='relative flex items-center space-x-3 p-2 pl-6 bg-amazon_blue-light text-white text-sm'>
            <p onClick={() => setSideBar(!sideBar)} className='link flex items-center'>
                <Bars3Icon className='h-6 mr-1'/>
                All
            </p>
            
            <p className='link'>Prime Video</p>
            <p className='link'>Amazon Business</p>
            <p className='link'>Today's Deals</p>
            <p className='link hidden lg:inline-flex'>Electronics</p>
            <p className='link hidden lg:inline-flex'>Food & Grocery</p>
            <p className='link hidden lg:inline-flex'>Prime</p>
            <p className='link hidden lg:inline-flex'>Buy Again</p>
            <p className='link hidden lg:inline-flex'>Shopper Toolkit</p>
            <p className='link hidden lg:inline-flex'>Health & Personal Care</p>
            <div>
                { username && <p onClick={logOut} className='link text-orange-600'>Sign Out</p>} 
            </div>
        </div>
        <AnimatePresence>
            {sideBar && ( 
                    <div className='w-full h-screen text-black fixed top-0 left-0 bg-amazon_blue bg-opacity-80 z-40'>
                        <div className='w-full h-full relative'>
                            
                                <motion.div
                                    ref={ref} 
                                    initial={{ x:-500, opacity:0}} 
                                    animate={{x:0, opacity:1}} 
                                    exit={{ x: -500, opacity: 0 }}
                                    transition={{duration: 0.4}} 
                                    className='w-[360px] h-full bg-white border border-black overflow-y-scroll overflow-x-hidden'
                                >
                                        <div className=''>
                                            {username 
                                                ? 
                                                <div className='w-full bg-amazon_blue-light text-white text-xl font-bold py-3 px-8 flex items-center gap-3'>
                                                    <Image src='' alt='p' className='rounded-full' objectFit='contain' width={40} height={40}/>
                                                    {username}
                                                </div>
                                                : 
                                                <div className='w-full bg-amazon_blue-light text-white text-xl font-bold py-3 px-8 flex items-center gap-2 '>
                                                        <RiAccountCircleFill className='text-3xl' />
                                                        <h3>Hello, Sign In</h3>
                                                </div>
                                            }
                                        </div>

                                        <div>
                                            <h3 className='text-lg font-bold px-8 pt-4 pb-1'>Digital Content & Devices</h3>
                                            <ul className='font-semibold pb-2 border-b'>
                                                <li className='group'>Amazon Music <span><RiArrowRightSLine className='text-2xl text-gray-400 group-hover:text-black'/></span></li>
                                                <li className='group'>Kindle E-readers & Books <span><RiArrowRightSLine className='text-2xl text-gray-400 group-hover:text-black'/></span></li>
                                                <li className='group'>Amazon Appstore <span><RiArrowRightSLine className='text-2xl text-gray-400 group-hover:text-black'/></span></li>
                                            </ul>
                                        </div>
                                        
                                        <div>
                                            <h3 className='text-lg font-bold px-8 pt-4 pb-1'>Shop By Department</h3>
                                            <ul className='font-semibold pb-2 border-b'>
                                                <li className='group'>Electronics<span><RiArrowRightSLine className='text-2xl text-gray-400 group-hover:text-black'/></span></li>
                                                <li className='group'>Computers <span><RiArrowRightSLine className='text-2xl text-gray-400 group-hover:text-black'/></span></li>
                                                <li className='group'>Smart Home<span><RiArrowRightSLine className='text-2xl text-gray-400 group-hover:text-black'/></span></li>
                                                <li className='group'>Arts & Crafts<span><RiArrowRightSLine className='text-2xl text-gray-400 group-hover:text-black'/></span></li>
                                                <li className='group'>See All <span><RiArrowDownSLine className=' text-2xl text-gray-400 group-hover:text-black'/></span></li>
                                            </ul>    
                                        </div>
                                        
                                        <div>
                                            <h3 className='text-lg font-bold px-8 pt-4 pb-1'>Programs & Features</h3>
                                            <ul className='font-semibold pb-2 border-b'>
                                                <li className='group'>Gift Card<span><RiArrowRightSLine className='text-2xl text-gray-400 group-hover:text-black'/></span></li>
                                                <li className='group'>Shop By Interest <span><RiArrowRightSLine className='text-2xl text-gray-400 group-hover:text-black'/></span></li>
                                                <li className='group'>Amazon Live<span><RiArrowRightSLine className='text-2xl text-gray-400 group-hover:text-black'/></span></li>
                                                <li className='group'>International Shopping<span><RiArrowRightSLine className='text-2xl text-gray-400 group-hover:text-black'/></span></li>
                                                <li className='group'>See All <span><RiArrowDownSLine className=' text-2xl text-gray-400 group-hover:text-black'/></span></li>
                                            </ul>
                                        </div>
                                        
                                        <div>
                                            <h3 className='text-lg font-bold px-8 pt-4 pb-1'>Help & Setting</h3>
                                            <ul className='font-semibold pb-2 border-b'>
                                                <li className='group'>Your Account</li>
                                                <li className='group'>Language</li>
                                                <li className='group'>United States</li>
                                                <li className='group'>Customer Service</li>
                                                <li className='group'>Sign in</li>
                                            </ul>
                                        </div>
                                        <span onClick={() => setSideBar(!sideBar)} className='absolute cursor-pointer text-[36px] text-white top-4 left-[365px]'>
                                    <RiCloseFill />
                                        </span>
                                </motion.div>
                                
                            
                        </div>
                    </div>
                )}
            </AnimatePresence>
    </header>
  )
}

export default Header