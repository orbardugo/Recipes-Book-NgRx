import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {HttpClient} from '@angular/common/http';
import * as fromRecipe from '../../recipes/store/recipe.reducers';
import * as ShoppingListActions from './shopping-list.actions';
import {Store} from '@ngrx/store';
import {map, switchMap, withLatestFrom} from 'rxjs/operators';
import {Ingredient} from '../../shared/ingredient.model';


@Injectable()
export class ShoppingListEffects {
  @Effect()
  shoppingListFetch = this.actions$.pipe(
    ofType(ShoppingListActions.FETCH_INGREDIENTS),
    switchMap(
      (action: ShoppingListActions.FetchIngrediens) => {
        return this.httpClient.get<Ingredient[]>('https://ng-recipe-book-2-d9186.firebaseio.com/shoppingList.json').pipe(
          map(
            (ingredients: Ingredient[]) => {
              return {
                type: ShoppingListActions.SET_INGREDIENTS,
                payload: ingredients
              };
            }
          )
        );
      }
    )
  );

  @Effect({dispatch: false})
  shoppingListStore = this.actions$.pipe(
    ofType(ShoppingListActions.STORE_INGREDIENTS),
    withLatestFrom(this.store.select('shoppingList')),
      switchMap(
        ([action, state]) => {
          return this.httpClient.put('https://ng-recipe-book-2-d9186.firebaseio.com/shoppingList.json?',
            state.ingredients , {observe: 'body'});
        }
      )
  );

  constructor(private actions$: Actions,
              private httpClient: HttpClient,
              private store: Store<fromRecipe.FeatureState>) {}
}
