const cn = require('./cn');
const en = require('./en');

const langs = {
  cn,
  en
};

module.exports = lang => langs[lang];
