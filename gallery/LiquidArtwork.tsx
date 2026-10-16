import { useEffect, useRef, useState } from "react";

const vertexSource = `
attribute vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }
`;

// An implicit, softly twisted glass loop. The environment is a photographic
// studio assembled from mathematical light panels; no remote textures needed.
const fragmentSource = `
precision highp float;
uniform vec2 resolution;
uniform vec2 pointer;
uniform float time;
const vec3 PAPER = vec3(0.9333, 0.9490, 0.9725);
mat2 turn(float a) { float s=sin(a), c=cos(a); return mat2(c,-s,s,c); }
vec3 localPoint(vec3 p) {
  p.xz = turn(-0.25 + pointer.x*0.12 + sin(time*0.17)*0.06) * p.xz;
  p.yz = turn(0.48 + pointer.y*0.10 + cos(time*0.13)*0.055) * p.yz;
  p.xy = turn(-0.36 + sin(time*0.12)*0.055) * p.xy;
  return p;
}
float surface(vec3 world) {
  vec3 p = localPoint(world);
  float a = atan(p.y,p.x);
  float radius = 1.065 + 0.085*cos(3.0*a + 0.5) + 0.035*sin(2.0*a);
  vec2 section = vec2(length(p.xy)-radius, p.z-0.07*sin(2.0*a));
  section = turn(a*0.5 + 0.5*sin(a)) * section;
  section *= vec2(0.84,1.16);
  return (length(section) - (0.335 + 0.035*cos(a+0.4))) * 0.72;
}
vec3 normalAt(vec3 p) {
  vec2 e=vec2(0.0012,-0.0012);
  return normalize(e.xyy*surface(p+e.xyy)+e.yyx*surface(p+e.yyx)+e.yxy*surface(p+e.yxy)+e.xxx*surface(p+e.xxx));
}
vec3 environment(vec3 d) {
  vec3 c = mix(vec3(0.77,0.83,0.93),vec3(0.98,0.985,1.0),smoothstep(-0.9,0.6,d.y));
  float blue = pow(max(0.0,dot(d,normalize(vec3(-1.0,0.15,0.6)))),7.0);
  float lilac = pow(max(0.0,dot(d,normalize(vec3(0.9,0.25,-0.5)))),9.0);
  float coral = pow(max(0.0,dot(d,normalize(vec3(0.4,-0.6,0.8)))),11.0);
  c = mix(c,vec3(0.28,0.51,0.87),blue*0.67);
  c = mix(c,vec3(0.65,0.55,0.82),lilac*0.50);
  c = mix(c,vec3(0.99,0.68,0.56),coral*0.42);
  // Reflected studio flags provide the narrow dark contours real glass needs.
  float flag = smoothstep(0.93,0.985,dot(d,normalize(vec3(-0.65,0.05,-1.0))));
  c = mix(c,vec3(0.12,0.19,0.31),flag*0.88);
  float flag2 = smoothstep(0.97,0.995,dot(d,normalize(vec3(0.85,-0.35,-0.55))));
  c = mix(c,vec3(0.25,0.33,0.48),flag2*0.65);
  float softbox = pow(max(0.0,dot(d,normalize(vec3(-0.5,0.85,0.7)))),28.0);
  float strip = pow(max(0.0,dot(d,normalize(vec3(0.7,0.8,0.3)))),100.0);
  c += vec3(1.0,0.99,0.95)*softbox*0.7 + vec3(0.92,0.97,1.0)*strip*1.4;
  return c;
}
float trace(vec3 origin,vec3 direction) {
  float distance=0.0;
  for(int i=0;i<72;i++) {
    float stepSize=surface(origin+direction*distance);
    if(stepSize<0.0014 || distance>8.0) break;
    distance+=max(stepSize,0.001);
  }
  return distance;
}
vec3 glass(vec3 p, vec3 incoming, vec3 n) {
  vec3 inside = refract(incoming,n,1.0/1.465);
  vec3 exitPoint = p + inside*0.018;
  float thickness=0.018;
  for(int i=0;i<32;i++) {
    float gap=surface(exitPoint);
    if(gap>0.0 && thickness>0.025) break;
    float stepSize=max(abs(gap),0.008);
    thickness+=stepSize;
    exitPoint+=inside*stepSize;
  }
  vec3 exitNormal = -normalAt(exitPoint);
  vec3 transmission = refract(inside,exitNormal,1.465);
  if(dot(transmission,transmission)<0.1) transmission=reflect(inside,exitNormal);
  vec3 redRay = refract(inside,exitNormal,1.452);
  vec3 blueRay = refract(inside,exitNormal,1.478);
  vec3 through = vec3(environment(redRay).r,environment(transmission).g,environment(blueRay).b);
  through *= exp(-vec3(0.105,0.045,0.012)*thickness);
  float facing = clamp(dot(-incoming,n),0.0,1.0);
  float fresnel = 0.055 + 0.945*pow(1.0-facing,4.5);
  vec3 reflection = environment(reflect(incoming,n));
  vec3 c = mix(through,reflection,fresnel*0.88+0.10);
  float highlight = pow(max(0.0,dot(reflect(incoming,n),normalize(vec3(-0.65,0.7,1.0)))),110.0);
  c += vec3(0.98,0.99,1.0)*highlight*0.8;
  // A narrow spectral edge, produced from view angle rather than painted bands.
  c += vec3(0.13,0.07,0.19)*pow(1.0-facing,2.0)*sin(thickness*18.0)*0.14;
  return c;
}
void main() {
  vec2 uv=(gl_FragCoord.xy-0.5*resolution)/min(resolution.x,resolution.y);
  vec3 origin=vec3(0.0,0.0,4.7);
  vec3 direction=normalize(vec3(uv*3.25,-4.0));
  float distance=trace(origin,direction);
  vec3 p=origin+direction*distance;
  if(distance>8.0 || surface(p)>0.006) {
    // Ground contact is a restrained optical shadow, otherwise canvas is clear.
    float shadow=exp(-pow(uv.x/0.40,2.0)-pow((uv.y+0.42)/0.045,2.0))*0.12;
    gl_FragColor=vec4(vec3(0.31,0.39,0.53),shadow);
    return;
  }
  vec3 n=normalAt(p);
  vec3 color=glass(p,direction,n);
  color=clamp(color,0.0,1.0);
  gl_FragColor=vec4(color,1.0);
}
`;

