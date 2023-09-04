

const button1 = document.getElementById('button1') as HTMLButtonElement
const button2 = document.getElementById('button2') as HTMLButtonElement
const button3 = document.getElementById('button3') as HTMLButtonElement
const numberInput = document.getElementById('numberInput') as HTMLInputElement
const errorDiv = document.getElementById('error') as HTMLDivElement

const generateRandomNumber = (): number => Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000

const findPrimes = (value: number | undefined): number[] | null => {
  if (value === undefined) return null
  if (value <= 9999) {
    return []
  }

  const isPrime: boolean[] = new Array(value + 1).fill(true)
  isPrime[0] = isPrime[1] = false

  let currentPrime = 2

  while (currentPrime <= Math.sqrt(value)) {
    if (isPrime[currentPrime]) {
      for (let multiple = currentPrime * currentPrime; multiple <= value; multiple += currentPrime) {
        isPrime[multiple] = false
      }
    }

    do {
      currentPrime++
    } while (currentPrime <= Math.sqrt(value) && !isPrime[currentPrime])
  }

  const primes: number[] = []
  for (let i = 2; i <= value; i++) {
    if (isPrime[i]) {
      primes.push(i)
    }
  }

  return primes
}

// -------------------------------------------------

let randomNumber: number | null = null;

numberInput.addEventListener('input', () => {
    const inputValue = numberInput.value.trim()

    if (/^\d+$/.test(inputValue)) {
        errorDiv.textContent = ''
        randomNumber = Number(inputValue)
    } else {
        errorDiv.textContent = 'Please enter a valid number.'
    }
})

button1.addEventListener('click', () => {
    randomNumber = generateRandomNumber()
    numberInput.valueAsNumber = randomNumber
})

button2.addEventListener('click', () => {
    const list_of_primes = findPrimes(randomNumber)
    console.log(list_of_primes)
})

button3.addEventListener('click', () => {
    randomNumber = null
    numberInput.valueAsNumber = randomNumber
})
