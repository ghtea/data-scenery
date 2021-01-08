import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import LogIn from './LogIn';
import { StringLiteral } from 'typescript';

render(<div > hahaha </div>);

type TypeProfile = {
    username: string;
    name: String;
};

const Profile = ({ username, name }:TypeProfile) => {
  return (
    <div>
      <b>{username}</b>
      <span>({name})</span>
    </div>
  );
};

const App = () => {
  return <Profile username="velopert" name="김민준" />;
};

describe('<Profile />', () => {
  it('matches snapshot', () => {
    const utils = render(<Profile username="velopert" name="김민준" />);
    expect(utils.container).toMatchSnapshot();
  });
});