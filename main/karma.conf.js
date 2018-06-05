// Karma configuration
// Generated on Tue Jun 05 2018 15:33:00 GMT+0800 (中国标准时间)
/* eslint-disable func-names */
module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['mocha'],
    files: [
      'node_modules/jquery/dist/jquery.js',
      'node_modules/babel-polyfill/dist/polyfill.js',
      './app/**/*.spec.js',
    ],
    exclude: [
    ],
    preprocessors: {
      './app/**/*.spec.js': ['webpack', 'coverage'],
    },
    reporters: ['spec', 'coverage'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['PhantomJS'],
    singleRun: false,
    concurrency: Infinity,
    webpack: {
      mode: 'development',
      node: {
        fs: 'empty',
      },
      module: {
        rules: [
          {
            test: /\.js(x)?$/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['env', 'stage-0', 'react'],
                plugins: ['transform-runtime'],
              },
            },
            exclude: /node_modules/,
          },
          {
            test: /\.(le|c)ss/,
            use: [
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  importLoaders: 1,
                  localIdentName: '[name]-[local]-[hash:base64]',
                },
              },
              'less-loader',
            ],
          },
        ],
      },
    },
    coverageReporter: {
      type: 'html',
      dir: 'coverage/',
    },
  });
};
