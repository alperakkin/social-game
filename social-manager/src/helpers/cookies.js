class CookieHelper {
    getCookie(key)
    {
       
        try {
          let val = document.cookie
          .split('; ')
          .find(row => row.startsWith(`${key}=`))
          .split('=')[1];
        return val;
        }
        catch (err) {
          return "null";
        }
    
    
    };
    
     setCookie(key, val)
    {
        document.cookie = `${key}=${val}; SameSite=None; Secure`;
    }
    
}


export const {setCookie, getCookie} = new CookieHelper();
