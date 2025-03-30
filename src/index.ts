import { Vertex2D, Object2D } from './vertex.js';
import { setup } from './program.js';

const canvas = document.querySelector('#gl-canvas') as HTMLCanvasElement;

if (!canvas) {
	throw new Error('Canvas not found');
}
const gl = canvas.getContext('webgl');
if (!gl) {
	throw new Error('WebGL not supported');
}

const obj = new Object2D(
	[
		[
			[0, 0],
			[0, 50],
			[50, 50],
		],
		[
			[100, 100],
			[200, 300],
			[300, 100],
		],
	],
	[
		[
			[1, 0, 0, 1],
			[1, 0, 0, 1],
			[1, 1, 1, 1],
		],
		[
			[1, 0, 0, 1],
			[1, 0, 0, 1],
			[1, 1, 1, 1],
		],
	]
);

setup(gl, obj.positions, obj.colors)
	.catch((error) => {
		console.error('Error setting up WebGL:', error);
	})
	.then(() => {
		const offset = 0;
		const primitiveType = gl.TRIANGLES;
		gl.drawArrays(primitiveType, offset, obj.positions.length / 2);
	});
