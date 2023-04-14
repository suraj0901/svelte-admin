<script>
	import 'quill/dist/quill.snow.css';
	import { onMount } from 'svelte';
	import { darkMode } from '../../store';
	/**
	 * @type {HTMLDivElement}
	 */
	let element;

	export let toolbarOptions = [
		[{ size: [ 'small', false, 'large', 'huge' ]}],
		[{ 'font': [] }],
		[{ header: 1 }, { header: 2 }, 'blockquote', 'link', 'image', 'video', "code-block"],
		[ 'bold', 'italic', 'underline', 'strike'],
		[{ list: 'ordered' }, { list: 'ordered' }],
		[{ align: [] }],
	];

	onMount(async () => {
		const { default: Quill } = await import('quill');
		if(element) element.innerHTML = ""
		new Quill(element, {
			modules: {
				toolbar: toolbarOptions
			},
			theme: 'snow'
		});
	});

</script>

<div bind:this={element} class="editor " />

<style>
	.editor{
		height: 375px;
	}

</style>
