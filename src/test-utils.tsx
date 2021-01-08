import React from 'react';
import { render as renderRtl } from '@testing-library/react';

import { IntlProvider } from 'react-intl';
import translationEn from 'language/translation/en.json';

import { Router} from "react-router-dom";  // BrowserRouter
import history from 'historyApp';

import {Provider, useSelector, useDispatch} from 'react-redux' 
import store from './store';

import { CookiesProvider } from 'react-cookie';



// wrote automatically from IDE tooltip
type Ui = React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>;

function render(ui: Ui, { locale = 'en', ...renderOptions }: any) {
  function Wrapper({ children }:{children: any}) {
    return (
        <Router history={history}>
        <CookiesProvider>
        <Provider store={store}>
        <IntlProvider locale={'en'} messages={translationEn} >
            {children}
        </IntlProvider>
        </Provider>
        </CookiesProvider>
        </Router>
    )
  }
  return renderRtl(ui, { wrapper: Wrapper, ...renderOptions })
}

// re-export everything
export * from '@testing-library/react'

// override render method
export { render }