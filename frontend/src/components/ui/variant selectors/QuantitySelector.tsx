import { IconButton, Typography, Box } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";

interface QuantitySelectorProps {
  quantity: number;
  maxQuantity: number;
  increaseQuantity: () => void;
  decreaseQuantity: () => void;
}

const QuantitySelector = ({
  quantity,
  maxQuantity,
  increaseQuantity,
  decreaseQuantity,
}: QuantitySelectorProps) => {
  return (
    <Box display="flex" alignItems="center" gap={1}>
      <IconButton
        onClick={decreaseQuantity}
        disabled={quantity <= 1 || maxQuantity === 0}
        size="small"
        color="primary"
      >
        <Remove />
      </IconButton>

      <Typography variant="body1">{quantity}</Typography>

      <IconButton
        onClick={increaseQuantity}
        disabled={quantity >= maxQuantity || maxQuantity === 0}
        size="small"
        color="primary"
      >
        <Add />
      </IconButton>

      {maxQuantity === 0 && (
        <Typography variant="body2" color="error" ml={2}>
          Sin stock
        </Typography>
      )}
    </Box>
  );
};

export default QuantitySelector;
