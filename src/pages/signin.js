import React, { useEffect, useState } from 'react'
import logodark from '../../images/logodark.png'
import Image from 'next/legacy/image'
import { MdArrowRight } from 'react-icons/md';
import { useRouter } from 'next/router'
import axios from 'axios';

const signin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [errEmail, setErrEmail] = useState('')
  const [errPassword, setErrPassword] = useState('')

  const [signinError, setsigninError] = useState(''); 

  const router = useRouter()

  const handleEmail = (e) => {
    setEmail(e.target.value)
    setErrEmail('')
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
    setErrPassword('')
  }

  // Email validation
  const emailValidation = (email) => {
    return String(email)
        .toLowerCase()
        .match(/^[^ ]+@[^ ]+\.[a-z]{2,3}$/)
}


// if (typeof window !== 'undefined') {
//   const username = localStorage.getItem('user_name')
// }
  
  // useEffect(()=> {
  //   if(localStorage.getItem('user_info')) {
  //     router.push('/')
  //   }
  // }, [])


  // Submit button
  async function handleLogIn (e) {
    e.preventDefault()
    if(!email) {
      setErrEmail('Enter your email')
    } else if(!emailValidation(email)) {
      setErrEmail('Enter a valid email')
    }

    if(!password) {
      setErrPassword('Enter your password')
    }

    if(email && password) {
      let item={email, password}
      try {
          // await axios.get('http://127.0.0.1:8000/api/sanctum/csrf-cookie')


          // const response = await axios.post(`${process.env.NEXT_APP_BASE_API_URL}/signin`, item, {
          //   withCredentials: true
          // })

          const response = await axios.post('http://127.0.0.1:8000/api/signin', item, {
            // withCredentials: true
          })
        
        if(response.status === 200) {
          // console.log(response)
          // const { token, user, error } = response.data;
          localStorage.setItem('user_info', response.data.user.name)
          localStorage.setItem('user_email', response.data.user.email)
          localStorage.setItem('user_id', response.data.user.id)
          localStorage.setItem('user_type', response.data.user.usertype)
          localStorage.setItem('api_token', response.data.token)
          router.push('/')
          console.log('User Successfully Logged in.')
        } else {
          setsigninError('Error logging in', error)
          console.log('error A')
        }
      } catch(error) {
        if (error.response && error.response.status === 401) {
          setsigninError(error.response.data.error);
          console.log(error.response.data.error)
      } else {
        // Handle other error scenarios here
        // console.log(error.response.data.error);
        setsigninError('Error logging in');
      }
    }
  }

    setPassword('')
    
  }

  return (
    <div className='w-full '>
      <div className='w-full pt-7 bg-gray-100'>
        <form className='w-[350px] max-w-4xl mx-auto pb-8'>
          <div onClick={() => router.push('/')} className='flex justify-center items-center pb-6 cursor-pointer'>
            <Image 
              src={logodark}
              width={150}
              height={40}
              objectFit='contain'
              className=''
            />
          </div>
          

          <div className='flex flex-col space-y-4 border border-gray-200 shadow-sm p-6'>
            <p className='font-semibold text-2xl'>Sign in</p>
            <div>
              <p className='font-medium pb-1'>Email or mobile phone number</p>
              <input 
                onChange={handleEmail}
                type="text" 
                value={email}
                className='border font-medium lowercase rounded-sm  border-gray-400 px-2 py-1 w-full outline-none focus:drop-shadow-md'
              />
              {errEmail && (
                <p className='text-red-500 text-sm font-semibold pt-1'>
                    <span className='italic mr-1'>!</span> 
                    {errEmail}
                </p>
              )}
            </div>
            <div>
              <p className='font-medium pb-1'>Password</p>
              <input
                onChange={handlePassword}
                type="password"
                value={password}
                className='border lowercase rounded-sm  border-gray-400 px-2 py-1 w-full outline-none focus:drop-shadow-md'
                style={{ fontVariant: 'normal', fontFeatureSettings: "'cpsp', 'ss01'", letterSpacing: '0.25em' }}  
              />
              {errPassword && (
                <p className='text-red-500 text-sm font-semibold pt-1'>
                    <span className='italic mr-1'>!</span> 
                    {errPassword}
                </p>
              )}
            </div>
            <button
              onClick={handleLogIn}
              className='button border text-[17px] font-medium'>Continue
            </button>
            {signinError && (
              <div>
                  {errEmail || errPassword ? (
                      null
                  ) : <p className='text-red-500 text-sm font-semibold pt-1'>
                  <span className='italic mr-1'>!</span> {signinError}
                      </p>}
              </div>
            )}

            <p className='text-xs'>By Continuing, you agree to Amazozn's <span className='text-blue-600 cursor-pointer hover:text-red-600 hover:underline'> Conditions of Use</span> and <span className='text-blue-600 cursor-pointer hover:text-red-600 hover:underline'> Privacy Notice</span>.</p>
            <p className='group hover:bg-transparent p-0 -ml-1 justify-start'>
              <MdArrowRight />
              <span className='text-sm text-blue-600 group-hover:underline group-hover:text-red-600'>Need help?</span>
            </p>
          </div>

          <div className='w-full text-xs flex items-center justify-center my-4'>
            <span className='w-1/3 h-[1px] border border-zinc-400 inline-flex'></span>
            <span className='w-1/3 text-center'>New to amazon?</span>
            <span className='w-1/3 h-[1px] border border-zinc-400 inline-flex'></span>
          </div>

          <div onClick={() => router.push('/registration')}>
            <button
              onClick={(e) => e.preventDefault()}
              className='w-full rounded-sm bg-gradient-to-t from-slate-200 to-slate-100 hover:bg-gradient-to-b  border border-zinc-400 active:border-yellow-800 active:shadow py-1.5'>Create your Amazon account
            </button>  
          </div>
        </form>
      </div>

      <div className='w-full bg-gradient-to-t from-white via-white to-zinc-200'>
        <div className='w-[350px] mx-auto py-[18px] text-xs text-center'>
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

export default signin