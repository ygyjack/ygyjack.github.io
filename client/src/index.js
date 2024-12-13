import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

/* Translation */
import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';
import LanguageDetector from "i18next-browser-languagedetector";
import common_fr from "./translations/fr/common.json";
import common_en from "./translations/en/common.json";
import common_zh from "./translations/zh/common.json";

/* Bootstrap CSS */
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

/* FortAwesome ICON */
import Icon from './Icon';

/* Container */
import Container from './Container';

/* Redux */
import { createStore } from 'redux';
/**
 * REACT-REDEX
 */

// ACTION
const increment = () => {
  return {
    type: "INCREMENT"
  }
}
const decrement = () => {
  return {
    type: "DECREMENT"
  }
}

// REDUCER
const counter = (state=0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state+1;
      break;
    case 'DECREMENT':
      return state-1;
      break;
  }
}

// STORE -> GLOBALIZED STATE
let store = createStore(counter);
store.subscribe(() => console.warn("Redux: ", store.getState()));

// DISPATCH
store.dispatch(increment());


store.dispatch(increment());


store.dispatch(increment());








i18next
.use(LanguageDetector)
.init({
    interpolation: { escapeValue: false },  // React already does escaping
    resources: {
      en: {
        common: common_en                   // 'common' is our custom namespace
      },
      fr: {
        common: common_fr
      },
      zh: {
        common: common_zh
      }
    },
    // lng: 'en',                           // language to use
    fallbackLng: 'en',
    debug: true,
    // have a common namespace used around the full app
    ns: ["common"],
    defaultNS: "common"
});

ReactDOM.render(
  <I18nextProvider i18n={i18next}>
    <Container />
  </I18nextProvider>, document.getElementById('root'));



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
