import express from 'express';
import { env }from 'node:process';
import paypal from '@paypal/checkout-server-sdk';
import cors from 'cors';

const { core, orders } = paypal;
const { SandboxEnvironment, PayPalHttpClient } = core;
const { OrdersCreateRequest, OrdersCaptureRequest } = orders;

const server = express();
server.use(express.json());
server.use(cors());
const port = env["API_PORT"];

// Entorno SANDBOX (en producción usarías LiveEnvironment)
const environment = new SandboxEnvironment(
  env["PAYPAL_CLIENT_ID"] || "",
  env["PAYPAL_CLIENT_SECRET"] || ""
);

const client = new PayPalHttpClient(environment);

// --- Crear un order ---
const createOrder = async () => {
  const request = new OrdersCreateRequest();
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [{
      amount: {
        currency_code: 'USD',
        value: '100.00'
      }
    }]
  });

  const response = await client.execute(request);
  console.log('Order:', JSON.stringify(response.result, null, 2));
  return response.result.id; // ORDER_ID
};

// --- Capturar (cobrar) el pago ---
const captureOrder = async (orderId) => {
  const request = new OrdersCaptureRequest(orderId);
  const response = await client.execute(request);
  console.log('Capture:', JSON.stringify(response.result, null, 2));
};

// Controladores de la API

server.get("/", (req, res)=> {
    res.send("Hello world");
});

server.post("/api/create-order", async(req, res)=> {
    const orderId = await createOrder();

    res.status(200).json({orderId: orderId});
});

server.post("/api/capture-order/:orderId", (req, res)=> {
    const { orderId } = req.params;

    captureOrder(orderId).then(()=> {
        res.status(200).json({result: "OK"});
    })
    .catch(()=> {
        res.status(500).json({result: "Error"});
    });
});

server.listen(port, ()=> {
    console.log(`API escuchando por el puerto ${port}\nLink: http://localhost:${port}`);
})