import React, { useState } from 'react';
import { Container, ToggleLabel, ToggleSelect } from './styles';





const Toggle: React.FC = () => {
    const [online, setOnline] = useState(false);
    return (
    <Container>
        <ToggleLabel>Light</ToggleLabel>
        <ToggleSelect
        checked={online}
        uncheckedIcon={false}
        checkedIcon={false}
        onChange={() => setOnline(!online)}    
        />
        <ToggleLabel>Dark</ToggleLabel> 
    </Container>
             
    )
}

export default Toggle;