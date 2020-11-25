import {useSelector, useDispatch} from 'react-redux';
import {setDate} from '../actions/index'
import {FaAngleRight, FaAngleLeft} from 'react-icons/fa';
import {genReadableDate} from '../utils'

const DateControl = () =>{

    const currentDate = useSelector(state=>state.currentDate);
    const currentDateNotReadable = useSelector(state=>state.currentDateNotReadable);
    const initCurrentDate = useSelector(state=>state.initCurrentDate);

    const dispatch = useDispatch()

    const genNewDate = (date, dir) =>{
        const newD = new Date(date)
        newD.setDate(newD.getDate() + dir)
        return newD
    }

    const onNextDate = () => {
        //currently disabled
        var nextD = genNewDate(currentDateNotReadable, 1)
        var nextDReadable = genReadableDate(nextD)
        dispatch(setDate({currentDate: nextDReadable, currentDateNotReadable: nextD}))
    };

    const onPrevDate = () => {
        var today = new Date();
        today = new Date(today)
        today.setDate(today.getDate() + 1)
        //currently disabled
        var prevD = genReadableDate(genNewDate(currentDateNotReadable, -1))
    
        if (today !== initCurrentDate){
            dispatch(setDate({currentDate: prevD, currentDateNotReadable: today}))
        }

    };

    return (
        <div className="flexed" style={{alignItems: 'center'}}>
            <FaAngleLeft onClick={onPrevDate}/>
            {currentDate 
                ? <p>{currentDate}</p>
                : null 
            }
            <FaAngleRight onClick={onNextDate}/>
        </div>
    );
};

export default DateControl;