import { useState, useEffect, useDebugValue } from "react";

// const localCache = {};

export default function useBreedList(animal) {
	const [breedList, setBreedList] = useState([]);
	const [status, setStatus] = useState("not loaded");

	useDebugValue(
		`Number of objects in browser localStorage: ${localStorage.length}`
	);

	useEffect(() => {
		if (!animal) {
			setBreedList([]);
		} else if (localStorage.getItem(animal)) {
			setBreedList(JSON.parse(localStorage.getItem(animal)));
		} else {
			requestBreedList();
		}

		async function requestBreedList() {
			setBreedList([]);
			setStatus(["loading"]);

			const res = await fetch(
				`http://pets-v2.dev-apis.com/breeds?animal=${animal}`
			);
			const json = await res.json();
			// localCache[animal] = json.breeds || [];
			localStorage.setItem(animal, JSON.stringify(json.breeds));
			// setBreedList(localCache[animal]);
			setBreedList(JSON.parse(localStorage.getItem(animal)));
			setStatus("loaded");

			// console.log(JSON.parse(localStorage.getItem(animal)));
		}
	}, [animal]);

	return [breedList, status];
}
