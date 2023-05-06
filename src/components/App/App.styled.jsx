// Libs
import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 480px;
  height: calc(100vh - 80px);
  margin: 0 auto;
  padding: 20px;
  color: DarkSlateGray;
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const MainTitle = styled.h1`
  padding-left: 32px;
`;

export const SectionTitle = styled.h2`
  padding-left: 32px;
`;

export const ContactsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  border: 1px solid #505050;
  padding: 16px;
  border-radius: 12px;
`;

export const NoContactsMessage = styled.p`
  font-weight: 700;
  text-align: center;
  color: #ff6347;
`;
