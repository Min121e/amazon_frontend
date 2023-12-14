import Header from '@/components/Header'
import Footer from '@/components/footer/Footer'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { FaHeart } from "react-icons/fa"

const DynamicPage = () => {

    const [product, setProduct] = useState({})

    const router = useRouter();

    useEffect(() => {
        setProduct(router.query)
    
    }, [router.query])

  return (
    <div className='bg-gray-100'>
        <Header />

        <div className='max-w-screen-xl mx-auto px-4  py-4 md:py-10'>
            <div className='w-full grid md:grid-cols-3 gap-3 bg-white rounded-lg'>
                    <div className='flex items-center justify-center  rounded-lg'>
                        <img src={product.src} alt="Product Image" width={250} height={250} />
                        <div className="w-12 h-24 absolute bottom-10 right-0 border-[1px] border-gray-400 bg-white rounded-md flex flex-col translate-x-20 group-hover:translate-x-0 transition-transform duration-300">
                        
                        <span
                        onClick={() =>
                            dispatch(addToFavorite({
                                id,
                                title,
                                description,
                                price,
                                category,
                                image,
                                src,
                                quantity: 1,
                            })
                            )
                        }
                        className="w-full h-full border-b-[1px] border-b-gray-400 flex items-center justify-center text-xl bg-transparent hover:bg-amazon_yellow cursor-pointer duration-300"
                        >
                        <FaHeart />
                        </span>
                    </div>
                    </div>
            </div>
        </div>
        
        <Footer />
    </div>
  )
}

export default DynamicPage
