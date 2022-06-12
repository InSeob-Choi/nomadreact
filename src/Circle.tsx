import { useState } from 'react';
import styled from 'styled-components';

interface ContainerProps {
  bgColor: string;
  borderColor?: string;
  text?: string;
}

const Container = styled.div<ContainerProps>`
  width: 200px;
  height: 200px;
  background-color: ${props => props.bgColor};
  border-radius: 50%;
  border: 25px solid ${props => props.borderColor ?? "yellow"};
`;

interface CircleProps {
  bgColor: string;
  borderColor?: string;
  text?: string;
}

function Circle({bgColor, borderColor, text="default text"}: CircleProps) {
  const [counter, setCounter] = useState<number>(1);
  const onClick = () => {
    setCounter(counter + 1);
  }
  return (
    <Container bgColor={bgColor} borderColor={borderColor} onClick={onClick}>{text} : {counter}</Container>
  )
}

export default Circle;