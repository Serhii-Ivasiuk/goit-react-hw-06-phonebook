// Libs
import styled from '@emotion/styled';
import { Form, Field } from 'formik';

export const FormForAddNewContact = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100%;
  padding: 16px;
  border: 1px solid #505050;
  border-radius: 12px;
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const LabelText = styled.span`
  margin-bottom: 4px;
  padding-left: 16px;
  font-weight: 700;
`;

export const Input = styled(Field)`
  height: 32px;
  margin-bottom: 4px;
  padding: 16px;
  font-size: 16px;
  color: #505050;
  border: 1px solid #505050;
  border-radius: 8px;
`;

export const SubmitBtn = styled.button`
  height: 32px;
  padding: 4px 16px;
  text-transform: uppercase;
  font-weight: 700;
  background-color: #008000;
  color: #ffffff;
  text-shadow: 1px 1px 2px #505050;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 250ms linear;

  &:hover,
  &:focus {
    background-color: #006f00;
  }
`;

export const ValidationWrapper = styled.div`
  color: #ff6347;
  padding: 0 16px;
`;
