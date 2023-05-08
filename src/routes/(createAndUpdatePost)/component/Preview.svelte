<script>
	import { formState } from './store';
	$: ({ title, image, date, body } = $formState);
</script>

<h1 class="text-2xl font-bold">{title}</h1>
<!-- svelte-ignore a11y-img-redundant-alt -->
{#if image}
	<img src={image} alt="main image" />
{/if}
<p>{date}</p>
<div> {@html body}</div>
