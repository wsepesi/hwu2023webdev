// 1. HELLO WORLD
// running the file executes the global scope, as expected. no need for a fancy main method like java

console.log('hello world')

/* <-- Add an extra slash to the head of the line to uncomment the next section!
// 2. VARIABLES AND TYPES
console.log("\nSECTION 2\n")
// we have three ways to define a variable
let a = 1 // defines a variable in the local scope
var b = 2 // defines a variable in the global scope
const c = 3 // defines a constant, ie a variable that cannot be reassigned

// reassignment
console.log(a) // prints 1
a = 4
console.log(a) // prints 4
// c = 5 // throws an error if you uncomment this line

// we can also define types
const myNum: number = 4 // defines a constant of type number
const myString: string = 'hello' // defines a constant of type string
const myBool: boolean = true // defines a constant of type boolean

// note the compiler throws errors if you try to assign a variable of the wrong type
// const notANum: number = 'hello' // throws an error if you uncomment this line

// more on numbers
const myFloat: number = 4.5 // we can also define floats
const added = myNum + myFloat // we can add numbers. note that the type of added is inferred to be number. no need to define it explicitly
console.log(added) // prints 8.5
console.log(added / 2) // two notes here: division is float division, and we can pass expressions to console.log

// more on strings
const myString2: string = 'world'
console.log(myString + ' ' + myString2) // we can concatenate strings
console.log(`${myString} ${myString2}`) // we can also use template strings

// extra types
const myUndefined: undefined = undefined // we can define undefined
const myNull: null = null // we can define null
const whoKnows: any = 4 // we can define any, which is a variable that can be reassigned to any type. bit of a hack here!

// arrays
const myArray: number[] = [1, 2, 3] // we can define an array of type T, no need to specify length!
console.log(myArray)
console.log(myArray[0]) // we can access elements of the array
myArray.push(4) // we can push to the array -- note const only prevents reassignment of the variable, not the elements
myArray[0] = 5 // we can reassign elements
console.log(myArray)

// tuples
const myTuple: [number, string] = [1, 'hello'] // we can define a tuple of type T, where T is a fixed length array of types
console.log(myTuple)

// JSON / Maps / Objects
const myJSON: { [key: string]: number } = { // we can define a JSON object with a string key and number value
  'hello': 1,
  'world': 2
}
console.log(myJSON)
console.log(myJSON['hello']) // we can access elements of the JSON object
myJSON['hello'] = 3 // we can reassign elements
console.log(myJSON)

const nestedJSON: { [key: string]: { [key: string]: number } } = { 
    'hello': {
        'world': 1
    }
}
console.log(nestedJSON.hello.world) // can also access with dot notation

/* <-- Same deal as last time.
// CUSTOM TYPES
console.log("\nSECTION 3\n")
// ok, we can see that typing can get a little complicated if we just use primitives... luckily we can define our own types!
// we'll motivate this with an example of a Package

// unions
// what if we want to define a variable that can be one of several types?
const mixedArray: (number | string)[] = [1, 'hello'] // we can define a union of types T1 | T2 | ... | Tn

type PackageId = number // we can define a type alias, which is just a new name for an existing type
type Provider = "Amazon" | "FedEx" | "UPS" // we can define a type alias for a union of types
type Package = { // we can define a type for a JSON object
  id: PackageId,
  provider: Provider,
  weight: number
}

const pkg: Package = {
    id: 1,
    provider: "Amazon",
    weight: 5
}
console.log(pkg)

// but this wont work
// const pkg2: Package = {
//     id: 2,
//     provider: "USPS", // not an option on Provider
//     weight: 5
// }
// nor this
// const pkg3: Package = {
//     id: 3,
//     provider: "Amazon",
//     size: 5 // not a property of Package
// } 

// we can easily modify our defined types to allow for slight modifications
type NamedPackage = Package & { 
    name: string // new fields
}
type ProviderlessPackage = Omit<Package, 'provider'> // omit fields

// generic types
// we can also define generic types, which are types that take in other types as parameters
type GenericPackage<T> = Package & {
    contents: T
}
const genericPackage: GenericPackage<string> = {
    id: 1,
    provider: "Amazon",
    weight: 5,
    contents: "hello"
}

// keyed types
// we can access the data defined in our types to create new types
type TotalByProvider = {
    [key in Provider]: number
}
const totalByProvider: TotalByProvider = {
    "Amazon": 100,
    "FedEx": 200,
    "UPS": 300
}

// conforming data to types
// when you load in data from an external source, you can use the `as` keyword to cast it to a type
// this typically happens when you're calling an API or a database, and you know what the JSON should look like
const data = {
    id: 1,
    provider: "Amazon",
    weight: 5
}

const pkg4 = data as Package

// the `as` keyword is also overloaded, we can use this to make arrays immutable
const immutableArray = [1, 2, 3] as const
// immutableArray.push(4) // throws an error if you uncomment this line


/*
// 3. FUNCTIONS
// standard Java-like definition:
function add(a: number, b: number): number {
    return a + b
}
// note that we can type everything like normal, and variables are scoped inside the function like you'd expect

// but, we mostly define functions like this:
const add2 = (a: number, b: number): number => {
    return a + b
}
// not much has changed, but we use the `=>` operator to define the function. this will be a common theme

// we can also define functions that take in functions
const callFunc = (
    f: (a: number, b: number) => number
): number => {
    return f(1, 2)
}
console.log(callFunc(add2))

// now that we know how to do functions like this, we can circle back to how we normally do loops
const numbersArray = [1, 2, 3]

// if we want to loop over the array, we can use Array.forEach and use an ARROW FUNCTION
numbersArray.forEach((num: number) => {
    console.log(num)
})

// we can also use this to transform our data with .map()
const arrayPlusOne = numbersArray.map((num: number) => {
    return num + 1
})
console.log(arrayPlusOne)

// a few more examples of this syntax and some other useful functions
// filter:
const filteredArray = numbersArray.filter((num: number) => {
    return num > 1
})
console.log(filteredArray)

// sort:
const unsoredArray = [3, 1, 2]
const sortedArray = unsoredArray.sort((a: number, b: number) => {
    return a - b // define a sorting function, returns negative if a < b, positive if a > b, 0 if a == b
})

// doing this on JSONs:
type Person = {
    name: string,
    age: number
}
const people: Person[] = [
    {
        name: "Alice",
        age: 20
    },
    {
        name: "Bob",
        age: 30
    },
    {
        name: "Charlie",
        age: 40
    }
]

const names = people.map((person: Person) => {
    return person.name
})
console.log(names)
const youngPeople = people.filter((person: Person) => {
    return person.age < 30
})
console.log(youngPeople)

/*
// 4. ASYNC, PROMISES, AND ERROR HANDLING
// async and promises
// this is a bit complicated, but incredibly important for handling client / server interactions and data fetching
const delayedCall = (): Promise<Person> => {
    // randomly wait between 0 and 1 seconds
    const waitTime = Math.random() * 1000

    // don't worry about this syntax too much! just know that we're returning a promise
    // which means that we're returning a value that will be available at some (unknown) point in the future
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                name: "Alice",
                age: 20
            })
        }, waitTime)
    })
}

// if we don't take care to handle this, we can get some weird behavior
console.log("before")
const data2 = delayedCall()
console.log(data2) // this will print a pending promise -- ie we can't access the data (yet)

// so, we can call this function like this:
const delayedPerson = await delayedCall() // we can use the await keyword to wait for the promise to resolve
console.log(delayedPerson)

// if we want to build a function around an await call, we need to mark it as async
const handleData = async (): Promise<string> => { // mark the function as async, and define the return type as a promise
    const data = await delayedCall()
    return data.name
}
console.log(await handleData())

// error handling
// we can also use promises to handle errors
const delayedError = (): Promise<Person> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject("error")
        }, 1000)
    })
}

// we can handle this error like this:
const handleError = async (): Promise<string> => {
    try { // we can use try/catch blocks to handle errors
        const data = await delayedError()
        return data.name
    } catch (e) {
        return "error"
    }
}

console.log(await handleError()) // waits for the response, handles the error, and returns the error string

/*
// 5. MISC
// destructuring
// we can use destructuring to easily access elements of an array or JSON
const myArray2 = [1, 2, 3]
const [first, second, third] = myArray2 // we can define variables for each element of the array

const myPerson: Person = {
    name: "Alice",
    age: 20
}
const { name, age } = myPerson // we can define variables for each element of the JSON. super useful when we get to React!

// similarly, we have the spread operator
const myArray3 = [...myArray2, 4] // we can spread the elements of an array into a new array
console.log(myArray3)
/*
**/ 
export {}