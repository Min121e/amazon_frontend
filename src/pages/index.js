import Banner from '@/components/Banner.js';
import Header from '../components/Header.js';
import Head from "next/head";
import ProductFeed from '@/components/ProductFeed.js';
// import { Provider } from 'react-redux';
import Footer from '@/components/footer/Footer.js';

export default function Home({}) {
  return (
    <div className='bg-gray-100'>
      <Head>
        <title>Amazon 2.0</title>
      </Head>

      <Header />

      <main className='max-w-screen-2xl mx-auto '>
        <Banner />

        {/* <ProductFeed products={products}/> */}

        <ProductFeed />

        <Footer />

      </main>
    </div>
  );
}

// export async function getServerSideProps(context) {
//   const products = await fetch('https://fakestoreapi.com/products')
//   .then((res) => res.json())
//   return {
//     props: {
//       products,
//     }
//   }
// }

// https://fakestoreapi.com/products