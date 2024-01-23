import { Request, Response, Router } from 'express';
import mercadopago from 'mercadopago';
const { ACCESS_TOKEN_MERCADOPAGO } = process.env;

const router = Router();

router.post('/create-order', async (_req: Request, res: Response) => {
  mercadopago.configure({ access_token: ACCESS_TOKEN_MERCADOPAGO || '' });

  const response = await mercadopago.preferences.create({
    items: [
      {
        title: 'Computadora',
        description: 'Compu pa juga a lo jueguito',
        picture_url: 'https://fotodeComputadora.com.ar',
        unit_price: 200,
        quantity: 3,
        currency_id: 'ARS',
      },
      {
        title: 'Tostadora',
        description: 'Tostadora para tostar 👀',
        picture_url: 'https://fotodeTostadora.com.ar',
        unit_price: 1000,
        quantity: 1,
        currency_id: 'ARS',
      },
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
      success: 'http://localhost:3001/success',
      failure: 'http://localhost:3001/failure',
      pending: 'http://localhost:3001/pending',
    },
    auto_return: 'approved',
    notification_url: 'https://8725-170-245-168-144.ngrok-free.app/webhook',
  });
  res.status(200).send(response.response.init_point);
});
router.get('/success', (_req: Request, res: Response) => {
  res.status(200).send('Success');
});
router.post('/webhook', (_req: Request, res: Response) => {
  res.status(200).send('Webhook');
});

export default router;
