import { Button, Container, TextInput, Text, Card } from '@mantine/core'
import { useAppStore } from '../store/app.store'
import { useNavigate } from 'react-router-dom'
import { validateLogin } from '../helpers/validation'
import { useState } from 'react'

const Login: React.FC = () => {
  const login = useAppStore(state => state.login)
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = () => {
    const validationError = validateLogin(username, password)
    if (validationError) {
      setError(validationError)
      return
    }
    setError('')
    login()
    navigate('/launches')
  }

  return (
    <Container size="xs" className='content'>
      <Card className='loginForm'>
        <TextInput
          label="Username"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.currentTarget.value)}
          required
        />
        <TextInput
          label="Password"
          placeholder="Enter password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          required
          mt="sm"
        />
        {error && <Text color="red" mt="sm">{error}</Text>}
        <Button onClick={handleLogin} mt="md" fullWidth>Login</Button>
      </Card>
    </Container>
  )
}

export default Login
