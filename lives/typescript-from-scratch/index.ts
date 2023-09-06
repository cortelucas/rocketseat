type Address = {
    street: string
    number: number
}

type User = {
    id?: string
    name: string
    age: number
    address?: Address
}

type UserProperties = keyof User

function pickProperty(user: User, property: UserProperties) {
    return user[property]
}

const lucas: User = {
    name: 'Lucas',
    age: 29,
    address: {
        street: 'rua dos bobos',
        number: 0
    }
}

// const videos = {
//     title: 'Usando TS',
//     duration: 180
// }

console.log(pickProperty(lucas, 'age'))

// Utility types

//type Video = keyof typeof video
type PickPropertyReturnType = ReturnType<typeof pickProperty>
type UserWithoutAddress = Omit<User, 'address' | 'name'>
type UserNameAndAge = Pick<User, 'name' | 'age'>
type UserPartial = Partial<User>

// ----------------------------------------------------------- //

type DBConfig = {
    name: string
    url: string
    timeout?: number
}

// forçar tipagem
// const conn1 = { name: 'postgres', url: 'postgres://user:password' } as DBConfig


// const conn2: DBConfig = { name: 'mysql', url: 'mysql://user:password', timeout: 50000 }
//const timeout = conn2.timeout

// const conn3 = { name: 'sqlite', url: 'sqlite://user:password', timeout: 50000 } satisfies DBConfig
//const timeout3 = conn3.timeout

// ----------------------------------------------------------- //

type Video = {
    title: string
    duration: number
}

const video: Video = {
    title: 'ts',
    duration: 200
}
function pickPropertyWithGenerics<ObjectType extends Record<string, unknown>>(object: ObjectType, property: keyof ObjectType) {
    return object[property]
}

console.log(pickPropertyWithGenerics(video, 'duration'))