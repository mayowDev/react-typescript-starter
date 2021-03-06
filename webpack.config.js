const HtmlPlugin = require("html-webpack-plugin");
const MiniCssPExtractlugin = require('mini-css-extract-plugin');
const Webpack = require('webpack')
const path = require("path");

module.exports={
    target:'web', // or native app
    mode:'development',
    entry:'./src/index.tsx',
    output:{
        path:path.resolve(__dirname, 'build'),
        filename:'bundle.js'
    },
    resolve:{
        extensions:[".ts", ".tsx", ".js", ".jsx"]
    },
    module:{
        rules:[
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                use:[
                    {
                        loader:'babel-loader'
                    }
                ]
            },
            {
                test: /\.html$/,
                use:[{loader:'html-loader'}]
            },
            {
                test:/\.(png|webp|jpe?g|gif)$/i,
                use:[{loader:'file-loader'}]
            },
            {
                test:/\.s[ac]ss$/i,
                use:[MiniCssPExtractlugin.loader, "css-loader", "sass-loader"]
            }
        ]
    },
    plugins:[
        new HtmlPlugin({
            filename:"index.html", 
            template:"./src/index.html"
        }), 
        new MiniCssPExtractlugin(),
        new Webpack.DefinePlugin({ // THIS allows us to access the node_env in our code
            "process.env":{
                "NODE_ENV":JSON.stringify(process.env.NODE_ENV)
            }
        })

    ],
    devtool: 'inline-source-map',
    devServer:{
        historyApiFallback:true,
        port:8000,
        compress: true,
        contentBase: path.join(__dirname, 'build'),
        hot: true,
    },

}