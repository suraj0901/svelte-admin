import { writable } from 'svelte/store';

export const save = writable();
export const publish = writable();
export const formState = writable({
	title: '',
	image: '',
	date: '',
	body: ''
});
