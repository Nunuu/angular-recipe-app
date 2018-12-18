import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';
import { map } from 'rxjs/operators';

import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";

@Injectable()
export class DataStorageService {
    private SERVER_URL = 'https://angular-recipe-c1105.firebaseio.com/';

    constructor(
        private http: Http,
        private recipeService: RecipeService
    ) {}

    storeRecipes() {
        return this.http.put(this.SERVER_URL + 'recipes.json', this.recipeService.getRecipes());
    }

    fetchRecipes() {
        this.http.get(this.SERVER_URL + 'recipes.json')
            .pipe(map((response: Response) => {
                const recipes: Recipe[] = response.json();
                for (let recipe of recipes) {
                    if (!recipe['ingredients']) {
                        recipes['ingredients'] = [];
                    }
                }
                return recipes;
            }))
            .subscribe((recipes: Recipe[]) => {
                this.recipeService.setRecipes(recipes);
            }
        );
    }
}