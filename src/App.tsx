import React, { useState } from 'react'

const generateRandomNumber = (): number => Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000

const findPrimes = (value: number | undefined): number[] | null => {
  if (value === undefined) return null
  if (value <= 1) {
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


const App = () => {
  const [inputValue, setInputValue] = useState<number | undefined>(99999)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      try {
          setInputValue(e.target.valueAsNumber)
      } catch (e) {
          console.log(e)
      }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handlePrimeOperatorButton()
    }
  }

  const handlePrimeOperatorButton = () => {
      try {
          const primeNumbers = findPrimes(inputValue)
          console.log(primeNumbers)
      } catch (e) {
          console.log(e)
      }
  }

  const handleCreateButton = () => {
    const generatedValue = generateRandomNumber()
    setInputValue(generatedValue)
  }

  const handleClearButton = () => {
    setInputValue(0)
  }

  return (
    <div>
      <input
        type="number"
        placeholder="Enter a 5-digit number or click Generate"
        defaultValue={inputValue}
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      <button onClick={handleCreateButton}>Generate Random Number</button>
      <button onClick={handlePrimeOperatorButton}>Find all Primes</button>
      <button onClick={handleClearButton}>Clear</button>
    </div>
  )
}

export default App
