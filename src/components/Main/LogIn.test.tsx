import React from 'react';
import { render} from 'test-utils';
// import '@testing-library/jest-dom/extend-expect';    // 이거 필요없는 듯?
import {screen, fireEvent} from '@testing-library/react';
//import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
// import * from '@testing-library/dom';

import translationEn from 'language/translation/en.json';
import LogIn from './LogIn';

describe('<LogIn />', () => {

    /*
    it('matches snapshot', () => {
        const {container} = render(<Header />);
        expect(container).toMatchSnapshot();
    });
    */ 
    
    
    it ('type input', () => {
        render(<LogIn />);
        
        const inputEmail = screen.getByRole('textbox', {name: translationEn['Main.LogIn_EmailAddress']});
        
        fireEvent.change(inputEmail, { target: { value: 'test email' } });
        expect( (inputEmail as HTMLInputElement).value).toBe('test email');

        const inputPassword = screen.getByLabelText( translationEn['Main.LogIn_Password'] );
        
        fireEvent.change(inputPassword, { target: { value: 'test password' } });
        expect( (inputPassword as HTMLInputElement).value).toBe('test password');
    });
    
    

});
