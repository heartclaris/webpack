let path=require('path')
let HtmlWebpackPlugin=require('html-webpack-plugin')
let MiniCssExtractPlugin=require('mini-css-extract-plugin');
let OptimizeCss=require('optimize-css-assets-webpack-plugin');
let UglifyJsPlugin=require('uglifyjs-webpack-plugin')
module.exports={
  optimization:{
minimizer:[
  new UglifyJsPlugin({
    cache:true,
    parallel:true,
    sourceMap:true
  }),
  new OptimizeCss()
  ]
  },
  devServer:{
    port:3000,
    progress:true,
    contentBase:'./build'
  },
  mode:'production',
  entry:'./src/index.js',
  output:{
    filename:'bundle.[hash:8].js',
    path:path.resolve(__dirname,'build'),
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:'./src/index.html',
      filename:'index.html',
      minify:{
        removeAttributeQuotes:true,
        collapseWhitespace:true
      },
    
      hash:true
    }),
    new MiniCssExtractPlugin({
      filename:'css/main.css'
    })
  ],
  externals:{
    jquery:'jquery'
  },
  module:{
    rules:[
      {
        test:/\.html$/,
        use:'html-withimg-loader'
    },
      {
        test:/\.(png|jpg|gif)$/,
        use:{
          loader:'url-loader',
          options:{
            limit:1,
            outputPath:'img/'
          }
        }
      },
      {
        test:require.resolve('jquery'),
        use:'expose-loader?$!jquery'
      },
      { test:/\.js$/,
        use:{
          loader:'eslint-loader',
          options:{
            enfore:'pre'
          }
        }

      },
      {
        test:/\.js$/,
        use:{
          loader:'babel-loader',
          options:{
            presets:[
              '@babel/preset-env'
            ],
            plugins:[
              ["@babel/plugin-proposal-decorators", { "legacy": true }],
              ["@babel/plugin-proposal-class-properties", { "loose" : true }],
              "@babel/plugin-transform-runtime"
            ]
          }
        },
        include:path.resolve(__dirname,'src'),
        exclude:/node_modules/
      },
      {
        test:/\.css$/,
        use:[
          MiniCssExtractPlugin.loader,
        'css-loader',
        'postcss-loader',
      ]
      },
      {
        test:/\.less$/,
        use:[
          MiniCssExtractPlugin.loader,
        'css-loader',
        'postcss-loader',
        'less-loader'
      ]
      }
    ]
  }
}