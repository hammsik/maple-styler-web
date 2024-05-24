<script>
// @ts-nocheck

	import heart from '$lib/assets/heart.svg';
	import { dodo, isImageLoading, selectedType, sessionTmp, supabaseTmp } from '$lib/store';
	import { enToKo } from '$lib/data';
	import Swal from 'sweetalert2';



	async function saveItem(itemId, itemName, itemType) {
		console.log(itemId, itemName, itemType);
		console.log($sessionTmp, $supabaseTmp);
		const { data, error } = await $supabaseTmp.from('favorite_item').insert([
			{
				user_id: $sessionTmp.user.email,
				item_id: itemId,
				item_name: itemName,
				item_type: itemType
			}
		]);
		if (error) {
			Swal.fire({
				icon: 'error',
				title: '아이템 저장에 실패했습니다',
				showConfirmButton: false,
				timer: 1000
			});
		} else {
			Swal.fire({
				icon: 'success',
				title: '아이템 저장 성공',
				showConfirmButton: false,
				timer: 1000
			});
		}
	}
</script>

<div class="w-full h-full flex flex-col justify-between items-end gap-4">
	<p class="text-3xl font-semibold text-center">
		{enToKo[$selectedType]} 장착 아이템
	</p>
	<div class="w-full h-14 bg-custom-secondary rounded-md pl-4 flex items-center gap-4">
		{#if $dodo[$selectedType][0] === 'null' || $dodo[$selectedType][0] === '1040036'}
			<p class="text-center text-black">장착된 아이템이 없습니다</p>
		{:else}
			<img
				src={`https://maplestory.io/api/KMS/389/item/${$dodo[$selectedType][0]}/icon`}
				alt={'null'}
				style="width: 32px"
			/>
			<p class="text-center text-black font-bold">{$dodo[$selectedType][1]}</p>
		{/if}
	</div>
	<div class="w-full flex gap-4">
		<button
			disabled={$dodo[$selectedType][0] === 'null' ||
				$dodo[$selectedType][0] === '1040036' ||
				$selectedType === 'Face' ||
				$selectedType === 'Hair' ||
				$selectedType === 'Head'}
			class="flex-grow btn bg-custom-secondary text-black hover:bg-white rounded-lg text-base disabled:invisible"
			on:click={() => {
				dodo.setCharacter({ id: 'null', name: 'null', type: $selectedType });
				isImageLoading.setIsLoading(true);
			}}>장착 해제</button
		>
		<button
			class="flex-grow btn bg-custom-secondary text-black hover:bg-white rounded-lg text-base"
			on:click={() => saveItem($dodo[$selectedType][0], $dodo[$selectedType][1], $selectedType)}
			><img src={heart} alt="하트" />아이템 저장</button
		>
	</div>
</div>
