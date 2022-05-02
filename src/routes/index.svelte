<script context="module">
	export async function load({ fetch }) {
		const url = `./api/name`;
		const response = await fetch(url);
		const { name } = response.ok && (await response.json());
		return {
			status: response.status,
			props: { name }
		};
	}
</script>

<script>
	import { HelloWorld } from '$lib';
	export let name;
</script>

<h1 class="prose text-4xl text-center my-10">Welcome to the world</h1>

<HelloWorld {name} />
