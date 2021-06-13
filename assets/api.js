var Pokedex = require('pokedex-promise-v2');
var options = {
  protocol: 'https',
  versionPath: '/api/v2/',
  cacheLimit: 100 * 1000, // 100s
  timeout: 5 * 1000 // 5s
}
export const P = new Pokedex(options);