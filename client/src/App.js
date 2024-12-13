import React from 'react';

import { useTranslation, Trans } from 'react-i18next'; // TRANSLATION IN HOOKS

function App() {
  const { t, i18n } = useTranslation();
  return (
    <div className="App">
      <header className="App-header">
        <p>{ t('welcome.title', { framework: "react-i18next" }) }</p>
          <p><Trans i18nKey='welcome.intro'>
            To get started!, edit <code>src/App.js</code> and save to reload!
        </Trans></p>
        <a className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer" >
          <Trans i18nKey='welcome.link'>Learn React</Trans>
        </a>
      </header>
    </div>
  );
}

export default App;




/**
 *
 const reverseString = (str) => {
   return str.toLowerCase().split('').reverse().join('');
 };

 module.exports = reverseString;
*/
