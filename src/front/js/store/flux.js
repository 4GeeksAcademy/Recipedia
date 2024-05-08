
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			recipes: [],
			token: null
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
		filterRecipes: async (intolerance, diet, cuisine) => {
			let apiURL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=cbd1f9abd7d7442da6ce0eba59999ba6`
			if (diet) {
				apiURL += `&diet=${diet}`;
			}
			if (intolerance) {
				apiURL += `&intolerance=${intolerance}`;
			}
			if (cuisine) {
				apiURL += `&cuisine=${cuisine}`;
			}
			fetch(apiURL)
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
		loginToken: async (username, password) => {

			const options = {
				method: 'POST',
				headers: {"Content-type": "application/json"},
				body: JSON.stringify({
					"username": username,
					"password": password
				})
			}
			try {
				const resp = await fetch(`https://turbo-space-dollop-44r77w9r76rhjv6v-3001.app.github.dev/api/token`, options)
				if (resp.status !== 200) 
					{	alert("error accessing account")
						return false
					}
				const data = await resp.json()
				console.log("Token:", data)
				sessionStorage.setItem("token", data.access_token)	
				setStore({token: data.access_token})
				return true
			}
			catch(error) {
				console.log(error)
			}
		},

		syncTokenFromSessionStore: () => {
			let token = sessionStorage.getItem("token");
			if (token && token != " && token != undefined") setStore({token: token})
		},

		logout: () => {
			sessionStorage.removeItem("token")
			setStore({token:null
			})
		}
	}
}
}

export default getState;
