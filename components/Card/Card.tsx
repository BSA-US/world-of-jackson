import React, {ReactNode} from 'react';
import styled from 'styled-components';

interface CardProps {
    children?: ReactNode;
}

const CardOuter = styled.div`
  padding: 40px 20px;
  position: relative;
  background: #FFFFFF;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1), 0px 0px 0px 1px #000000;
  border-radius: 22px;
`

const CardBody = styled.div`
    display: flex;
    flex-direction: column;
`

const Card: React.FC = ({children}: CardProps) => {
    return (
        <CardOuter>
            <CardBody>
                {children}
            </CardBody>
        </CardOuter>
    )
}

export default Card;