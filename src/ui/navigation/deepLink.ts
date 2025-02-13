export const createDeepLink = (appName: string) => ({
  prefixes: [`${appName}://`, `https://${appName}.com`],
  config: {
    screens: {
      // Home: 'home',
      // Profile: 'profile/:id',
    },
  },
});
