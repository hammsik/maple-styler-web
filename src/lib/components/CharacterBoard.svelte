<script>
	import { onMount } from 'svelte';
	import { dodo, currentBackground, isImageLoading } from '$lib/store';
	import drummingBunny from '$lib/assets/drummingBunny.gif';

	onMount(() => {
		dodo.setCharacter({ id: '12016', name: '홍조 꽃잎 피부', type: 'Head' });
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
	<img
		src={dodo.getCharacter($dodo)}
		loading="lazy"
		alt="캐릭터"
		class={`scale-150 ${$isImageLoading && 'opacity-0'}`}
		on:load={() => {
			isImageLoading.setIsLoading(false);
			console.log('loaded');
		}}
	/>
	{#if $isImageLoading}
		<img src={drummingBunny} alt="북치는 토끼" class="absolute scale-150" />
	{/if}
</figure>
