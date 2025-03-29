export const getGreetingMessage = () => {
    let date = new Date();
    const hours = date.getHours();
    if(hours <= 12){
        return "Good Morning!"
    }else if(hours <= 17){
        return "Good Afternoon!";
    }else if(hours <=20){
        return "Good Evening!";
    }else{
        return "Good Night!";
    }
}


export function setCookie(cname:string, cvalue:string, exdays:number) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays  *24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  
export function getCookie(cname:string) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  
export function checkCookie() {
    let user: string | null = getCookie("username");
    if (user != "") {
      alert("Welcome again " + user);
    } else {
      user = prompt("Please enter your name:", "");
      if (user != "" && user != null) {
        setCookie("username", user, 365);
      }
    }
  }

  export function setLocalStroage(name:string, value: string){
    localStorage.setItem(name,value)
  }

  export function getLocalStroage(name:string){
    localStorage.getItem(name)
  }

  export function removeLocalStroage(name:string){
    localStorage.removeItem(name)
  }

  export function flushtLocalStroage(){
    localStorage.clear()
  }