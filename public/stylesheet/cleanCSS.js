const fs = require('fs');
const createError = require('http-errors');
const CleanCSS = require('clean-css');
const options = {level: 2};

const arrCss = [
  '/rawCss/core.css',
  '/rawCss/blocks/start_screen.css',
  '/rawCss/blocks/field.css'
];


module.exports = () => {
  
  let fullText = '';

  try {
    for (let i = 0; i < arrCss.length; i++) {
      const data = fs.readFileSync(__dirname + arrCss[i]);
      fullText = fullText + data;
    }

    fs.writeFileSync(__dirname +'/style.css', new CleanCSS(options).minify(fullText).styles);

  } catch (err) {
    console.error(err)
  }

}