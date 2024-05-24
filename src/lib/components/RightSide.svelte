<script>
	// @ts-nocheck

	import heart from '$lib/assets/heart.svg';
	import refresh from '$lib/assets/refresh.svg';
	import { dodo, isImageLoading, selectedType, sessionTmp, supabaseTmp } from '$lib/store';
	import { onMount } from 'svelte';

	let favoriteItems = [];

	onMount(() => {
		getFavoriteItems();
	});

	async function getFavoriteItems() {
		const { data, error } = await $supabaseTmp
			.from('favorite_item')
			.select('*')
			.eq('user_id', $sessionTmp.user.email);
		if (error) {
			console.log(error);
		} else {
			console.log(data);
			favoriteItems = data;
			return data;
		}
	}
</script>

<section class="w-2/3 h-full flex flex-col gap-6">
	<figure class="w-full h-full flex flex-col items-end gap-2">
		<div class="flex gap-4">
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
			<img src={refresh} alt="새로고침" class="w-8" on:click={() => getFavoriteItems()}/>
			<div class="flex justify-center items-center gap-2">
				<img src={heart} alt="heart" />
				<h2 class="text-3xl font-semibold">아이템 저장 목록</h2>
			</div>
		</div>
		<div class="w-full h-[280px] grid grid-cols-2 bg-custom-secondary rounded-xl gap-4 overflow-y-auto p-2">
			{#each favoriteItems as item}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<!-- svelte-ignore a11y-no-static-element-interactions -->
					<div
						class="h-16 bg-custom-tertiary rounded-md flex justify-center items-center p-2 gap-2 hover:opacity-70 hover:scale-95 cursor-pointer"
						on:click={() => {
							console.log(item);
							dodo.setCharacter({
								id: item.item_id,
								name: item.item_name,
								type: item.item_type
							});
							isImageLoading.setIsLoading(true);
							selectedType.setSelectedType(item.item_type);
						}}
					>
						<img
							src={`https://maplestory.io/api/KMS/389/item/${item.item_id}/icon`}
							alt={'null'}
							style="width: 32px"
							loading="lazy"
						/>
						<p class="text-sm text-black w-full">{item.item_name}</p>
					</div>
			{/each}
		</div>
	</figure>
	<figure class="w-full h-full flex flex-col items-end gap-2">
		<div class="flex justify-center items-center gap-2">
			<img src={heart} alt="heart" />
			<h2 class="text-3xl font-semibold">코디 저장 목록</h2>
		</div>
		<div class="w-full h-full bg-custom-secondary rounded-xl"></div>
	</figure>
</section>
