#version 300 es

precision mediump float;

in vec3 sampleDir;
 
out vec4 outCubeMapColor;

uniform samplerCube cubeMapTex;
uniform mat4 inverseViewProjMatrix;
 
void main() {
    vec4 p = inverseViewProjMatrix * vec4(sampleDir, 1.0);
    vec4 rgba = texture(cubeMapTex, normalize(p.xyz / p.w));
    outCubeMapColor = vec4(rgba.rgb, 1.0);
}