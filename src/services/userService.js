export const saveUserData = async (userData) => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Saving user data:", userData)
        resolve({
          success: true,
          data: userData,
        })
      }, 500)
    })
  }
  
  export const getUserData = async (userId) => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            name: "Sample User",
            education: "SMA",
          },
        })
      }, 500)
    })
  }