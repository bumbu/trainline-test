var path = require('path')
var webpack = require('webpack')

module.exports = {
  devtool: 'inline-source-map',
  entry: [
    './src/index.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/public/js/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin(Object.assign({}, {
      __DEVELOPMENT__: true
    })),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: __dirname,
        query: {
          presets: ["react", "es2015", "stage-0"],
          env: {
            development: {
              plugins: [
                ['react-transform', {
                  transforms: [
                    {
                      transform:  'react-transform-hmr',
                      imports: [ 'react' ],
                      locals:  [ 'module' ]
                    }
                  ]
                }]
              ]
            }
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['', '.js']
  }
}
