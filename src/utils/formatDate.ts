import { stringify } from "querystring";

const formatDate = (date: string): string => {

    const dateFormated = new Date(date);

    const dia = (dateFormated.getDay() < 10) ? `0${dateFormated.getDay() + 1}` : dateFormated.getDay() + 1;
    const mes = (dateFormated.getMonth() < 10) ? `0${dateFormated.getMonth() + 1}` : dateFormated.getMonth() + 1;
    const ano = dateFormated.getFullYear();



    return `${dia}/${mes}/${ano}`;

};





export default formatDate;