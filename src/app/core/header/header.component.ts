import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromRecipe from '../../recipes/store/recipe.reducers';
import * as RecipeActions from '../../recipes/store/recipe.actions';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import * as fromAuth from '../../auth/store/auth.reducers';
import {Observable} from 'rxjs';
import * as AuthActions from '../../auth/store/auth.actions';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  authState: Observable<fromAuth.State>;

  constructor(private store: Store<fromRecipe.FeatureState>) { }

  ngOnInit() {
    this.authState = this.store.select('auth');
  }

  storeData() {
    this.store.dispatch(new RecipeActions.StoreRecipe());
    this.store.dispatch(new ShoppingListActions.StoreIngredients());
    alert('Recipes & Shopping-List was saved');
  }

  getData() {
    this.store.dispatch(new RecipeActions.FetchRecipe());
    this.store.dispatch(new ShoppingListActions.FetchIngrediens());
    alert('Recipes & Shopping-List was loaded');
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
  }

}
