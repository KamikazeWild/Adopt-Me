import { useState, useEffect, useContext } from "react";
import useBreedList from "./useBreedList";
import Results from "./Results";
import ThemeContext from "./ThemeContext";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
	// const location = "Jaipur, Rajasthan, India";
	const [location, setLocation] = useState("");
	const [animal, setAnimal] = useState("");
	const [breed, setBreed] = useState("");
	const [breeds] = useBreedList(animal);
	const [theme, setTheme] = useContext(ThemeContext);

	const [pets, setPets] = useState([]);
	useEffect(() => {
		requestPets();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	async function requestPets() {
		const res = await fetch(
			`http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}
			&breed=${breed}`
		);
		const json = await res.json();

		setPets(json.pets);
	}

	return (
		<div className="search-params">
			<form
				onSubmit={(e) => {
					e.preventDefault();
					requestPets();
				}}
			>
				<label htmlFor="location">
					location
					<input
						id="location"
						value={location}
						placeholder="location"
						onChange={(e) => setLocation(e.target.value)}
					></input>
				</label>
				<label htmlFor="animal">
					Animal
					<select
						id="animal"
						value={animal}
						onChange={(e) => {
							setAnimal(e.target.value);
						}}
						onBlur={(e) => {
							setAnimal(e.target.value);
						}}
					>
						<option></option>
						{ANIMALS.map((animal) => {
							return (
								<option key={animal} value={animal}>
									{animal}
								</option>
							);
						})}
					</select>
				</label>
				<label htmlFor="breed">
					Breed
					<select
						id="breed"
						value={breed}
						onChange={(e) => {
							setBreed(e.target.value);
						}}
						onBlur={(e) => {
							setBreed(e.target.value);
						}}
					>
						<option></option>
						{breeds.map((breed) => {
							return (
								<option key={breed} value={breed}>
									{breed}
								</option>
							);
						})}
					</select>
				</label>
				<label htmlFor="theme">
					Theme
					<select
						value={theme}
						onChange={(e) => setTheme(e.target.value)}
						onBlur={(e) => setTheme(e.target.value)}
					>
						<option value="peru">Peru</option>
						<option value="#f06d06">Fog Dog</option>
						<option value="darkblue">Dark Blue</option>
						<option value="chartreuse">Chartreuse</option>
					</select>
				</label>
				<button style={{ backgroundColor: theme }}>Submit</button>
			</form>
			<Results pets={pets}></Results>
		</div>
	);
};

export default SearchParams;
