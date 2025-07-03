import { createPurchaseOrder } from "../data/PurchaseOrdersController";
import { IDetail } from "../types/types";
import { PaymentMethod, Status } from "../utils/enums";

export const createOrder = async (
  userId: number,
  cart: IDetail[],
  setInitPoint: (url: string) => void
) => {
  try {
    const response = await createPurchaseOrder({
      userId,
      paymentMethod: PaymentMethod.MERCADO_PAGO,
      status: Status.PENDING,
      details: cart.map(item => ({
        quantity: item.quantity,
        variantId: item.variant.id,
      })),
    });

    if (response.status === 201) {
      const url = response.data!.initPoint;
      setInitPoint(url);
      window.location.href = url;
    }
  } catch (error) {
    console.error("Error al crear la orden:", error);
  }
};