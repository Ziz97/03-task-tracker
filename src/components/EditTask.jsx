import { useEffect, useState } from "react";

const EditTask = ({ task, taskList, setTaskList }) => {
	const [editModal, setEditModal] = useState(false);
	const [projectName, setProjectName] = useState('');
	const [taskDescription, setTaskDescription] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	useEffect(() => {
		setProjectName(task.projectName);
		setTaskDescription(task.taskDescription);
	}, [])

	const handleInput = (e) => {
		const { name, value } = e.target;
		if (name === 'projectName') {
			setProjectName(value);
			setErrorMessage('');
		}
		if (name === 'projectName' && value === '') {
			setErrorMessage('Enter project name to continue');
		}
		if (name === 'taskDescription') setTaskDescription(value);
	};

	const handleUpdate = (e) => {
		e.preventDefault();
		if (projectName === '') {
			setErrorMessage('Enter project name to continue');
		} else {
			const index = taskList.indexOf(task);
			taskList.splice(index, 1, {
				projectName,
				taskDescription,
				timeStamp: task.timeStamp,
				duration: task.duration,
			})
			localStorage.setItem('taskList', JSON.stringify(taskList));
			window.location.reload();
			setEditModal(false);
		}
	};

	const quitModal = (e) => {
		e.preventDefault();
		setProjectName(task.projectName);
		setTaskDescription(task.taskDescription);
		setErrorMessage('');
		setEditModal(false);
	}

	return (
		<>
			<button 
				className="bg-gray-400 text-white text-sm-uppercase font-semibold py-1.5 px-3 rounded-lg"
				type="button"
				onClick={() => setEditModal(true)}
			>
				Edit
			</button>
			{editModal ?
				(
					<>
						<div className="flex items-center justify-center overflow-x-hidden overflow-y-auto fixed inset-0 z-100">
							<div className="w-9/12 max-w-lg bg-white rounded-lg shadow-md relative flex flex-col">
								<div className="flex flex-row justify-between p-5 border-b border-slate-200 rounded-t">
									<h3 className="text-3xl font-semibold">Edit Task</h3>
									<button
										className="px-1 text-gray-400 float-right text-3xl leading-none font-semibold block"
										onClick={quitModal}
									>
										x
									</button>
								</div>
								<form className="p-6">
									<div>
										<label 
											className="track-wide uppercase text-gray-700 text-xs font-semibold mb-2 block"
											htmlFor="project-name"
										>
											Project Name
										</label>
										<input 
											className="w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
											id="project-name"
											name="projectName"
											type="text"
											placeholder="Project name"
											value={projectName}
											onChange={handleInput}
											required
										/>
										<p className="text-red-500 text-center mt-2 mb-5">{errorMessage}</p>
									</div>
									<div>
										<label 
											className="track-wide uppercase text-gray-700 text-xs font-semibold mb-2 block"
											htmlFor="project-description"
										>
											Task Description
										</label>
										<textarea 
											className="w-full bg-gray-200 text-gray-fe border border-gray-200 rounded py-3 px-4 mb-5 leading-tight focus:outline-none focus:bg-white"
											id="task-description"
											name="taskDescription"
											placeholder="Taks description" 
											value={taskDescription}
											onChange={handleInput}
											row="5"
										/>
									</div>
								</form>
								<div className="flex justify-end p-6 border-t border-slate-200 rounded-b">
									<button 
										className="bg-blue-500 text-white font-semibold uppercase text-sm px-6 py-3 rounded hover:opacity-70"
										type="button"
										onClick={handleUpdate}
									>
										Update Task
									</button>
								</div>
							</div>
						</div>
					</>
				) : null}
		</>
	);
};

export default EditTask;