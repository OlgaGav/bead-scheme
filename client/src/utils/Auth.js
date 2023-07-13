const Auth = {
  loggedIn() {
    const token = this.getToken();
    // If there is a token and it's not expired, return `true`
    return token && !this.isTokenExpired(token);
  },
  getProfile() {
    try {
      return decode(this.getToken());
    } catch (e) {
      return {};
    }
  },
  isTokenExpired(token) {
    const decoded = decode(token);
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem('id_token');
      return true;
    }
    return false;
  },
  getToken() {
    return localStorage.getItem('id_token');
  },
  login(idToken) {
    localStorage.setItem('id_token', idToken);
  },
  logout() {
    localStorage.removeItem('id_token');
  },
};

export default Auth;
