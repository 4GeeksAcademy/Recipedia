return (
  <div
    className="jumbotron text-center d-flex mt-5"
    style={{
      // backgroundImage: `url(${background})`,
      // backgroundSize: "100%",
      // backgroundRepeat: "no-repeat",
      // backgroundPosition: "center",
      backgroundColor:"#F0F3F6",
      padding: "50px 0 20px 0",
      justifyContent: "space-around",
      fontFamily: "avenir-light",
      color: "#303131",
    }}
  >
    {fecthStatus == "pending" && origin == "chatbot" ? (
      <div className="text-center p-5 h-25">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only" style={{fontSize: "40px",}}>Loading...</span>
        </div>
        <p className="mt-3" style={{fontSize: "40px",}}>Fetching recipe information...</p>
      </div>
    ) : fecthStatus == "error" && origin == "chatbot" ? (
      <div className="bg-white text-center p-5 h-25">
        <h2 className="text-danger" style={{fontSize: "40px",}}>Oops! Something went wrong...</h2>
        <p className="text-muted" style={{fontSize: "40px",}}>
          We apologize for the inconvenience. Please try again later.
        </p>
      </div>
    ) : fecthStatus == "success" && origin == "chatbot" ? (
      <div
        className="card"
        style={{
          //CHATBOT RECIPE DETAILS ##############
          width: "100rem",
          padding: "50px 30px 50px 30px",
          // alignItems: "center",
          maxWidth: "1500px",
          alignItems: "flex-start", 
          textAlign: "left",
          // overflow: "auto", // Adding overflow property to make the container scrollable
          // maxHeight: "calc(100vh - 100px)", // Adjust the value according to your layout
        }}
      >
      <div style={{display: "flex", alignItems:"flex-start", margin:"50px 30px"}}>
        <div style={{ borderRadius:"5px", marginRight:"30px"}}>
          <img
            src={recipe?.image}
            style={{ width:"500px", height:"auto"}}
          />
        </div>
        <div style={{flex:"1"}}>
          <h2 style={{fontSize:"60px", fontStyle:"italic", wordSpacing:"normal"}}><strong>{recipe?.title}</strong></h2>
          <hr style={{ width: "50%", margin: "20px auto", border: "1px solid grey" }} />
          <p dangerouslySetInnerHTML={{ __html: recipeInfo?.summary }}></p>
        </div>
      </div>

        <div
          className="row"
          style={{
            maxWidth: "90%",
            margin: "40px 0 0 40px",
            fontSize: "20px",
            textAlign: "initial",
            justifyContent: "flex-start",
          }}
        > 
          <div className="col-sm-12 mb-3 mb-sm-0" style={{marginLeft:"-20px"}}>
            <div className="card" style={{ borderColor: "white" }}>
              <div className="card-body">
                <h5 className="card-title"><strong>COOKING MINUTES</strong></h5>
                <p className="card-text" style={{ fontSize: "20px" }}>
                  {recipeInfo?.readyInMinutes}
                </p>
              </div>
            </div>
          </div>
          <div className="col-sm-12">
            <div className="card" style={{ borderColor: "white" }}>
              <div className="card-body" style={{ textAlign: "justify" }}>
              {/* <div style={{ border: "1px solid #ccc", borderRadius: "5px"}}>
<h5 className="card-title"><strong>INGREDIENTS</strong></h5>
<ul style={{ listStyleType: "disc", padding: "0 0 0 20px", display: "flex", flexDirection: "row", flexWrap: "wrap", alignItems: "flex-start", margin: "0" }}>
  {recipeInfo?.extendedIngredients?.map((ingredient, index) => (
    <li key={index} style={{ marginRight: "20px" }}>
      {ingredient.original}
    </li>
  ))}
</ul>
</div>
*/}
<div className="col-sm-12 ingredient-container" style={{ border: "1px solid #ccc", borderRadius: "5px", marginBottom: "20px", paddingLeft: "0", paddingRight: "20px", marginLeft: "-30px" }}>
<div className="card" style={{ borderColor: "white", fontSize: "20px", paddingLeft: "0", paddingRight: "0" }}>
  <h5 className="card-title" style={{marginLeft:"10px"}}><strong>INGREDIENTS</strong></h5>
  <ul style={{ margin: "0", display: "flex", flexWrap: "wrap", listStyleType: "disc", flexDirection: "row", alignItems: "flex-start", paddingLeft: "40px" }}>
    {recipeInfo?.extendedIngredients?.map((ingredient, index) => (
      <li key={index} style={{ marginBottom: "8px", width: "calc(50% - 20px)", marginRight: "20px",}}>
        {ingredient.original}
      </li>
    ))}
  </ul>
</div>
</div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="col-sm-12"
          style={{
            maxWidth: "90%",
            margin: "10px 0 0 40px",
            textAlign: "initial",
            justifyContent: "flex-start",
            textAlign: "justify",
            marginTop: "10px",
          }}
        >
         <div className="card" style={{ borderColor: "white", padding: "0 25px", fontSize: "20px", marginLeft:"-20px" }}>
<h5 className="card-title"><strong>PREPARATION</strong></h5>
<ul style={{ listStyleType: 'none', padding: 0 }}>
  {recipeInfo?.analyzedInstructions[0].steps.map((item, index) => (
    <li key={index} style={{ marginBottom: "20px" }}>
      <strong style={{ marginRight: "8px" }}>{index + 1}:</strong> {item.step}
    </li>
  ))}
</ul>
</div>
        {store.favourites.find((item)=> item.title == recipe.title)? (<svg onClick={()=> actions.deleteFavourite(recipeInfo.id)} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#E84A43" className="bi bi-heart-fill" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
          </svg>) : (<svg onClick={(()=> actions.addFavourites(recipe.title, recipe.image, recipeInfo.id))} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#E84A43" class="bi bi-heart" viewBox="0 0 16 16">
<path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
</svg>)
} 
        </div>
      </div>
    ) : (
      <div
      //HOMERECIPE DETAILS ##############
        style={{
          width: "100rem",
          display: "flex",
          background: "white",
          flexDirection: "column",
          padding: "20px",
          maxWidth: "1500px",
          // maxHeight: "1500px",
          alignItems: "center",
          // textAlign: "justify" 
          textAlign: "left",
}}
        
      >
        <div style={{ display: "flex", alignItems: "flex-start", margin: "50px 30px" }}>
          {!loading && (
            <div style={{ width: "500px", height: "auto", borderRadius: "5px", marginRight: "30px" }}>
               <img src={store.imageURL} alt="recipe" style={{ width:"500px", height:"auto" }} />
            </div>
        )}
          <div style={{ flex: "1", margin:"auto"}}>
            <h2 style={{ fontSize: "60px", fontStyle:"italic", wordSpacing:"normal", textAlign:"center"}}><strong>{title}</strong></h2>
            <hr style={{ width: "50%", margin: "20px auto", border: "1px solid grey" }} />
          <div className="card" style={{ borderColor: "white", padding:"0 50px ", textAlign:"left"}}>
          {/* <h5 className="card-title"><strong>SUMMARY</strong></h5> */}
          <p dangerouslySetInnerHTML={{ __html: store.summary }}></p>
          </div>
            {/* <h5 className="card-title" style={{fontSize: "15px", marginTop:"250px"}}>
        COOKING TIME{" "}
          <p className="card-text" style={{ fontSize: "15px", fontWeight: "normal" }}>{store.cookingTime} minutes</p> 
        </h5> */}
              {loading ? (
                <p>Loading...</p>
          ) : null}
          </div>
        </div>
        <div className="row" style={{margin: "0 80px 0 50px"}}>
        <div className="col-sm-12 mb-3 mb-sm-0">
            <div className="card" style={{ borderColor: "white",  }}>
              <div className="card-body" style={{paddingLeft:"0"}}>
        <h5 className="card-title">
        <strong>COOKING MINUTES</strong>{" "}
          <p className="card-text" style={{ fontSize: "20px", fontWeight: "normal" }}>{store.cookingTime}</p> 
        </h5>
        </div>
        </div>
        </div>
        
        <div className="col-sm-12 ingredient-container" style={{ border: "1px solid #ccc", borderRadius: "5px", marginBottom: "20px" }}>
<div className="card" style={{ borderColor: "white", fontSize: "20px" }}>
  <h5 className="card-title"><strong>INGREDIENTS</strong></h5>
  <ul style={{ padding: "0 0 0 20px", listStyleType: "disc", display: "flex", flexDirection: "row", flexWrap: "wrap", alignItems: "flex-start", margin: "0" }}>
    {Array.isArray(store.ingredients) && store.ingredients.map((ingredient, index) => (
      <li key={index} style={{ marginRight: "20px", marginBottom: "8px", width: "calc(50% - 20px)" }}>{ingredient}</li>
    ))}
  </ul>
</div>
</div>
<div className="card" style={{ borderColor: "white", marginLeft:"-15px",padding: "0 25px"}}>
        <h5 className="card-title"><strong>PREPARATION</strong></h5>
            {/* <>{store.instructions} </> */}
        </div>
        <ul style={{ listStyleType: 'none', fontSize: "20px"}}>
              {analyzedInstructions.map((step, index) => (
                  <li key={index} style={{marginBottom:"20px"}}>
                      <strong> {step.number}:</strong> {step.step}
                      {step.step}
                  </li>
              ))}
          </ul>
        {store.favourites.find((item)=> item.title == store.title)? (<svg onClick={()=> actions.deleteFavourite(store.id)} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#E84A43" className="bi bi-heart-fill" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
          </svg>) : (<svg onClick={(()=> actions.addFavourites(store.title, store.imageURL, store.id))} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#E84A43" class="bi bi-heart" viewBox="0 0 16 16">
<path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
</svg>)
} 
        {/* <div
          className="card-text"
          style={{
            width: "600px",
            textAlign: "justify",
            marginTop: "10px",
          }}
        >
          {analyzedInstructions.map((step, index) => (
            <p  className="card-text" key={index}>{step.step}</p>
          ))}
        </div> */}
        </div>
      </div>
    )}
  </div>
);
};