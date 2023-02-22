window.addEventListener('load', () => { //Ce qui doit se passer dès qu'on charge la page
	todos = JSON.parse(localStorage.getItem('todos')) || []; //defini todos comme le chemin permettant de recuperer les donnes de localStorage
	const nameInput = document.querySelector('#name'); //#name = id in html doc
	const newTodoForm = document.querySelector('#new-todo-form'); //queryselector return le premier element correspondant a cette id

	const username = localStorage.getItem('username') || ''; //ordre des const pas important

	nameInput.value = username; //Doit etre ecrrit apres avoir defini nameInput et username

	nameInput.addEventListener('change', (e) => {
		localStorage.setItem('username', e.target.value);
	}) //change le nom dans localStorage quand changer sur la page

	newTodoForm.addEventListener('submit', e => { //fonction determine ce qu'il se passe quand on remplit le formulaire et les infos qu'il recupere
		e.preventDefault(); //empeche l'event de se produire si c'est possible(en cas d'erreur de la fonction)

		const todo = { //ce qu'un nouvel element va contenir et ou il va les chercher dans le html
			content: e.target.elements.content.value, 
			category: e.target.elements.category.value,
			done: false,
			createdAt: new Date().getTime()
		}

		todos.push(todo); //return la nouvelle array de todo dans todos

		localStorage.setItem('todos', JSON.stringify(todos)); //save le nouvel element dans localstorage

		// Reset the form
		e.target.reset();

		DisplayTodos(); //affiche le nouvel element quand il est submit
	})

	DisplayTodos(); //affiche les element saved dans localStorage quand on charge la page
})

function DisplayTodos () { //la fonction determine comment s'affiche le nouvel element et les interactions possible
	const todoList = document.querySelector('#todo-list'); // pour connecter à la div todo-list qui contient les element
	todoList.innerHTML = ""; //Demande a la fonction d'écrire en HTML

	todos.forEach(todo => { //pour chaque element dans todos (=todo) procede la fonction suivante
		const todoItem = document.createElement('div'); //crée une div HTML pour chaque nouvel element de la todo
		todoItem.classList.add('todo-item'); //ajoute les elements contenu dans todo-item (class HTML) à la div creer ci dessus
						     //add() est un attribut de classList() comme remove() item() toggle() contains() ou replace ()
		const label = document.createElement('label');  //createElement crée un élément html reconnu par le tagname
		const input = document.createElement('input');  //input défini en HTML un element modifiables par l'utilisateur en fonction de son type=
		const span = document.createElement('span');
		const content = document.createElement('div'); //Defini les variables pour creer le HTML de l'element
		const actions = document.createElement('div');
		const edit = document.createElement('button');
		const deleteButton = document.createElement('button');

		input.type = 'checkbox'; //determine la checkbox de l'element (sinon c'est un espace text)
		input.checked = todo.done; //connecte au CSS si la checkbox est coché ou non
		span.classList.add('bubble'); //affiche la checkbox de l'élement
		if (todo.category == 'personal') {
			span.classList.add('personal'); //détermine la catégorie de l'élement
		} else {
			span.classList.add('business'); //categorie par defaut
		}
		content.classList.add('todo-content');//affiche l'espace texte de l'élément
		actions.classList.add('actions'); //affiche l'espace actions de l'element (bouton edit et delete)
		edit.classList.add('edit'); // affiche le bouton edit
		deleteButton.classList.add('delete'); //affiche le bouton delete

		content.innerHTML = `<input type="text" value="${todo.content}" readonly>`; //affiche le texte de l'element
		edit.innerHTML = 'Edit'; //affiche le texte du bouton
		deleteButton.innerHTML = 'Delete'; //affiche le texte du bouton

		label.appendChild(input);             //crée le HTML de l'element ??
		label.appendChild(span);              //
		actions.appendChild(edit);            //
		actions.appendChild(deleteButton);    //
		todoItem.appendChild(label);          //
		todoItem.appendChild(content);        //
		todoItem.appendChild(actions);        //

		todoList.appendChild(todoItem);

		if (todo.done) {
			todoItem.classList.add('done');   //connecte au css pour barrer ou non l'element quand la checkbox et coché
		}
		
		input.addEventListener('change', (e) => {
			todo.done = e.target.checked;
			localStorage.setItem('todos', JSON.stringify(todos)); //change l'etat de l'element dans localStorage

			if (todo.done) {
				todoItem.classList.add('done'); //barre l'element si la checkbox est coché
			} else {
				todoItem.classList.remove('done'); //pas barré par defaut
			}

			DisplayTodos() //affiche le changement

		})

		edit.addEventListener('click', (e) => {  //action du bouton edit
			const input = content.querySelector('input'); 
			input.removeAttribute('readonly'); //enleve la lecture simple
			input.focus(); //Montre la possibilié de changer la zone de texte
			input.addEventListener('blur', (e) => {  //fonction qui determine se qu'il se passe quand on enleve le focus
				input.setAttribute('readonly', true); //remet la lecture seule
				todo.content = e.target.value; //observe les modificatios
				localStorage.setItem('todos', JSON.stringify(todos)); //enregistre les modifs dans le localStorage
				DisplayTodos() //affiche les modifications

			})
		})

		deleteButton.addEventListener('click', (e) => { //function qui determine l'action du bouton delete
			todos = todos.filter(t => t != todo); //crée un nouvel element avec ce qui est different de l'element selectionné (vu plus haut, si vide ne rien enregistré)
			localStorage.setItem('todos', JSON.stringify(todos)); //enregistre les modifications dans localStorage
			DisplayTodos() //affiche les modifications
		})

	})
}
