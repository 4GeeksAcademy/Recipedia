
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			recipes: [],
			token: null,
			homeRecipe: [],
			imageURL: "",
			instructions: "",
			cookingTime: "",
			ingredients: "",
			chatbotMessage: false,
			recentlyFetchedRecipes: [

			],		
			
			//authentication
			message: null,
            token: null,
            user: null,
            logged: null,
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
	
			addRecipes: (recipes) => {
				console.log(recipes);
				let store = getStore()
				store.recentlyFetchedRecipes= store.recentlyFetchedRecipes.concat(recipes)
				setStore(store)
			},	
				// other actions...
				clearHomeRecipe: () => {
					setStore({ homeRecipe: [] });
				},
	
				// Call this action when the chatbot sends a message
				handleChatbotMessage: () => {
					setStore({ chatbotMessage: true });
					getActions().clearHomeRecipe(); // Clear homeRecipe when chatbot sends a message
				},

			getRandomRecipe: async () => {
				try{
					const resp = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.SPOONACULAR_API_KEY_2}&number=18`)
					const data = await resp.json()
					console.log(data)
					setStore({ homeRecipe: data.recipes, instructions: data.instructions })
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},

			getRecipeDetails: async (id) => {
				try {
					const resp = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.SPOONACULAR_API_KEY_2}`);
					const data = await resp.json();
					
					const ingredientsOriginal = data.extendedIngredients.map(ingredient => ingredient.original);
					let ingredientsString = ingredientsOriginal.slice(0, -1).join(", ") + (ingredientsOriginal.length > 1 ? " and " : "") + ingredientsOriginal.slice(-1);
			
					setStore({ imageURL: data.image, instructions: data.instructions, cookingTime: data.readyInMinutes, ingredients: ingredientsOriginal });
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error);
				}
			},
		
			getAnalyzedInstructions: async (id) => {
				try{
					const resp = await fetch(`https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=${process.env.SPOONACULAR_API_KEY_2}`)
					const data = await resp.json()
					console.log("This is analyzed instructions!!!:" ,data)
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
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
			let apiURL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=1d556000ce964a5e887de0ce17ef6150`
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
		loginUser: (email, password) => {
			const options = {
					method: 'POST',
					headers: {"Content-type": "application/json"},
				 	body: JSON.stringify({
						"email": email,
				 		"password": password
				 	})
				}
			fetch(`https://automatic-xylophone-v45vvq7wxxvfw645-3001.app.github.dev/api/login`, options)
			.then(resp => {
				if (resp.ok) {
					const data = resp.json();
					setStore({
						user: data.user,
						token: data.token,
						logged: true
					});
					console.log(data.token)
					sessionStorage.setItem("token", data.token);
					sessionStorage.setItem("userID", data.user.id);
					window.location = '/private';
					return true;
				} else {
					console.error("An error occurred during user login");
					return false;
				}
			})
			.catch(error => { 
				console.log(error);
			})
		},
		signUpUser: (email, password) => {
			const options = {
				method: "POST",
				headers: {"Content-type": "application/json"},
				 	body: JSON.stringify({
						"email": email,
				 		"password": password
				 	})
			}
			fetch(`https://automatic-xylophone-v45vvq7wxxvfw645-3001.app.github.dev/api/signup`, options)
			.then(resp => {
				console.log(resp);
			})
			.catch(error => {
				console.log(error);
				if (error) {
					alert("Not registered")
				}
			})
		},
		verifyAuthToken: async () => {
			const token = sessionStorage.getItem("token");
			console.log(token);
			if (!token) {
				setStore({ logged: false });
				window.location = '/login';
				return false;
			}

			try {
				let response = await fetch(process.env.BACKEND_URL + "/api/protected", {
					method: 'GET',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${token}`,
					}
				});

				if (response.ok) {
					const userData = await response.json();
					setStore({
						user: userData.response.user,
						token: token,
						logged: true
					});
				} else {
					sessionStorage.removeItem("token");
					setStore({ logged: false });
					window.location = '/login';
				}
			} catch (error) {
				console.error("Token validation failed", error);
				sessionStorage.removeItem("token");
				setStore({ logged: false });
				window.location = '/login';
			}
		},
		logout: () => {
			setStore({
				user: null,
				token: null,
				logged: false,
			});
			sessionStorage.removeItem("token");
			sessionStorage.removeItem("userID");
		},
	}
}
		}	

export default getState
