export function getAircrafts() {
    return { type: "GET_AIRCRAFTS"}
};

export function getFlights(payload) {
    return { type: "GET_FLIGHTS", payload}
};

export function getAircraftsSuccess(payload) {
    return { type: "GET_AIRCRAFTS_SUCCESS", payload }
};

export function getFlightsSuccess(payload) {
    return { type: "GET_FLIGHTS_SUCCESS", payload }
};

export function selectAircraft(payload) {
    return { type: "SELECT_AIRCRAFT", payload }
};

export function getPrevious(payload) {
    return { type: "GET_PREVIOUS", payload }
};

export function getNext(payload) {
    return { type: "GET_NEXT", payload }
};

export function addToRotation(payload) {
    return { type: "ADD_TO_ROTATION", payload }
};

export function removeFromRotation(payload) {
    return { type: "REMOVE_FROM_ROTATION", payload }
};

export function sortRotation(payload) {
    return { type: "SORT_ROTATION", payload }
};