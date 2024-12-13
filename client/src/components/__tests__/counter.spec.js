import React from "react";
import { shallow } from "enzyme";
// import { create } from "react-test-renderer";
// import Counter from "./../counter";

test('Test Counter Fake', () => {
  expect(true).toBeTruthy();
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

// function Button(props) {
//   return <button>Nothing to do for now</button>;
// }
//
// describe("Button component", () => {
//   test("Matches the snapshot", () => {
//     const button = create(<Button />);
//     expect(button.toJSON()).toMatchSnapshot();
//   });
// });
