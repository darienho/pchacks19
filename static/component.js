

class App extends React.Component{
	constructor(props){
		super(props);
		this.state = {'lst' : ['apple', 'banana', 'cheese'],
						'r':[
      {
         "title":"All Purpose Seasoning Salt",
         "href":"http:\/\/www.recipezaar.com\/All-Purpose-Seasoning-Salt-209434",
         "ingredients":"garlic, onions, black pepper, kosher salt",
         "thumbnail":"http:\/\/img.recipepuppy.com\/55071.jpg"
      },
      {
         "title":"Grilled Jalapeno Buffalo Burgers",
         "href":"http:\/\/www.recipezaar.com\/Grilled-Jalapeno-Buffalo-Burgers-4805",
         "ingredients":"garlic, buffalo, jalapeno, onions",
         "thumbnail":"http:\/\/img.recipepuppy.com\/220879.jpg"
      },
      {
         "title":"Caramelized Onions",
         "href":"http:\/\/www.recipezaar.com\/Caramelized-Onions-49000",
         "ingredients":"garlic, olive oil, onions, salt",
         "thumbnail":"http:\/\/img.recipepuppy.com\/281743.jpg"
      },
      {
         "title":"Cornish Game Hens With Garlic Cloves and Onion",
         "href":"http:\/\/www.recipezaar.com\/Cornish-Game-Hens-With-Garlic-Cloves-and-Onion-161812",
         "ingredients":"cornish hens, garlic, salt, onions",
         "thumbnail":"http:\/\/img.recipepuppy.com\/324701.jpg"
      },
      {
         "title":"Easy 4 Ingredient Salmon Teriyaki",
         "href":"http:\/\/www.recipezaar.com\/Easy-4-Ingredient-Salmon-Teriyaki-271585",
         "ingredients":"garlic, teriyaki sauce, onions, salmon",
         "thumbnail":"http:\/\/img.recipepuppy.com\/510750.jpg"
      },
      {
         "title":"\n                  King Crab Legs Over Rice Recipe\n                  \n",
         "href":"http:\/\/cookeatshare.com\/recipes\/king-crab-legs-over-rice-44677",
         "ingredients":"crab meat, onions, garlic, rice",
         "thumbnail":"http:\/\/img.recipepuppy.com\/668145.jpg"
      },
      {
         "title":"Crock Pot Caramelized Onions",
         "href":"http:\/\/www.recipezaar.com\/Crock-Pot-Caramelized-Onions-102934",
         "ingredients":"beef broth, butter, garlic, onions",
         "thumbnail":"http:\/\/img.recipepuppy.com\/39060.jpg"
      },
      {
         "title":"Slow Cooker Chile Verde",
         "href":"http:\/\/allrecipes.com\/Recipe\/Slow-Cooker-Chile-Verde\/Detail.aspx",
         "ingredients":"garlic, olive oil, onions, pork chops",
         "thumbnail":"http:\/\/img.recipepuppy.com\/12711.jpg"
      },
      {
         "title":"Best Black Beans",
         "href":"http:\/\/allrecipes.com\/Recipe\/Best-Black-Beans\/Detail.aspx",
         "ingredients":"cayenne, garlic, onions, salt",
         "thumbnail":"http:\/\/img.recipepuppy.com\/17438.jpg"
      },
      {
         "title":"Chicken Puffs",
         "href":"http:\/\/allrecipes.com\/Recipe\/Chicken-Puffs\/Detail.aspx",
         "ingredients":"butter, chicken, garlic, onions",
         "thumbnail":"http:\/\/img.recipepuppy.com\/26549.jpg"
      }
   ]};
	}

	render(){
		
		return(
			<div>
				<h1>Ingredients</h1>
				<Ingredient food={this.state.lst} /> 
				<br />
				<h1>Recipes</h1>
				<RecipeLst recipes={this.state.r} />
			</div>
			)
	
	}
}


// ************************************************
// ingredient sections


class Ingredient extends React.Component{
	constructor(props){
		super(props)
	}
	render(props){
		var lst = this.props.food
		var body_txt;
		if (lst.length === 0){
			body_txt = (<span>no ingredients entered yet</span>)
		}else{
		body_txt = lst.map((number) =>
    		<li>{number}</li>
  			);
		}
		return (<div>
			{body_txt}
			</div>)
	}

}


// ************************************************
// Recipe Section

         // "title":"Chicken Puffs",
         // "href":"http:\/\/allrecipes.com\/Recipe\/Chicken-Puffs\/Detail.aspx",
         // "ingredients":"butter, chicken, garlic, onions",

  class RecipeLst extends React.Component{
	constructor(props){
		super(props)
	}
	render(props){
		var lst = this.props.recipes
		var body_txt;
		if (lst.length === 0){
			body_txt = (<span>no recipes :(</span>)
		}else{
		body_txt = lst.map((number) =>
    		<li><Recipe lst={number.ingredients}  link={number.href}  name={number.title} /></li>
  			);
		}
		return (<div>
			{body_txt}
			</div>)
	}

} 
  class Recipe extends React.Component{
	constructor(props){
		super(props)
	}
	render(props){
		var lst = this.props.lst
		var body_txt = (<div> {lst} </div>);
		

		return (<div>
			<a href={this.props.link}> <h3>{this.props.name}</h3> </a>
			{body_txt}
			</div>)
	}

} 

ReactDOM.render(<App />, document.getElementById('root'));
     







