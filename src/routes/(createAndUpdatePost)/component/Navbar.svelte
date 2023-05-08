<script>
// @ts-nocheck
	import { page } from '$app/stores';
	import { publish, save } from './store';
	$: title = $page.url.pathname === '/createPost' ? 'Create' : 'Update';
</script>

<div class="shadow py-2 background px-4 flex justify-between items-center">
	<a href="/" class="text-white bg-gray-500 p-6px rounded center">
		<button class="i-material-symbols-chevron-left w-6 h-6" />
		<span class="pr-2"> Back</span>
	</a>
	<h1 class="text-xl font-bold tracking-wide uppercase">{title} Post</h1>
	<div class="center gap-4">
		<button class="px-6 py-6px text-white rounded bg-green-800" on:click={() => $save?.click?.()}>Save</button>
		<button class="px-4 py-6px text-white rounded bg-violet-800" on:click={() => $publish?.click?.()}>Publish</button>
	</div>
</div>
