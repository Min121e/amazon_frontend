import Banner from '@/components/Banner.js';
import Header from '../components/Header.js';
import Head from "next/head";
import ProductFeed from '@/components/ProductFeed.js';
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

        <ProductFeed />

        <Footer />

      </main>
    </div>
  );
}
