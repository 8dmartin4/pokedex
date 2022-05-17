import React from 'react';

const Entry = ({name, img, id, height, weight}) => {
	return (
		<div className="bg-light-yellow dib br2 pa3 ma2 grow bw2 shadow-5">
			<h2>{name}</h2>
			<img alt={`${name}`} src={`${img}`} width='250px'/>
			<div>
				<p>Pokedex Entry #{id}</p>
				<p>Height: {height/10}m</p>
				<p>Weight: {weight/10}kg</p>
			</div>
		</div>
	);
}

export default Entry;