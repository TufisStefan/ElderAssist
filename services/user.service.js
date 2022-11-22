import { USERURL } from "../constants";
import axiosService from "./axios.service";


const getPublicContent = () => {
    return axiosService.get(USERURL + "all");
}

const getUserBoard = () => {
    return axiosService.get(USERURL + "user");
}


const getModeratorBoard = () => {
    return axiosService.get(USERURL + "mod");
}


const getAdminBoard = (page, rowsPerPage) => {
    return axiosService.get(USERURL + "admin", { params: { pageNumber: page, pageSize: rowsPerPage } }).then((response) => {
        return response;
    });
}

const deleteUser = (username) => {
    return axiosService.delete(USERURL + "admin", { params: { username: username } });
}

const updateUser = (id, user) => {
    return axiosService.post(USERURL + "admin", user, { params: { id: id } });
}

const UserService = {
    getPublicContent,
    getUserBoard,
    getModeratorBoard,
    getAdminBoard,
    deleteUser,
    updateUser
};

export default UserService;