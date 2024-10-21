/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "images.unsplash.com",
        },{
          protocol: "https",
          hostname: "api.microlink.io",
        },{
          protocol: "https",  
          hostname: "magicui.design",
        },{
          protocol: "https", hostname: "api.microlink.io"
        },{
          protocol: "https", hostname: "raw.githubusercontent.com"
        }
      ],
    }
  };
  
  export default nextConfig;
  
  