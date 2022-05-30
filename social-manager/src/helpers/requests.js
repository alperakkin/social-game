import axios from "axios";
import { getCookie, setCookie } from "../helpers/cookies"

class RequestHelper {
    loginRequest(username, password) {
        let basicAuth = "Basic " +  window.btoa(unescape(encodeURIComponent(username + ":" + password)));
        return axios
            .post(
                "http://localhost:5000/api/login/",
                {},
                {
                    headers: {
                        Authorization: basicAuth,
                    },
                }
            )
            .then((resp) => {
                console.log(resp);
                setCookie("authToken", "Bearer " + resp.data.msg["token"]);
                setCookie("username", username);
                window.location = "/";
                return {status: true, data: resp.data}
            })
            .catch((err) => {
            
                setCookie("authToken", null);
                setCookie("username", null);
                console.log(err);
                return {status: false, data: err.response.data};
            });
    };
    logOutProcess() {

            setCookie("username", null);
            setCookie("authToken", null)
            window.location = "/";
 
    }
    

    validateAuth(apiUrl) {
        console.log(`http://localhost:5000/api${apiUrl}`)
        return axios
        .get(`http://localhost:5000/api${apiUrl}`, {
          headers: {
            Authorization: getCookie("authToken"),
          },
        })
        .then((resp) => {
            return { state: true,data: resp.data };
        })
        .catch((err) => {
            window.location = "/login";
            return { state: false,data: err.response.data["msg"]};
        });
  }
}


export const {loginRequest, logOutProcess, validateAuth} = new RequestHelper();
