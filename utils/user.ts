import axios from "axios";
import { IAuthenticationData } from "./interfaces";

const getCookie = (name): string => {
    var cookieArr = document.cookie.split(";");

    // Loop through the array elements
    for (var i = 0; i < cookieArr.length; i++) {
        var cookiePair = cookieArr[i].split("=");
        if (name == cookiePair[0].trim()) {
            // Decode the cookie value and return
            return decodeURIComponent(cookiePair[1]);
        }
    }
}

export const getUserName = (): string => {
    return getCookie("TBNName");
}

export const authenticateUser = async (authData: IAuthenticationData, register: boolean) => {
    const authResult = await axios({
        method: "POST",
        url: "/api/user",
        data: {
            ...authData,
            register: register
        }
    })
        .then(result => {
            // Save Login
            document.cookie = `TBNToken=${result.data.token};path=/`;
            document.cookie = `TBNUsername=${result.data.user.username};path=/`;

            // Notify
        })
        .catch(err => console.log(err))
    return authResult
}

export const logoutUser = () => {
    localStorage.clear();
    let tokenCookie = getCookie("TBNToken");
    let nameCookie = getCookie("TBNToken");
    document.cookie = `TBNToken=${tokenCookie}; expires= Thu, 21 Aug 2014 20:00:00 UTC; path=/`
    document.cookie = `TBNName=${nameCookie}; expires= Thu, 21 Aug 2014 20:00:00 UTC; path=/`
}

export const checkLoggedIn = (): boolean => {
    const loggedIn = getCookie("TBNToken");
    if (!loggedIn) {
        return false
    }
    return true
}
