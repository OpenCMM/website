<script>
	import './styles.css';
	import youtube from '$lib/images/youtube.svg';
	import github from '$lib/images/github.svg';
	import twitterx from '$lib/images/twitter.svg';
</script>

<div class="app">
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
	}

	.social a {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		margin: 0 0.5em;
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

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
