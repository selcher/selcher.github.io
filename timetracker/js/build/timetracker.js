var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

// Task list container
var TaskListContainer = React.createClass( {displayName: "TaskListContainer",
	render: function() {

		var showCurrentTasks = this.props.show ? "showTab" : "hideTab";

		return (
			React.createElement("div", {id: "current-task-content", 
				className: showCurrentTasks }, 

				React.createElement(TaskList, {tasks:  this.props.tasks, 
					startTaskEdit:  this.props.startTaskEdit, 
					changeTaskEdit:  this.props.changeTaskEdit, 
					saveTaskEdit:  this.props.saveTaskEdit, 
					cancelTaskEdit:  this.props.cancelTaskEdit, 
					toggleTimer:  this.props.toggleTimer, 
					removeTask:  this.props.removeTask})

			)
		);

	}
} );

// Current task tab content
var TaskList = React.createClass( {displayName: "TaskList",
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

		var tasks = this.props.tasks.map(
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
						React.createElement("tr", {className:  taskInfo.id % 2 == 0 ? "row-even" : "row-odd"}, 
							React.createElement("td", null, 
								taskInfo.id + 1
							), 
							React.createElement("td", null, 
								React.createElement("input", {type: "text", name: "name", placeholder: "Name", 
									className: editName, 
		            				value: taskInfo.name, 
		            				onClick: this.handleTaskNameStartEdit.bind(this,taskInfo), 
		            				onChange: this.handleTaskNameChange.bind(this,taskInfo)}), 
		            			React.createElement("div", {className: "clearFloat" }), 
		            			React.createElement("div", {className:  "icon iconButton iconCheck floatLeft " + editNameOkButton, 
			        				onClick: this.handleTaskNameSaveEdit.bind(this,taskInfo)}
			        			), 
			        			React.createElement("div", {className:  "icon iconButton iconClose floatLeft " + editNameOkButton, 
			        				onClick: this.handleTaskNameCancelEdit.bind(this,taskInfo)}
			        			)
							), 
							React.createElement("td", null, 
								React.createElement("textarea", {name: "description", placeholder: "Description", 
									className: editDescription, 
		            				value: taskInfo.description, 
		            				onClick: this.handleTaskDescriptionStartEdit.bind(this,taskInfo), 
		            				onChange: this.handleTaskDescriptionChange.bind(this,taskInfo)}
		            			), 
		            			React.createElement("div", {className: "clearFloat" }), 
		            			React.createElement("div", {className:  "icon iconButton iconCheck floatLeft " + editDescriptionOkButton, 
			        				onClick: this.handleTaskDescriptionSaveEdit.bind(this,taskInfo)}
			        			), 
			        			React.createElement("div", {className:  "icon iconButton iconClose floatLeft " + editDescriptionOkButton, 
			        				onClick: this.handleTaskDescriptionCancelEdit.bind(this,taskInfo)}
			        			)
							), 
							React.createElement("td", null, 
								totalTime
							), 
							React.createElement("td", null, 
								React.createElement("div", {className:  "cursor icon " + playIcon, 
									onClick: this.toggleTimer.bind(this,taskInfo)}), 
								React.createElement("div", {className:  "cursor icon iconClose " + removeIcon, 
									onClick: this.handleRemoveTask.bind(this,taskInfo)})
							)
						)
					);

				}.bind( this )

			);

		return (
			React.createElement("div", null, 
				React.createElement("br", null), 
				React.createElement("table", {className: "pure-table pure-table-horizontal"}, 
					React.createElement("thead", null, 
						React.createElement("tr", null, 
							React.createElement("th", null, "#"), 
							React.createElement("th", null, "Name"), 
							React.createElement("th", null, "Description"), 
							React.createElement("th", null, "Total"), 
							React.createElement("th", null)
						)
					), 
					React.createElement("tbody", null, 
						tasks 
					)
				)
			)
		);

	}
} );

// New task form
var NewTaskForm = React.createClass( {displayName: "NewTaskForm",
	render: function() {

		var showNewTaskForm = this.props.show ? "showTab" : "hideTab";

		return (
			React.createElement("div", {id: "new-task-form", 
				className: showNewTaskForm }, 

				React.createElement(NewTask, {onAddNewTaskClick:  this.props.onAddNewTaskClick})

			)
		);

	}
} );

