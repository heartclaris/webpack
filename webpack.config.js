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
      filename:'main.css'
    })
  ],
  module:{
    rules:[
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
              ["@babel/plugin-proposal-class-properties", { "loose" : true }]
            ]
          }
        }
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