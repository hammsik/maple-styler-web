<script>
	import CharacterBoard from './CharacterBoard.svelte';
	import ColorBoard from './ColorBoard.svelte';
	import WearingItem from './WearingItem.svelte';
	import henesis from '$lib/assets/map/henesis.png';
	import kerningCity from '$lib/assets/map/kerningCity.png';
	import arcana from '$lib/assets/map/arcana.jpg';
	import cernium from '$lib/assets/map/cernium.png';
	import elnase from '$lib/assets/map/elnase.png';
	
	let mapData = [henesis, kerningCity, arcana, cernium, elnase];
</script>

<section class="w-full h-full flex flex-col gap-4">
	<div class="w-full h-20 flex mt-3 gap-6">
		<button class="w-full h-full bg-custom-secondary rounded-lg"/>
		{#each mapData as map}
			<button class="w-full h-full bg-custom-secondary rounded-lg">
				<img src={map} alt={'map'} class="w-full h-full object-cover rounded-lg"/>
			</button>
		{/each}
	</div>
	<CharacterBoard />
	<figure class="w-full flex gap-4">
		<WearingItem />
		<ColorBoard />
	</figure>
</section>
