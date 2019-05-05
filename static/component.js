
var socket;

class App extends React.Component{
	constructor(props){
		super(props);
		this.state = {'lst' : [''],
						'r':['']}; 

      // Setup socket
      // websocket on port 8090
      socket = new WebSocket("ws://localhost:8090");
      // What to do when opened
      socket.onopen = function (event) {
         console.log("connected");
      };

      // onclose send alert
      socket.onclose = function (event) {
            alert("closed code:" + event.code + " reason:" +event.reason + " wasClean:"+event.wasClean);
      };
      this.updateFood = this.updateFood.bind(this);

      socket.onmessage = this.updateFood;
	}
   updateFood (event){
         var data=JSON.parse(event.data);
         
         var foodlst= data.ingredient;
         console.log(foodlst);


         var callback =  (function(food, recipes){
            this.setState({'lst':food,
                     'r': recipes})
         }).bind(this);
         // Update Recipes
         updateRecipes(foodlst, callback);
         // using recipepuppy for recipes
   }

	render(){
		
		return(
			<div>
				<h1>Ingredients</h1>
				<IngredientLst food={this.state.lst} /> 
				<br />
				<h1>Recipes</h1>
				<RecipeLst recipes={this.state.r} />
			</div>
			)
	
	}
}

function updateRecipes(foodlst, callback){
   var s=""

   foodlst.forEach(function(i){
      s+= i+','
   })
   // $.ajax({ 
   //    method: "GET", 
   //    url: "http://localhost:8000/www.recipepuppy.com/api/"+s
   // }).done(function(data){
   //    callback(foodlst, data.results)
   //    });
   fetch(
  "http://recipepuppyproxy.herokuapp.com/api/?i=" + s)
   .then(function(response) {
      if (response.status !== 200) {
         console.log("Broken: " + response.status);
         return;
      }
      console.log('now here')
      response.json().then(function(data) {
         callback(foodlst, data.results)
   })
   })

}


// ************************************************
// ingredient sections


class IngredientLst extends React.Component{
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
    		<li><Ingredient food={number}/></li>
  			);
		}
		return (<div>
			{body_txt}
			</div>)
	}
}
class Ingredient extends React.Component{
   constructor(props){
      super(props)
      this.buttonHandler = this.buttonHandler.bind(this)
   }
   buttonHandler(){
      $.ajax({ 
      method: "GET", 
      url: "http://localhost:8088/api/remove/"+this.props.food
   })

   }

   render(props){
      var lst = this.props.food
      
      return (<table>
         <tr><td>
         {lst}
         </td><td>
         <button onClick={this.buttonHandler}>X</button>
         </td></tr>
         </table>)
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
     







