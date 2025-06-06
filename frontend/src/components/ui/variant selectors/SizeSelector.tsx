interface SizeSelectorProps {
  sizes: number[];
  selectedSize: number | null;
  toggleSize: (size: number) => void;
}

const SizeSelector = ({
    sizes,
    selectedSize,
    toggleSize,
    }: SizeSelectorProps
) => {
    return (
        <div>
        {sizes.map((size) => (
            <button
                key={size}
                onClick={() => toggleSize(size)}
                style={{
                    padding: '6px 12px',
                    margin: '5px',
                    borderRadius: '4px',
                    border: selectedSize === size ? '2px solid black' : '1px solid gray',
                    backgroundColor: selectedSize === size ? 'black' : 'white',
                    color: selectedSize === size ? 'white' : 'black',
                    cursor: 'pointer',
                }}
            >
            {size}
            </button>
        ))}
        </div>
    );
}

export default SizeSelector
