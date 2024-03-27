import { Request, Response } from 'express';
import mercadopago from 'mercadopago';

export default async (req: Request, res: Response) => {
  try {
    console.log(`Llego el Webhook ${req.query}`);

    const payment = req.query;

    // Verificar si 'data.id' existe y es una cadena
    if (payment.type === 'payment' && typeof payment['data.id'] === 'string') {
      const parseId: number = parseInt(payment['data.id'], 10); // Asegurar que el segundo argumento sea la base 10

      // Verificar si la conversión fue exitosa y no es NaN
      if (!isNaN(parseId)) {
        const data = await mercadopago.payment.findById(parseId);
        console.log(data);
      }
    }

    res.status(200).sendStatus(204);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};
