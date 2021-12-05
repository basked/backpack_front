import axios from "axios"
const baseURL = "http://localhost/";

export default axios.create({
    baseURL: baseURL
    // You can add your headers here
})
