import styled from 'styled-components';

/**
* Layout
    *MAIN HEADER
    *ASIDE
     *CONTENT

*/

export const Grid = styled.div`
display: grid;
grid-template-columns: 250px auto;
grid-template-rows: 70px auto;

grid-template-areas: 
'ASIDE MAINHEADER'
'ASIDE CTN';

height: 100vh;









`