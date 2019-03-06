const Docma = require('docma');
const Package = require('./package');

Docma.create()
	.build({
		app: {
			title: Package.name,
			base: '/',
			entrance: 'content:readme',
			routing: 'query',
			server: Docma.ServerType.STATIC,
		},
		markdown: {
			emoji: true,
		},
		src: [
			{ readme: './README.md' },
			{ letschat: './src/**/*.js' },
		],
		dest: './docs',
		jsdoc: {
			plugins: ['jsdoc-dynamic'],
		},
		template: {
			options: {
				title: Package.name,
				navItems: [
					{
						label: 'Readme',
						href: '?content=readme',
					},
					{
						label: 'Documentation',
						href: '?api=letschat',
						iconClass: 'ico-book',
					},
				],
			},
		},
	})
	.catch(console.error); // eslint-disable-line no-console