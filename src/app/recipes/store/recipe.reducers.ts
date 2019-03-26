import {Recipe} from '../recipe.model';
import {Ingredient} from '../../shared/ingredient.model';
import * as RecipeActions from './recipe.actions';
import * as fromApp from '../../store/app.reducers';

export interface FeatureState extends fromApp.AppState {
  recipes: State;
}

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: [
    new Recipe('Tasty Schnitzel',
      'Asuper-tasty Schnitzel - just awesome',
      'https://upload.wikimedia.org/wikipedia/commons/8/89/Wiener_Schnitzel_at_Gasthaus_Joainig_%28lightened%29.jpg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
      ]),
    new Recipe('Big Fat Burger',
      'What else you need to say?',
      'https://www.publicdomainpictures.net/pictures/240000/nahled/burger-on-a-wooden-backgound.jpg',
      [
        new Ingredient('Bread', 2),
        new Ingredient('Meat', 1),
        new Ingredient('Tomatoes', 2),
        new Ingredient('Lettuce', 1),
        new Ingredient('Onion', 3)
      ])
  ]
};

export function recipeReducer (state = initialState, action: RecipeActions.RecipeActions) {
  switch (action.type ) {
    case (RecipeActions.SET_RECIPES):
      return {
        ...state,
        recipes: [...action.payload]

      };
    case  (RecipeActions.ADD_RECIPE):
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      };
    case (RecipeActions.UPDATE_RECIPE):
      const recipe = state.recipes[action.payload.index];
      const updatedRecipe = {
        ...recipe,
        ...action.payload.UpdatedRecipe
      };
      const recipes = [...state.recipes];
      recipes [action.payload.index] = updatedRecipe;
      return {
        ...state,
        recipes: recipes
      };
    case (RecipeActions.DELETE_RECIPE):
      const oldRecipes = [...state.recipes];
      oldRecipes.splice(action.payload, 1);
      return {
        ...state,
        recipes: oldRecipes
      };
    default:
      return state;
  }
}
