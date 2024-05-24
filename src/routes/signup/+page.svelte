<script>
	// @ts-nocheck
	import Swal from 'sweetalert2';

	let email = '';
	let password = '';
	let passwordConfirm = '';

	export let data;
	let { supabase, session } = data;
	$: ({ supabase, session } = data);
	console.log(supabase);
	console.log(session);

	// 회원가입 정규표현식
	const usernamePattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;


	async function signup(email, password, passwordConfirm) {
		console.log('email: ', email, '\npassword: ', password, '\npasswordConfirm: ', passwordConfirm);
		if (password !== passwordConfirm) {
			Swal.fire({
				icon: 'error',
				title: '비밀번호가 일치하지 않습니다',
				showConfirmButton: false,
				timer: 1000
			});
		} else if (usernamePattern.test(email) === false) {
			Swal.fire({
				icon: 'error',
				title: '이메일 형식을 확인해주세요',
				showConfirmButton: false,
				timer: 1000
			});
		} else if (passwordPattern.test(password) === false) {
			Swal.fire({
				icon: 'error',
				title: '비밀번호 형식을 확인해주세요',
				showConfirmButton: false,
				timer: 1500
			});
		} else {
			const { data, error } = await supabase.auth.signUp({
				email: email,
				password: password
				// options: {
				// 	emailRedirectTo: 'https://example.com/welcome'
				// }
			});

			if (error) {
				Swal.fire({
					icon: 'error',
					title: '회원가입에 실패했습니다',
					showConfirmButton: false,
					timer: 1500
				});
				console.log(error);
			} else {
				Swal.fire({
					icon: 'success',
					title: '회원가입이 완료되었습니다.',
					showConfirmButton: false,
					timer: 1500
				});
				setTimeout(() => {
					window.location.href = '/login';
				}, 1500);
			}
		}
	}
</script>

<div class="flex flex-col bg-[#f1f1f1] rounded-lg p-12 items-center gap-12">
	<h2 class="text-3xl font-semibold text-custom-primary">Sign up</h2>
	<form class="flex flex-col">
		<div class="w-full flex justify-between">
			<p class="mb-1 text-custom-primary">이메일</p>
			<!-- <button class="text-custom-primary mr-1 mb-1 hover:scale-95">중복확인</button> -->
		</div>
		<label class="input input-bordered flex items-center gap-2 mb-10 bg-[#dadada]">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 16 16"
				fill="currentColor"
				class="w-4 h-4 opacity-70"
				><path
					d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z"
				/></svg
			>
			<input type="text" class="grow text-black" placeholder="example@email.com" bind:value={email} />
		</label>
		<p class="mb-1 text-custom-primary">비밀번호</p>
		<label class="input input-bordered flex items-center gap-2 mb-4 bg-[#dadada]">
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
				placeholder="영문, 숫자 조합 8자 이상"
				bind:value={password}
			/>
		</label>
		<p class="mb-1 text-custom-primary">비밀번호 확인</p>
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
				placeholder="영문, 숫자 조합 8자 이상"
				bind:value={passwordConfirm}
			/>
		</label>
	</form>
	<div class="w-full h-px bg-slate-400" />
	<button
		class="btn bg-custom-primary w-full hover:bg-slate-600 text-white"
		on:click={() => signup(email, password, passwordConfirm)}>완료</button
	>
</div>
