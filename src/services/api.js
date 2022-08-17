import axios from "axios";

export const api = axios.create({
    baseURL: "https://pwn-lfos-3.herokuapp.com",
});

export const createSession = async (login, senha) =>{
    return api.post("/seguranca/login", {login, senha});
}