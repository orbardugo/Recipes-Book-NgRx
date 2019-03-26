import {Component, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import {Store} from '@ngrx/store';
import * as fromRecipes from '../store/recipe.reducers';
import * as RecipeAction from '../store/recipe.actions';



@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  // recipeState: Observable<fromRecipes.State>;
  recipe: Recipe;
  id: number;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromRecipes.FeatureState>) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        // this.recipeState = this.store.select('recipes');
        this.store.select('recipes').subscribe((recipeState: fromRecipes.State) => {
          this.recipe = recipeState.recipes[this.id];
        });
      }
    );
  }

  onAddtoShoppingList() {
    // this.store.select('recipes').pipe(
    //   take(1)
    // )
    //   .subscribe(
    //     (recipeState: fromRecipes.State) => {
    //       this.store.dispatch(new ShoppingListActions.AddIngredients(recipeState.recipes[this.id].ingredients));
    //     }
    //   );
    this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients));

  }

  onEditRecipe() {
      this.router.navigate(['edit'], {relativeTo: this.route});
      // this.router.navigate(['../', this.id , 'edit'], {relativeTo: this.route});
  }

  onDeleteRecipe() {
    this.store.dispatch(new RecipeAction.DeleteRecipe(this.id));
    this.router.navigate(['recipes']);
  }
}
