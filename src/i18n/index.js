const cn = require('./cn');
const en = require('./en');
const tw = require('./tw');

const langs = {
  cn,
  en,
  tw
};

module.exports = (t, lang) => {
  if (langs[lang] && langs[lang][t]) return langs[lang][t];
  return t.split('_').map(x => x.replace(/^(\w)/, w => w.toUpperCase())).join(' ');
};
