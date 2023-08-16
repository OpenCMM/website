<script>
	import youtube from '$lib/images/youtube.svg';
	import github from '$lib/images/github.svg';
	import twitterx from '$lib/images/twitter.svg';
	import 'carbon-components-svelte/css/g80.css';
	import { Header, SkipToContent } from 'carbon-components-svelte';
</script>

<div class="app">
	<Header company="OpenCMM">
		<svelte:fragment slot="skip-to-content">
			<SkipToContent />
		</svelte:fragment>
	</Header>
	<main>
		<slot />
	</main>

	<footer>
		<div class="social">
			<a href="https://www.youtube.com/@OpenCMM/featured">
				<img src={youtube} alt="youtube" />
			</a>

			<a href="https://github.com/OpenCMM">
				<img src={github} alt="GitHub" />
			</a>

			<a href="https://twitter.com/OpenCMM">
				<img src={twitterx} alt="X" />
			</a>
		</div>
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	.social {
		width: 3em;
		height: 3em;
		display: flex;
		margin: 0 auto;
	}

	.social img {
		width: 2em;
		height: 2em;
		object-fit: contain;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>
