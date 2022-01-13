/**
 * WebTop - turn any website into an app
 */
const { webtop } = require('./webtop.js');
const validURL= (str) => {
  var pattern = new RegExp('^(https?:\\/\\/)?'+
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+
    '((\\d{1,3}\\.){3}\\d{1,3}))'+
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
    '(\\?[;&a-z\\d%_.~+=-]*)?'+
    '(\\#[-a-z\\d_]*)?$','i');
  return !!pattern.test(str);
};

const main = (argv) => {
  if (argv.length < 1) {
    console.log('Usage: webtop <url> <path>');
  }
  
  const url = argv[0];
  const path = argv[1];
  const wt = new webtop(url, path);
  validURL(url) ? wt.wp() : console.log('Invalid URL.');
}

main(process.argv.slice(2));