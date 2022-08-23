import { getGithubData } from "./lib/getGithubData.js";
import { Math, PI } from "./lib/Math.js";
import { user } from "./lib/User.js";

// Nullish Coalescing Operator
const idade = null;
console.log(`Sua idade é: ${idade ?? 'Idade não informada'}`)

// Objects
console.log(user)

// Desestruturação
// const address = user.address
const { address, idade: age, nickname = nickname ?? user.name } = user

// { idade } = user.idade
const showAge = ({ idade }) => {
  return idade
}
console.log({ address, age, nickname })
console.log(showAge(user))

// Rest operator
const { name, idade: i, ...rest } = user
const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const [first, , third, ...restArray] = array

console.log(rest)
console.log({ first, third, restArray })

// Short Syntax
const namePerson = 'Lucas'
const idadePerson = 28

const person = {
  namePerson,
  idadePerson
}

console.log(person)

// Optional Chaining
/*
  o console log abaixo faz a mesma coisa que este código 

  user.address
    ? user.address.zip
      ? user.address.zip.code
      : 'Não informado'
    : 'Não informado'
*/

console.log(user.address?.zip?.code ?? 'Não informado')
console.log(user.address?.showAddress?.())

// Métodos de array
/*
for (const i of array) {
  console.log(i)
}

// forEach apenas percorre o array, igual ao for
array.forEach(item => {
  console.log(item)
})
*/

// map cria um novo array, podendo manipular suas chaves
const newArray = array.map(item => {
  if (item % 2 === 0) {
    return item * 10
  }
  return item
})
console.log({ array, newArray })

const filterArray = array
  .filter(item => item % 2 === 0)
  .map(item => item * 10)
console.log(filterArray)

const allItemsNumbers = array.every(item => typeof item === 'number')
const oneItemIsNotNumber = array.some(item => typeof item !== 'number')
const pair = array.find(item => item % 2 === 0)
const pairIndex = array.findIndex(item => item % 2 === 0)
const sumAllNumberOfArray = array.reduce((acc, item) => {
  return acc + item
}, 0)
console.log({ allItemsNumbers, oneItemIsNotNumber, pair, pairIndex, sumAllNumberOfArray })

// Template Literals
const message = `Bem vindo ${user.name ?? 'Visitante'}`
console.log(message)
console.log(user.address.showAddress())

// Promises
fetch('https://api.github.com/users/cortelucas')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.log(err))
  .finally(() => console.log('deu certo o fetch'))

const cortelucasData = await getGithubData('https://api.github.com/users/cortelucas')

console.log(cortelucasData)

// Import Export
console.log({
  sum: Math.add(1, 2),
  sub: Math.sub(1, 2),
  div: Math.div(1, 2),
  divPerZero: Math.div(1, 0),
  mult: Math.mult(1, 2),
  PI: PI
})
