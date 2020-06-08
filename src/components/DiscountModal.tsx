import React from 'react';
import styled from 'styled-components';
import { ServiceByIdTypes, DiscountByIdTypes } from '../reducers/services';
import { commaNumber } from '../utils/helper';

interface DiscountModalProps {
  serviceById: ServiceByIdTypes;
  discountId: string;
  discountById: DiscountByIdTypes;
  onDiscountChange: (serviceId: string, discountId: string) => void;
  onDeleteButtonClick: (id: string) => void;
  onOKButtonClick: () => void;
}

export default function DiscountModal({
  serviceById,
  discountId,
  discountById,
  onDiscountChange,
  onDeleteButtonClick,
  onOKButtonClick
}: DiscountModalProps) {
  return (
    <Wrapper>
      <ModalContainer>
        <Title>{discountById[discountId].name}</Title>
        {discountById[discountId].targets.map((targetObj) => (
          <DiscountContainer key={targetObj.id}>
            <div>
              <div>
                {serviceById[targetObj.id].name}x
                {serviceById[targetObj.id].count}
              </div>
              <div>
                {commaNumber(
                  serviceById[targetObj.id].price *
                    serviceById[targetObj.id].count
                )}
              </div>
            </div>
            <input
              type="checkbox"
              checked={targetObj.checked}
              onChange={() => onDiscountChange(targetObj.id, discountId)}
            />
          </DiscountContainer>
        ))}
        <ButtonContainer>
          <RemoveButton onClick={() => onDeleteButtonClick(discountId)}>
            삭제
          </RemoveButton>
          <Button onClick={onOKButtonClick}>확인</Button>
        </ButtonContainer>
      </ModalContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.6);
`;

const ModalContainer = styled.div`
  width: 35%;
  max-width: 400px;
  min-height: 10vh;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  border: 1px solid rgba(37, 38, 42, 0.2);
  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 4px;
  border-radius: 10px;
`;

const Button = styled.button`
  background-color: #0095f6;
  color: #ffffff;
  width: 40%;
  height: 3vh;
  border: 0;
  border-radius: 5px;
  margin: 10px;
  cursor: pointer;
`;

const RemoveButton = styled.button`
  background-color: #d92027;
  color: #ffffff;
  width: 40%;
  height: 3vh;
  border: 0;
  border-radius: 5px;
  margin: 10px;
  cursor: pointer;
`;

const Title = styled.h5`
  padding: 15px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  margin: 0;
`;

const DiscountContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 20px 0;
`;

const ButtonContainer = styled.div`
  width: 100%;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`;
