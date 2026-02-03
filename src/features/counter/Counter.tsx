import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { increment, decrement, incrementByAmount, reset } from './counterSlice'
import { Button } from '../../shared/components/Button'

export const Counter = () => {
  const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h2>Counter: {count}</h2>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}>
        <Button onClick={() => dispatch(decrement())}>-</Button>
        <Button onClick={() => dispatch(reset())} variant="secondary">
          Reset
        </Button>
        <Button onClick={() => dispatch(increment())}>+</Button>
        <Button onClick={() => dispatch(incrementByAmount(5))} variant="secondary">
          +5
        </Button>
      </div>
    </div>
  )
}

