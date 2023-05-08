<script>
	// @ts-nocheck
	import { enhance } from '$app/forms';
	import Tiptap from './Tiptap.svelte';
	import { publish, save } from './store';

	import {formState} from "./store"
	/**
	 * @type {HTMLInputElement}
	 */
	let file;

	const handleChange = () => {
		// @ts-ignore
		const files = file?.files?.[0];
		if (files) {
			const reader = new FileReader();
			reader.onload = ({ target }) => {
				if (target?.result) {
					$formState.image = target?.result
				}
			};
			reader.readAsDataURL(files);
		}
	};

	/**
	 * @type {enhance}
	 */
	const handleForm = ({form, data, }) => {
		data.append("body", $formState.body)
		data.append("image", $formState.image)
	};

</script>

<form method="post" class="grid gap-2" use:enhance={handleForm}>
	<section class="grid">
		<label for="title" class="title">Title</label>
		<input type="text" class="input" name="title" bind:value={$formState.title} />
	</section>
	<section class="grid">
		<label for="image" class="title">Image</label>
		<input
			type="file"
			accept="image/*"
			name="image"
			class="inputSpecial border-none -mx-4"
			bind:this={file}
			on:change={handleChange}
		/>
		{#if $formState.image}
			<img src={$formState.image} alt="" class="w-80 h-40" />
		{/if}
	</section>
	<section class="grid">
		<label for="date" class="title">Date</label>
		<input type="date" name="date" class="inputSpecial" bind:value={$formState.date} />
	</section>
	<section class="grid">
		<label for="body" class="title">Body</label>
		<Tiptap bind:content={$formState.body}/>
	</section>
	<section class="hidden">
		<button bind:this={$save} formaction="?/createPost" />
		<button bind:this={$publish} formaction="?/publishPost" />
	</section>
</form>

<style>
	.title {
		@apply mb-2 font-medium;
	}
	.input {
		@apply bg-light-400 border border-gray-300 hover\:border-gray-400 focus\:border-gray-800 outline-none w-full px-2 py-1 rounded-sm dark\:bg-dark-800;
	}
	.inputSpecial {
		@apply w-fit border-0 px-4 rounded-sm outline-none py-1 bg-light-400 border border-gray-300 hover\:border-gray-400 focus\:border-gray-800;
	}
</style>
