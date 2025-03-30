export class Vertex2D {
	public color: t_VertexColor;
	constructor(public points: t_Vertex2D, color: t_Color | t_VertexColor) {
		if (typeof color[0] === 'number') {
			this.color = [color as t_Color, color as t_Color, color as t_Color];
		} else {
			this.color = color as t_VertexColor;
		}
	}

	public get positions(): number[] {
		return this.points.flat();
	}

	/**
	 * get the centroid of the triangle
	 */
	public get centroid(): t_Point2D {
		const x =
			(this.points[0][0] + this.points[1][0] + this.points[2][0]) / 3;
		const y =
			(this.points[0][1] + this.points[1][1] + this.points[2][1]) / 3;

		return [x, y];
	}
	/**
	 * rotate triangle around its centroid
	 * @param angle in radians
	 */
	public rotate(angle: number, centroid?: t_Point2D): void {
		centroid = centroid ?? this.centroid;
		const cos = Math.cos(angle);
		const sin = Math.sin(angle);

		this.points = this.points.map((point) => {
			const x = point[0] - centroid[0];
			const y = point[1] - centroid[1];

			return [
				x * cos - y * sin + centroid[0],
				x * sin + y * cos + centroid[1],
			];
		}) as t_Vertex2D;
	}
}

export class Object2D {
	public vertices: Vertex2D[];
	constructor(vertices: t_Vertex2D[], colors: (t_Color | t_VertexColor)[]) {
		this.vertices = vertices.map((vertex, index) => {
			const color = colors[index % colors.length];
			return new Vertex2D(vertex, color);
		});
	}

	public get positions(): number[] {
		return this.vertices.map((vertex) => vertex.positions).flat();
	}

	public get colors(): number[] {
		return this.vertices.map((vertex) => vertex.color.flat()).flat();
	}

	/**
	 * get the centroid of the object
	 * @returns centroid of the object
	 */
	public get centroid(): t_Point2D {
		const x =
			this.vertices.reduce((acc, vertex) => acc + vertex.centroid[0], 0) /
			this.vertices.length;
		const y =
			this.vertices.reduce((acc, vertex) => acc + vertex.centroid[1], 0) /
			this.vertices.length;

		return [x, y];
	}

	/**
	 * rotate object around its centroid
	 * @param angle in radians
	 */
	public rotate(angle: number): void {
		const centroid = this.centroid;

		this.vertices = this.vertices.map((vertex) => {
			vertex.rotate(angle, centroid);
			return vertex;
		});
	}
}
