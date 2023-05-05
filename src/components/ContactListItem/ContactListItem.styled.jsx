import styled from '@emotion/styled';

export const ListItem = styled.li`
  height: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #505050;
  padding: 0 0 0 16px;
  border-radius: 16px;
  background-color: #ffffff;
  overflow: hidden;
`;

export const Text = styled.span`
  font-weight: 500;
`;

export const Number = styled.span`
  font-weight: 400;
`;

export const RemoveBtn = styled.button`
  padding: 0 16px 0;
  height: 100%;
  font-weight: 700;
  text-transform: uppercase;
  color: #ffffff;
  border: none;
  background-color: #ffc800;
  text-shadow: 1px 1px 2px #505050;
  transition: background-color 250ms linear;
  cursor: pointer;

  &:hover,
  &:focus {
    background-color: #e7b500;
  }
`;
