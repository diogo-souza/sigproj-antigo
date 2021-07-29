import React from "react";
import {renderHook, act} from '@testing-library/react-hooks';
import { UserStorage } from '../Services/UserContext';
import useLoginForm from './useLoginForm';

// Ref.: https://github.com/testing-library/react-hooks-testing-library/blob/master/docs/usage/advanced-hooks.md

describe('Testing useLoginForm Custom Hook', () => {
  test('test initial state', () => {

    const wrapper = ({ children }) => <UserStorage>{children}</UserStorage>
    const { result } = renderHook(() => useLoginForm(), { wrapper });

    // assert initial state
    expect(result.current.validated).toBe(false);
    expect(result.current.step).toBe(1);
    expect(result.current.errors).toMatchObject({});
  });

  test('calls validateEmail with success', () => {

    const wrapper = ({ children }) => <UserStorage>{children}</UserStorage>
    const { result } = renderHook(() => useLoginForm(), { wrapper });

    // Calls any method and check
    act(() => {
      const eventObj = {target: {value: 'testinghooks@testinghooks.com'}};
      result.current.validateEmail(eventObj);
    });

    expect(result.current.errors).toMatchObject({});
  });

  test('calls validateEmail with errors', () => {

    const wrapper = ({ children }) => <UserStorage>{children}</UserStorage>
    const { result } = renderHook(() => useLoginForm(), { wrapper });

    // Calls any method and check
    act(() => {
      const eventObj = {target: {value: 'testinghooks.com'}};
      result.current.validateEmail(eventObj);
    });

    expect(result.current.errors).toMatchObject({"email": "Email inválido."});
  });

});


