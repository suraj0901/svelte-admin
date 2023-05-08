<script>
	import { setContext } from "svelte";
	import Navbar from "./component/Navbar.svelte";
	let save, publish
	setContext("save", save)
	setContext("publish", publish)
</script>

<Navbar/>
<main class="m-2">
	<slot/>
</main>