export {};

if (!navigator.gpu) {
  throw new Error("WebGPU not supported on this browser.");
}
const canvas = document.querySelector("canvas");
if (!canvas) {
  throw new Error("Canvas element not found.");
}
const adapter = await navigator.gpu.requestAdapter();
if (!adapter) {
  throw new Error("No appropriate GPUAdapter found.");
}
const device = await adapter.requestDevice();
const context = canvas.getContext("webgpu");
if (!context) {
  throw new Error("WebGPU context not available.");
}
const canvasFormat = navigator.gpu.getPreferredCanvasFormat();
context.configure({
  device: device,
  format: canvasFormat,
});
console.log("WebGPU successfully initialized.");

const encoder = device.createCommandEncoder();
const pass = encoder.beginRenderPass({
  colorAttachments: [{
     view: context.getCurrentTexture().createView(),
     loadOp: "clear",
     clearValue: { r: 0, g: 0, b: 0.4, a: 1 },
     storeOp: "store",
  }]
});
pass.end();
device.queue.submit([encoder.finish()]);