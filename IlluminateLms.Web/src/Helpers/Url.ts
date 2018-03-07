export class Url{
  /**
   * Check if the url contains a route
   * @param {string} path
   * @returns {boolean}
   * @constructor
   */
  static IsRoute(path: string): boolean{
    return window.location.href.toLowerCase().indexOf(path.toLowerCase()) > -1;
  }
}