import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import * as RecipeActions from './recipe.actions';
import * as fromRecipes from '../store/recipe.reducers';
import {map, switchMap, withLatestFrom} from 'rxjs/operators';
import {Recipe} from '../recipe.model';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {Store} from '@ngrx/store';

@Injectable()
export class RecipeEffects {
  @Effect()
  recipeFetch = this.actions$
    .pipe(
      ofType(RecipeActions.FETCH_RECIPE),
      switchMap(
        (action: RecipeActions.FetchRecipe) => {
          return this.httpClient.get<Recipe[]>('https://ng-recipe-book-2-d9186.firebaseio.com/recipes.json')
            .pipe(
              map(
                (recipes) => {
                  for (const recipe of recipes) {
                    if (!recipe['ingredients']) {
                      recipe['ingredients'] = [];
                    }
                  }
                  return {
                    type: RecipeActions.SET_RECIPES,
                    payload: recipes
                  };
                }
              )
            );
        }
      ),
    );

  @Effect({dispatch: false})
  recipeStore = this.actions$
    .pipe(
      ofType(RecipeActions.STORE_RECIPE),
      withLatestFrom(this.store.select('recipes')),
      switchMap(
        ([action, state]) => {
          const req = new HttpRequest('PUT', 'https://ng-recipe-book-2-d9186.firebaseio.com/recipes.json',
            state.recipes);
          return this.httpClient.request(req);
        }
      )
    );
  constructor(private actions$: Actions,
              private httpClient: HttpClient,
              private store: Store<fromRecipes.FeatureState>) {}

}
