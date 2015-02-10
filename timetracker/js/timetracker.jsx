/** @jsx React.DOM */

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

// Current task tab content
var CurrentTask = React.createClass( {
	handleTaskNameStartEdit: function( taskInfo ) {
		this.props.startTaskEdit( taskInfo, "name" );
	},
	handleTaskNameChange: function( taskInfo, event ) {
		var name = event.target.value;
		this.props.changeTaskEdit( taskInfo, "name", name );
	},
	handleTaskNameSaveEdit: function( taskInfo ) {
		this.props.saveTaskEdit( taskInfo, "name" );
	},
	handleTaskNameCancelEdit: function( taskInfo ) {
		this.props.cancelTaskEdit( taskInfo, "name" );
	},
	handleTaskDescriptionStartEdit: function( taskInfo ) {
		this.props.startTaskEdit( taskInfo, "description" );
	},
	handleTaskDescriptionChange: function( taskInfo, event ) {
		var description = event.target.value;
		this.props.changeTaskEdit( taskInfo, "description", description );
	},
	handleTaskDescriptionSaveEdit: function( taskInfo ) {
		this.props.saveTaskEdit( taskInfo, "description" );
	},
	handleTaskDescriptionCancelEdit: function( taskInfo ) {
		this.props.cancelTaskEdit( taskInfo, "description" );
	},
	toggleTimer: function( taskInfo ) {
		this.props.toggleTimer( taskInfo );
	},
	handleRemoveTask: function( taskInfo ) {
		this.props.removeTask( taskInfo );
	},
	render: function() {

		var tasks = this.props.task.map(
				function( taskInfo ) {

					var editName = taskInfo.editing.name ? "" : "noBackground noBorder";
					var editNameOkButton = taskInfo.editing.name ? "" : "hide";
					var editNameCancelButton = taskInfo.editing.name ? "" : "hide";
					var editDescription = taskInfo.editing.description ? "" : "noBackground noBorder";
					var editDescriptionOkButton = taskInfo.editing.description ? "" : "hide";
					var editDescriptionCancelButton = taskInfo.editing.description ? "" : "hide";
					var total = taskInfo.total;
					var totalTime = total.h + "h " + total.m + "m " + total.s + "s";
					var playIcon = taskInfo.state == "onPause" ? "taskPlay" : "taskPause";
					var removeIcon = taskInfo.state != "onPause" ? "hide" : "";

					return (
						<tr className={ taskInfo.id % 2 == 0 ? "row-even" : "row-odd" }>
							<td>
								{taskInfo.id + 1}
							</td>
							<td>
								<input type="text" name="name" placeholder="Name"
									className={editName}
		            				value={taskInfo.name}
		            				onClick={this.handleTaskNameStartEdit.bind(this,taskInfo)}
		            				onChange={this.handleTaskNameChange.bind(this,taskInfo)} />
		            			<div className={ "clearFloat" }></div>
		            			<div className={ "icon iconButton iconCheck floatLeft " + editNameOkButton }
			        				onClick={this.handleTaskNameSaveEdit.bind(this,taskInfo)} >
			        			</div>
			        			<div className={ "icon iconButton iconClose floatLeft " + editNameOkButton}
			        				onClick={this.handleTaskNameCancelEdit.bind(this,taskInfo)} >
			        			</div>
							</td>
							<td>
								<textarea name="description" placeholder="Description"
									className={editDescription}
		            				value={taskInfo.description}
		            				onClick={this.handleTaskDescriptionStartEdit.bind(this,taskInfo)}
		            				onChange={this.handleTaskDescriptionChange.bind(this,taskInfo)} >
		            			</textarea>
		            			<div className={ "clearFloat" }></div>
		            			<div className={ "icon iconButton iconCheck floatLeft " + editDescriptionOkButton }
			        				onClick={this.handleTaskDescriptionSaveEdit.bind(this,taskInfo)} >
			        			</div>
			        			<div className={ "icon iconButton iconClose floatLeft " + editDescriptionOkButton}
			        				onClick={this.handleTaskDescriptionCancelEdit.bind(this,taskInfo)} >
			        			</div>
							</td>
							<td>
								{totalTime}
							</td>
							<td>
								<div className={ "cursor icon " + playIcon }
									onClick={this.toggleTimer.bind(this,taskInfo)}></div>
								<div className={ "cursor icon iconClose " + removeIcon }
									onClick={this.handleRemoveTask.bind(this,taskInfo)}></div>
							</td>
						</tr>
					);

				}.bind( this )

			);

		return (
			<div>
				<br/>
				<table className={"pure-table pure-table-horizontal"}>
					<thead>
						<tr>
							<th>#</th>
							<th>Name</th>
							<th>Description</th>
							<th>Total</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{tasks}
					</tbody>
				</table>
			</div>
		);

	}
} );

