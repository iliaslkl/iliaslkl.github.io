const assert = require('assert');

let storedLang;

function createElement(attrs = {}) {
  return {
    innerHTML: '',
    ...attrs,
  };
}

function createStubElement() {
  return {
    addEventListener() {},
    classList: {
      add() {},
      remove() {},
      toggle() {},
      contains() { return false; }
    }
  };
}

function setupDom() {
  const flag = createElement({ src: '', alt: '' });
  const elements = {
    greeting: createElement({ getAttribute: () => 'greeting' }),
  };

  global.document = {
    documentElement: {},
    body: createStubElement(),
    getElementById(id) {
      return id === 'lang-flag' ? flag : null;
    },
    querySelector() { return createStubElement(); },
    querySelectorAll(selector) {
      if (selector === '[data-i18n]') {
        return Object.values(elements);
      }
      return [];
    },
    addEventListener() {},
  };

  global.localStorage = {
    setItem(key, value) { if (key === 'lang') storedLang = value; },
    getItem() { return storedLang; },
  };

  global.navigator = { language: 'en-US' };
  global.IntersectionObserver = function() {
    return { observe() {} };
  };

  return { flag, elements };
}

(function() {
  const { flag, elements } = setupDom();
  ({ setLanguage, toggleLanguage } = require('../script.js'));

  setLanguage('fr');
  assert.strictEqual(storedLang, 'fr');
  assert.strictEqual(document.documentElement.lang, 'fr');
  assert.ok(flag.src.includes('English-button'));
  assert.strictEqual(flag.alt, 'English');

  setLanguage('en');
  assert.strictEqual(document.documentElement.lang, 'en');
  assert.ok(flag.src.includes('french-button'));
  assert.strictEqual(flag.alt, 'Français');

  console.log('setLanguage tests passed');

  storedLang = 'en';
  toggleLanguage();
  assert.strictEqual(storedLang, 'fr');
  console.log('toggleLanguage tests passed');
})();
