import React from 'react';
import styled from 'styled-components';

interface ErrorProps {
  errorMessage: string;
}

export default function errorMessage({ errorMessage }: ErrorProps) {
  return <Message>{errorMessage}</Message>;
}

const Message = styled.div`
  color: #d92027;
`;
