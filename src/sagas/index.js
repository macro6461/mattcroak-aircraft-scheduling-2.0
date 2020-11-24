import { put, takeLatest, all } from "redux-saga/effects";

const watchers = [
    takeLatest("GET_AIRCRAFTS", getAircrafts),
    takeLatest("GET_FLIGHTS", getFlights)
];

function* getAircrafts(action) {

    const returnObject = yield fetch('https://infinite-dawn-93085.herokuapp.com/aircrafts')
    .then(res=>res.json())

    yield put({type: "GET_AIRCRAFTS_SUCCESS", payload: returnObject});

};

function* getFlights(action) {

    const {limit, offset} = action.payload

    var url = 'https://infinite-dawn-93085.herokuapp.com/flights'

    if (offset && limit){
        url += '?offset=' + offset + '&limit=' + limit
    }

    const returnObject = yield fetch(url)
    .then(res=>res.json())

    yield put({type: "GET_FLIGHTS_SUCCESS", payload: returnObject});

};

export default function*() {
    yield all(watchers);
}