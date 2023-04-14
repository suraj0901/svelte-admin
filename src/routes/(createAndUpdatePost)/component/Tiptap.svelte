<script>
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	export let content = '<h1>hello world</h1>';
	/**
	 * @type {HTMLDivElement}
	 */
	let element;
	/**
	 * @type {Editor}
	 */
	let editor;

	onMount(() => {
		editor = new Editor({
			element,
			editorProps: {
				attributes: {
					class: 'p-2'
				}
			},
			extensions: [StarterKit],
			content,
			onUpdate: () => {
				console.log(editor.getHTML());
			},
			onTransaction: () => {
				editor = editor;
			}
		});
	});
	onDestroy(() => {
		if (editor) editor.destroy();
	});
</script>

{#if editor}
	<button />
{/if}
<div bind:this={element} />
