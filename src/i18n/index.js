const cn = require('./cn');
const en = require('./en');
const tw = require('./tw');

const langs = {
  cn,
  en,
  tw
};

module.exports = lang => langs[lang];
