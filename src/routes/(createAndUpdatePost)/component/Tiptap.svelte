<script>
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import Underline from '@tiptap/extension-underline';
	import TextAlignMent from '@tiptap/extension-text-align';
	import Link from '@tiptap/extension-link';
	import Image from '@tiptap/extension-image';
	import Youtube from '@tiptap/extension-youtube';
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
					class: 'p-2 border-1 border-t-0 border-gray-400 min-h-350px'
				}
			},
			extensions: [
				StarterKit,
				Underline,
				TextAlignMent.configure({
					types: ['heading', 'paragraph']
				}),
				Link,
				Image.configure({
					inline: true,
					allowBase64: true
				}),
				Youtube
			],
			content,
			onUpdate: () => {
				content = editor.getHTML()
			},
			onTransaction: () => {
				editor = editor;
			}
		});
	});
	onDestroy(() => {
		if (editor) editor.destroy();
	});

	const addImage = () => {
		const inputFile = document.createElement('input');
		inputFile.setAttribute('type', 'file');
		inputFile.oninput = () => {
			const image = inputFile?.files?.[0];
			console.log({ image }, inputFile.files);
			if (!image) return;
			const reader = new FileReader();
			reader.onload = ({ target }) => {
				if (target?.result) {
					console.log(typeof target?.result);
					// @ts-ignore
					editor.chain().focus().setImage({ src: target.result }).run();
				}
			};
			reader.readAsDataURL(image);
		};
		inputFile.click();
		// const url = prompt('URL', '');
		// if (url) {
		// 	editor.chain().focus().setImage({ src: url }).run();
		// }
	};
	/**
	 * @type {HTMLDialogElement}
	 */
	let dialog;
	const addLink = () => {
		const previousUrl = editor.getAttributes('link').href;
		const url = prompt('URL', previousUrl);
		console.log({ url });
		if (url === null) return;
		if (url.trim() === '') {
			editor.chain().focus().unsetLink().run();
			editor.chain().focus().toggleUnderline().run();
			return;
		}
		editor.chain().focus().setLink({ href: url }).run();
		editor.chain().focus().toggleUnderline().run();
	};
	const addYoutubeUrl = () => {
		if (!dialog) return;
		dialog.showModal();
	};
	/**
	 * 
	 * @param {Event & {
			readonly submitter: HTMLElement | null;
		} & {
			currentTarget: EventTarget & HTMLFormElement;
		}} e
	 */
	const handleYoutubeUrl = (e) => {
		const form = e;
		// console.log(form.formData)
	};
</script>

{#if editor}
	<div class="py-2 px-4 border border-gray-400 flex gap-6 items-center text-gray-700">
		<div class="flex items-center gap-3">
			<button
				type="button"
				on:click={() => editor.chain().focus().toggleBold().run()}
				disabled={!editor.can().chain().focus().toggleBold().run()}
				class={editor.isActive('bold') ? 'is-active' : ''}
			>
				<svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 stroke-2" viewBox="0 0 15 15"
					><path
						fill="none"
						stroke="currentColor"
						d="M3.5 7.5h5a3 3 0 1 0 0-6H3.58a.08.08 0 0 0-.08.08V7.5Zm0 0h6a3 3 0 1 1 0 6H3.59a.09.09 0 0 1-.09-.09V7.5Z"
					/></svg
				>
			</button>
			<button
				type="button"
				on:click={() => editor.chain().focus().toggleItalic().run()}
				disabled={!editor.can().chain().focus().toggleItalic().run()}
				class="i-material-symbols-format-italic {editor.isActive('italic') && 'is-active'}"
			/>
			<button
				type="button"
				on:click={() => editor.chain().focus().toggleUnderline().run()}
				disabled={!editor.can().chain().focus().toggleUnderline().run()}
				class="i-material-symbols-format-underlined {editor.isActive('underline') && 'is-active'}"
			/>
			<button
				type="button"
				on:click={() => editor.chain().focus().toggleStrike().run()}
				disabled={!editor.can().chain().focus().toggleStrike().run()}
				class="i-material-symbols-format-strikethrough {editor.isActive('strike') && 'is-active'}"
			/>
		</div>
		<div class="flex items-center gap-3">
			<button
				type="button"
				on:click={() => editor.chain().focus().setTextAlign('center').run()}
				class="i-material-symbols-format-align-center {editor.isActive('center') && 'is-active'}"
			/>
			<button
				type="button"
				on:click={() => editor.chain().focus().setTextAlign('justify').run()}
				class="i-material-symbols-format-align-justify {editor.isActive('justify') && 'is-active'}"
			/>
			<button
				type="button"
				on:click={() => editor.chain().focus().setTextAlign('left').run()}
				class="i-material-symbols-format-align-left {editor.isActive('left') && 'is-active'}"
			/>
			<button
				type="button"
				on:click={() => editor.chain().focus().setTextAlign('right').run()}
				class="i-material-symbols-format-align-right {editor.isActive('right') && 'is-active'}"
			/>
		</div>
		<div class="flex items-center gap-3">
			<button
				type="button"
				on:click={() => editor.chain().focus().toggleOrderedList().run()}
				class="i-material-symbols-format-list-numbered {editor.isActive('orderedList') &&
					'is-active'}"
			/>
			<button
				type="button"
				on:click={() => editor.chain().focus().toggleBulletList().run()}
				class="i-material-symbols-format-list-bulleted {editor.isActive('bulletList') &&
					'is-active'}"
			/>
		</div>
		 
		<div class="flex items-center gap-3">
			<button
				type="button"
				on:click={addLink}
				class="i-material-symbols-add-link {editor.isActive('link') && 'is-active'}"
			/>
			<button
				type="button"
				on:click={addImage}
				class="i-material-symbols-image-outline {editor.isActive('image') && 'is-active'}"
			/>
			<button
				type="button"
				on:click={addYoutubeUrl}
				class="i-material-symbols-video-library-outline {editor.isActive('youtube') && 'is-active'}"
			/>
			<dialog bind:this={dialog}>
				<form method="dialog" on:submit={handleYoutubeUrl}>
					<section>
						<label for="width">Width</label>
						<input type="number" name="width" id="width" />
					</section>
					<section>
						<label for="height">Height</label>
						<input type="number" name="height" id="height" />
					</section>
					<section>
						<label for="url">URL</label>
						<input type="text" name="url" id="url" />
					</section>
					<section>
						<button type="button" on:click={() => dialog?.close()}>Cancel</button>
						<button type="submit">Submit</button>
					</section>
				</form>
			</dialog>
		</div>
	</div>
{/if}
<div bind:this={element} />

<style>
	.is-active {
		@apply text-teal-600 stroke-10;
	}
	button {
		@apply hover\:text-teal-500;
	}

	:global(.ProseMirror a) {
		color: #68cef8;
	}
	:global(.ProseMirror img) {
		max-width: 100%;
		height: auto;
	}
	:global(.ProseMirror img.ProseMirror-selectednode) {
		outline: 3px solid #68cef8;
	}
	:global(.ProseMirror ul) {
		padding: 0 1rem;
		list-style-type: disc;
	}
	:global(.ProseMirror ol) {
		padding: 0 1rem;
		list-style-type: decimal;
	}
</style>
