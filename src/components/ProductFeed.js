import React,{ useEffect, useState } from 'react'
import Product from './Product'
import banner from '../../images/banner.jpg'
import Image from 'next/image'
import axios from 'axios'

const ProductFeed = () => {

    const [data, setData] = useState([])

    useEffect(() => {
        fetchdata()
    }, [])

    async function fetchdata() {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api')
            setData(response.data)
        } catch (error) {
            alert('Error')
        }
    }

  return (
    <div className='grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 mx-auto'> 
        {data
            .slice(0,4)
            .map(({ id, title, price, description, category, image }) => (
            <Product 
                key={id}
                id={id}
                title={title}    
                price={price}
                description={description}
                category={category}
                image={image}
                src={'http://localhost:8000/storage/' +image}
            />
        ))}

        {data.length > 4 && <Image className='md:col-span-full' src={banner} alt='' />}

        <div className='md:col-span-2'>
            {data
                .slice(4,5)
                .map(({ id, title, price, description, category, image }) => (
                <Product 
                    key={id}
                    id={id}
                    title={title}
                    price={price}
                    description={description}
                    category={category}
                    image={image}
                    src={'http://localhost:8000/storage/' +image}
                />
            ))}
        </div>

        {data
            .slice(5,data.length)
            .map(({ id, title, price, description, category, image }) => (
            <Product 
                key={id}
                id={id}
                title={title}
                price={price}
                description={description}
                category={category}
                image={image}
                src={'http://localhost:8000/storage/' +image}
            />
        ))}
    </div>
 

  )
}

export default ProductFeed

