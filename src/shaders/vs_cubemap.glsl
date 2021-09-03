#version 300 es

in vec3 cubeMapPos;
     
out vec3 sampleDir;
     
void main() {
  gl_Position = vec4(cubeMapPos, 1.0);
  sampleDir = cubeMapPos;
}