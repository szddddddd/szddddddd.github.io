/**
 * Uniform contract supplied by the RSUI shader pipeline. Individual passes
 * append only their pass-specific samplers after this shared declaration.
 */
export const globalUniformsGLSL = /* glsl */ `
precision highp float;

uniform float time;
uniform vec2 resolution;
uniform vec2 mouse;
uniform float scroll;
uniform float theme;
uniform float page;
uniform float velocity;
uniform float transitionProgress;
`;
