const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = function(environment) {

    const is_prod = (environment && environment.production) === true;
    const env = is_prod ? "production" : "development"

    var client_entry = {};
    client_entry["web/bundle"] = __dirname + "/src/app.ts";

    var tasks = []
    
    tasks.push({ // client side
        entry: client_entry,
        mode: env,
        output: {
            path: path.join(__dirname),
            filename: '[name].js',
        },
        optimization: {
            splitChunks: {
                cacheGroups: {
                    chunks: "initial",
                    vendors: {
                        chunks: "initial",
                        enforce: true,
                        test: /[\\/]node_modules[\\/]/,
                        name: "web/vendor"
                    }
                }
            }
        },        
        resolve: {
            extensions: ['.ts', '.tsx', '.js'],
        },
        module: {
            rules: [
                {
                    test: /\.(ts|tsx)$/,
                    use: [
                        'ts-loader',
                    ]
                }
            ]
        }        
    })
    
    tasks.push({ // server side
        name: 'index',
        entry: './src/index.ts',
        mode: env,
        target: 'node',
        externals: [ nodeExternals() ],
        output: {
            path: path.resolve(__dirname, 'build_server'),
            filename: 'server.js',
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js'],
        },
        module: {
            rules: [
                {
                    test: /\.(ts|tsx)$/,
                    exclude: /node_modules/,
                    loader: "ts-loader",
                }
            ]
        }        
    })

    return tasks;
};