import Image from 'next/legacy/image'
import React, { useEffect, useState } from 'react'
import { StarIcon } from '@heroicons/react/24/solid'
import Currency from 'react-currency-formatter';
import prime from '../../images/prime.png'
import axios from 'axios';
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, updateCartOnSignIn, selectItems, clearCart, addToFavourite } from '@/slices/amazonSlice';
import Link from 'next/link';
import { FaHeart } from 'react-icons/fa';

const Product = ({ id, title, price, description, category, image, src }) => {

    const dispatch = useDispatch()
    const router = useRouter()

    const itemsInCart = useSelector(selectItems);

    const [api_token, setapi_token] = useState('');
    const [user_id, setuser_id] = useState('');
    useEffect(() => {
        const storedapi_token = localStorage.getItem('api_token');
        const storedUser_id = localStorage.getItem('user_id');
        if (storedapi_token && storedUser_id) {
            setapi_token(storedapi_token);
            setuser_id(storedUser_id)
        }
    }, []);

    // const [apitoken, setapitoken] = useState('');
    // const [userid, setuserid] = useState('');
    // useEffect(() => {
    //     const storedUsername = localStorage.getItem('api_token');
    //     const storedUserid = localStorage.getItem('userid');
    //     if (storedUsername && storedUserid) {
    //         setapitoken(storedUsername);
    //         setuserid(storedUserid);
    //     }
    // }, []);

    let apitoken = localStorage.getItem('api_token')


    // async function clickAddToCart(e) {
    //     const isAuthenticated = apitoken;
    //     const cartItems = itemsInCart.map((item) => ({
    //         id: item.id,
    //         title: item.title,
    //         description: item.description,
    //         price: item.price,
    //         category: item.category,
    //         src: item.src,
    //         quantity: item.quantity,
    //     }));

    //     if(!isAuthenticated) {
    //         dispatch(addToCart({
    //             id,
    //             title,
    //             description,
    //             price,
    //             category,
    //             src,
    //             quantity: 1,
    //         }))
    //         console.log('a')

            
    //     } 
    //     else  {             //if(isAuthenticated && itemsInCart.length > 0 )
    //         console.log('b')

    //         try {
    //             dispatch(addToCart({
    //                 id,
    //                 title,
    //                 description,
    //                 price,
    //                 category,
    //                 src,
    //                 quantity: 1,
    //             }))
    //             dispatch(updateCartOnSignIn(cartItems));
    //             // dispatch(clearCart());
    //             console.log('b')
    //         } catch (error) {
    //             alert(error);
    //         }
    //     } 
    //     // else if(isAuthenticated && itemsInCart.length == 0 ) {
    //     //     console.log('c')
    //     //     let response = await axios.post('http://127.0.0.1:8000/api/user/updatecart', cartItems, {
    //     //         headers: {
    //     //             Authorization: `Bearer ${apitoken}`,
    //     //             'Accept': 'application/json'
    //     //         }
    //     //     })
            
    //     //     if(response) {
    //     //         console.log(response)   
    //     //     }

    //     //     dispatch(addToCart({
    //     //         id,
    //     //         title,
    //     //         description,
    //     //         price,
    //     //         category,
    //     //         src,
    //     //         quantity: 1,
    //     //     }))    

    //     // }
    // }


    const handleImageClick = () => {
        // You can pass the details as query parameters
        router.push({
          pathname: `/${id}`,
          query: {
            title,
            price,
            description,
            category,
            image,
            src,
          },
        });
      };

    

    async function handleAddToFavourite (e)  {
      e.preventDefault();
      const formData = new FormData();
      formData.append('user_id', user_id);
      formData.append('product_id', id);

      try {
        const response = await axios.post('http://127.0.0.1:8000/api/favourite', formData, {
          headers: {
            Authorization: `Bearer ${api_token}`,
        },
        });
        console.log(response.data);
      } catch (error) {
        console.error('Error adding to favorites:', error.response.data);
      }
    }

    return (
        <div className='relative flex flex-col m-5 bg-white z-30 p-10'>
            {/* <FaHeart className='absolute top-0 left-0' onClick={() => dispatch(addToFavourite({
                id,
                title,
                description,
                price,
                category,
                image,
                src,
                quantity: 1,
            }))} /> */}

            <FaHeart onClick={handleAddToFavourite} className='absolute top-2 left-2 cursor-pointer text-orange-400 ' />

            <p className='absolute -top-2 right-2 text-xs italic text-gray-400 my-3'>{category}</p>

            <div onClick={handleImageClick} className='cursor-pointer'>
                <img src={src} width={200} height={200} style={{ objectFit: 'contain', paddingBottom: '13px' }} alt="img" />
            </div>

            <h4>{title}</h4>

            <p className='text-sm my-2 line-clamp-2'>{description}</p>

            <div className='mb-5'>
                {/* currency is USD by default */}
                <Currency quantity={price} /> 
            </div>

            <button onClick={() => dispatch(addToCart({
                id,
                title,
                description,
                price,
                category,
                image,
                src,
                quantity: 1,
            }))} className='mt-auto button'>Add to Basket</button>

        </div>
  )
}

export default Product
