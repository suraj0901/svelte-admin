<script>
	import { darkMode } from './store';
</script>

<nav class="shadow py-2 background px-4 flex justify-between items-center">
	<a href="/" class="font-semibold text-2xl">Admin Dashboard</a>
	<div class="center gap-10">
		<a href="/createPost" class="font-semibold rounded bg-green-800 text-white px-4 py-6px">Create Post</a>
		<div class="flex items-center rounded-full bg-light-900 dark:bg-dark-900">
			<div class="center rounded-full p-6px {!$darkMode ? "drop-shadow-sm drop-shadow-color-black bg-light-400": ""}">
				<button
					on:click={() => ($darkMode = false)}
					class="i-material-symbols-light-mode-outline w-5 h-5 hidden dark:block"
				/>
				<button
					on:click={() => ($darkMode = false)}
					class="i-material-symbols-light-mode-sharp w-5 h-5 dark:hidden"
				/>
			</div>
			<div class="center rounded-full p-6px {$darkMode ? "drop-shadow-sm drop-shadow-color-white bg-dark-400" : "" } ">
				<button
					on:click={() => ($darkMode = true)}
					class="i-material-symbols-dark-mode-sharp w-5 h-5 hidden dark:block"
				/>
				<button
					on:click={() => ($darkMode = true)}
					class="i-material-symbols-dark-mode-outline w-5 h-5 dark:hidden"
				/>
			</div>
		</div>
	</div>
</nav>
