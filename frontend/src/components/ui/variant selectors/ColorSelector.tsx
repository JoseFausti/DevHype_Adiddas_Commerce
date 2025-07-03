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
                        border: '2px solid transparent',  // borde siempre presente pero transparente
                        borderColor: selectedColor === color ? 'black' : 'transparent', // cambiar solo color
                        borderRadius: '50%',
                        color: 'white',
                        margin: '5px',
                        cursor: 'pointer',
                        boxSizing: 'border-box', // clave para que borde no cambie tamaño
                        width: '26px',
                        height: '26px',
                        padding: 0,
                    }}
                    onClick={() => {
                        toggleColor(color);
                    }}
                >
                    {/* el texto puede estar oculto o vacío */}
                </button>
            ))}
        </div>
    );
};

export default ColorSelector;
