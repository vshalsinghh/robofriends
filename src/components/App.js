import React, {Component} from 'react';
import {connect} from 'react-redux';
import Cardlist from './Cardlist';
import Searchbox from './Searchbox'; 
import Scroll from './Scroll';
import ErrorBoundary from './ErrorBoundary';
import './app.css';

import { setSearchField, requestRobots} from '../actions';

const mapStateToProps = state => {
	return{
			searchField: state.searchRobots.searchField,
			robots: state.requestRobots.robots,
			isPending:state.requestRobots.isPending,
			error: state.requestRobots.error

	}
}

const mapDispatchToProps = (dispatch) =>{
	return  {	
		onSearchChange : (event) => dispatch(setSearchField(event.target.value)),
		onRequestRobots: () =>dispatch( requestRobots())
}}

class App extends Component{
	
	componentDidMount(){
		this.props.onRequestRobots();
	}
	// onSearchChange=(event) => {
	// 	this.setState({ searchfield : event.target.value })
			
	// }

	render(){
		
		const {searchField, onSearchChange , robots, isPending } =this.props;
		const filteredRobots = robots.filter(robot => {
			return robot.name.toLowerCase().includes(searchField.toLowerCase());
		})
		return isPending ? <h1> LOADING....</h1> :
		 (
				<div className='tc'>
				<h1 className='f1'>Robo Friends</h1>
				<Searchbox searchChange={onSearchChange}/>
				<Scroll>
				<ErrorBoundary>
					<Cardlist robots={filteredRobots} />
				</ErrorBoundary>
				</Scroll>
				</div>
				);
			
	}
	


}
export default connect(mapStateToProps, mapDispatchToProps)( App);