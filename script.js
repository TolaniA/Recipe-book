document.addEventListener('DOMContentLoaded', () => {
    const recipeList = document.getElementById('recipe-list');
    const searchInput = document.getElementById('search');
    const filterButtons = document.querySelectorAll('nav ul li button');
    const recipeForm = document.getElementById('recipe-form');

    let recipes = [
        {
            name: 'Pancakes',
            category: 'breakfast',
            ingredients: 'Flour, Eggs, Milk, Sugar, Butter',
            instructions: 'Mix ingredients, cook on a griddle.',
            image: 'https://valentinascorner.com/wp-content/uploads/2018/11/Classic-Pancakes-9-900x1350.jpg'
        },
        {
            name: 'Caesar Salad',
            category: 'lunch',
            ingredients: 'Lettuce, Croutons, Caesar Dressing, Parmesan',
            instructions: 'Mix ingredients, top with dressing.',
            image: 'https://www.foodiecrush.com/wp-content/uploads/2019/09/Caesar-Salad-foodiecrush.com-017.jpg'
        },
        {
            name: 'Spaghetti Carbonara',
            category: 'dinner',
            ingredients: 'Spaghetti, Eggs, Bacon, Parmesan, Pepper',
            instructions: 'Cook spaghetti, mix with other ingredients.',
            image: 'https://lisasdinnertimedish.com/wp-content/uploads/2016/01/3151e.jpg-3151.jpg'
        },
        {
            name: 'Chocolate Cake',
            category: 'dessert',
            ingredients: 'Flour, Sugar, Cocoa, Eggs, Butter, Baking Powder',
            instructions: 'Mix ingredients, bake in the oven.',
            image: 'https://www.cookingclassy.com/wp-content/uploads/2019/10/chocolate-cake-3.jpg'
        }
    ];

    function displayRecipes(filteredRecipes) {
        recipeList.innerHTML = '';
        filteredRecipes.forEach(recipe => {
            const recipeCard = document.createElement('div');
            recipeCard.classList.add('recipe-card');
            recipeCard.innerHTML = `
                <img src="${recipe.image}" alt="${recipe.name}">
                <div class="details">
                    <h3>${recipe.name}</h3>
                    <p>Category: ${recipe.category}</p>
                    <p>Ingredients: ${recipe.ingredients}</p>
                    <p>Instructions: ${recipe.instructions}</p>
                </div>
            `;
            recipeList.appendChild(recipeCard);
        });
    }

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredRecipes = recipes.filter(recipe =>
            recipe.name.toLowerCase().includes(searchTerm)
        );
        displayRecipes(filteredRecipes);
    });

    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            const filter = e.target.dataset.filter;
            const filteredRecipes = filter === 'all' ? recipes : recipes.filter(recipe => recipe.category === filter);
            displayRecipes(filteredRecipes);
        });
    });

    recipeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newRecipe = {
            name: document.getElementById('recipe-name').value,
            category: document.getElementById('recipe-category').value,
            ingredients: document.getElementById('recipe-ingredients').value,
            instructions: document.getElementById('recipe-instructions').value,
            image: 'https://via.placeholder.com/200' // Placeholder image, you can allow users to upload images
        };
        recipes.push(newRecipe);
        displayRecipes(recipes);
        recipeForm.reset();
    });

    // Initial display
    displayRecipes(recipes);
});
