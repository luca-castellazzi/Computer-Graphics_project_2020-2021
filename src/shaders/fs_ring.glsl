#version 300 es

precision mediump float;

in vec3 FSPos;
in vec3 FSNorm;

out vec4 outColor;

uniform vec3 lightDirection; // directional light direction vec
uniform vec3 lightColor; // directional light color 
uniform vec3 lightPosition; // point/spot light position
uniform vec3 ambientColor;
uniform float specShine;
uniform float betaDecay;
uniform float target;
uniform float coneIn; 
uniform float coneOut; 
uniform int usePhong;
uniform int lightType;

void main() {
    vec3 mDiffColor = vec3(1.0, 0.8, 0.0);
    vec3 nNormal = normalize(FSNorm);

    vec3 direction;
    vec3 color;
    if(lightType != 0){ // if the selected light is not DIRECT
        direction = normalize(lightPosition - FSPos); // direction from the point being lighted to the light source
        float decay = pow(target / length(lightPosition - FSPos), betaDecay);
	    color = lightColor * decay;
        if(lightType == 2) { // if the selected light is SPOT
            float cosAlpha = dot(direction, normalize(-lightDirection));
            float cOut = cos(radians(coneOut / 2.0));
            float cIn = cos(radians(coneIn * coneOut / 2.0));
            float spotLightFactor = clamp((cosAlpha - cOut) / (cIn - cOut), 0.0, 1.0);
            color *= spotLightFactor;
        } 
    } 
    else {
        direction = normalize(-lightDirection);
        color = lightColor;
    }

    vec4 lambertColor = vec4(mDiffColor * color * clamp(dot(direction, nNormal), 0.0, 1.0), 1.0);

    vec3 mSpecColor = vec3(0.99, 0.93, 0.67);
    vec3 eyeDir = normalize(-FSPos);
    
    vec4 reflection;
    if(usePhong == 1) {
        vec3 r = -reflect(direction, nNormal);
        vec4 phongSpec = vec4(mSpecColor * color * pow(clamp(dot(eyeDir, r), 0.0, 1.0), specShine), 1.0);
        reflection = phongSpec;
    }
    else {
        vec3 h = normalize(direction + eyeDir);
        vec4 blinnSpec = vec4(mSpecColor * color * pow(clamp(dot(nNormal, h), 0.0, 1.0), specShine), 1.0);
        reflection = blinnSpec;
    }

    vec4 ambient = vec4(mDiffColor * ambientColor, 1.0);
    
    outColor = clamp((lambertColor + reflection + ambient), 0.0, 1.0);
}