// New task tab content
var NewTask = React.createClass( {displayName: "NewTask",
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
			React.createElement("form", {name: "contact", action: "#", method: "post", 
	    		className: "pure-form pure-form-stacked "}, 

	    		React.createElement("br", null), 

				React.createElement("fieldset", null, 

			    	React.createElement("legend", null), 

		        	React.createElement("label", null, "Name:"), 
		            React.createElement("input", {type: "text", name: "name", placeholder: "Name", 
		            	value: taskName, onChange: this.handleTaskNameChange}), 

		            React.createElement("br", null), 

		            React.createElement("label", null, "Description:"), 
		            React.createElement("textarea", {name: "message", placeholder: "Description of task...", 
		            	value: taskDescription, onChange: this.handleTaskDescriptionChange}
		            ), 

		            React.createElement("br", null), 

			        React.createElement("div", {className: "pure-controls"}, 
			        	React.createElement("input", {type: "button", 
			        		className: "pure-button pure-button-primary", value: "Add", 
			        		onClick:  this.onAddNewTask.bind( this) }), 
			        	" ", 
			        	React.createElement("input", {type: "reset", 
			        		className: "pure-button", value: "Reset"})
			        ), 

			        React.createElement("br", null), 

			        React.createElement(ReactCSSTransitionGroup, {transitionName: "show-hide-animation"}, 
			        	React.createElement("div", {key: this.state.message, 
			        		className: messageClass }, 
			        		this.state.message
			        	)
			        )

			    )

			)
		);

	}

} );

// DateInfo
var DateInfo = React.createClass( {displayName: "DateInfo",
	render: function() {

		var d = new Date();
		var days = [
			"Sunday", "Monday", "Tuesday", "Wednesday",
			"Thursday", "Friday", "Saturday"
		];
		var dayOfWeek = days[ d.getDay() ];
		var months = [
			"January", "February", "March", "April", "May", "June",
			"July", "August", "September", "October", "November", "December"
		];
		var month = months[ d.getMonth() ];
		var today = month + " " + d.getDate() + ", " + d.getFullYear();

		return (
			React.createElement("div", null, 
				today, 
				React.createElement("br", null), 
				dayOfWeek 
			)
		);

	}
} );

// Sidebar
var Sidebar = React.createClass( {displayName: "Sidebar",
	getDefaultProps: function() {

		return {
			"activeTab": 0,
			"tabs": [
				{
					"id": 0,
					"link": "#",
					"text": "tab 1"
				}
			],
			"onTabClick": function( e, tab ) {}
		};

	},
	render: function() {

		return (
			React.createElement("aside", {id: "sidebar", 
				className: "pure-u-1 pure-u-md-5-24 pure-u-lg-1-4 small-box shadow"}, 

				React.createElement(SidebarTabs, {activeTab:  this.props.activeTab, 
					tabs:  this.props.tabs, 
					onTabClick:  this.props.onTabClick})

			)
		);

	}
} );

// Sidebar tabs
var SidebarTabs = React.createClass( {displayName: "SidebarTabs",
	render: function() {

		return (
			React.createElement("nav", {id: "sidebar-tabs", 
				className: "pure-menu pure-menu-open"}, 
				React.createElement("a", {className: "pure-menu-heading main-menu-heading"}, 
					React.createElement(DateInfo, null)
				), 
				React.createElement(SidebarTabList, {activeTab:  this.props.activeTab, 
					tabs:  this.props.tabs, 
					onTabClick:  this.props.onTabClick})
			)
		);

	}

} );

var SidebarTabList = React.createClass( {displayName: "SidebarTabList",
	render: function() {

		var activeTab = this.props.activeTab;
		var onTabClick = this.props.onTabClick;
		var tabs = this.props.tabs.map(
				function( tab ) {

					var tabClass = tab.id == activeTab ?
						"pure-menu-selected" : "";

					return (
						React.createElement("li", {className: tabClass }, 
							React.createElement(SidebarTabLink, {tab: tab, 
								onTabClick: onTabClick })
						)
					);

				}
			);

		return (
			React.createElement("ul", {className: "menu-list"}, 
				tabs 
			)
		);

	}
} );

var SidebarTabLink = React.createClass( {displayName: "SidebarTabLink",
	onTabClick: function( e ) {

		this.props.onTabClick( e, this.props.tab );

	},
	render: function() {

		var tabData = this.props.tab;

		return(
			React.createElement("a", {className: "menu-item-link", 
				href:  tabData.link, 
				onClick:  this.onTabClick}, 
				 tabData.text
			)
		);

	}
} );

