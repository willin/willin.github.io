module.exports = {
  head: {
    title: 'Willin Wang - V0',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'To be Willin is to be willing.' },
      { hid: 'keywords', name: 'keywords', content: 'Willin, Willin Wang, v0, 长岛冰泪' },
      { name: 'author', content: 'Willin Wang' },
      { name: 'format-detection', content: 'telephone=no, email=no' },
      { name: 'mobile-web-app-capable', content: 'yes' },
      { name: 'application-name', content: 'Willin' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-title', content: 'Willin' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }
    ],
    link: [
      { rel: 'shortcut icon', href: '/favicon.ico' },
      { rel: 'apple-touch-icon', href: '/touch-icon-iphone-precomposed.png' },
      { rel: 'apple-touch-icon', sizes: '76x76', href: '/touch-icon-ipad-precomposed.png' },
      { rel: 'apple-touch-icon', sizes: '120x120', href: '/touch-icon-iphone-retina-precomposed.png' },
      { rel: 'apple-touch-icon', sizes: '152x152', href: '/touch-icon-ipad-retina-precomposed.png' }
    ],
    script: [
      { src: '//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js', async: 'async' }
    ]
  },
  modules: [
    ['nuxt-i18n', {
      locales: [
        { name: '简体中文', code: 'zh', iso: 'zh-CN', file: 'zh.js' },
        { name: 'English', code: 'en', iso: 'en-US', file: 'en.js' }
      ],
      lazy: true,
      langDir: 'locales/',
      strategy: 'prefix_and_default',
      defaultLocale: 'zh',
      detectBrowserLanguage: {
        useCookie: true,
        cookieKey: 'i18n_redirected'
      },
      vueI18n: {
        fallbackLocale: 'en'
      }
    }]
  ],
  plugins: [
    { src: '~/plugins/toys.js', ssr: false },
    { src: '~/plugins/google.js', ssr: false }
  ],
  router: {
    // middleware: 'i18n'
  },
  generate: {
    // routes: ['/'],
    fallback: true
  },
  build: {
    extractCSS: true,
    extend(config, { isDev }) {
      if (isDev) {
        // eslint-disable-next-line no-param-reassign
        config.devtool = '#source-map';
      }
    }
  }
};
