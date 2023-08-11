
vec3 coords=normal;
coords.y+=uTime/3.;
vec3 noisePattern=vec3(noise(coords));
float pattern=wave(noisePattern);

// varyings
vDisplacement=pattern;
float displacement=vDisplacement/3.;
// vTime = uTime;
// MVP

// vec3 newPosition=position+normal*displacement;
// vec4 modelViewPosition=modelMatrix*viewMatrix*vec4(newPosition,1.);
// gl_Position=projectionMatrix*modelViewPosition;
// vUv=uv;
// vNormal=normal;
