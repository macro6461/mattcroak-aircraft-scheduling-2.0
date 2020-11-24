
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

  

# Matt Croak Aircraft Scheduling Code Challenge

  

The app is a react application that utilizes redux for the store and redux sagas as the middleware for the async API requests. The app utilizes fetch in order to make a GET request to the respective APIs for aircrafts and airlines.

  

## Aircrafts

  

The user can select an aircraft from the aircraft panel. Currently only one is enabled but there is support for multiple. Once there is a selected aircraft (represented as `selectedAircraft` in the reducer) the user can begin selecting flights to assign to the rotation for that aircraft.

  

## Flights

  

For the pagination UX I decided on for the flights API, I went with navigation buttons at the bottom of the pane rather than a load more option which would append the newest items to the existing list. This choice was not easy but I decided that having navigation buttons would make the scroll in the flights panel less overwhelming and provide a more convenient means of navigation. Rather than having to scroll up or down almost a lot the most relevant flight options are consolidated into groups of 25. To see the previous options, click previous. To see the next 25, click next. From the available flights the user can select a flight to be added to an aircrafts rotation.

  

## Rotation

  

Selecting a flight for a rotation can be done by clicking a flight card in the flight panel. Once a flight is added, any flights that have a time that conflict with the selected on are disabled in the flights pane. Originally I enabled the user to drag and drop rotation items in the rotation list but this lead to flights potentially being moved out of order (you can't start a flight that departs at 12:00PM before a flight that departs at 10:00AM). It ended up being more efficient to just let the user remove items from the list as they saw fit rather than introducing a drag and drop that potentially created time conflicts.

  

## Timeline

  

Once I was able to determine the scale for the flight times was in seconds (21600 === 6 hours, which represents 6:00AM on a 24 hour timeline) I was able to scale the timeline to fit 24 hours relatively smoothly. I made the timeline 720px wide. 720px / 24 hours leaves about 30px per hour (although I found a scale of 27px to be a more convenient fit for the service blocks and turnaround times). I was able to determine the position on the timeline by taking a flight's `departuretime`, divide it by 60 so the position would correspond to minutes on the timeline.

  

```
//function used to determine left positioning
const calcPosition = (rotation) => {

	var left = (rotation.departuretime / 60) / 1.9

	//need to offset position. 
	//Calculate offset by dividing left by 30 
	//(approx width of an hour)

	var offset = left / 30
	left = left - offset
	return left
}
```
I'm still not sure why 1.9 worked but it did lead to a pretty accurate positioning coefficient to be used with the calculation. If you want to see how close the service blocks line up to their hour and minute position you can uncomment out the pipes within `p` tags in `Timeline.js`, starting on line 32.

```
<div  style={{display:  'flex', justifyContent:  'space-between', position:  'relative'}}  className="tickers">
	<p>00:00</p>
	
	{/* <p>|</p>
	...
	<p>|</p> */}
	
	<p>12:00</p>
	
	{/* <p>|</p>
	<p>|</p>
	...
	<p>|</p> */}
	
	<p></p>
...
</div>
```