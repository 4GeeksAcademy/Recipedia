const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			recentlyFetchedRecipes: [

			],			
			homeRecipe: [],
			imageURL: "",
			instructions: "",
			cookingTime: "",
			ingredients: "",
			chatbotMessage: false,
			
			//authentication
			message: null,
            token: null,
            user: null,
            logged: null,
		},
		actions: {	
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

			//authentication
			signup: async (dataEmail, dataPassword) => {
                try {
                    const response = await fetch(process.env.BACKEND_URL+"/api/signup", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            "email": dataEmail,
                            "password": dataPassword,
                        })
                    });
                    console.log(response);
                    if (response.ok) {
                        const data = await response.json();
                        console.log(data);
                        return true;
                    } else {
                        // Check for specific error messages
                        const errorData = await response.json();
                        if (errorData.message) {
                            console.error(`Signup error: ${errorData.message}`);
                        } else {
                            console.error("An error occurred during user creation");
                        }
                        return false;
                    }
                } catch (error) {
                    console.error("An error occurred during user creation", error);
                    return false;
                }
            },
            login: async (dataEmail, dataPassword) => {
                try {
                    const response = await fetch(process.env.BACKEND_URL + "/api/login", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            "email": dataEmail,
                            "password": dataPassword,
                        })
                    });
                    console.log(response);
                    if (response.ok) {
                        const data = await response.json();
                        setStore({
                            user: data.user,
                            token: data.token,
                            logged: true
                        });
                        sessionStorage.setItem("token", data.token);
                        sessionStorage.setItem("userID", data.user.id);
                        window.location = '/private';
                        return true;
                    } else {
                        console.error("An error occurred during user login");
                        return false;
                    }
                } catch (error) {
                    console.error("An error occurred during user login", error);
                    return false;
                }
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
                            "Access-Control-Allow-Origin": "*",
                            "Access-Control-Allow-Methods": "*"
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
	};
};

export default getState;
