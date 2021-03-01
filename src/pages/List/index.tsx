import React, { useEffect, useMemo, useState } from 'react';
import CardFinance from '../../components/FinanceCard';
import ContentHeader from '../../components/ContentHeader';
import { uuid } from 'uuidv4';
import SelectInput from '../../components/SelectInput';
import { Container, Content, Filters } from './styles';

import gains from '../../repositories/gains';
import expenses from '../../repositories/expenses';
import formatCurrency from '../../utils/formatCurrency';
import formatDate from '../../utils/formatDate';
import listMeses from '../../utils/listMeses';


// interface para receber os parametros de outra tela
interface IRouteParams {
    match: {
        params: {
            type: string
        }
    }
}

// interface para mapeamento dos dados vindos do servidor
interface IData {
    id: string;
    description: string;
    amount: string;
    frequency: string;
    data: string;
    tagColor: string;

}

const List: React.FC<IRouteParams> = ({ match }) => {
    const [data, setData] = useState<IData[]>([]);
    const [mesSelecionado, setMesSelecionado] = useState<number>(new Date().getMonth() + 1);
    const [anoSelecionado, setAnoSelecionado] = useState<number>(new Date().getFullYear());
    const [frequencySelecionado, setFrequency] = useState<string[]>(['recorrente', 'eventual']);

    const movimentType = match.params.type;


    const getGains = (type: number) => {

        fetch('https://localhost:44340/api/balance/balance/type?type=' + type, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response => response.json())
            .then(data => console.log(data));

        return data;
    }

    const pageData = useMemo(() => {


        //listData é o obj vindo do backend
        return movimentType === 'entry-balance' ?
            {

                title: 'Entradas',
                lineColor: '#F7931B',
                listData: gains

            }
            :
            {
                title: 'Saídas',
                lineColor: '#E44C4E',
                listData: expenses
            }

    }, [movimentType]);




    // ANOS
    const anos = useMemo(() => {

        let arrayAnos: number[] = [];

        pageData.listData.forEach(item => {
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


    // MESES
    const meses = useMemo(() => {
        return listMeses.map((item, index) => {
            return {
                value: index + 1,
                label: item
            }
        });
    }, []);





    // filtro por frequencia
    const handleFrequencyClick = (frequency: string) => {
        const selecionado = frequencySelecionado.findIndex(item => item === frequency);

        if (selecionado >= 0) {
            const filtered = frequencySelecionado.filter(item => item !== frequency);
            setFrequency(filtered);
        } else {
            setFrequency((prev) => [...prev, frequency]);
        }
    };


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


    useEffect(() => {


        const filterData = pageData.listData.filter(item => {
            const date = new Date(item.date);
            const mes = date.getMonth() + 1;
            const ano = date.getFullYear();

            return mes === mesSelecionado && ano === anoSelecionado && frequencySelecionado.includes(item.frequency);
        });


        // AQUI EU PRECISO PEGAR OS DADOS DO SERVIDOR : GET ALL FOR TYPE TODO LIMA


        const response = filterData.map(item => {
            return {
                id: uuid(),
                description: item.description,
                amount: formatCurrency(Number(item.amount)),
                frequency: item.frequency,
                data: formatDate(item.date),
                tagColor: item.frequency === 'recorrente' ? '#4E41F0' : '#E44C4E'
            }
        });


        setData(response);

    }, [anoSelecionado, pageData, mesSelecionado, frequencySelecionado]);


    return (
        <Container>
            <ContentHeader title={pageData.title} lineColor={pageData.lineColor}>
                <SelectInput
                    options={meses}
                    onChange={(e) => handleMesSelecionado(e.target.value)}
                    defaultValue={mesSelecionado} />
                <SelectInput
                    options={anos}
                    onChange={(e) => handleAnoSelecionado(e.target.value)}
                    defaultValue={anoSelecionado} />

            </ContentHeader>

            <Filters>
                <button type="button"
                    className={`tag-filter tag-filter-recurrent
                    ${frequencySelecionado.includes('recorrente') && 'tag-actived'}`}
                    onClick={() => handleFrequencyClick('recorrente')}
                >
                    Recorrentes
    </button>
                <button type="button"
                    className={`tag-filter tag-filter-eventual
                    ${frequencySelecionado.includes('eventual') && 'tag-actived'}`}
                    onClick={() => handleFrequencyClick('eventual')}
                >
                    Eventuais
    </button>

            </Filters>
            <Content>

                {
                    data.map(item => (
                        <CardFinance
                            key={item.id}
                            tagColor={item.tagColor}
                            title={item.description}
                            subtitle={item.data}
                            amount={item.amount}

                        />
                    ))
                }

            </Content>
        </Container >
    )
}

export default List;