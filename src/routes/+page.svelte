<script>
	import { _ } from 'svelte-i18n';
	import { Content, Grid, Row, OrderedList, ListItem } from 'carbon-components-svelte';
</script>

<svelte:head>
	<title>OpenCMM</title>
	<meta name="description" content="OpenCMM" />
</svelte:head>

<section>
	<Content>
		<Grid>
			<Row>
				<p>
					{$_('home.description')}
				</p>
			</Row>
			<Row>
				<h2>{$_('home.why.title')}</h2>
				<p>
					{$_('home.why.reason')}
				</p>
			</Row>
			<Row>
				<h2>{$_('home.how.title')}</h2>
			</Row>
			<Row>
				<div class="list">
					<OrderedList>
						<ListItem>
							{$_('home.how.step1')}
						</ListItem>
						<ListItem>
							{$_('home.how.step2')}
						</ListItem>
						<ListItem>
							{$_('home.how.step3')}
						</ListItem>
						<ListItem>
							{$_('home.how.step4')}
						</ListItem>
					</OrderedList>
				</div>
			</Row>
			<Row>
				<h2>{$_('home.goal.title')}</h2>
			</Row>
			<Row>
				<p>
					{$_('home.goal.description')}
				</p>
			</Row>
			<Row>
				<h2>{$_('home.progress.title')}</h2>
			</Row>
			<Row>
				<!-- youtube link -->
				<iframe id="demo" title="demo" src="https://www.youtube.com/embed/Zu_7y06MKTQ?si=KcXyogeZ6LbppWTw" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
				<p>
					{$_('home.progress.current')}
				</p>
			</Row>
		</Grid>
	</Content>
</section>

<style>
	h2 {
		margin-bottom: 1rem;
		margin-top: 1rem;
	}

	p {
		margin-bottom: 1rem;
		margin-top: 1rem;
	}

	.list {
		margin-left: 2rem;
	}

	#demo {
		width: 80%;
		max-width: 300px;
	}
</style>
