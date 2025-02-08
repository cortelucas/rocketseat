import { Readable, Transform, Writable } from "node:stream"
// Tudo o que esta entrando esta sendo encaminhando para a saída.
// process.stdin.pipe(process.stdout);

export class OneToHundredStream extends Readable {
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

export class InverseNumberStream extends Transform {
  _transform(chunk: any, encoding: BufferEncoding, callback): void {
    const transformed = Number(chunk.toString()) * -1
    callback(null, Buffer.from(String(`${transformed}\t`)))
  }
}

class MultiplyByTenStream extends Writable {
  _write(chunk: any, encoding: BufferEncoding, callback: (error?: Error | null) => void): void {
    console.log(Number(chunk.toString()) * 10)
    callback()
  }
}

new OneToHundredStream()
  .pipe(new InverseNumberStream())
  .pipe(new MultiplyByTenStream())
