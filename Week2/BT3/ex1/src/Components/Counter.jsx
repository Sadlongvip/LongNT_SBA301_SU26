// Component counter để đếm sô lần nhấn nút,
// Tăng, giảm, reset ko cho phép nhấn xuống 0
// Dùng React-bootstrap để tạo giao diện đẹp hơn
import { useState } from 'react'
import { Button } from 'react-bootstrap'
import './CounterCSS.css'

function Counter() {
  const [count, setCount] = useState(0)

  const increment = () => {
    setCount(count + 1)
  }

  const decrement = () => {
    if (count > 0) {
      setCount(count - 1)
    }
  }

  const reset = () => {
    setCount(0)
  }

  return (
    <div className="counter">
    <h2>Count: {count}</h2>
      <Button variant="primary" onClick={increment}>
        Increment
      </Button>
      <Button variant="secondary" onClick={decrement} disabled={count === 0}>
        Decrement
      </Button>
      <Button variant="danger" onClick={reset} disabled={count === 0}>
        Reset
      </Button>
    </div>
  )
}

export default Counter