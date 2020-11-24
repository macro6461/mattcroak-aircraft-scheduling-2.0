import {useSelector, useDispatch} from 'react-redux';
import {selectAircraft} from '../../actions/index';

const Aircraft = ({aircraft}) =>{

    const {
        ident
    } = aircraft;

    const selectedAircraft = useSelector(state=>state.selectedAircraft)
    const usability = useSelector(state=>state.usability)

    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(selectAircraft(ident))
    };

    var className = selectedAircraft && selectedAircraft.ident !== ident ? 'item' : 'item chosen';

    return (
        <div key={ident} className={className} onClick={handleClick} style={{borderBottom: className.indexOf('chosen') > -1 ? 'white' : '#001f3d'}}>
            <p>{ident}</p>
            ({usability}%)
        </div>
    )
};

export default Aircraft;