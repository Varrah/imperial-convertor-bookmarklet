// Node.js script to generate a bookmarklet from imperial2metric.js
const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, 'imperial2metric.js');
const DST = path.join(__dirname, 'imperial2metric.bookmarklet.js');

function minify(js) {
  // Remove comments (single-line and multi-line)
  js = js.replace(/\/\/[^\n]*|\/\*[\s\S]*?\*\//g, '');
  // Remove newlines and extra spaces
  js = js.replace(/\n|\r/g, ' ');
  js = js.replace(/\s{2,}/g, ' ');
  // Remove spaces before/after certain chars
  js = js.replace(/\s*([{};,:\(\)\[\]])\s*/g, '$1');
  return js.trim();
}

let src = fs.readFileSync(SRC, 'utf8');
// Remove the first line if it's a shebang or comment
src = src.replace(/^\s*\/\/.*\n/, '');
// Remove IIFE wrapper if present
src = src.replace(/^\(function\(\)\s*{/, '');
src = src.replace(/}\)\(\);?\s*$/, '');

const bookmarklet = 'javascript:(function(){' + minify(src) + '})();\n';
fs.writeFileSync(DST, bookmarklet);
console.log('Bookmarklet generated:', DST);
// print out the result string
console.log(`Bookmarklet content:
${bookmarklet}
`);
