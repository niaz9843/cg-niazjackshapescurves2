class Renderer {
    // canvas:              object ({id: __, width: __, height: __})
    // num_curve_sections:  int
    constructor(canvas, num_curve_sections, show_points_flag) {
        this.canvas = document.getElementById(canvas.id);
        this.canvas.width = canvas.width;
        this.canvas.height = canvas.height;
        this.ctx = this.canvas.getContext('2d', {willReadFrequently: true});
        this.slide_idx = 0;
        this.num_curve_sections = num_curve_sections;
        this.show_points = show_points_flag;
    }

    // n:  int
    setNumCurveSections(n) {
        this.num_curve_sections = n;
        this.drawSlide(this.slide_idx);
    }

    // flag:  bool
    showPoints(flag) {
        this.show_points = flag;
        this.drawSlide(this.slide_idx);
    }
    
    // slide_idx:  int
    drawSlide(slide_idx) {
        this.slide_idx = slide_idx;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        let framebuffer = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);

        switch (this.slide_idx) {
            case 0:
                this.drawSlide0(framebuffer);
                break;
            case 1:
                this.drawSlide1(framebuffer);
                break;
            case 2:
                this.drawSlide2(framebuffer);
                break;
            case 3:
                this.drawSlide3(framebuffer);
                break;
        }

        this.ctx.putImageData(framebuffer, 0, 0);
    }

    // framebuffer:  canvas ctx image data
    drawSlide0(framebuffer) {
        // TODO: draw at least 2 Bezier curves
        //   - variable `this.num_curve_sections` should be used for `num_edges`
        //   - variable `this.show_points` should be used to determine whether or not to render vertices
        
        
        // Following line is example of drawing a single line
        // (this should be removed after you implement the curve)
        let p0 = {x: 100, y: 300};
        let p1 = {x: 200, y: 50};
        let p2 = {x: 400, y: 50};
        let p3 = {x: 500, y: 300};

        this.drawBezierCurve(
            p0, p1, p2, p3,
            this.num_curve_sections,
            [255, 0, 0, 255],
            framebuffer
        );

        let q0 = {x: 100, y: 400};
        let q1 = {x: 200, y: 600};
        let q2 = {x: 400, y: 200};
        let q3 = {x: 600, y: 400};

        this.drawBezierCurve(
            q0, q1, q2, q3,
            this.num_curve_sections,
            [0, 0, 255, 255],
            framebuffer
        );
    }

    // framebuffer:  canvas ctx image data
    drawSlide1(framebuffer) {
        let center1 = {x: 250, y: 300};

        this.drawCircle(
            center1,
            150,
            this.num_curve_sections,
            [255, 0, 0, 255],
            framebuffer
        );

        let center2 = {x: 550, y: 400};

        this.drawCircle(
            center2,
            100,
            this.num_curve_sections,
            [0, 0, 255, 255],
            framebuffer
        );
    }

    // framebuffer:  canvas ctx image data
    drawSlide2(framebuffer) {
        // Pentagon
        let polygon1 = [
            {x: 100, y: 250},
            {x: 180, y: 100},
            {x: 320, y: 100},
            {x: 400, y: 250},
            {x: 250, y: 400}
        ];

        // Hexagon
        let polygon2 = [
            {x: 500, y: 150},
            {x: 620, y: 150},
            {x: 680, y: 250},
            {x: 620, y: 350},
            {x: 500, y: 350},
            {x: 440, y: 250}
        ];

        // Draw polygons first
        this.drawConvexPolygon(
            polygon1,
            [255, 0, 0, 255],
            framebuffer
        );

        this.drawConvexPolygon(
            polygon2,
            [0, 0, 255, 255],
            framebuffer
        );

        // Draw point markers on top
        if (this.show_points) {
            for (let vertex of polygon1) {
                this.drawVertex(
                    vertex,
                    [0, 0, 0, 255],
                    framebuffer
                );
            }

            for (let vertex of polygon2) {
                this.drawVertex(
                    vertex,
                    [0, 0, 0, 255],
                    framebuffer
                );
            }
        }
    }

    // Show straight-line endpoints only for the Name slide.
    drawNameLine(p0, p1, color, framebuffer) {
        this.drawLine(p0, p1, color, framebuffer);
        if (this.show_points) {
            this.drawVertex(p0, [0, 0, 0, 255], framebuffer);
            this.drawVertex(p1, [0, 0, 0, 255], framebuffer);
        }
    }

