
graph_ctx = initialize_graph_context("canvas");

var z_r = 0.0;
var radius = 0.5;
var m_r = new mat4(); // rotation matrix
var m_t = mat4.translate(0.0, 0.0, 5.0); // translation matrix
var m_p = mat4.project(graph_ctx.width / graph_ctx.height, Math.PI / 4.0, 0.10, 10.0); // projection matrix

const vertex_array = [
    new vec3(-radius, -radius, +radius),
    new vec3(+radius, -radius, +radius),
    new vec3(+radius, +radius, +radius),
    new vec3(-radius, +radius, +radius),
    new vec3(-radius, -radius, -radius),
    new vec3(+radius, -radius, -radius),
    new vec3(+radius, +radius, -radius),
    new vec3(-radius, +radius, -radius)
];

var vertex_buffer = Array(vertex_array.length);

on_draw = (ctx) =>
{
    m_r.rows[0].x =  Math.cos(z_r);
    m_r.rows[0].z =  Math.sin(z_r);
    m_r.rows[2].x = -Math.sin(z_r);
    m_r.rows[2].z =  Math.cos(z_r);

    var m = m_t.mul(m_r);
    m = m_p.mul(m);

    for (var i = 0; i < vertex_buffer.length; i++)
    {
        vertex_buffer[i] = m.dot(new vec4(vertex_array[i].x, vertex_array[i].y, vertex_array[i].z, 1.0));

        vertex_buffer[i].x /= vertex_buffer[i].w;
        vertex_buffer[i].y /= vertex_buffer[i].w;
        vertex_buffer[i].z /= vertex_buffer[i].w;

        vertex_buffer[i].x = (vertex_buffer[i].x + 1.0) * 0.5 * canvas.width;
        vertex_buffer[i].y = (vertex_buffer[i].y + 1.0) * 0.5 * canvas.height;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.beginPath();

    ctx.moveTo(vertex_buffer[0].x, vertex_buffer[0].y);
    ctx.lineTo(vertex_buffer[1].x, vertex_buffer[1].y);
    ctx.lineTo(vertex_buffer[2].x, vertex_buffer[2].y);
    ctx.lineTo(vertex_buffer[3].x, vertex_buffer[3].y);
    ctx.lineTo(vertex_buffer[0].x, vertex_buffer[0].y);

    ctx.moveTo(vertex_buffer[4].x, vertex_buffer[4].y);
    ctx.lineTo(vertex_buffer[5].x, vertex_buffer[5].y);
    ctx.lineTo(vertex_buffer[6].x, vertex_buffer[6].y);
    ctx.lineTo(vertex_buffer[7].x, vertex_buffer[7].y);
    ctx.lineTo(vertex_buffer[4].x, vertex_buffer[4].y);

    ctx.moveTo(vertex_buffer[0].x, vertex_buffer[0].y);
    ctx.lineTo(vertex_buffer[4].x, vertex_buffer[4].y);
    ctx.moveTo(vertex_buffer[3].x, vertex_buffer[3].y);
    ctx.lineTo(vertex_buffer[7].x, vertex_buffer[7].y);
    ctx.moveTo(vertex_buffer[1].x, vertex_buffer[1].y);
    ctx.lineTo(vertex_buffer[5].x, vertex_buffer[5].y);
    ctx.moveTo(vertex_buffer[2].x, vertex_buffer[2].y);
    ctx.lineTo(vertex_buffer[6].x, vertex_buffer[6].y);

    ctx.stroke();

    z_r += 0.001;
};

graph_ctx.set_draw_callback(on_draw);
