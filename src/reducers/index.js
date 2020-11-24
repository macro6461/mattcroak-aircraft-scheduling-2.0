import {calcUsability, handleDestinationMatch, genReadableDate} from '../utils.js';
export default function rootReducer(state={
    flights: [],
    aircrafts: [],
    rotations: [],
    inRotation: {},
    rotationMap: {},
    currentDate: null,
    currentDateNotReadable: null,
    selectedAircraft: null,
    offset: 0,
    limit: 25,
    prevOffset: 0,
    isTheEnd: false,
    total:0,
    usability: 0
}, action){

    switch(action.type){
        case "GET_AIRCRAFTS":
             //initialize date with tomorrow's date
             const today = new Date()
             const currentDateNotReadable = new Date(today)
             currentDateNotReadable.setDate(currentDateNotReadable.getDate() + 1)

             var currentDate = genReadableDate(currentDateNotReadable)

            return {...state, currentDate, currentDateNotReadable}
        case "GET_FLIGHTS":
            return {...state}
        case "GET_AIRCRAFTS_SUCCESS":
            var {data} = action.payload
            var selectedAircraft = data[0]
            return {...state, aircrafts: data, selectedAircraft}
        case "GET_FLIGHTS_SUCCESS":
            var {data, pagination} = action.payload;
           
            var {offset, limit, total} = pagination;
    
            var prevOffset = offset - limit;
            prevOffset = prevOffset < 0 ? 0 : prevOffset;

            var isTheEnd = false;

            if (total <= offset + data.length){
                isTheEnd = true
            }

            return {...state, flights: data, offset, limit, prevOffset, total, isTheEnd}
        case "SELECT_AIRCRAFT":
            var selectedAircraft = state.aircrafts.find(aircraft=>aircraft.ident === action.payload);

            return {...state, selectedAircraft}
        case "ADD_TO_ROTATION":
            var rotation = action.payload;
            rotation.date = state.currentDate;
            rotation.aircraft = state.selectedAircraft.ident;

            var tempRotations = state.rotations.map(x=>x);
            var rotations = state.rotations.map(x=>x);

            tempRotations.push(rotation);

            var usability = calcUsability(tempRotations);

            var inRotation = {...state.inRotation};

            if (usability > 100){
                alert('Adding this flight to the rotation will push aircraft usability beyond 100%. Cannot add to rotation.')
            } else {
                rotations.push(rotation);
                inRotation[rotation.id] = true;
            }

            rotations = handleDestinationMatch(rotations)

            return {...state, rotations, inRotation, usability: usability > 100 ? state.usability : usability}

        case "REMOVE_FROM_ROTATION": 
            var newRotationObj = {}
            var keys = Object.keys(state.inRotation).filter(x=>x !== action.payload.id)

            var rotations = state.rotations.filter(rotation=>{
                return rotation.id !== action.payload.id
            })

            var usability = calcUsability(rotations);

            keys.forEach(x=>{
                newRotationObj[x] = state.inRotation[x]
            });

            rotations = handleDestinationMatch(rotations)

            return {...state, rotations, inRotation: newRotationObj, usability}
            case "SORT_ROTATION":
                var rotations = action.payload;
                rotations = handleDestinationMatch(rotations)
                return {...state, rotations}
        default:
            return state;
    }
};