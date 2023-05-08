<script>
	import 'virtual:uno.css';
	import '@unocss/reset/tailwind-compat.css';
	import { darkMode } from './store';
</script>

<div class:dark={$darkMode}>
	<main class="dark:text-white bg-light-900 dark:bg-dark-900 min-h-screen">
		<slot />
	</main>
</div>
