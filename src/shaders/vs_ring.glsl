#version 300 es

in vec3 ringPos;
in vec3 ringNorm;

out vec3 FSPos;
out vec3 FSNorm;

uniform mat4 ringProjMatrix;
uniform mat4 ringNormMatrix;
uniform mat4 ringWorldMatrix; 

void main() {
    FSPos = (ringWorldMatrix * vec4(ringPos , 1.0)).xyz;
    FSNorm = mat3(ringNormMatrix) * ringNorm;
    gl_Position = ringProjMatrix * vec4(ringPos, 1.0);
}