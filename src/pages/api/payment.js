import { NextApiRequest, NextApiResponse } from "next";
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const stripe = require('stripe')('sk_test_51NSsgYFK9gsn1FVmyheVNmboFS5FpgzQduw1CCCUarUKQLPLNcLhjg4HskB28OLwDCi0XsWZMUQpt2KMk5lnRh2R00VSLQ1BwJ')

export default async function handler(req, res) {
    const {item, email} = req.body
    const modifiedItems = item.map((item) => ({
        quantity: item.quantity,
        price_data: {
            currency: 'usd',
            unit_amount: item.price * 100,
            product_data: {
                name: item.title,
                description: item.description,
                images: [item.src]
            }
        }
    }))
    const session = await stripe.checkout.sessions.create({
        payment_method_types:['card', 'us_bank_account'],
        shipping_address_collection: {
            allowed_countries: ['US', 'CA', 'GB', 'MM', 'TR']
        },
        line_items:modifiedItems,
        mode: 'payment',
        // success_url: `${process.env.NEXTAUTH_URL}/success`,
        // cancel_url: `${process.env.NEXTAUTH_URL}/payment`,
        success_url: 'http://localhost:3000/success',
        cancel_url: 'http://localhost:3000/payment',
        metadata:{
            email,
            images:JSON.stringify(item.map((item) => item.src))
        }
    })
    res.status(200).json({
        id:session.id
    })
}  