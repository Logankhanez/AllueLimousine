/** @type {import('next').NextConfig} */
const nextConfig = {
  // La ligne "output: export" a été supprimée
  i18n: {
    locales: ['fr'],
    defaultLocale: 'fr',
  },
  images: {
    domains: ['images.unsplash.com', 'plus.unsplash.com'],
  },
};

module.exports = nextConfig;
//lol