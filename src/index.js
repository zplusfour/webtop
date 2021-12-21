/**
 * WebTop - turn any website into an app
 */
const { webtop } = require('./webtop.js');
const validURL= (str) => {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
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