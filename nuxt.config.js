import bodyParser from 'body-parser';
import session from 'express-session';
// eslint-disable-next-line nuxt/no-cjs-in-config
const env = require('dotenv').config();
const MongoStore = require('connect-mongo')(session);

module.exports = {
  mode: 'universal',

  env: env.parsed,
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      {
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#fff'
  },
  /*
   ** Global CSS
   */
  css: [],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/style-resources'
  ],

  styleResources: {
    scss: ['~assets/scss/_variables.scss', '~assets/scss/base.scss']
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: process.env.APP_URL || 'http://localhost:4000',
    credentials: true,
    debug: true
  },
  /*
   ** Build configuration
   */
  serverMiddleware: [
    bodyParser.json(),

    session({
      secret: 'multimonitorsetup',
      resave: false,
      saveUninitialized: true,
      store: new MongoStore({
        url: 'mongodb://localhost/' + process.env.MONGODB_URI || 'mevnStack'
      })
    }),

    // API middleware
    '~/api/index.js'
  ],

  build: {
    /*
     ** You can extend webpack config here
     */
    watch: ['api'],

    extend(config, ctx) {
      // Debug tools
      config.devtool = ctx.isClient ? 'eval-source-map' : 'inline-source-map';

      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options: {
            fix: true
          }
        });
      }
    }
  }
};
