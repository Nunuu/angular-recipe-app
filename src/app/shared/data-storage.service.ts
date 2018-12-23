import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';
import { map } from 'rxjs/operators';

import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class DataStorageService {
    private SERVER_URL = 'https://angular-recipe-c1105.firebaseio.com/';

    constructor(
        private http: Http,
        private recipeService: RecipeService,
        private authService: AuthService
    ) {}

    storeRecipes() {
        const token = this.authService.getToken();

        return this.http.put(
            this.SERVER_URL + 'recipes.json?auth=' + token, 
            this.recipeService.getRecipes()
        );
    }

    fetchRecipes() {
        const token = this.authService.getToken();

        this.http.get(this.SERVER_URL + 'recipes.json?auth=' + token)
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