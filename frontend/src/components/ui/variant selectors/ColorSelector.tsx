interface ColorSelectorProps {
    colors: string[];
    selectedColor: string | null;
    toggleColor: (color: string) => void;
}

const ColorSelector = ({
    colors,
    selectedColor,
    toggleColor,
    }: ColorSelectorProps 
) => {
    return (
        <div>
            {colors.map(color => (
                <button
                    key={color}
                    style={{
                        backgroundColor: color,
                        border: selectedColor === color ? '2px solid black' : 'none',
                        borderRadius: '3px',
                        color: 'white',
                        margin: '5px',
                        cursor: 'pointer',
                    }}
                    onClick={() => {
                        toggleColor(color); 
                    }}
                    >
                    {color}
                </button>
            ))}
        </div>
    );
};

export default ColorSelector;
