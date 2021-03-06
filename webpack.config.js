const path = require('path');

module.exports = {
    entry: './assets/index.js',
    resolve: {
        extensions: [".jsx", ".js"],
    },
    output: {
        path: path.resolve(__dirname, './public/js/'),
        filename: 'app.js'
    },
    devtool: 'eval-source-map',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'react']
                    }
                }
            }
        ]
    },
};
