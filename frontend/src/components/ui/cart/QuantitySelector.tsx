interface QuantitySelectorProps {
  quantity: number;
  maxQuantity: number;
  onChange: (value: number) => void;
}

const QuantitySelector = ({ quantity, maxQuantity, onChange }: QuantitySelectorProps) => {
  return (
    // Modificar el componente para mostrar el numero y usar las flechas para aumentar o disminuir la cantidad
    // Agregar un mensaje de "Sin stock" si maxQuantity es 0
    <div>
      <label>Cantidad:</label>
      <select
        value={quantity}
        onChange={(e) => onChange(Number(e.target.value))}
        disabled={maxQuantity === 0}
      >
        {[...Array(maxQuantity)].map((_, i) => (
          <option key={i + 1} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>
      {maxQuantity === 0 && <p style={{ color: 'red' }}>Sin stock</p>}
    </div>
  );
};

export default QuantitySelector;
