
import type { CreateNewUser } from "../types";
function validate(userData:CreateNewUser){
    const response = {
        name: "",
        username: "",
        email: "",
        phone: "",
        company: "",
        street: "",
        error: false
    }


    if(!userData.name){
        response.error = true
        response.name = "Name cannot be empty"
    }

    if(!userData.username){
        response.error = true
        response.username = "Username cannot be empty"
    }

    if(!userData.email){
        response.error = true
        response.email = "Email cannot be empty"
    }

    if(!userData.phone){
        response.error = true
        response.phone = "Phone cannot be empty"
    }

    if(!userData.company){
        response.error = true
        response.company = "company cannot be empty"
    }

    if(!userData.street){
        response.error = true
        response.street = "Street cannot be empty"
    }

    return response
}

export default validate