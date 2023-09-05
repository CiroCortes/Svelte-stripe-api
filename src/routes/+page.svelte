<script lang="ts">
	import ProductCard from '$lib/productCard.svelte';
	import { get } from 'svelte/store';
	import { cartItems } from '../cart';

	const products: Product[] = [
		{
			id: 'price_1Nm4XTAy8YlJEyCFauvLqjid',
			name: 'Keyboard',
			price: 25000
		},
		{
			id: 'price_1Nm4Y5Ay8YlJEyCFPCbrVrFf',
			name: 'Mouse',
			price: 15000
		}
	];

	async function checkout() {
		await fetch('api/stripeCheckout', {
			// "ojo al hhtpp del puerto, revisa https://localhost:5173/api/stripeCheckout"
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ items: get(cartItems) })
		})
			.then((data) => {
				return data.json();
			})
			.then((data) => {
				window.location.replace(data.url);
			});
	}
</script>

<div class="container h-full mx-auto flex justify-center items-center align-items:center top-50">
	<div class="grid grid-cols-3 gap-4">
		<div class="col-span-3">
			<h1>My demos carritos</h1>
		</div>
		{#each products as product}
			<ProductCard {product} />
		{/each}

		<div class="col-span-3">
			<button class="btn variant-filled-primary" on:click={() => checkout()}>Checkout</button>
		</div>
	</div>
</div>
