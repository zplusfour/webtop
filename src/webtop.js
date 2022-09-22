/**
 * WebTop wrapper
 */
import { cea } from './scripts/cea.js'

export class WebTop {
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