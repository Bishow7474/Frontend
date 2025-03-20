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