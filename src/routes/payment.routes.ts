import { Request, Response, Router } from 'express';
import mercadopago from 'mercadopago';
import receiveWebhook from '../handlers/payments/receiveWebhook.js';
const { ACCESS_TOKEN_MERCADOPAGO } = process.env;

const router = Router();

router.post('/create-order', async (_req: Request, res: Response) => {
  mercadopago.configure({ access_token: ACCESS_TOKEN_MERCADOPAGO || '' });

  const response = await mercadopago.preferences.create({
    items: [
      {
        title: 'Sapo',
        description: 'Sapo para combatir el dengue y el sika',
        picture_url: 'https://fotodeSapo.com.ar',
        unit_price: 500,
        quantity: 3,
        currency_id: 'ARS',
      },
    ],
    back_urls: {
      success: 'http://localhost:3000/payment/success',
      failure: 'http://localhost:3000/paymet/failure',
      pending: 'http://localhost:3000/payment/pending',
    },
    auto_return: 'approved',
    notification_url:
      'https://5653-170-245-168-144.ngrok-free.app/payment/webhook',
  });
  res.status(200).send(response.response.init_point);
});
router.get('/success', (_req: Request, res: Response) => {
  try {
    res.status(200).send('Success');
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});
router.get('/pending', (_req: Request, res: Response) => {
  try {
    res.status(200).send('Pending');
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});
router.post('/webhook', receiveWebhook);

export default router;
