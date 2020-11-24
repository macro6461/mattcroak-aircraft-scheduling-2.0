import {useSelector, useDispatch} from 'react-redux';
import {FaAngleRight, FaAngleLeft} from 'react-icons/fa';
import {genReadableDate} from '../utils'

const DateControl = () =>{

    const currentDate = useSelector(state=>state.currentDate);
    const currentDateNotReadable = useSelector(state=>state.currentDateNotReadable);

    const onNextDate = () => {
        //currently disabled
    };

    const onPrevDate = () => {
        //currently disabled
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