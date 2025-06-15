const assert = require('assert');

function createStubElement() {
  return {
    classList: {
      toggle() {},
      add() {},
      remove() {},
      contains() { return false; },
    },
    addEventListener() {},
    style: {},
    children: [],
  };
}

global.document = {
  body: createStubElement(),
  querySelector() { return createStubElement(); },
  querySelectorAll() { return []; },
  getElementById() { return createStubElement(); },
  addEventListener() {},
  documentElement: {},
};

global.localStorage = {
  getItem() { return null; },
  setItem() {},
};

global.IntersectionObserver = function() {
  return { observe() {} };
};

const { initializeTheme } = require('../script.js');

function createMockDocument() {
  const classes = new Set();
  return {
    body: {
      classList: {
        toggle(cls, cond) { cond ? classes.add(cls) : classes.delete(cls); },
        contains(cls) { return classes.has(cls); },
      },
    },
    querySelector(selector) {
      if (selector === 'input[type="checkbox"]') return this.checkbox;
      return null;
    },
    checkbox: { checked: false },
  };
}

function runTest(stored) {
  global.localStorage = {
    getItem: () => stored,
  };
  const doc = createMockDocument();
  global.document = doc;
  initializeTheme();
  return doc;
}

(function(){
  let doc = runTest('dark');
  assert.strictEqual(doc.checkbox.checked, true);
  assert.strictEqual(doc.body.classList.contains('dark'), true);
  assert.strictEqual(doc.body.classList.contains('light'), false);

  doc = runTest('light');
  assert.strictEqual(doc.checkbox.checked, false);
  assert.strictEqual(doc.body.classList.contains('dark'), false);
  assert.strictEqual(doc.body.classList.contains('light'), true);

  console.log('Theme tests passed');
})();
