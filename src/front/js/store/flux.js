
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			recipes: []
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
		getCuisine: async (name) => {
			fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=b571ba2d3e4e4a9ea48ce48cf8b4e1ce&cuisine=${name}`)
			.then(resp => {
				if (!resp.ok) {
					throw new Error(resp.status);
				}
				return resp.json();
			})
			.then(data => {
				console.log(data)
				setStore({recipes: data.results})
			})
			.catch(error => {
				console.error(error);
			})
		},
		getDiet: async (name) => {
			fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=b571ba2d3e4e4a9ea48ce48cf8b4e1ce&diet=${name}`)
			.then(resp => {
				if (!resp.ok) {
					throw new Error(resp.status);
				}
				return resp.json();
			})
			.then(data => {
				console.log(data)
				setStore({recipes: data.results})
			})
			.catch(error => {
				console.error(error);
			})
		},
		getIntolerances: async (name) => {
			fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=b571ba2d3e4e4a9ea48ce48cf8b4e1ce&intolerances=${name}`)
			.then(resp => {
				if (!resp.ok) {
					throw new Error(resp.status);
				}
				return resp.json();
			})
			.then(data => {
				console.log(data)
				setStore({recipes: data.results})
			})
			.catch(error => {
				console.error(error);
			})
		},
		getTwoThingsTest: async (intolerance, diet, cuisine) => {
			fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=b571ba2d3e4e4a9ea48ce48cf8b4e1ce&intolerances=${intolerance}&diet=${diet}&cuisine=${cuisine}`)
			.then(resp => {
				if (!resp.ok) {
					throw new Error(resp.status);
				}
				return resp.json();
			})
			.then(data => {
				console.log(data)
			})
			.catch(error => {
				console.error(error);
			})
		}
	}
	};
};

export default getState;
