const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			recentlyFetchedRecipes: [

			]
		},
		actions: {
			addRecipes: (recipes) => {
				console.log(recipes);
				let store = getStore()
				store.recentlyFetchedRecipes= store.recentlyFetchedRecipes.concat(recipes)
				setStore(store)
			},
		}
	};
};

export default getState;