export default function LiquidArtwork({
  paused = false,
}: {
  paused?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pausedRef = useRef(paused);
  const pauseHandlerRef = useRef<(() => void) | null>(null);
  pausedRef.current = paused;
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "low-power",
      premultipliedAlpha: false,
    });
    if (!gl) return;
    const shaders: WebGLShader[] = [];
    let program: WebGLProgram | null = null;
    let buffer: WebGLBuffer | null = null;
    let frame = 0;
    let stopped = false;
    let visible = true;
    let previous = 0;
    let elapsed = 0;
    let width = 0;
    let height = 0;
    let resizePending = false;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");

    function compile(type: number, source: string) {
      const shader = gl!.createShader(type);
      if (!shader) throw new Error("Shader allocation failed");
      shaders.push(shader);
      gl!.shaderSource(shader, source);
      gl!.compileShader(shader);
      if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS))
        throw new Error("Artwork shader unavailable");
      return shader;
    }
    try {
      const vertex = compile(gl.VERTEX_SHADER, vertexSource);
      const fragment = compile(gl.FRAGMENT_SHADER, fragmentSource);
      program = gl.createProgram();
      if (!program) throw new Error("Program allocation failed");
      gl.attachShader(program, vertex);
      gl.attachShader(program, fragment);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS))
        throw new Error("Artwork linking unavailable");
      gl.useProgram(program);
      buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
        gl.STATIC_DRAW,
      );
      const position = gl.getAttribLocation(program, "position");
      gl.enableVertexAttribArray(position);
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    } catch {
      for (const shader of shaders) gl.deleteShader(shader);
      if (program) gl.deleteProgram(program);
      if (buffer) gl.deleteBuffer(buffer);
      return;
    }
    const resolution = gl.getUniformLocation(program, "resolution");
    const pointer = gl.getUniformLocation(program, "pointer");
    const time = gl.getUniformLocation(program, "time");

    function draw(now: number) {
      frame = 0;
      if (stopped || pausedRef.current || !visible || document.hidden) return;
      // Thirty frames per second is ample for this slow sculpture.
      if (!motion.matches && previous && now - previous < 32) {
        frame = requestAnimationFrame(draw);
        return;
      }
      const delta = previous ? Math.min((now - previous) / 1000, 0.1) : 0;
      previous = now;
      if (!motion.matches) elapsed += delta;
      currentX += (targetX - currentX) * 0.045;
      currentY += (targetY - currentY) * 0.045;
      gl!.viewport(0, 0, width, height);
      gl!.uniform2f(resolution, width, height);
      gl!.uniform2f(
        pointer,
        motion.matches ? 0 : currentX,
        motion.matches ? 0 : currentY,
      );
      gl!.uniform1f(time, motion.matches ? 0 : elapsed);
      gl!.drawArrays(gl!.TRIANGLES, 0, 6);
      setReady(true);
      if (!motion.matches) frame = requestAnimationFrame(draw);
    }
    function schedule() {
      if (
        !frame &&
        !stopped &&
        !pausedRef.current &&
        visible &&
        !document.hidden
      )
        frame = requestAnimationFrame(draw);
    }
    function resize() {
      // Resizing the drawing buffer clears it. Keep the last frame intact
      // behind a modal and apply its latest dimensions when the modal closes.
      if (pausedRef.current) {
        resizePending = true;
        return;
      }
      resizePending = false;
      const rect = canvas!.getBoundingClientRect();
      const scale = Math.min(
        window.devicePixelRatio || 1,
        1.5,
        900 / Math.max(rect.width, 1),
        700 / Math.max(rect.height, 1),
      );
      width = Math.max(1, Math.round(rect.width * scale));
      height = Math.max(1, Math.round(rect.height * scale));
      canvas!.width = width;
      canvas!.height = height;
      schedule();
    }
    function onPointer(event: PointerEvent) {
      if (motion.matches || pausedRef.current) return;
      targetX = (event.clientX / window.innerWidth - 0.5) * 2;
      targetY = (event.clientY / window.innerHeight - 0.5) * 2;
    }
    function onVisibility() {
      previous = 0;
      if (document.hidden) cancelAnimationFrame(frame);
      frame = 0;
      schedule();
    }
    function onMotion() {
      cancelAnimationFrame(frame);
      frame = 0;
      previous = 0;
      schedule();
    }
    function onPauseChange() {
      cancelAnimationFrame(frame);
      frame = 0;
      previous = 0;
      if (!pausedRef.current) {
        if (resizePending) resize();
        else schedule();
      }
    }
    pauseHandlerRef.current = onPauseChange;
    function onContextLost(event: Event) {
      event.preventDefault();
      stopped = true;
      cancelAnimationFrame(frame);
      setReady(false);
    }
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        previous = 0;
        if (!visible) {
          cancelAnimationFrame(frame);
          frame = 0;
        } else schedule();
      },
      { rootMargin: "80px" },
    );
    intersectionObserver.observe(canvas);
    window.addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    motion.addEventListener("change", onMotion);
    canvas.addEventListener("webglcontextlost", onContextLost);
    resize();
    return () => {
      stopped = true;
      pauseHandlerRef.current = null;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);
      motion.removeEventListener("change", onMotion);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      if (buffer) gl.deleteBuffer(buffer);
      if (program) gl.deleteProgram(program);
      for (const shader of shaders) gl.deleteShader(shader);
    };
  }, []);

  useEffect(() => {
    pauseHandlerRef.current?.();
  }, [paused]);

  return (
    <div
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
    >
      {!ready && (
        <div
          style={{
            position: "absolute",
            inset: "14% 20%",
            border: "clamp(35px, 7vw, 90px) solid #d1dcee",
            borderRadius: "46% 54% 48% 52%",
            transform: "rotate(-24deg) rotateX(22deg)",
            boxShadow:
              "inset 12px 18px 25px #ffffffc9, inset -16px -14px 24px #8599be5c, 15px 32px 55px #8b9dbc24",
            background: "transparent",
          }}
        />
      )}
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          opacity: ready ? 1 : 0,
        }}
      />
    </div>
  );
}
