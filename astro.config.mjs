// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://ahao221.github.io',
	integrations: [
		starlight({
			title: 'Ahao Mod Docs',
			social: [
				{ icon: 'discord', label: 'Discord', href: 'https://discord.gg/cjyBzW3jbn' }
			],
			components: {
				SocialIcons: './src/components/SocialIcons.astro',
			},
			sidebar: [
				{
					label: 'Start',
					items: [
						{ label: 'Welcome', slug: 'start/welcome' },
					],
				},
				{
					label: 'Guides',
					items: [
						{ label: 'AhFightAPI', slug: 'guides/ahfightapien' },
					],
				},
			],
		}),
	],
});
