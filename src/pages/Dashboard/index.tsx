import React, { useMemo, useState } from 'react';
import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';

import listMeses from '../../utils/listMeses';
import { Container, Content } from './styles';

import gains from '../../repositories/gains';
import expenses from '../../repositories/expenses';

import up from '../../assets/up.svg';
import decline from '../../assets/decline.svg';
import stable from '../../assets/emotions.svg';



import WalletBox from '../../components/WalletBox';
import MessageBox from '../../components/MessageBox';

const Dashboard: React.FC = () => {

    const [mesSelecionado, setMesSelecionado] = useState<number>(new Date().getMonth() + 1);
    const [anoSelecionado, setAnoSelecionado] = useState<number>(new Date().getFullYear());


    const meses = useMemo(() => {
        return listMeses.map((item, index) => {
            return {
                value: index + 1,
                label: item
            }
        });
    }, []);

    const anos = useMemo(() => {

        let arrayAnos: number[] = [];

        [...expenses, ...gains].forEach(item => {
            const date = new Date(item.date);
            const ano = date.getFullYear();

            if (!arrayAnos.includes(ano)) {
                arrayAnos.push(ano);
            }

        });

        return arrayAnos.map(ano => {
            return {
                value: ano,
                label: ano
            }
        });
    }, []);



    const handleMesSelecionado = (mes: string) => {
        try {
            const parseMes = Number(mes);
            setMesSelecionado(parseMes);
        } catch (error) {
            throw new Error('invalid month value.')
        }
    }
    const handleAnoSelecionado = (ano: string) => {
        try {
            const parseAno = Number(ano);
            setAnoSelecionado(parseAno);
        } catch (error) {
            throw new Error('invalid year value. Is accept integer numbers.')
        }
    }

    const totalGastos = useMemo(() => {
        let total: number = 0;
        expenses.forEach(item => {
            const date = new Date(item.date);
            const ano = date.getFullYear();
            const mes = date.getMonth() + 1;

            if (mes === mesSelecionado && ano === anoSelecionado) {
                try {
                    total += Number(item.amount)
                } catch (error) {
                    throw new Error('invalid amount. Amount must be number.');
                }
            }
        })

        return total;


    }, [mesSelecionado, anoSelecionado]);

    const totalReceitas = useMemo(() => {
        let total: number = 0;
        gains.forEach(item => {
            const date = new Date(item.date);
            const ano = date.getFullYear();
            const mes = date.getMonth() + 1;

            if (mes === mesSelecionado && ano === anoSelecionado) {
                try {
                    total += Number(item.amount)
                } catch (error) {
                    throw new Error('invalid amount. Amount must be number.');
                }
            }
        })

        return total;


    }, [mesSelecionado, anoSelecionado]);


    const totalSaldo = useMemo(() => {
        const total = totalReceitas - totalGastos;
        return total;
    }, [totalReceitas, totalGastos]);


    const message = useMemo(() => {
        if (totalSaldo < 0) {
            return {
                title: "Que absurdo.",
                description: "Neste mês, você gastou mais que deveria meu jovem.",
                footerText: "Verifique seus gastos, tem algo errado.",
                icon: decline
            }
        }
        else if (totalSaldo === 0) {
            return {
                title: "Ufa!",
                description: "Neste mês, não sobrou nada. Você gastou o limite.",
                footerText: 'Verifique seus gastos, isso não é tão bom.',
                icon: stable
            }
        }

        else {
            return {
                title: "Muito bem!",
                description: "Neste mês, sobrou uma grana.",
                footerText: 'Investe logo esse dinheiro, meu jovem.',
                icon: up
            }

        }
    }, [totalSaldo]);



    return (
        <Container>
            <ContentHeader title='Dashboard' lineColor="#F7931B">
                <SelectInput
                    options={meses}
                    onChange={(e) => handleMesSelecionado(e.target.value)}
                    defaultValue={mesSelecionado} />
                <SelectInput
                    options={anos}
                    onChange={(e) => handleAnoSelecionado(e.target.value)}
                    defaultValue={anoSelecionado} />

            </ContentHeader>
            <Content>
                <WalletBox
                    title="Saldo"
                    amount={totalSaldo}
                    footerlabel="atualizado com base nas entradas e saidas."
                    icon="dolar"
                    color="#4E41F0"

                />
                <WalletBox
                    title="Receita"
                    amount={totalReceitas}
                    footerlabel="atualizado com base nas entradas e saidas."
                    icon="arrowUp"
                    color="#F7931B"

                /> <WalletBox
                    title="Gastos"
                    amount={totalGastos}
                    footerlabel="atualizado com base nas entradas e saidas."
                    icon="arrowDown"
                    color="#E44C4E"

                />
                <MessageBox
                    title={message.title}
                    key=""
                    description={message.description}
                    footerText={message.footerText}
                    icon={message.icon} />
            </Content>
        </Container>
    )
}

export default Dashboard;