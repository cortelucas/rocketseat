import { Readable } from 'node:stream'

class OneToHundredStream extends Readable {
  index = 1

  _read () {
    const i = this.index++

    setTimeout(() => {
      if (i > 10) {
        this.push(null)
      } else {
        const buffer = Buffer.from(String(i))
        this.push(buffer)
      }
    }, 1000)
  }
}

const request = new Request('http://localhost:3334/', {
  method: 'POST',
  duplex: 'half',
  body: new OneToHundredStream()
})

await fetch(request)
  .then(response => response.text())
  .then(data => console.log(data))
