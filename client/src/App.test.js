import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from "enzyme";
import App from './App';

import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });


// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });

describe('App', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<App debug />);

    expect(component).toMatchSnapshot();
  });
});



test('Test Fake', () => {
  expect(true).toBeTruthy();
});

/*
const reverseString = require('./App');

test('Test Fake', () => {
  expect(true).toBeTruthy();
});

test('reverseString to be defined', () => {
  expect(reverseString).toBeDefined();
});

test('Reverse String', () => {
  expect(reverseString('hello')).toEqual('olleh');
});

const nameCheck = () => console.log("Checking Name...")
describe('Here is Check Names', () => {
  test('User is Jack', () => {
    const user = 'Jack';
    expect(user).toBe('Jack');
  });
  test('User is Hacker', () => {
    const user = 'Hacker';
    expect(user).toBe('Hacker');
  });
  beforeEach(() => nameCheck());
});

*/
