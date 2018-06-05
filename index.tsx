import * as React from 'react';
import { connect } from 'react-redux';

interface OwnProps {
  a: string;
}
interface State {}

interface StateProps {
  b: string;
}
function makeMapStateToProps() {
  return function mapStateToProps(s: State, o: OwnProps): StateProps {
    return { b: o.a };
  };
}

const decorator = connect(makeMapStateToProps);

interface TestComponentProps {
  b: string;
  c: string;
}

const TestComponent: React.StatelessComponent<TestComponentProps> = () => null;

const testElement1 = <TestComponent a="foo" />; // $ExpectError
const testElement2 = <TestComponent b="foo" />; // $ExpectError
const testElement3 = <TestComponent b="foo" c="bar" />; // $ExpectError

const DecoratedComponent = decorator(TestComponent);

const decoratedElement1 = <DecoratedComponent a="foo" />; // $ExpectError
const decoratedElement2 = <DecoratedComponent c="bar" />; // $ExpectError
const decoratedElement3 = <DecoratedComponent a="foo" c="bar" />;
