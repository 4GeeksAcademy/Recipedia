
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			filteredRecipes: [],
			filterStatus: false,
			showFilters: true,
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
		filterRecipes: async (diet, intolerance, cuisine) => { 
			console.log(diet, intolerance, cuisine);
			let apiURL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.SPOONACULAR_API_KEY_2}`;
			if (diet) {
				apiURL += `&diet=${diet}`;
			}
			if (intolerance) {
				apiURL += `&intolerance=${intolerance}`;
			}
			if (cuisine) {
				apiURL += `&cuisine=${cuisine}`;
			}
			console.log(apiURL);
			
			try {
				const response = await fetch(apiURL);
				if (!response.ok) {
					throw new Error(response.status);
				}
				const data = await response.json();
				console.log(data);
				const recipes = data.results || [];
				setStore({ filteredRecipes: recipes, filterStatus: true, showFilters: true });
				return recipes;
			} catch (error) {
				console.error(error);
			}
		},
		resetFilters: () => {
			setStore({filterStatus: false, showFilter: false})
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
