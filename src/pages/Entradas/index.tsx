import React, { useMemo, useState } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { Container, Form, FormTitle, Logo, Select } from './styles';
import logo from '../../assets/logo.svg';
import SelectInput from '../../components/SelectInput';
import listType from '../../utils/listType';
import listFrequency from '../../utils/listFrequency';

interface IRouteParams {
    match: {
        params: {
            type: string
        }
    }
}

const Entradas: React.FC<IRouteParams> = ({ match }) => {

    const [amount, setAmount] = useState<number>(0);
    const [description, setDescription] = useState<string>('');
    const [type, setType] = useState<number>(1);
    const [date, setDate] = useState<Date>(new Date());
    const [frequency, setFrequency] = useState<number>(1);


    const objEntrada = { amount, description, type, date, frequency };


    const handleSubmit = (event: any) => {


        // pega o tipo dependendo da ação entrada ou saida
        objEntrada.type = data.type;

        fetch('https://localhost:44340/api/balance', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(objEntrada)
        }).then(function (response) {
            console.log(response)
            return response.json();
        });

        event.preventDefault();
    }

    const movimentType = match.params.type;

    const data = useMemo(() => {

        //listData é o obj vindo do backend
        return movimentType === 'entry-balance' ?
            {

                title: 'Entradas',
                lineColor: '#F7931B',
                type: 1


            }
            :
            {
                title: 'Saídas',
                lineColor: '#E44C4E',
                type: 2
            }

    }, [movimentType]);


    const frequencys = useMemo(() => {
        return listFrequency.map((item, index) => {
            return {
                value: index + 1,
                label: item
            }
        });
    }, [listFrequency]);



    const handleFrequencySelecionado = (frequency: string) => {
        try {
            const parseFrequency = Number(frequency);
            setFrequency(parseFrequency);



        } catch (error) {
            throw new Error('invalid month value.')
        }
    }



    return (
        <Container>
            <Logo>
                <img src={logo} alt="Minha Carteira" />
                <h2>Minha Carteira</h2>
            </Logo>

            <Form onSubmit={handleSubmit}>
                <FormTitle>{data.title}</FormTitle>

                <Input
                    type="number"
                    placeholder="Valor"
                    required
                    onChange={(e) => setAmount(Number(e.target.value))}
                />

                <Input
                    type="text"
                    placeholder="Descrição"
                    required
                    onChange={(e) => setDescription(e.target.value)}
                />
                <Input
                    type="date"
                    placeholder="Data"
                    required
                    onChange={(e) => setDate(new Date(e.target.value))}
                />


                <Select>
                    <SelectInput
                        options={frequencys}
                        onChange={(e) => handleFrequencySelecionado(e.target.value)}
                        defaultValue={frequency}
                    />

                </Select>

                <Button type="submit">Salvar</Button>


            </Form>
        </Container >

    );
};


export default Entradas;