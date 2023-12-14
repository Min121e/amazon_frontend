/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

// module.exports = {
//   images: {
//     domains: ['localhost', '127.0.0.1'], 
//     basePath: 'http://localhost:8000/',
//     path: `${basePath}/_next/image`,
//     // path: 'http://localhost:8000/storage/app/',
//   },
// };


module.exports = {
  images: {
    // basePath: '/localhost',
    domains: ['localhost', '127.0.0.1'],
    // path: `${basePath}/_next/image`,
  },
};
