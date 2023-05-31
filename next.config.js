/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/,
        use: ["@svgr/webpack"]
      });
  
      return config;
    },
    env: {
        API_URL: 'https://api.ssinvestimentos.com.br/public/api/',
        LOCAL_API_URL: 'http://ss-investimentos-backend.test/api/',
    },
  }
  
module.exports = nextConfig