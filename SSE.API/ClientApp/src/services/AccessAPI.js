//import SessionManager from "../Auth/SessionManager";
import { BASE_URL } from "./Settings";


export async function getData(endPoint) {

    const token = null;

    const payload = {
        method: 'GET',
        mode: 'cors',
        headers: {
            "access-control-allow-origin": "*",
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': 'Bearer ' + token
        }
    }
    const response = await fetch(BASE_URL + endPoint, payload)

    return response.json()
}

export async function postDataForLogin(type, userData) {
    const payload = {
        method: 'POST',
        mode: 'cors',
        headers: {
            "access-control-allow-origin": "*",
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        body: JSON.stringify(userData)

    }
    const response = await fetch(BASE_URL + type, payload)
    return response.json()
}

export async function postData(endPoint, inputObj) {
    const token = null;
    const payload = {
        method: 'POST',
        mode: 'cors',
        headers: {
            "access-control-allow-origin": "*",
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        redirect: 'follow',
        body: JSON.stringify(inputObj)

    }

    const response = await fetch(BASE_URL + endPoint, payload)
    return response.json()
}

export async function deleteData(endPoint, data = {}) {
    const token = null;
    const payload = {
        method: 'DELETE',
        mode: 'cors',
        headers: {
            "access-control-allow-origin": "*",
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        redirect: 'follow',
        body: JSON.stringify(data)
    }

    const response = await fetch(BASE_URL + endPoint, payload)
    return response.json()
}

export async function putData(endPoint, obj) {
    const token = null;
    const payload = {
        method: 'PUT',
        mode: 'cors',
        headers: {
            "access-control-allow-origin": "*",
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        redirect: 'follow',
        body: JSON.stringify(obj)

    }

    const response = await fetch(BASE_URL + endPoint, payload)
    return response.json()
}