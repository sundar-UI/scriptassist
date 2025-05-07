export const validateLogin = (username: string, password: string) => {
    if (username.trim().length === 0) {
      return 'Username can’t be empty'
    }
  
    if (password.trim().length === 0) {
      return 'Enter your password'
    }
  
    if (username !== 'sundar' || password !== 'sundar@123') {
      return 'Invalid username or password'
    }
  
    return ''
  }
  