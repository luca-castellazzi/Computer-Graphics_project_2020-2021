#version 300 es

in vec3 xwingPos;
in vec3 xwingNorm;
in vec2 xwingUV;

out vec2 FSuv;
out vec3 FSPos;
out vec3 FSNorm;

uniform mat4 xwingProjMatrix; 
uniform mat4 xwingNormMatrix;
uniform mat4 xwingWorldMatrix;

void main() {
    FSuv = xwingUV;
    FSPos = (xwingWorldMatrix * vec4(xwingPos , 1.0)).xyz;
    FSNorm = mat3(xwingNormMatrix) * xwingNorm;
    gl_Position = xwingProjMatrix * vec4(xwingPos, 1.0);
}
