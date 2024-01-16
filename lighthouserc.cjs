module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:3000/'],
      startServerCommand: 'pnpm run preview',
    },
    upload: {
      target: "temporary-public-storage",
    },
    assert: {
      preset: 'lighthouse:no-pwa',
      upload: {
        target: "temporary-public-storage",
      },
    },
  },
};
