<script>
	import { enhance } from '$app/forms';
	import RichTextEditor from './RichTextEditor.svelte';
	import Tiptap from './Tiptap.svelte';
	import { publish, save } from './store';
	/**
	 * @type {HTMLInputElement}
	 */
	let file;
    /**
	 * @type {string}
	 */
    let image;
    const handleChange = () => {
        // @ts-ignore
        const files = file?.files?.[0]
        if(files) {
            image = URL.createObjectURL(files)               
        }
    }
</script>

<form method="post" class="grid gap-2" use:enhance>
	<section class="grid">
		<label for="title" class="title">Title</label>
		<input type="text" class="input" name="title" />
	</section>
	<section class="grid">
		<label for="image" class="title">Image</label>
		<input
			type="file"
			accept="image/*"
			title="image"
			class="inputSpecial border-none -mx-4"
			bind:this={file}
			on:change={handleChange}
		/>
		{#if image}
            <img src={image} alt="" >
        {/if}
	</section>
	<section class="grid">
		<label for="date" class="title">Date</label>
		<input type="date" name="date" class="inputSpecial" />
	</section>
	<section class="grid" />
	<section class="grid">
		<label for="body" class="title">Body</label>
		<Tiptap />
		<RichTextEditor />
	</section>
    <section class="hidden">
        <button bind:this={$save} formaction="?/createPost"></button>
        <button bind:this={$publish} formaction="?/publishPost"></button>
    </section>
</form>

<style>
	.title {
		@apply mb-2 font-medium;
	}
	.input {
		@apply bg-light-400 border border-gray-300 hover\:border-gray-400 focus\:border-gray-800 outline-none w-full px-2 py-1 rounded-sm;
	}
	.inputSpecial {
		@apply w-fit border-0 px-4 rounded-sm outline-none py-1 bg-light-400 border border-gray-300 hover\:border-gray-400 focus\:border-gray-800;
	}
</style>
