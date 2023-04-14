// uno.config.ts
import {
	defineConfig,
	presetWebFonts,
	transformerVariantGroup,
	transformerDirectives,
	presetIcons,
	presetUno,
	presetAttributify
} from 'unocss';

import extractorSvelte from '@unocss/extractor-svelte';

export default defineConfig({
	extractors: [extractorSvelte()],
	transformers:[
		transformerDirectives(),
		transformerVariantGroup()
	],
	presets: [
		presetUno(),
		presetAttributify(),
		presetWebFonts({
			provider: 'google',
			fonts: {
			  sans: 'Robot',
			  mono: ['Fira Code', 'Fira Mono:400,700'],
			},
		}),
		presetIcons(),
	],
	shortcuts: {
		background: 'bg-light-400 dark:bg-dark-400',
		center: 'flex justify-center items-center',
		// title: "",
		// input: ""
	}
});
