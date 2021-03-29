// rollup.config.js
import { terser } from 'rollup-plugin-terser';

export default [

  {

    // standard JS
    input: './src/youtube-lite.js',

    output: {
      file: './dist/youtube-lite.js',
      format: 'es'
    }

  },

  {

    // minified JS
    input: './src/youtube-lite.js',

    output: {
      file: './dist/youtube-lite.min.js',
      format: 'es',
      plugins: [
        terser({
          ecma: 2018,
          mangle: {
            toplevel: true,
            reserved: ['YouTubeLite']
          },
          compress: {
            module: true,
            toplevel: true,
            unsafe_arrows: true,
            drop_console: true,
            drop_debugger: true
          },
          output: { quote_style: 1 }
        })
      ]
    }

  }

];
