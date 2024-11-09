// src/components/Button.js
import React from 'react';
import styled from 'styled-components';

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

const StyledButton = styled.button`
  padding: 0.5rem 3rem;
  background-color: #207BFF;
  color: #fff;
  border: none;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #4EA5FF;
  }

  &:active {
    transform: translateY(1px);
  }
`;

const Button = ({ children, onClick, type = 'button', className }) => {
  return (
    <ButtonWrapper className={className}>
      <StyledButton onClick={onClick} type={type}>
        {children}
      </StyledButton>
    </ButtonWrapper>
  );
};

export default Button;
