export const user = {
  name: 'Lucas',
  nickname: null,
  idade: 28,
  address: {
    street: 'Rua dos Bobos',
    number: 0,
    zip: {
      code: '17890000',
      city: 'Junqueirópolis'
    },
    showAddress() {
      return `${this.street}, ${this.number} - ${this.zip.city} - ${this.zip.code}`
    }
  },
}