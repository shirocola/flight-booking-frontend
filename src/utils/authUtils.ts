export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    if (!token) return false;
  
    // Decode the JWT token to get its expiration date
    const { exp } = JSON.parse(atob(token.split('.')[1]));
  
    // Check if the token has expired
    if (Date.now() >= exp * 1000) {
      localStorage.removeItem('token');
      return false;
    }
  
    return true;
  };