drawSlide3(framebuffer) {
    let black = [0, 0, 0, 255];

    // Flip every Y-coordinate vertically
    let flipY = (y) => framebuffer.height - y + 100;


    // ==========================================
    // JACK
    // ==========================================

    // J
    this.drawNameLine(
        {x: 180, y: flipY(150)},
        {x: 260, y: flipY(150)},
        black,
        framebuffer
    );

    this.drawNameLine(
        {x: 220, y: flipY(150)},
        {x: 220, y: flipY(280)},
        black,
        framebuffer
    );

    this.drawBezierCurve(
        {x: 220, y: flipY(280)},
        {x: 220, y: flipY(330)},
        {x: 150, y: flipY(330)},
        {x: 150, y: flipY(275)},
        this.num_curve_sections,
        black,
        framebuffer
    );


    // A
    this.drawNameLine(
        {x: 290, y: flipY(300)},
        {x: 340, y: flipY(150)},
        black,
        framebuffer
    );

    this.drawNameLine(
        {x: 340, y: flipY(150)},
        {x: 390, y: flipY(300)},
        black,
        framebuffer
    );

    this.drawNameLine(
        {x: 310, y: flipY(240)},
        {x: 370, y: flipY(240)},
        black,
        framebuffer
    );


    // C
    this.drawBezierCurve(
        {x: 500, y: flipY(170)},
        {x: 410, y: flipY(110)},
        {x: 410, y: flipY(340)},
        {x: 500, y: flipY(280)},
        this.num_curve_sections,
        black,
        framebuffer
    );


    // K
    this.drawNameLine(
        {x: 550, y: flipY(150)},
        {x: 550, y: flipY(300)},
        black,
        framebuffer
    );

    this.drawNameLine(
        {x: 550, y: flipY(225)},
        {x: 630, y: flipY(150)},
        black,
        framebuffer
    );

    this.drawNameLine(
        {x: 550, y: flipY(225)},
        {x: 630, y: flipY(300)},
        black,
        framebuffer
    );


    // ==========================================
    // NIAZ
    // ==========================================

    // N
    this.drawNameLine(
        {x: 170, y: flipY(400)},
        {x: 170, y: flipY(550)},
        black,
        framebuffer
    );

    this.drawNameLine(
        {x: 170, y: flipY(400)},
        {x: 250, y: flipY(550)},
        black,
        framebuffer
    );

    this.drawNameLine(
        {x: 250, y: flipY(550)},
        {x: 250, y: flipY(400)},
        black,
        framebuffer
    );


    // I
    this.drawNameLine(
        {x: 290, y: flipY(400)},
        {x: 370, y: flipY(400)},
        black,
        framebuffer
    );

    this.drawNameLine(
        {x: 330, y: flipY(400)},
        {x: 330, y: flipY(550)},
        black,
        framebuffer
    );

    this.drawNameLine(
        {x: 290, y: flipY(550)},
        {x: 370, y: flipY(550)},
        black,
        framebuffer
    );


    // A
    this.drawNameLine(
        {x: 400, y: flipY(550)},
        {x: 450, y: flipY(400)},
        black,
        framebuffer
    );

    this.drawNameLine(
        {x: 450, y: flipY(400)},
        {x: 500, y: flipY(550)},
        black,
        framebuffer
    );

    this.drawNameLine(
        {x: 420, y: flipY(490)},
        {x: 480, y: flipY(490)},
        black,
        framebuffer
    );


    // Z
    this.drawNameLine(
        {x: 540, y: flipY(400)},
        {x: 630, y: flipY(400)},
        black,
        framebuffer
    );

    this.drawNameLine(
        {x: 630, y: flipY(400)},
        {x: 540, y: flipY(550)},
        black,
        framebuffer
    );

    this.drawNameLine(
        {x: 540, y: flipY(550)},
        {x: 630, y: flipY(550)},
        black,
        framebuffer
    );


    // ==========================================
    // CIRCLE
    // ==========================================

    this.drawCircle(
        {x: 700, y: flipY(475)},
        20,
        this.num_curve_sections,
        black,
        framebuffer
    );


    // ==========================================
    // FILLED POLYGON
    // ==========================================

    let diamond = [
        {x: 700, y: flipY(200)},
        {x: 720, y: flipY(220)},
        {x: 700, y: flipY(240)},
        {x: 680, y: flipY(220)}
    ];

    this.drawConvexPolygon(
        diamond,
        black,
        framebuffer
    );

    if (this.show_points) {
        for (let vertex of diamond) {
            this.drawVertex(
                vertex,
                [0, 0, 0, 255],
                framebuffer
            );
        }
    }
}

    // p0:           object {x: __, y: __}
    // p1:           object {x: __, y: __}
    // p2:           object {x: __, y: __}
    // p3:           object {x: __, y: __}
    // num_edges:    int
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawBezierCurve(p0, p1, p2, p3, num_edges, color, framebuffer) {
        let previous_point = p0;

        if (this.show_points) {
            this.drawVertex(
                p0,
                [0, 0, 0, 255],
                framebuffer
            );
        }

        for (let i = 1; i <= num_edges; i++) {
            let t = i / num_edges;

            let x = Math.pow(1 - t, 3) * p0.x
                + 3 * Math.pow(1 - t, 2) * t * p1.x
                + 3 * (1 - t) * Math.pow(t, 2) * p2.x
                + Math.pow(t, 3) * p3.x;

            let y = Math.pow(1 - t, 3) * p0.y
                + 3 * Math.pow(1 - t, 2) * t * p1.y
                + 3 * (1 - t) * Math.pow(t, 2) * p2.y
                + Math.pow(t, 3) * p3.y;

            let current_point = {
                x: Math.round(x),
                y: Math.round(y)
            };

            this.drawLine(
                previous_point,
                current_point,
                color,
                framebuffer
            );

            if (this.show_points) {
                this.drawVertex(
                    current_point,
                    [0, 0, 0, 255],
                    framebuffer
                );
            }

            previous_point = current_point;
        }
        // Control points use red markers; sampled curve points use black.
        if (this.show_points) {
            this.drawVertex(p1, [255, 0, 0, 255], framebuffer);
            this.drawVertex(p2, [255, 0, 0, 255], framebuffer);
        }
    }

    // center:       object {x: __, y: __}
    // radius:       int
    // num_edges:    int
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawCircle(center, radius, num_edges, color, framebuffer) {
        // TODO: draw a sequence of straight lines to approximate a circle
        let previous_point = {
            x: Math.round(center.x + radius),
            y: center.y
        };

        if (this.show_points) {
            this.drawVertex(
                previous_point,
                [0, 0, 0, 255],
                framebuffer
            );
        }

        for (let i = 1; i <= num_edges; i++) {
            let angle = (2 * Math.PI * i) / num_edges;

            let current_point = {
                x: Math.round(center.x + radius * Math.cos(angle)),
                y: Math.round(center.y + radius * Math.sin(angle))
            };

            this.drawLine(
                previous_point,
                current_point,
                color,
                framebuffer
            );

            if (this.show_points) {
                this.drawVertex(
                    current_point,
                    [0, 0, 0, 255],
                    framebuffer
                );
            }

            previous_point = current_point;
        }
    }
    
    // vertex_list:  array of object [{x: __, y: __}, {x: __, y: __}, ..., {x: __, y: __}]
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawConvexPolygon(vertex_list, color, framebuffer) {
        // TODO: draw a sequence of triangles to form a convex polygon
        for (let i = 1; i < vertex_list.length - 1; i++) {
            this.drawTriangle(
                vertex_list[0],
                vertex_list[i],
                vertex_list[i + 1],
                color,
                framebuffer
            );
        }

    }

    // v:            object {x: __, y: __}
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawVertex(v, color, framebuffer) {
        let size = 3;

        for (let y = v.y - size; y <= v.y + size; y++) {
            for (let x = v.x - size; x <= v.x + size; x++) {
                let dx = x - v.x;
                let dy = y - v.y;

                if (dx * dx + dy * dy <= size * size) {
                    this.setFramebufferColor(
                        color,
                        x,
                        y,
                        framebuffer
                    );
                }
            }
        }
    }
    
    /***************************************************************
     ***       Basic Line and Triangle Drawing Routines          ***
     ***       (code provided from in-class activities)          ***
     ***************************************************************/
    pixelIndex(x, y, framebuffer) {
	    return 4 * y * framebuffer.width + 4 * x;
    }
    
    setFramebufferColor(color, x, y, framebuffer) {
	    let p_idx = this.pixelIndex(x, y, framebuffer);
        for (let i = 0; i < 4; i++) {
            framebuffer.data[p_idx + i] = color[i];
        }
    }
    
    swapPoints(a, b) {
        let tmp = {x: a.x, y: a.y};
        a.x = b.x;
        a.y = b.y;
        b.x = tmp.x;
        b.y = tmp.y;
    }

    drawLine(p0, p1, color, framebuffer) {
        if (Math.abs(p1.y - p0.y) <= Math.abs(p1.x - p0.x)) { // |m| <= 1
            if (p0.x < p1.x) {
                this.drawLineLow(p0.x, p0.y, p1.x, p1.y, color, framebuffer);
            }
            else {
                this.drawLineLow(p1.x, p1.y, p0.x, p0.y, color, framebuffer);
            }
        }
        else {                                                // |m| > 1
            if (p0.y < p1.y) {
                this.drawLineHigh(p0.x, p0.y, p1.x, p1.y, color, framebuffer);
            }
            else {
                this.drawLineHigh(p1.x, p1.y, p0.x, p0.y, color, framebuffer);
            }
        }
    }
    
    drawLineLow(x0, y0, x1, y1, color, framebuffer) {
        let A = y1 - y0;
        let B = x0 - x1;
        let iy = 1; // y increment (+1 for positive slope, -1 for negative slop)
        if (A < 0) {
            iy = -1;
            A *= -1;
        }
        let D = 2 * A + B;
        let D0 = 2 * A;
        let D1 = 2 * A + 2 * B;
    
        let y = y0;
        for (let x = x0; x <= x1; x++) {
            this.setFramebufferColor(color, x, y, framebuffer);
            if (D <= 0) {
                D += D0;
            }
            else {
                D += D1;
                y += iy;
            }
        }
    }
    
    drawLineHigh(x0, y0, x1, y1, color, framebuffer) {
        let A = x1 - x0;
        let B = y0 - y1;
        let ix = 1; // x increment (+1 for positive slope, -1 for negative slop)
        if (A < 0) {
            ix = -1;
            A *= -1;
        }
        let D = 2 * A + B;
        let D0 = 2 * A;
        let D1 = 2 * A + 2 * B;
    
        let x = x0;
        for (let y = y0; y <= y1; y++) {
            this.setFramebufferColor(color, x, y, framebuffer);
            if (D <= 0) {
                D += D0;
            }
            else {
                D += D1;
                x += ix;
            }
        }
    }
    
    drawTriangle(p0, p1, p2, color, framebuffer) {
        // Deep copy, then sort points in ascending y order
        p0 = {x: p0.x, y: p0.y};
        p1 = {x: p1.x, y: p1.y};
        p2 = {x: p2.x, y: p2.y};
        if (p1.y < p0.y) this.swapPoints(p0, p1);
        if (p2.y < p0.y) this.swapPoints(p0, p2);
        if (p2.y < p1.y) this.swapPoints(p1, p2);
        
        // Edge coherence triangle algorithm
        // Create initial edge table
        let edge_table = [
            {x: p0.x, inv_slope: (p1.x - p0.x) / (p1.y - p0.y)}, // edge01
            {x: p0.x, inv_slope: (p2.x - p0.x) / (p2.y - p0.y)}, // edge02
            {x: p1.x, inv_slope: (p2.x - p1.x) / (p2.y - p1.y)}  // edge12
        ];
        
        // Do cross product to determine if pt1 is to the right/left of edge02
        let v01 = {x: p1.x - p0.x, y: p1.y - p0.y};
        let v02 = {x: p2.x - p0.x, y: p2.y - p0.y};
        let p1_right = ((v01.x * v02.y) - (v01.y * v02.x)) >= 0;
        
        // Get the left and right edges from the edge table (lower half of triangle)
        let left_edge, right_edge;
        if (p1_right) {
            left_edge = edge_table[1];
            right_edge = edge_table[0];
        }
        else {
            left_edge = edge_table[0];
            right_edge = edge_table[1];
        }
        // Draw horizontal lines (lower half of triangle)
        for (let y = p0.y; y < p1.y; y++) {
            let left_x = Math.floor(left_edge.x);
            let right_x = Math.floor(right_edge.x);

            if (left_x <= right_x) { 
                this.drawLine(
                    {x: left_x, y: y},
                    {x: right_x, y: y},
                    color,
                    framebuffer
                );
            }

            left_edge.x += left_edge.inv_slope;
            right_edge.x += right_edge.inv_slope;
        }
        
        // Get the left and right edges from the edge table (upper half of triangle) - note only one edge changes
        if (p1_right) {
            right_edge = edge_table[2];
        }
        else {
            left_edge = edge_table[2];
        }
        // Draw horizontal lines (upper half of triangle)
        for (let y = p1.y; y < p2.y; y++) {
            let left_x = Math.floor(left_edge.x);
            let right_x = Math.floor(right_edge.x);
    
            if (left_x <= right_x) {
                this.drawLine(
                    {x: left_x, y: y},
                    {x: right_x, y: y},
                    color,
                    framebuffer
                );
            }
    
            left_edge.x += left_edge.inv_slope;
            right_edge.x += right_edge.inv_slope;
        }
    }
}

export { Renderer };
