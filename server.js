import express from "express";
import dotenv from "dotenv";
import stripe from "stripe";


dotenv.config();

// Iniciar servidor
const app = express();

app.use(express.static("public"));
app.use(express.json());

// Ruta de inicio 
app.get("/", (_req, res) => {
    res.sendFile("index.html", {root: "public"});
});

// Éxito
app.get("/success", (_req, res) => {
    res.sendFile("success.html", {root: "public"});
}); 

// Cancelar
app.get("/cancel", (_req, res) => {
    res.sendFile("cancel.html", {root: "public"});
}); 



// Stripe
let stripeGateway = stripe(process.env.stripe_api);
let DOMAIN = process.env.DOMAIN;  

app.post("/stripe-checkout", async (req, res) => {
    const lineItems = req.body.items.map((item) => {
        const unitAmount = parseInt(item.price.replace(/[^0-9.-]+/g, "") * 100);
        console.log("item-price:", item.price);
        console.log("unitAmount:", unitAmount);
        return {
            price_data: {
                currency: "pen",
                product_data: {
                    name: item.title,
                    images: [item.productImg],
                },
                unit_amount: unitAmount,
            },
            quantity: item.quantity,
        };
    });

    console.log("lineItems:", lineItems);

    // Crear sesión de pago
    const session = await stripeGateway.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        success_url: `${DOMAIN}/success`,
        cancel_url: `${DOMAIN}/cancel`,
        line_items: lineItems,
        // Solicitar dirección en la página de pago de Stripe 
        billing_address_collection: "required",
    });

    res.json(session.url);
});


app.listen(3000, () => {
    console.log("listening on port 3000;");
});

