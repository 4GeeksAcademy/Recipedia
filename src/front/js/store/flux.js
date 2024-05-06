const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			homeRecipe: [],
			imageURL: "",
			instructions: "",
			cookingTime: ""
		},
		actions: {		
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getRandomRecipe: async () => {
				try{
					const resp = await fetch("https://api.spoonacular.com/recipes/random?apiKey=2c753fd4502e4c7d8786cd83a6644462&number=12")
					const data = await resp.json()
					// console.log(data)
					setStore({ homeRecipe: data.recipes,imageURL: data.image, instructions: data.instructions })
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},

			getRecipeDetails: async (id) => {
				try{
					const resp = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=2c753fd4502e4c7d8786cd83a6644462`)
					const data = await resp.json()
					setStore({ instructions: data.instructions, cookingTime: data.readyInMinutes })
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
		
			getAnalyzedInstructions: async (id) => {
				try{
					const resp = await fetch(`https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=2c753fd4502e4c7d8786cd83a6644462`)
					const data = await resp.json()
					console.log("This is analyzed instructions!!!:" ,data)
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
			}
		}
	};
};

export default getState;
