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
        },{
          protocol: "https", hostname: "i.pinimg.com"
        }, {
          protocol: "https", hostname: "pub-83c5db439b40468498f97946200806f7.r2.dev"
        }
      ],
    }
  };
  
  export default nextConfig;
  
  