export const login = async (email, password) => {
    // Simulate API call with validation
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email && password) {
          resolve({
            success: true,
            user: {
              email,
              name: "User Name",
            },
          })
        } else {
          resolve({
            success: false,
            error: "Email and password are required"
          })
        }
      }, 500)
    })
  }
  
  export const signup = async (email) => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          user: {
            email,
            name: "",
          },
        })
      }, 500)
    })
  }
  
  export const loginWithGoogle = async () => {
    // Simulate Google OAuth with potential failure
    return new Promise((resolve) => {
      setTimeout(() => {
        // Randomly fail 20% of the time to simulate real-world conditions
        if (Math.random() > 0.2) {
          resolve({
            success: true,
            user: {
              email: "user@gmail.com",
              name: "Google User",
            },
          })
        } else {
          resolve({
            success: false,
            error: "Google login failed. Please try again."
          })
        }
      }, 500)
    })
  }
  
    export const logout = async () => {
        // Simulate logout
        return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
            success: true,
            })
        }, 500)
        })
    }
      