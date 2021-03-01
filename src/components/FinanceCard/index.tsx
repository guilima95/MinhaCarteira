import React from 'react';
import ContentHeader from '../ContentHeader';
import { Container, Tag } from './styles';


interface IFinanceCardProps {
    tagColor: string;
    title: string;
    subtitle: string;
    amount: string;

}

const FinanceCard: React.FC<IFinanceCardProps> = ({
    tagColor,
    title,
    subtitle,
    amount

}) => {

    return (
        <Container>
            <Tag color={tagColor} />
            <div>
                <span>{title}</span>
                <small>{subtitle}</small>
            </div>

            <h3>{amount}</h3>
        </Container>

    );
}

export default FinanceCard;