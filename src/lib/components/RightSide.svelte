<script>
	import heart from '$lib/assets/heart.svg';
</script>

<section class="w-2/3 h-full flex flex-col gap-6">
	<figure class="w-full h-full flex flex-col items-end gap-2">
		<div class="flex justify-center items-center gap-2">
			<img src={heart} alt="heart" />
			<h2 class="text-3xl font-semibold">아이템 저장 목록</h2>
		</div>
		<div class="w-full h-full bg-custom-secondary rounded-xl"></div>
	</figure>
	<figure class="w-full h-full flex flex-col items-end gap-2">
		<div class="flex justify-center items-center gap-2">
			<img src={heart} alt="heart" />
			<h2 class="text-3xl font-semibold">코디 저장 목록</h2>
		</div>
		<div class="w-full h-full bg-custom-secondary rounded-xl"></div>
	</figure>
</section>
