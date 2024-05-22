<script>
	import { onMount } from 'svelte';
	import { dodo, currentBackground } from '$lib/store';

	onMount(() => {
		dodo.getCharacter($dodo);
	});
</script>

<figure
	class="relative w-full h-full flex justify-center items-center bg-custom-secondary rounded-2xl mb-2"
>
	<div class="w-full h-full absolute">
		{#if $currentBackground !== 'null'}
			<img
				src={$currentBackground}
				alt={$currentBackground}
				class="w-full h-full object-cover rounded-2xl"
			/>
		{/if}
	</div>
	<img src={$dodo.image} alt="캐릭터" class="scale-150" />
</figure>
