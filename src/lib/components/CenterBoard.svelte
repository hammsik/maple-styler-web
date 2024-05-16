<script>
	import CharacterBoard from './CharacterBoard.svelte';
	import ColorBoard from './ColorBoard.svelte';
	import WearingItem from './WearingItem.svelte';
</script>

<section class="w-full h-full flex flex-col gap-4">
	<div class="w-full h-20 flex mt-3 gap-3">
		<button class="w-full h-full bg-custom-secondary rounded-lg"></button>
		<button class="w-full h-full bg-custom-secondary rounded-lg"></button>
		<button class="w-full h-full bg-custom-secondary rounded-lg"></button>
		<button class="w-full h-full bg-custom-secondary rounded-lg"></button>
		<button class="w-full h-full bg-custom-secondary rounded-lg"></button>
		<button class="w-full h-full bg-custom-secondary rounded-lg"></button>
	</div>
	<CharacterBoard />
	<figure class="w-full flex gap-4">
		<WearingItem />
		<ColorBoard />
	</figure>
</section>
