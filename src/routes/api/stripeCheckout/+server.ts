import type { RequestHandler } from './$types';

import Stripe from 'stripe';

const SECRET_STRIPE_KEY =
	'sk_test_51Nm4QzAy8YlJEyCFzZRg2agrdATKVx7GwkKWpQWY9rozCTv44qVrGXWlJOTbrny2aQWRmfcCpNGPIbtSmnTbMZ2p00CBgUWWjA';

const stripe = new Stripe(SECRET_STRIPE_KEY, {
	// warning the new version
	apiVersion: '2023-08-16'
});

export const POST: RequestHandler = async ({ request }) => {
	const data = await request.json();
	const items = data.items;
	//console.log(items);

	let lineItems: any = [];
	items.forEach((item: any) => {
		lineItems.push({ price: item.id, quantity: item.quantity });
	});

	console.log(lineItems);

	const session = await stripe.checkout.sessions.create({
		//lineItems.
		line_items: lineItems,
		//[{ price: 'price_1Nm4XTAy8YlJEyCFauvLqjid', quantity: 2 }],
		mode: 'payment',
		success_url: 'http://localhost:5173/success',
		cancel_url: 'http://localhost:5173/cancel'
	});

	return new Response(
		JSON.stringify({ url: session.url }), // front will get this url to redirect
		{
			status: 200,
			headers: { 'content-type': 'application/json' }
		}
	);
};
