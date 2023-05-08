<script>
	import FormInput from "./component/FormInput.svelte";
	import Preview from "./component/Preview.svelte";
</script>

<div class="rounded grid grid-cols-2 gap-2">
	<div class="background col-span-1 p-4">
		<FormInput  />
	</div>
	<div class="background col-span-1 p-4">
		<Preview />
	</div>
</div>