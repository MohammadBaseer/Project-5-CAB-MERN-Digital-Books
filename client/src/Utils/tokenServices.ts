const getToken = () => {
    const token = localStorage.getItem("token") 
    if (token) {
        return token
    }
    if (!token) {

        console.log("No Token")
        return null
    }
}



const isToken = () => {
 const token = localStorage.getItem("token") 
if (token) {
    return true
} else {
    return false
}

}

const removeToken = () => {
    localStorage.removeItem("token");
}

export {getToken, isToken, removeToken};