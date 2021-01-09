import React from 'react';
import { render as renderRtl, RenderOptions } from '@testing-library/react';

import { IntlProvider } from 'react-intl';
import translationEn from 'language/translation/en.json';

import { Router} from "react-router-dom";  // BrowserRouter
import history from 'historyApp';

import {Provider, useSelector, useDispatch} from 'react-redux' 
import store from './store';

import { CookiesProvider } from 'react-cookie';



// wrote automatically from IDE tooltip
type Ui = React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>;
type Option = Pick<RenderOptions<typeof import("@testing-library/dom/types/queries")>, "container" | "baseElement" | "hydrate" | "wrapper"> | undefined;


const wrapper:React.FunctionComponent<{}> = ({ children }) => {
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

const render = (ui: Ui, option?: Option) =>
    renderRtl(ui, { wrapper: wrapper, ...option })



// re-export everything
export * from '@testing-library/react';

// override render method
export { render }
