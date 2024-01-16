module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:3000/'],
      startServerCommand: 'pnpm run preview',
    },
    assert: {
      preset: 'lighthouse:recommended',
    },
  },
};
