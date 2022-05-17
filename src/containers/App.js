import React, {Component} from 'react';
import EntryList from '../components/EntryList';
import SearchBox from '../components/SearchBox';
import Pokedex from 'pokedex-promise-v2';
import {fullDexList} from '../fullDexList';
import {mostPopularList} from '../mostPopularList';
import './App.css';

const P = new Pokedex();
// this function takes in an integer that represents the dex number of each pokemon and returns the pokemon objects in an array
// const fetchPokemon = async function(numberOfPokemon, startingPoint) { 
// 	try {
// 		const pokArray = [];
// 		let i = 0;
// 		let j = startingPoint;
// 		while(i < numberOfPokemon) {
// 			const pokemon = await P.getPokemonByName(j);
// 			pokArray.push(pokemon);
// 			i++;
// 			j++;		
// 		}
// 		return pokArray;
// 	} catch (err) {
// 		console.log(err);
// 	}
// }
const fetchPokemon = async (list) => {
	try {
		const promises = [];
		list.forEach(pokemon => promises.push(P.getPokemonByName(pokemon.toLowerCase())));
		const results = await Promise.allSettled(promises);
		return results.filter(result => result.status === 'fulfilled').map(result => result.value);
	} catch (err) {
		console.log(err);
	}
}


class App extends Component {
	constructor() {
		super()
		this.state = {
			defaultlist:[],
			searchlist:[],
			searchfield: ''
		}
	}

	componentDidMount() {
		//fetchPokemon(10, 1).then(pokeList => this.setState({pokemon: pokeList}));
		fetchPokemon(mostPopularList).then(pokeList => this.setState({defaultlist: pokeList}));
	}

	onSearchChange = (event) => {
		this.setState({searchfield: event.target.value}, () => {
			if(this.state.searchfield.length > 3) {
				const filteredList = fullDexList.filter(pokeName => pokeName.toLowerCase().includes(this.state.searchfield));
				fetchPokemon(filteredList).then(pokeList => this.setState({searchlist: pokeList}));
			} else {
				this.setState({searchlist: []});
			}
		});
	}

	render() {
		const {defaultlist, searchfield, searchlist} = this.state;
		return !defaultlist.length ?
			<h1 className='tc f1'>Loading</h1> :
			( 
				<div className='tc'>
					<h1 className='f-5'>Pokedex</h1>
					<SearchBox searchChange={this.onSearchChange} value={searchfield}/>
					<EntryList pokemon={searchlist.length ? searchlist : defaultlist} />
				</div>
			)
	}
}

export default App;