// New task tab content
var NewTask = React.createClass( {
	getInitialState: function() {
		return {
			taskName : "",
			taskDescription : "",
			message : "",
			status : "",
			timer : null
		};
	},
	handleTaskNameChange: function( event ) {
		this.setState( {
			taskName : event.target.value,
			taskDescription : this.state.taskDescription
		} );
	},
	handleTaskDescriptionChange: function( event ) {
		this.setState( {
			taskName : this.state.taskName,
			taskDescription : event.target.value
		} );
	},
	onAddNewTask: function( ) {

		var taskName = this.state.taskName;
		var taskDescription = this.state.taskDescription;
		var messge = "";
		var status = "";

		if ( taskName && taskDescription ) {

			this.props.onAddNewTaskClick( this.state.taskName, this.state.taskDescription );

			message = "Successfully added new task to the list";
			status = "success";

		} else {

			message = "Please provide a name and description";
			status = "error";

		}

		if ( this.state.timer ) {
			window.clearTimeout( this.state.timer );
		}

		var timer = setTimeout( function() {

			this.setState( { 
				message : "",
				status : "",
				timer : null
			} );
			
		}.bind( this ), 3000 );

		this.setState( { 
			message : message,
			status : status,
			timer : timer
		} );

	},
	render: function() {

		var taskName = this.state.taskName;
		var taskDescription = this.state.taskDescription;
		var status = this.state.status;
		var messageClass = status == "" ? "" : 
			( status == "success" ? "successMessage" : "errorMessage" );

		return (
			<form name="contact" action="#" method="post" 
	       		className={"pure-form pure-form-stacked "}>

	       		<br/>

				<fieldset>

			    	<legend></legend>

		        	<label>Name:</label>
		            <input type="text" name="name" placeholder="Name"
		            	value={taskName} onChange={this.handleTaskNameChange} />

		            <br/>

		            <label>Description:</label>
		            <textarea name="message" placeholder="Description of task..."
		            	value={taskDescription} onChange={this.handleTaskDescriptionChange} >
		            </textarea>

		            <br/>

			        <div className={"pure-controls"}>
			        	<input type="button" 
			        		className={"pure-button pure-button-primary"} value="Add"
			        		onClick={ this.onAddNewTask.bind( this ) } />
			        	&nbsp;
			        	<input type="reset" 
			        		className={"pure-button"} value="Reset" /> 
			        </div>

			        <br/>

			        <ReactCSSTransitionGroup transitionName={"show-hide-animation"}>
			        	<div key={this.state.message}
			        		className={ messageClass }>
			        		{this.state.message}
			        	</div>
			        </ReactCSSTransitionGroup>

			    </fieldset>

			</form>
		);

	}

} );

// Sidebar tabs
var SidebarTabs = React.createClass( {
	onClick: function( tabId ) {
		this.props.onTabClick( tabId );
	},		
	render: function() {

		var activeTab = this.props.activeTab;
		var tabs = this.props.data.map(
				function( tab ) {
					return (
						<li className={ tab.id == activeTab ? "pure-menu-selected" : "" }
							onClick={ this.onClick.bind( this, tab.id ) }>
							<a className={"menu-item-link"} href="#">
								{ tab.text }
							</a>
						</li>
					);
				}.bind( this )
			);

		var d = new Date();
		var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
		var dayOfWeek = days[ d.getDay() ];
		var months = ["January","February","March","April","May","June",
			"July","August","September","October","November","December"];
		var month = months[ d.getMonth() ];
		var today = month + " " + d.getDate() + ", " + d.getFullYear();

		return (
			<nav id="sidebar-tabs" className={"pure-menu pure-menu-open"}>
				<a className={"pure-menu-heading main-menu-heading"}>
					{today}<br/>{dayOfWeek}
				</a>
				<ul className={"menu-list"}>
					{tabs}
				</ul>
			</nav>
		);

	}

} );

