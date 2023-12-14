import React, { useState, useEffect } from 'react'
import logodark from '../../images/logodark.png'
import Image from 'next/legacy/image'
import { MdArrowRight } from 'react-icons/md';
import { useRouter } from 'next/router'
import Header from '@/components/Header';
import axios from 'axios';

const addproduct = () => {
 
    const [api_token, setapi_token] = useState('');
    useEffect(() => {
        const storedapi_token = localStorage.getItem('api_token');
        if (storedapi_token) {
            setapi_token(storedapi_token);
        }
    }, []);


    const router = useRouter()

    const [title, setTitle] = useState('') // clientname to title
    const [description, setDescription] = useState('') // email to description
    const [price, setPrice] = useState('') //password to price
    const [category, setCategory] = useState('') // cpassword to category
    const [file, setFile] = useState('')

    // Error message starts here
    const [errTitle, setErrTitle] = useState('')
    const [errDescription, setErrDescription] = useState('')
    const [errPrice, setErrPrice] = useState('')
    const [errCategory, setErrCategory] = useState('')
    const [errFile, setErrFile] = useState('')
    

    // Handle function starts here
    const handleTitle = (e) => {
        setTitle(e.target.value)
        setErrTitle('')
    }
    
    const handleDescription = (e) => {
        setDescription(e.target.value)
        setErrDescription('')
    }

    const handlePrice = (e) => {
        setPrice(e.target.value)
        setErrPrice('')
    }

    const handleCategory = (e) => {
        setCategory(e.target.value)
        setErrCategory('')
    }

    const handleImage = (e) => {
        setFile(e.target.files[0])
        setErrFile('')
    }


    // Submit button 
    async function handleaddproduct (e) {
        e.preventDefault()
        if(!title) {
            setErrTitle('Enter product title')
        }

        if(!description) {
            setErrDescription('Enter product description')
        }

        if(!price) {
            setErrPrice('Enter product price')
        }

        if(!category) {
            setErrCategory('Enter product category')
        } 

        if(!file) {
            setErrFile('Upload product picture')
        }

        // if(title && description && price  && category && file) {
        //     console.log(title, description, price, category, file)
        // }
        
        // // setTitle('')
        // // setDescription('')
        // // setPrice('')
        // // setCategory('')

        // const data = {
        //     title : title,
        //     description : description,
        //     price : price,
        //     category : category,
        //     file : file,
        // }

        // try {
        //     const response = await axios.post('http://127.0.0.1:8000/api/addproduct', data, {
        //         headers: {
        //             'Content-Type': 'application/json'
        //         }
        //     })

        //     if (response.status === 200) {
        //         alert('Data has been saved');
        //       } else {
        //         alert('An error occurred while saving data');
        //       }

        // } catch (error) {
        //     console.error('Error:', error);
        //     alert('An error occurred while saving data');
        //   }

        // const apiToken = localStorage.getItem('api_token');

        if (title && description && price && category && file) {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('price', price);
            formData.append('category', category);
            formData.append('image', file);
    
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/addproduct', formData, {
                    headers: {
                        Authorization: `Bearer ${api_token}`
                    }
                });
    
                if (response.status === 201) {
                    alert('Data has been saved');
                    router.push('/')
                } else {
                    alert('An error occurred while saving data');
                }
            } catch (error) {
                console.error('Error:', error);
                // alert(error.response.error);
            }
        }

    }


    // axios.get('/sanctum/csrf-cookie').then(()=> {
        // const response = axios.post('http://127.0.0.1:8000/api/addproduct', formData).then(response=>{
        //     // if(response.data.error) {
        //     //     console.log(response.data.error)
        //     // } else {
        //     //     console.log('success')
        //     // }
        //     if (response.status === 200) {
        //         alert('Data has been saved');
        //     } else {
        //         alert('An error occurred while saving data');
        //     }
        // });
    // })
        

        // if (response.status === 200) {
        //     alert('Data has been saved');
        // } else {
        //     alert('An error occurred while saving data');
        // }
    


  return (
    <div className='w-full'>

        <Header />

        <div className='w-full bg-gray-100 pb-10'>
            <form className='w-[700px] mx-auto flex flex-col items-center'>
                {/* <div onClick={() => router.push('/')} className='my-5 cursor-pointer'>
                    <Image 
                        src={logodark}
                        width={150}
                        height={40}
                        objectFit='contain'
                    />    
                </div> */}
                
                <div className='w-full border border-zinc-200 my-5 px-9 py-6'>
                    <h2 className='font-medium text-center text-3xl mb-8'>Add Product</h2>
                    <div className='flex flex-col gap-5'>
                        <div className=''>
                            <p className='font-medium pb-1'>Title</p>
                            <input 
                                onChange={handleTitle} 
                                value={title}
                                type="text" 
                                className='border font-medium rounded-sm placeholder:font-normal placeholder:normal-case border-gray-400 px-3 py-2 w-full outline-none focus:drop-shadow-md'
                            />
                            {errTitle && (
                                <p className='text-red-500 text-sm font-semibold pt-1'>
                                    <span className='italic mr-1'>!</span> 
                                    {errTitle}
                                </p>
                            )}
                        </div>
                        <div>
                            <p className='font-medium pb-1'>Description</p>
                            {/* <input 
                                onChange={handleEmail}
                                value={email}
                                type="email" 
                                className='border font-medium lowercase rounded-sm border-gray-400 px-2 py-1 w-full outline-none focus:drop-shadow-md'
                            /> */}
                            <textarea onChange={handleDescription} value={description} className='font-medium rounded-sm border-gray-400 focus:drop-shadow-md border px-3 py-2 resize-none outline-none w-full h-28' name="" id="" cols="30" rows="10"></textarea>
                            {errDescription && (
                                <p className='text-red-500 text-sm font-semibold pt-1'>
                                    <span className='italic mr-1'>!</span> 
                                    {errDescription}
                                </p>
                            )}
                        </div>
                        <div>
                            <p className='font-medium pb-1'>Price</p>
                            <input
                                onChange={handlePrice}
                                value={price}
                                type="text"
                                className='border font-medium rounded-sm placeholder:normal-case border-gray-400 px-3 py-2 w-full outline-none focus:drop-shadow-md'
                                // style={{ fontVariant: 'normal', fontFeatureSettings: "'cpsp', 'ss01'", letterSpacing: '0.25em' }}  
                            />
                            {errPrice && (
                                <p className='text-red-500 text-sm font-semibold pt-1'>
                                    <span className='italic mr-1'>!</span> 
                                    {errPrice}
                                </p>
                            )}
                        </div>
                        <div>
                            <p className='font-medium pb-1'>Category</p>
                            <input
                                onChange={handleCategory}
                                value={category}
                                type="text"
                                className='border font-medium rounded-sm border-gray-400 px-3 py-2 w-full outline-none focus:drop-shadow-md'
                                // style={{ fontVariant: 'normal', fontFeatureSettings: "'cpsp', 'ss01'", letterSpacing: '0.25em' }}  
                            />
                            {errCategory && (
                                <p className='text-red-500 text-sm font-semibold pt-1'>
                                    <span className='italic mr-1'>!</span> 
                                    {errCategory}
                                </p>
                            )}
                        </div>
                        <div>
                            <p className='font-medium pb-1'>Image</p>
                            <input
                                onChange={handleImage}
                                type="file"
                                className='border rounded-sm border-gray-400 px-2 py-1 w-full outline-none focus:drop-shadow-md'
                                // style={{ fontVariant: 'normal', fontFeatureSettings: "'cpsp', 'ss01'", letterSpacing: '0.25em' }}  
                            />
                            {errFile && (
                                <p className='text-red-500 text-sm font-semibold pt-1'>
                                    <span className='italic mr-1'>!</span> 
                                    {errFile}
                                </p>
                            )}

                            {/* {file && (
                                <img className='w-[150px] h-16' src={URL.createObjectURL(file)} alt="" />
                            )} */}
                        </div>
                    </div>
                    {/* <p className=' mt-2 mb-4'>Passwords must be at least 6 characters.</p> */}
                    <div className='flex flex-col items-center'>
                        <button
                            onClick={handleaddproduct}
                            className='button border text-[17px] font-medium w-full mt-9 mb-7'>Add Product
                        </button>
                    </div>
                    <div className='text-xs mt-2'>
                        <p 
                            className='mb-4'>By Continuing, you agree to Amazozn's 
                            <span className='text-blue-600 cursor-pointer hover:underline'> Conditions of Use</span> and 
                            <span className='text-blue-600 cursor-pointer hover:underline'> Privacy Notice</span>.
                        </p>
                        <p 
                            className='flex flex-row'>Already have an account? 
                            <span onClick={() => router.push('/signin')} className='flex items-center justify-center pl-1 cursor-pointer text-blue-600 hover:underline hover:text-red-600'>Sign in 
                                <span className='pt-0.5'><MdArrowRight /></span>
                            </span>
                        </p>
                        <p 
                            className='flex flex-row'>Buying for work? 
                            <span className='flex items-center justify-center pl-1 cursor-pointer text-blue-600 hover:underline hover:text-red-600'>Create a few business account 
                                <span className='pt-0.5'><MdArrowRight /></span>
                            </span>
                        </p>
                    </div>

                </div>
            </form>
        </div>
        <div className='w-full bg-gradient-to-t from-white via-white to-zinc-200'>
            <div className='w-[350px] mx-auto py-9 text-xs text-center'>
                <div className='flex items-center justify-center space-x-9 pb-1'>
                    <p className='text-blue-600 cursor-pointer hover:underline hover:text-red-600'>Conditions of Use</p>
                    <p className='text-blue-600 cursor-pointer hover:underline hover:text-red-600'>Privacy Notice</p>
                    <p className='text-blue-600 cursor-pointer hover:underline hover:text-red-600'>Privacy Policy</p>
                </div>
                <p className=''>© 1996-2023, ReactBd.com, Inc. or its affiliates</p>
            </div>
        </div>
    </div>
  )
}

export default addproduct
