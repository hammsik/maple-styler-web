<script>
	import heart from '$lib/assets/heart.svg';
    import { selectedItem } from '$lib/store';
</script>

<div class="w-full h-full flex flex-col justify-between items-end gap-4">
	<p class="text-2xl font-semibold text-center">{$selectedItem.type} 장착 아이템</p>
	<div class="w-full h-14 bg-custom-secondary rounded-md pl-4 flex items-center gap-4">
        {#if $selectedItem.id === 'null'}
            <p class="text-center text-black">장착된 아이템이 없습니다</p>
        {:else}
        <img
        src={`https://maplestory.io/api/KMS/389/item/${$selectedItem.id}/icon`}
        alt={$selectedItem.name}
        style="width: 32px"
    />
            <p class="text-center text-black font-bold">{$selectedItem.name}</p>
        {/if}
    </div>
	<div class="w-full flex gap-4">
		<button class="flex-grow btn bg-custom-secondary text-black hover:bg-white rounded-lg text-base"
			>장착 해제</button
		>
		<button class="flex-grow btn bg-custom-secondary text-black hover:bg-white rounded-lg text-base"
			><img src={heart} alt="하트"/>아이템 저장</button
		>
	</div>
</div>
