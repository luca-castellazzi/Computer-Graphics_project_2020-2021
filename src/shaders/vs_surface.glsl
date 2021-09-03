#version 300 es

in vec3 surfacePos;
in vec3 surfaceNorm;
in vec2 surfaceUV;

out vec2 FSuv;
out vec3 FSPos;
out vec3 FSNorm;

uniform mat4 surfaceProjMatrix; 
uniform mat4 surfaceNormMatrix;
// uniform mat4 surfaceTexTransformation;
uniform mat4 surfaceWorldMatrix;

void main() {
    // vec4 newTexCoordinates = surfaceTexTransformation * vec4(surfaceUV.x, 1.0 - surfaceUV.y, 0.0, 1.0);
    // FSuv = vec2(newTexCoordinates);
    FSuv = surfaceUV;
    FSPos = (surfaceWorldMatrix * vec4(surfacePos , 1.0)).xyz;
    FSNorm = mat3(surfaceNormMatrix) * surfaceNorm;
    gl_Position = surfaceProjMatrix * vec4(surfacePos, 1.0);
}