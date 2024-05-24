<script>
// @ts-nocheck

	import CharacterBoard from './CharacterBoard.svelte';
	import ColorBoard from './ColorBoard.svelte';
	import WearingItem from './WearingItem.svelte';
	import henesis from '$lib/assets/map/henesis.png';
	import kerningCity from '$lib/assets/map/kerningCity.png';
	import arcana from '$lib/assets/map/arcana.jpg';
	import cernium from '$lib/assets/map/cernium.png';
	import elnase from '$lib/assets/map/elnase.png';
	import henesisMap from '$lib/assets/map/henesisMap.png';
	import kerningCityMap from '$lib/assets/map/kerningCityMap.png';
	import arcanaMap from '$lib/assets/map/arcanaMap.png';
	import cerniumMap from '$lib/assets/map/cerniumMap.png';
	import elnaseMap from '$lib/assets/map/elnaseMap.png';
	import { currentBackground } from '$lib/store';

	let mapData = [
		[henesis, henesisMap],
		[kerningCity, kerningCityMap],
		[arcana, arcanaMap],
		[cernium, cerniumMap],
		[elnase, elnaseMap]
	];
</script>

<section class="w-full h-full flex flex-col gap-4">
	<div class="w-full h-20 flex mt-3 gap-6">
		<button
			class="w-full h-full bg-custom-secondary rounded-lg"
			on:click={() => currentBackground.setBackground('null')}
		/>
		{#each mapData as map}
			<button
				class="w-full h-full bg-custom-secondary rounded-lg"
				on:click={() => {
					console.log(map);
					return currentBackground.setBackground(map[1]);
				}}
			>
				<img src={map[0]} alt={'map'} class="w-full h-full object-cover rounded-lg" />
			</button>
		{/each}
	</div>
	<CharacterBoard />
	<figure class="w-full flex gap-4">
		<WearingItem />
		<ColorBoard />
	</figure>
</section>
