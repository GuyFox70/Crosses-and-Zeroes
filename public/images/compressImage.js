const compressImages = require('compress-images');
const input = (__dirname + '/rawImages/').replace(/\\/g, '/');
const output = (__dirname + '/compress/').replace(/\\/g, '/');

// const input = __dirname + '/rawImages/';
// const output = __dirname + '/compress/';
// console.log(input);
// console.log(output);

module.exports = () => {
  compressImages(input + '*.{jpg,JPG,jpeg,JPEG,png,svg,gif}', output, {compress_force: false, statistic: true, autoupdate: true}, false,
    {jpg: {engine: 'mozjpeg', command: ['-quality', '60']}},
    {png: {engine: 'pngquant', command: ['--quality', '20-50']}},
    {svg: {engine: 'svgo', command: '--multipass'}},
    {gif: {engine: 'gifsicle', command: ['--colors', '64', '--use-col=web']}}, function(error, completed, statistic){

      console.log('-------------');
      console.log(error);
      console.log(completed);
      console.log(statistic);
      console.log('-------------');                               
    })
}