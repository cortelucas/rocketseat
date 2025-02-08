import { OneToHundredStream } from "./fundamentals.ts";

const stream = new OneToHundredStream();
const readableStream = new ReadableStream({
  async pull(controller) {
    for await (const chunk of stream) {
      controller.enqueue(chunk);
    }
    controller.close();
  }
})

fetch("http://localhost:3334", {
  method: "POST",
  body: readableStream,
}).then(response => response.text())
  .then(data => console.log(data))
