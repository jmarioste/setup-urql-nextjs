/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  rewrites() {
    return [
      {
        source: "/graphql",
        destination: `https://rickandmortyapi.com/graphql`,
      },
    ];
  },
};

module.exports = nextConfig;
