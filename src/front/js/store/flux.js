
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			filteredRecipes: [],
			filterStatus: false,
			token: null,
			homeRecipe: [],
			recentlyFetchedRecipes: [],			
            favourites: [],
			homeRecipes: [],
			imageURL: "",
			instructions: "",
			cookingTime: "",
			ingredients: "",
            id:"",
            title:"",
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
				clearHomeRecipes: () => {
					setStore({ homeRecipes: [] });
				},
	
				// Call this action when the chatbot sends a message
				handleChatbotMessage: () => {
					setStore({ chatbotMessage: true });
					getActions().clearHomeRecipes(); // Clear homeRecipes when chatbot sends a message
				},

			getRandomRecipe: async () => {
				try{
					const resp = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.SPOONACULAR_API_KEY_2}&number=1`)
					const data = await resp.json()
					console.log(data)
					setStore({ homeRecipes: data.recipes, instructions: data.instructions, })
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
			
					setStore({ imageURL: data.image, instructions: data.instructions, cookingTime: data.readyInMinutes, ingredients: ingredientsOriginal, id: data.id, title: data.title });
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
				setStore({ filteredRecipes: recipes, filterStatus: true});
				return recipes;
			} catch (error) {
				console.error(error);
			}
		},
		resetFilters: () => {
			setStore({filterStatus: false})
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

            update: async (dataEmail, dataPassword) => {
                try {
                    const response = await fetch(process.env.BACKEND_URL + "/api/update", {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization : 'Bearer '+sessionStorage.getItem("token")
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
                            user: data.user
                        });
                        return true;
                    } else {
                        console.error("An error occurred during user update");
                        return false;
                    }
                } catch (error) {
                    console.error("An error occurred during user update", error);
                    return false;
                }
            },

            delete: async () => {
                try {
                  const token = sessionStorage.getItem("token");
                  const response = await fetch(`${process.env.BACKEND_URL}/api/delete`, {
                    method: 'DELETE',
                    headers: {
                      'Authorization': 'Bearer '+sessionStorage.getItem("token")
                    }
                  });
              
                  if (response.ok) {
                    console.log("User account deleted successfully");
                    sessionStorage.clear();
                    setStore({logged:null})
                    return true;
                  } else {
                    console.error("An error occurred during user account deletion");
                    return false;
                  }
                } catch (error) {
                  console.error("An error occurred during user account deletion", error);
                  return false;
                }
              },
              
            getFavourites: () => {
                fetch(`${process.env.BACKEND_URL}/api/user/favourites`, {
                    headers: {
                        'Authorization': 'Bearer '+sessionStorage.getItem("token")
                        } 
                }).then(resp => resp.json()).then(data => setStore({favourites:data.favourites})).catch(error=> console.log(error))
            },

            addFavourites: async (title, image, api_id) => {
                let actions = getActions ()
                let opt = {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                      'Authorization': 'Bearer '+sessionStorage.getItem("token")
                    }, 
                    body: JSON.stringify({
                        "title": title,
                        "image": image,
                        "api_id": api_id,
                    })
                }
                let response = await fetch (`${process.env.BACKEND_URL}/api/user/favourites`, opt)
                if (response.status !== 200) {
                    return false
                }
                else {
                    let data = await response.json()
                    console.log (data)
                    actions.getFavourites() //get the updated list of favourites
                    return true
                }
            },

            deleteFavourite: async (api_id) => {
                try {
                  let actions = getActions();
                  let opt = {
                    method: 'DELETE',
                    headers: {
                      'Authorization': 'Bearer ' + sessionStorage.getItem("token"),
                      'Content-Type': 'application/json' // Specify content type for the request body
                    },
                    body: JSON.stringify({ api_id: api_id }) // Convert the data to JSON format
                  };
                  let response = await fetch(`${process.env.BACKEND_URL}/api/user/favourites`, opt);
              
                  if (!response.status == 200) { 
                    let error = await response.json()
                    console.log(response.status);
                    console.log('Failed to delete favourite', error.message);
                    return false
                  }
              
                  // Success: Trigger the action to refresh the favourites
                  actions.getFavourites();
                  return true;
                } catch (error) {
                  console.error('Error deleting favourite:', error);
                  return false;
                }
              }
              
            
		}
	};
};

export default getState
