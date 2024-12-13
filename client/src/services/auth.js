import Util from "./../utilities";

const USER_API_BASE_URL = 'https://mylogin.onrender.com/';
// const USER_API_BASE_URL = 'http://mykuproject.herokuapp.com/';
// const USER_API_BASE_URL = 'http://localhost:8080/';


class AuthService {

    getURL = () => USER_API_BASE_URL;

    /* GET HEADER */
    getAuthHeader() {
        return (localStorage.getItem("token") === null) ? null : {headers: {Authorization: 'Bearer ' + JSON.parse(localStorage.getItem("token")) }};
    }

    /* SET TOKEN AFTER LOGIN */
    setToken(token) {
        localStorage.setItem("token", JSON.stringify(token));
        localStorage.setItem("last", new Date());
    }

    /* CHECK TOKEN IN DASH BOARD PAGE */
    checkToken() {
      let encodedProfile = localStorage.getItem("token")?.split('.')[1];
      if (encodedProfile) {
        let profile = JSON.parse(Util.url_base64_decode(encodedProfile));
        profile['last'] = localStorage.getItem("last");
        return (Date.now() > (parseInt(profile?.exp)*1000) ? null : profile);
      } else {
        console.warn(" ====== Check Session Fail or Time out ====== ");
        this.logout();
        return null;
      }
    }

    /* LOGOUT */
    logout() {
        localStorage.removeItem("token");
    }
}

export default new AuthService();
