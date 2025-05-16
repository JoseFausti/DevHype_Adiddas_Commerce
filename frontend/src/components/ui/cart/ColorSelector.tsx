import { useEffect, useState } from 'react';
import { getAllColors } from '../../../data/ColorsController';
import { useColorSelection } from './hooks/useColorSelection';
import { IColor } from '../../../types/types';

const ColorSelector = () => {
    const { selectedColorsArray, toggleColor } = useColorSelection();
    const [colors, setColors] = useState<IColor[]>([]);

    useEffect(() => {
        try {
           const fetchColors = async () => {
                const response = await getAllColors();
                if (response.status === 200) {
                    setColors(response.data);
                } else {
                    throw new Error(response.error);
                }
            }
            fetchColors();
        } catch (error) {
            console.error('Error fetching colors:', error);
        }
    }, []);
      

    return (
        <div>
        {colors.map(color => (
            <button
            key={color}
            style={{
                backgroundColor: selectedColorsArray.includes(color) ? color : 'gray',
                color: 'white',
                margin: '5px',
            }}
            onClick={() => toggleColor(color)}
            >
            {color}
            </button>
        ))}
        </div>
    );
};

export default ColorSelector;