// Time tracker app
var TimeTrackerApp = React.createClass( {displayName: "TimeTrackerApp",
	getInitialState: function() {

		return {
			activeTab : 0,
			tabs : [
				{ id: 0, link: "#", text : "New Task" },
				{ id: 1, link: "#", text : "Current Tasks" },
			],
			tasks : [
				{
					id : 0,
					name : "First task",
					description : "Description...",
					state : "onPause",
					editing : {
						name : false,
						nameStore : "",
						description : false,
						descriptionStore : ""
					},
					total : { h : 0, m : 0, s : 0 }
				},
				{
					id : 1,
					name : "Second task",
					description : "Description...",
					state : "onPause",
					editing : {
						name : false,
						nameStore : "",
						description : false,
						descriptionStore : ""
					},
					total : { h : 0, m : 0, s : 0 }
				}
			]
		};

	},
	handleTabClick: function( e, tab ) {

		e.preventDefault();

		this.setState( { activeTab : tab.id } );

	},
	handleAddNewTaskClick: function( name, description ) {

		var currentTasks = this.state.tasks;
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

		this.setState( { tasks : currentTasks } );

	},
	handleRemoveTaskClick: function( taskInfo ) {

		var currentTasks = this.state.tasks.slice();
		var length = currentTasks.length;
		var taskId = taskInfo.id;
		var taskIndexInList = null;

		for( var i = 0; i < length; i++ ) {

			if ( currentTasks[ i ].id == taskId ) {
				taskIndexInList = i;
			}

		}

		currentTasks.splice( taskIndexInList, 1 );

		this.setState( { tasks : currentTasks } );

	},
	handleStartTaskEdit: function( taskInfo, fieldName ) {

		var currentTasks = this.state.tasks;

		currentTasks[ taskInfo.id ].editing[ fieldName ] = true;
		currentTasks[ taskInfo.id ].editing[ fieldName + "Store" ] = currentTasks[ taskInfo.id ][ fieldName ];

		this.setState( { tasks : currentTasks } );

	},
	handleChangeTaskEdit: function( taskInfo, fieldName, fieldValue ) {

		var currentTasks = this.state.tasks;

		currentTasks[ taskInfo.id ][ fieldName ] = fieldValue;

		this.setState( { tasks : currentTasks } );

	},
	handleSaveTaskEdit: function( taskInfo, fieldName ) {

		var currentTasks = this.state.tasks;

		currentTasks[ taskInfo.id ].editing[ fieldName ] = false;
		currentTasks[ taskInfo.id ].editing[ fieldName + "Store" ] = "";

		this.setState( { tasks : currentTasks } );

	},
	handleCancelTaskEdit: function( taskInfo, fieldName ) {

		var currentTasks = this.state.tasks;

		currentTasks[ taskInfo.id ][ fieldName ] = currentTasks[ taskInfo.id ].editing[ fieldName + "Store" ];
		currentTasks[ taskInfo.id ].editing[ fieldName ] = false;
		currentTasks[ taskInfo.id ].editing[ fieldName + "Store" ] = "";

		this.setState( { tasks : currentTasks } );

	},
	handleToggleTimer: function( taskInfo ) {

		var self = this;
		var currentTasks = this.state.tasks;

		function updateTask( task ) {
			currentTasks[ task.id ] = task;
			self.setState( { tasks : currentTasks } );
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

		var activeTab = this.state.activeTab;

		return (
			React.createElement("div", {className: "pure-g"}, 

				React.createElement(Sidebar, {activeTab: activeTab, 
					tabs:  this.state.tabs, 
					onTabClick:  this.handleTabClick}), 

			    React.createElement("aside", {id: "task-content", 
			    	className: "pure-u-1 pure-u-md-18-24 pure-u-lg-17-24 small-box shadow"}, 

			    	React.createElement(ReactCSSTransitionGroup, {
						transitionName: "switch-tab-animation", 
						transitionLeave: false }, 

						React.createElement(NewTaskForm, {
							key: activeTab, 
							show:  activeTab == 0, 
							onAddNewTaskClick:  this.handleAddNewTaskClick})

					), 

			    	React.createElement(ReactCSSTransitionGroup, {
						transitionName: "switch-tab-animation", 
						transitionLeave: false }, 

						React.createElement(TaskListContainer, {
							key: activeTab, 
							show:  activeTab == 1, 
							tasks:  this.state.tasks, 
							startTaskEdit:  this.handleStartTaskEdit, 
							changeTaskEdit:  this.handleChangeTaskEdit, 
							saveTaskEdit:  this.handleSaveTaskEdit, 
							cancelTaskEdit:  this.handleCancelTaskEdit, 
							toggleTimer:  this.handleToggleTimer, 
							removeTask:  this.handleRemoveTaskClick})

			    	)

			    )

		    )
		);

	}
} );

React.renderComponent(
	React.createElement(TimeTrackerApp, null),
	document.getElementById( "app" )
);
