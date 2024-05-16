<script>
	import { getItemList } from '$lib/api';
	import { toolData } from '$lib/data';
	import { dodo, selectedType } from '$lib/store';

	let itemList = getItemList().then((res) => {
		return res;
	});
	let currentCategoryIdx = 0;
	let currentSubCategoryIdx = 0;
	let searchKeyword = '';
	let filterKeyword = '';

	// @ts-ignore
	function onSearchItem(e) {
		filterKeyword = e.target.value;
	}
</script>

<section class="w-2/3 h-full flex flex-col gap-2.5">
	<label class="input input-bordered flex items-center gap-2 bg-custom-secondary text-black">
		<input
			type="text"
			class="grow"
			placeholder="카테고리에 해당하는 아이템을 검색하세요"
			bind:value={searchKeyword}
			on:change={(e) => onSearchItem(e)}
		/>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-5 h-5"
			><path
				fill-rule="evenodd"
				d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
				clip-rule="evenodd"
			/></svg
		>
	</label>
	<figure class="w-full flex gap-2.5 text-lg">
		{#each toolData as category, idx}
			<button
				class={`flex-grow h-full btn text-xl ${currentCategoryIdx === idx ? 'bg-custom-selected text-white' : 'bg-custom-secondary'} text-black p-0 hover:bg-white rounded-lg font-semibold`}
				on:click={() => {
					currentCategoryIdx = idx;
					currentSubCategoryIdx = 0;
					searchKeyword = '';
					filterKeyword = '';
					console.log(category.list[0][0]);
					selectedType.setSelectedType(category.list[0][1]);
				}}
			>
				{category.name}
			</button>
		{/each}
	</figure>
	<details class="dropdown bg-custom-secondary rounded-xl">
		<summary
			tabindex="0"
			role="button"
			class="btn bg-transparent w-full hover:bg-white text-black text-xl border-0"
		>
			{toolData[currentCategoryIdx].list[currentSubCategoryIdx][0]}
		</summary>
		<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
		<div tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box">
			{#each toolData[currentCategoryIdx].list as subCategory, idx}
				<button
					class="btn bg-custom-secondary text-black hover:bg-white rounded-lg text-base w-full"
					on:click={() => {
						currentSubCategoryIdx = idx;
						searchKeyword = '';
						filterKeyword = '';
						console.log(subCategory[1])
						selectedType.setSelectedType(subCategory[1]);
					}}>{subCategory[0]}</button
				>
			{/each}
		</div>
	</details>
	<figure
		class="w-full h-[540px] grid grid-cols-2 bg-custom-secondary rounded-xl gap-4 overflow-y-auto p-2"
	>
		{#await itemList}
			<p>로딩중</p>
		{:then loadedList}
			{#each loadedList[currentCategoryIdx].list[currentSubCategoryIdx].list as item, idx}
				{#if filterKeyword === '' || !item.name || item.name.includes(filterKeyword)}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<!-- svelte-ignore a11y-no-static-element-interactions -->
					<div
						class="h-16 bg-custom-tertiary rounded-md flex justify-center items-center p-2 gap-2 hover:opacity-70 hover:scale-95 cursor-pointer"
						on:click={() => {
							console.log(item);
							dodo.setCharacter(item);
							selectedType.setSelectedType(item.type);
						}}
					>
						<img
							src={`https://maplestory.io/api/KMS/389/item/${item.id}/icon`}
							alt={'null'}
							style="width: 32px"
						/>
						<p class="text-sm text-black w-full">{item.name}</p>
					</div>
				{/if}
			{/each}
		{/await}
	</figure>
</section>