// Time tracker app
var App = React.createClass( {
	getInitialState: function() {
		return {
			activeTab : 0,
			data : [
				{ id: 0, text : "New Task" },
				{ id: 1, text : "Current Tasks" },
			],
			task : [
				{ id : 0, 
					name : "First task",
					description : "Description...",
					state : "onPause",
					editing : {
						name : false,
						nameStore : "",
						description : false,
						descriptionStore : ""
					},
					total : { h : 0, m : 0, s : 0 } },
				{ id : 1, 
					name : "Second task", 
					description : "Description...",
					state : "onPause",
					editing : {
						name : false,
						nameStore : "",
						description : false,
						descriptionStore : ""
					},
					total : { h : 0, m : 0, s : 0 } }
			]
		};
	},
	handleTabClick: function( tabId ) {
		this.setState( { activeTab : tabId } );
	},
	handleAddNewTaskClick: function( name, description ) {
		var currentTasks = this.state.task;
		var newTask = {
			id : currentTasks.length,
			name : name,
			description : description,
			state : "onPause",
			editing : {
				name : false,
				nameStore : "",
				description : false,
				descriptionStore : ""
			},
			total : { h : 0, m : 0, s : 0 }
		};
		currentTasks.push( newTask );
		this.setState( { task : currentTasks } );
	},
	handleRemoveTaskClick: function( taskInfo ) {
		var currentTasks = this.state.task.slice();
		var length = currentTasks.length;
		var taskId = taskInfo.id;
		var taskIndexInList = null;

		for( var i = 0; i < length; i++ ) {
			if ( currentTasks[ i ].id == taskId ) {
				taskIndexInList = i;
			}
		}

		currentTasks.splice( taskIndexInList, 1 );
		this.setState( { task : currentTasks } );
	},
	handleStartTaskEdit: function( taskInfo, fieldName ) {
		var currentTasks = this.state.task;
		currentTasks[ taskInfo.id ].editing[ fieldName ] = true;
		currentTasks[ taskInfo.id ].editing[ fieldName + "Store" ] = currentTasks[ taskInfo.id ][ fieldName ];
		this.setState( { task : currentTasks } );
	},
	handleChangeTaskEdit: function( taskInfo, fieldName, fieldValue ) {
		var currentTasks = this.state.task;
		currentTasks[ taskInfo.id ][ fieldName ] = fieldValue;
		this.setState( { task : currentTasks } );
	},
	handleSaveTaskEdit: function( taskInfo, fieldName ) {
		var currentTasks = this.state.task;
		currentTasks[ taskInfo.id ].editing[ fieldName ] = false;
		currentTasks[ taskInfo.id ].editing[ fieldName + "Store" ] = "";
		this.setState( { task : currentTasks } );
	},
	handleCancelTaskEdit: function( taskInfo, fieldName ) {
		var currentTasks = this.state.task;
		currentTasks[ taskInfo.id ][ fieldName ] = currentTasks[ taskInfo.id ].editing[ fieldName + "Store" ];
		currentTasks[ taskInfo.id ].editing[ fieldName ] = false;
		currentTasks[ taskInfo.id ].editing[ fieldName + "Store" ] = "";
		this.setState( { task : currentTasks } );
	},
	handleToggleTimer: function( taskInfo ) {
		
		var self = this;
		var currentTasks = this.state.task;

		function updateTask( task ) {
			currentTasks[ task.id ] = task;
			self.setState( { task : currentTasks } );
		}

		if ( taskInfo.timer ) {

			window.clearInterval( taskInfo.timer );
			taskInfo.timer = null;

			taskInfo.state = "onPause";

		} else {

			taskInfo.state = "onPlay";

			taskInfo.timer = setInterval( function() {

				var sec = taskInfo.total.s + 1 >= 60 ? 0 : taskInfo.total.s + 1;
				var addMin = taskInfo.total.s + 1 >= 60;
				var addHr = addMin && taskInfo.total.m + 1 >= 60;

				taskInfo.total.s = sec;
				taskInfo.total.m = addMin ? 
					( addHr ? 0 : taskInfo.total.m + 1 ) : taskInfo.total.m;
				taskInfo.total.h = addHr ? taskInfo.total.h + 1 : taskInfo.total.h;

				updateTask( taskInfo );

			}.bind( this ), 1000 );

		}

		updateTask( taskInfo );
		
	},
	render: function() {
		return (
			<div className={"pure-g"}>

				<aside id="sidebar" 
					className={"pure-u-1 pure-u-md-5-24 pure-u-lg-1-4 small-box shadow"}>

			       	<SidebarTabs activeTab={this.state.activeTab} data={this.state.data}
			       		onTabClick={this.handleTabClick} />

			    </aside>

			    <aside id="task-content" 
			    	className={"pure-u-1 pure-u-md-18-24 pure-u-lg-17-24 small-box shadow"}>

			    	<ReactCSSTransitionGroup transitionName="switch-tab-animation"
							transitionLeave={false}>
				       	<div id="new-task-form" 
				       		key={this.state.activeTab}
				       		className={ this.state.activeTab == 0 ? "showTab" : "hideTab" }>
				       		<NewTask onAddNewTaskClick={this.handleAddNewTaskClick} />
				       	</div>
			       	</ReactCSSTransitionGroup>

			       	<ReactCSSTransitionGroup transitionName="switch-tab-animation"
							transitionLeave={false}>
				       	<div id="current-task-content"
				       		key={this.state.activeTab}
				       		className={ this.state.activeTab == 1 ? "showTab" : "hideTab" }>
				    		<CurrentTask task={this.state.task}
				    			startTaskEdit={this.handleStartTaskEdit}
				    			changeTaskEdit={this.handleChangeTaskEdit}
				    			saveTaskEdit={this.handleSaveTaskEdit}
				    			cancelTaskEdit={this.handleCancelTaskEdit}
				    			toggleTimer={this.handleToggleTimer}
				    			removeTask={this.handleRemoveTaskClick} />
				    	</div>
			    	</ReactCSSTransitionGroup>

			    </aside>

		    </div>
		);
	}
} );

React.renderComponent(
	<App />,
	document.getElementById( "app" )
);