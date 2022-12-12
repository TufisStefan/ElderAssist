import { PRESCRIPTIONURL } from "../constants";
import axiosService from "./axios.service";

const getPrescription = (username) => {
    return axiosService.get(PRESCRIPTIONURL + "get", { params: { username: username } });
};

const PrescriptionService = {
    getPrescription
};

export default PrescriptionService;