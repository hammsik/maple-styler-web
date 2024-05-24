<script>
	import Swal from 'sweetalert2';

	export let data;
	let { supabase, session } = data;
	$: ({ supabase, session } = data);
	console.log(supabase);
	console.log(session);

	let email = '';
	let password = '';

	// @ts-ignore
	async function login(email, password) {
		if (email === '' || password === '') {
			Swal.fire({
				icon: 'error',
				title: '이메일과 비밀번호를 입력해주세요',
				showConfirmButton: false,
				timer: 1000
			});
		} else
			supabase.auth
				.signInWithPassword({
					email: email,
					password: password
				})
				.then((data) => {
					console.log(data);
					if (data.error) {
						Swal.fire({
							icon: 'error',
							title: '로그인에 실패했습니다',
							showConfirmButton: false,
							timer: 1000
						});
					} else {
						Swal.fire({
							icon: 'success',
							title: '로그인 성공',
							showConfirmButton: false,
							timer: 1000
						}).then(() => {
							window.location.href = '/home';
						});
					}
				});
	}
</script>

<div class="flex flex-col bg-[#f1f1f1] rounded-lg p-12 items-center gap-12">
	<h2 class="text-3xl font-semibold text-custom-primary">Login</h2>
	<form>
		<label class="input input-bordered flex items-center gap-2 mb-4 bg-[#dadada]">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 16 16"
				fill="currentColor"
				class="w-4 h-4 opacity-70"
				><path
					d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z"
				/></svg
			>
			<input type="text" class="grow text-black" placeholder="이메일 입력" bind:value={email} />
		</label>
		<label class="input input-bordered flex items-center gap-2 bg-[#dadada]">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 16 16"
				fill="currentColor"
				class="w-4 h-4 opacity-70"
				><path
					fill-rule="evenodd"
					d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
					clip-rule="evenodd"
				/></svg
			>
			<input
				type="password"
				class="grow text-black"
				placeholder="비밀번호 입력"
				bind:value={password}
			/>
		</label>
	</form>
	<button
		class="btn bg-custom-primary w-full text-white hover:bg-slate-600"
		on:click={() => login(email, password)}>로그인</button
	>
	<div class="w-full h-px bg-slate-400" />
	<button class="btn btn-link text-lg text-black" on:click={() => (window.location.href = 'signup')}
		>회원가입</button
	>
</div>
