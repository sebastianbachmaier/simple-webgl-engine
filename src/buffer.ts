

export enum e_AttributeType {
    'vec2' = 2,
    'vec3' = 3,
    'vec4' = 4,
}

/**
 *
 * @param gl WebGLRenderingContext
 * @param attrbuteName name used in the vertex shader
 * @param size type of the attribute
 * @param data nuber array
 * @returns attribute location
 */
export function setupBuffer(
	gl: WebGLRenderingContext,
	attrbuteName: string,
	size: e_AttributeType,
	data: number[]
) {
	/** get programm */
	const program: WebGLProgram = gl.getParameter(gl.CURRENT_PROGRAM);

	const attribute = gl.getAttribLocation(program, attrbuteName);
	if (attribute === -1) throw `Unable to get attribute ${attrbuteName}`;
	gl.enableVertexAttribArray(attribute);
	gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
	gl.vertexAttribPointer(attribute, size, gl.FLOAT, false, 0, 0);

	return attribute;
}
