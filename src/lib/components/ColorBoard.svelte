<script>
	// @ts-nocheck

	import { hairColor, lensColor } from '$lib/data';
	import { currentBeautyColor } from '$lib/store';

	let currentColorType = 'hair';
</script>

<div class="w-full h-full flex flex-col justify-between items-end gap-4">
	<p class="text-3xl font-semibold text-center">컬러</p>
	<div class="w-full h-full flex flex-col justify-center bg-custom-secondary rounded-md p-2 gap-4">
		<div class="flex gap-2">
			<button
				class={`btn text-xl ${currentColorType === 'hair' ? 'bg-custom-selected text-white hover:bg-custom-selected' : 'bg-custom-tertiary'} text-black hover:bg-white rounded-lg font-semibold border-0`}
				on:click={() => (currentColorType = 'hair')}>헤어</button
			>
			<button
				class={`btn text-xl ${currentColorType === 'lens' ? 'bg-custom-selected text-white hover:bg-custom-selected' : 'bg-custom-tertiary'} text-black hover:bg-white rounded-lg font-semibold border-0`}
				on:click={() => (currentColorType = 'lens')}>렌즈</button
			>
		</div>
		<div class="w-full flex justify-between">
			{#each currentColorType === 'hair' ? hairColor : lensColor as color}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div
					class={`relative w-7 h-7 rounded-md flex justify-center items-center cursor-pointer hover:bg-white hover:bg-opacity-10`}
					style={`background-color: ${color[0]}`}
					on:click={() => {
						if (currentColorType === 'hair') {
							currentBeautyColor.updateColor(color[1], 0);
						} else {
							currentBeautyColor.updateColor(color[1], 1);
						}
					}}
				>
					{#if currentColorType === 'hair' ? $currentBeautyColor[0] === color[1] : $currentBeautyColor[1] === color[1]}
						<div class="w-3 h-3 rounded-full bg-white"></div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</div>
