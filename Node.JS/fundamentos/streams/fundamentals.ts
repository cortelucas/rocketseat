import { Readable } from "node:stream"
// Tudo o que esta entrando esta sendo encaminhando para a saída.
// process.stdin.pipe(process.stdout);

class OneToHundredStream extends Readable {
  index: number = 1
  _read(): void {
    const i = this.index++

    setTimeout(() => {
      if (i > 100) {
        this.push(null)
      } else {
        const buffer = Buffer.from(String(`${i}\t`))
        this.push(buffer)
      }
    }, 1000)
  }
}

new OneToHundredStream()
  .pipe(process.stdout)
