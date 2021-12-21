/**
 * WebTop wrapper
 */
const { cea } = require('./scripts/cea.js');

class WebTop {
  /**
   * @param {string} url
   * @param {string} path
   */
  constructor(url, path) {
    this.url = url;
    this.path = path;
  }

  wp() {
    cea(this.url, this.path);
  }
}

exports.webtop = WebTop;