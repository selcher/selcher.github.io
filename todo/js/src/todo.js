( function() {

	var TodoApp = React.createClass( {
		getInitialState: function() {

			// Load todo list from localStorage
			// else use default
			return {
				todos: localStorage.todos ?
				JSON.parse( localStorage.todos ) :
				[
					{
						name: "Today",
						color: "rgba(255,255,255,0.1)",
						list: [
							{ todo: "todo1", done: false },
							{ todo: "todo2", done: false }
						]
					},
					{
						name: "Monday",
						color: "rgba(255,255,255,0.1)",
						list: [
							{ todo: "todo1", done: false },
							{ todo: "todo2", done: false }
						]
					},
					{
						name: "Tuesday",
						color: "rgba(255,255,255,0.1)",
						list: [
							{ todo: "todo1", done: false },
							{ todo: "todo2", done: false }
						]
					},
					{
						name: "Wednesday",
						color: "rgba(255,255,255,0.1)",
						list: [
							{ todo: "todo1", done: false },
							{ todo: "todo2", done: false }
						]
					},
					{
						name: "Thursday",
						color: "rgba(255,255,255,0.1)",
						list: [
							{ todo: "todo1", done: false },
							{ todo: "todo2", done: false }
						]
					},
					{
						name: "Friday",
						color: "rgba(255,255,255,0.1)",
						list: [
							{ todo: "todo1", done: false },
							{ todo: "todo2", done: false }
						]
					},
					{
						name: "Saturday",
						color: "rgba(255,255,255,0.1)",
						list: [
							{ todo: "todo1", done: false },
							{ todo: "todo2", done: false }
						]
					},
					{
						name: "Sunday",
						color: "rgba(255,255,255,0.1)",
						list: [
							{ todo: "todo1", done: false },
							{ todo: "todo2", done: false }
						]
					}
				]
			};

		},
		handleSaveToStorage: function( e ) {

			// to local storage
			var todos = JSON.stringify( this.state.todos );

			localStorage.setItem( "todos", todos );

		},
		handleSaveAsFile: function( e ) {

			// as file
			var todos = JSON.stringify( this.state.todos );
			var blob = new Blob(
				[ todos ],
				{ type: "text/plain;charset=utf-8" }
			);

			// Uses FileSaver.js
			// https://github.com/eligrey/FileSaver.js
			saveAs( blob, "todos.txt" );

		},
		handleLoadFromFile: function( e ) {

			var fileInput = e.target.files[ 0 ];
			var textType = /text.*/;
			var todos = "";

			if ( fileInput.type.match( textType ) ) {

				var reader = new FileReader();

				reader.onload = function( e ) {

					todos = JSON.parse( reader.result );

					this.setState( { todos: todos } );

				}.bind( this );

				reader.readAsText( fileInput );

			} else {

				alert( "File not supported!" );

			}

		},
		handleNewTodoBox: function( todoLabel ) {

			var newTodos = this.state.todos.concat( [
				{
					name: todoLabel,
					color: "rgba(255,255,255,0.1)",
					list: [
						{ todo: "todo1", done: false },
						{ todo: "todo2", done: false }
					]
				}
			] );

			this.setState( {
				todos: newTodos
			} );

		},
		handleRemoveTodoBox: function( todoLabel ) {

			var newTodos = this.state.todos.slice();
			var indexOfTodoToRemove = null;

			newTodos.forEach( function( todoInfo, i ) {

				if ( todoInfo.name === todoLabel ) {

					indexOfTodoToRemove = i;

				}

			} );

			newTodos.splice( indexOfTodoToRemove, 1 );

			this.setState( {
				todos: newTodos
			} );

		},
		handleNewTodoItem: function( todoLabel, todo ) {

			var newTodos = this.state.todos.slice();

			newTodos.forEach( function( todoInfo ) {

				if ( todoInfo.name === todoLabel ) {

					todoInfo.list = todoInfo.list.concat( [
						{ todo: todo, done: false }
					] );

				}

			} );

			this.setState( {
				todos: newTodos
			} );

		},
		handleRemoveTodoItem: function( todoLabel, todo ) {

			var newTodos = this.state.todos.slice();

			newTodos.forEach( function( todoInfo ) {

				if ( todoInfo.name === todoLabel ) {

					var newListForTodo = todoInfo.list.slice();
					var indexOfTodoItemToRemove = null;

					newListForTodo.forEach( function( todoItem, i ) {

						if ( todoItem.todo === todo.todo ) {

							indexOfTodoItemToRemove = i;

						}

					} );

					newListForTodo.splice( indexOfTodoItemToRemove, 1 );

					todoInfo.list = newListForTodo;

				}

			} );

			this.setState( {
				todos: newTodos
			} );

		},
		render: function() {

			return (
				<div>
					<TodoMenu onSaveToStorage={ this.handleSaveToStorage }
						onSaveAsFile={ this.handleSaveAsFile }
						onLoadFromFile={ this.handleLoadFromFile }
						onNewTodoBox={ this.handleNewTodoBox } />
					<TodoBoxes todos={ this.state.todos }
						onRemoveTodoBox={ this.handleRemoveTodoBox }
						onNewTodoItem={ this.handleNewTodoItem }
						onRemoveTodoItem={ this.handleRemoveTodoItem } />
				</div>
			);

		}
	} );

	var TodoMenu = React.createClass( {
		onSaveToStorage: function( e ) {

			this.props.onSaveToStorage( e );

		},
		onSaveAsFile: function( e ) {

			this.props.onSaveAsFile( e );

		},
		onLoadFromFile: function( e ) {

			this.props.onLoadFromFile( e );

		},
		onNewTodoBox: function( e ) {

			e.preventDefault();

			var todoLabelInput = this.refs.todoLabel.getDOMNode();
			var todoLabel = todoLabelInput.value.trim();

			this.props.onNewTodoBox( todoLabel );

			todoLabelInput.value = "";

		},
		render: function() {

			return (
				<div className="todo-menu-container pure-form">
					<label for="load-file-input">
						<i className="fa fa-upload"></i>
						<input type="file" value="Load from File"
							id="load-file-input"
							className="pure-button pure-button-primary"
							onChange={ this.onLoadFromFile }
							ref="loadTodoFileInput" />
					</label>
					<button id="save-storage-button"
						className="pure-button pure-button-primary"
						onClick={ this.onSaveToStorage }>
						<i className="fa fa-floppy-o"></i>
						> Local Storage
					</button>
					<button id="save-file-button"
						className="pure-button pure-button-primary"
						onClick={ this.onSaveAsFile }>
						<i className="fa fa-floppy-o"></i>
						> File
					</button>
					<form id="add-todo-box-form"
						onSubmit={ this.onNewTodoBox }>
						<input type="text" ref="todoLabel"
							placeholder="Add new todo list" />
					</form>
				</div>
			);

		}
	} );

	var TodoBoxes = React.createClass( {
		render: function() {

			var onRemoveTodoBox = this.props.onRemoveTodoBox;
			var onNewTodoItem = this.props.onNewTodoItem;
			var onRemoveTodoItem = this.props.onRemoveTodoItem;
			var todoBoxes = this.props.todos.map(
				function( todo ) {
					return (
						<TodoBox todo={ todo }
							onRemoveTodoBox={ onRemoveTodoBox }
							onNewTodoItem={ onNewTodoItem }
							onRemoveTodoItem={ onRemoveTodoItem } />
					);
				}
			);

			return (
				<div className="todo-list-container pure-g">
					{ todoBoxes }
				</div>
			);

		}
	} );

	var TodoBox = React.createClass( {
		render: function() {

			var todoData = this.props.todo;
			var todoBoxStyle = {
				"background-color": todoData.color
			};

			return (
				<div style={ todoBoxStyle } className="todo-box pure-u-1-3">
					<TodoForm name={ todoData.name }
						onRemoveTodoBox={ this.props.onRemoveTodoBox }
						onNewTodoItem={ this.props.onNewTodoItem } />
					<TodoList name={ todoData.name }
						list={ todoData.list }
						onRemoveTodoItem={ this.props.onRemoveTodoItem } />
				</div>
			);

		}
	} );

	var TodoForm = React.createClass( {
		onRemoveTodoBox: function() {

			var props = this.props;
			var todoLabel = props.name;

			props.onRemoveTodoBox( todoLabel );

		},
		handleSubmit: function( e ) {

			e.preventDefault();

			var todoLabel = this.props.name;
			var newTodo = this.refs.newTodo.getDOMNode().value.trim();

			this.props.onNewTodoItem( todoLabel, newTodo );

			this.refs.newTodo.getDOMNode().value = "";

		},
		render: function() {

			return (
				<div className="todo-label">
					<i className="fa fa-minus-square"
						onClick={ this.onRemoveTodoBox }>
					</i>
					{ this.props.name }
					<form className="todo-item-add-form pure-form"
						onSubmit={ this.handleSubmit }>
						<input type="text" ref="newTodo"
							className="todo-add-input pure-input-1"
							placeholder="add new item" />
					</form>
				</div>
			);

		}
	} );

	var TodoList = React.createClass( {
		render: function() {

			var todoLabel = this.props.name;
			var onRemoveTodoItem = this.props.onRemoveTodoItem;
			var todos = this.props.list.map(
				function( todo ) {
					return (
						<li>
							<TodoItem name={ todoLabel }
								todo={ todo }
								onRemoveTodoItem={ onRemoveTodoItem } />
						</li>
					);
				}
			);

			return (
				<div className="todo-list">
					<ul>
						{ todos }
					</ul>
				</div>
			);

		}
	} );

	var TodoItem = React.createClass( {
		getInitialState: function() {

			return {
				isDone: false
			};

		},
		componentDidMount: function() {

			this.setState( {
				isDone: this.props.todo.done
			} );

		},
		onChange: function( e ) {

			this.setState( {
				isDone: !this.state.isDone
			} );

		},
		handleRemoveTodoItem: function( e ) {

			e.preventDefault();

			var todoLabel = this.props.name;
			var todo = this.props.todo;

			this.props.onRemoveTodoItem( todoLabel, todo );

		},
		render: function() {

			var todoInfo = this.props.todo;

			return (
				<div className="todo-item">
					<input type="checkbox"
						checked={ this.state.isDone }
						onChange={ this.onChange } />
					<div className="todo-item-info">
						{ todoInfo.todo }
					</div>
					<button id="todo-item-remove-button"
						className="todo-item-remove-button"
						onClick={ this.handleRemoveTodoItem }>
						<i className="fa fa-minus-square"></i>
					</button>
				</div>
			);

		}
	} );

	React.render(
		<TodoApp />,
		document.getElementById( "app" )
	);

} )( );
