module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:3000/'],
      startServerCommand: 'pnpm run preview',
      numberOfRuns: 5,
    },
    upload: {
      target: "temporary-public-storage",
    },
    assert: {
      preset: 'lighthouse:no-pwa',
      assertions: {
        'csp-xss': 'off',
        'unused-javascript': 'off',
      },
    },
  },
};
