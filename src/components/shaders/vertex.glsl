export default /* glsl */`
uniform mat4 projectionMatrix;
        uniform mat4 viewMatrix;
        uniform mat4 modelMatrix;
        #define PI 3.1415926535897932384626433832795


        attribute vec3 position;
        varying vec3 vPosition;
        attribute vec3 normal;
        varying vec3 vNormal;
        uniform float uTime;
        attribute vec2 uv;
        varying vec2 vUv;
        varying float vDisplacement;
void main(){
  gl_Position = projectionMatrix * modelMatrix * viewMatrix * vec4( position, 1.0 );
} 
`;