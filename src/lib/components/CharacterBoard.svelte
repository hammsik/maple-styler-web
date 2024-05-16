<script>
	import { onMount } from 'svelte';
	import { dodo } from '$lib/store';

	onMount(() => {
		console.log('CharacterBoard mounted');
		// dodo.getCharacter($dodo);
	});

	async function urlSetting() {}
</script>

<figure
	class="relative w-full h-full flex justify-center items-center bg-custom-secondary rounded-2xl mb-2"
>
	<img src={dodo.getCharacter($dodo)} alt="캐릭터" class="scale-150" />
</figure>
