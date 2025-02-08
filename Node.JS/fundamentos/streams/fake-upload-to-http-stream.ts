import { OneToHundredStream } from "./fundamentals.ts";

fetch("http://localhost:3334", {
  method: "POST",
  body: new OneToHundredStream(),
})
