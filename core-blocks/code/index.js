/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	createBlock,
} from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import { edit } from './edit'; // import the specialized `edit` function. Is is different between the web and native mobile.

export const name = 'core/code';

export const settings = {
	title: __( 'Code' ),

	description: __( 'The code block maintains spaces and tabs, great for showing code snippets.' ),

	icon: 'editor-code',

	category: 'formatting',

	attributes: {
		content: {
			type: 'string',
			source: 'property',
			selector: 'code',
			property: 'textContent',
		},
	},

	supports: {
		html: false,
	},

	transforms: {
		from: [
			{
				type: 'pattern',
				trigger: 'enter',
				regExp: /^```$/,
				transform: () => createBlock( 'core/code' ),
			},
			{
				type: 'raw',
				isMatch: ( node ) => (
					node.nodeName === 'PRE' &&
					node.children.length === 1 &&
					node.firstChild.nodeName === 'CODE'
				),
			},
		],
	},

	edit: edit,

	save( { attributes } ) {
		return <pre><code>{ attributes.content }</code></pre>;
	},
};