import React, {useState} from 'react';

export function Picker(props){

    const [r, setR] = useState(0);
    const [g, setG] = useState(0);
    const [b, setB] = useState(0);
    const [name, setName] = useState('');

    const hex = '#' + 
    r.toString(16).padStart(2, '0') + 
    g.toString(16).padStart(2, '0') + 
    b.toString(16).padStart(2, '0');

    return(
        <div className="swatch" id="picker" style={{
            backgroundColor: hex
        }}>

            <input 
                type="range" 
                min="0" 
                max="255"
                value={r}
                onChange={e => setR(parseInt(e.target.value))}
            />

            <input 
                type="range" 
                min="0" 
                max="255"
                value={g}
                onChange={e => setG(parseInt(e.target.value))}
            />

            <input 
                type="range" 
                min="0" 
                max="255"
                value={b}
                onChange={e => setB(parseInt(e.target.value))}
            />

            <input
                type="text"
                id="name-input"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="name"
            />

            <button onClick={() => props.addColor({name, hex})}>Add to Palette!</button>

        </div>
    );
}