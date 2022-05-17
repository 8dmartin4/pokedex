import React from 'react';
import Entry from './Entry';

const EntryList = ({pokemon}) => {
	return (
		<div> {		
			pokemon.map((dexEntry, i) => {
				return (
					<Entry 
						key={pokemon[i].id} 
						id={pokemon[i].id} 
						name={pokemon[i].name.charAt(0).toUpperCase() + pokemon[i].name.slice(1)} 
						height={pokemon[i].height} 
						weight={pokemon[i].weight} 
						img={pokemon[i].sprites.other['official-artwork'].front_default}
					/>
				)
			})
		}
		</div>
	)
}

export default EntryList;