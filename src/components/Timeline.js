import {useSelector} from 'react-redux';

const Timeline = () =>{

    const rotations = useSelector(state=>state.rotations);

    var times = []

    const calcPosition = (rotation) => {
        var left = (rotation.departuretime / 60) / 1.9
        //need to offset position. Calculate offset by dividing left by 30 (approx width of an hour)
        var offset = left / 30
        left = left - offset 
        return left
    }

    rotations.forEach(x=>{
        var obj = {}
        //good width is 30 per hour
        var timeInHours = ((x.arrivaltime - x.departuretime) / 60) / 60
        var width = timeInHours * 27
        obj.left = calcPosition(x)
        obj.width = width
        times.push(obj) 
    })

    return (
        <div style={{display: 'block', margin: 'auto', overflowX: 'auto'}}>
            <div>
                <div className="tickers">
                <p>00:00</p>
                {/* <p>|</p>
                <p>|</p>
                <p>|</p>
                <p>|</p>
                <p>|</p>
                <p>|</p>
                <p>|</p>
                <p>|</p>
                <p>|</p>
                <p>|</p>
                <p>|</p> */}
                <p>12:00</p>
                {/* <p>|</p>
                <p>|</p>
                <p>|</p>
                <p>|</p>
                <p>|</p>
                <p>|</p>
                <p>|</p>
                <p>|</p>
                <p>|</p>
                <p>|</p>
                <p>|</p> */}
                <p></p>
                <div className="tickerLine"/>
            </div>
            <div style={{height: 50, position: 'relative'}}>
                {times.map(x=>{
                    return <>
                    <p className="serviceBlock" style={{
                        left: x.left,
                        width: x.width
                        }}/>
                        <p className="turnaroundBlock" style={{left: x.left + x.width}}/>
                        </>
                })}
               <div style={{backgroundColor: 'grey', width: '100%', height: 20}}/>
            </div>
            </div>
        </div>
    )
};

export default Timeline;