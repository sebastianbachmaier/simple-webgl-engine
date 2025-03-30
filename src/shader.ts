
export async function loadShaderText(
    url: string
): Promise<string> {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const text = await response.text();
    return text;
};

export function createShader(
	gl: WebGLRenderingContext,
	type: GLenum,
	source: string
) {
	const shader = gl.createShader(type);
	if (!shader) {
		throw new Error('Unable to create shader');
	}
	gl.shaderSource(shader, source);
	gl.compileShader(shader);
	const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
	if (success) {
		return shader;
	}

	console.log(gl.getShaderInfoLog(shader));
	gl.deleteShader(shader);

    throw new Error('Unable to create shader');
}

export function createProgram(
	gl: WebGLRenderingContext,
	vertexShader: WebGLShader,
	fragmentShader: WebGLShader
) {
    
	const program = gl.createProgram();
    if (!program) {
        throw new Error('Unable to create program');
    }
	gl.attachShader(program, vertexShader);
	gl.attachShader(program, fragmentShader);
	gl.linkProgram(program);
	const success = gl.getProgramParameter(program, gl.LINK_STATUS);
	if (success) {
		return program;
	}

	console.log(gl.getProgramInfoLog(program));
	gl.deleteProgram(program);

    throw new Error('Unable to create program');
}

