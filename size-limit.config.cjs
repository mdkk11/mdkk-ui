module.exports = [
  {
    name: 'index.js (raw)',
    path: 'dist/index.js',
    brotli: false,
    limit: '4 KB',
  },
  {
    name: 'index.css (gzip)',
    path: 'dist/index.css',
    gzip: true,
    limit: '11 KB',
  },
  {
    name: 'tailwind-plugin.js (gzip)',
    path: 'dist/tailwind-plugin.js',
    gzip: true,
    limit: '1 KB',
  },
];
