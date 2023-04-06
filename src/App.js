import {Component} from 'react'

import {v4 as uuid} from 'uuid'

import './App.css'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

const TagItem = props => {
  const {data, onChangeTagCategory, check} = props
  const changeTaskCategory = () => {
    onChangeTagCategory(data.optionId)
  }
  const applyCheck = check ? 'apply-check' : ''
  return (
    <li className="tag-item">
      <button
        type="button"
        className={`tag-button ${applyCheck}`}
        onClick={changeTaskCategory}
      >
        {data.displayText}
      </button>
    </li>
  )
}

class App extends Component {
  state = {
    tasksList: [],
    inputValue: '',
    selectValue: tagsList[0].optionId,
    defaultTaskCategory: '',
  }

  onChangeInput = event => {
    this.setState({inputValue: event.target.value})
  }

  onChangeSelect = event => {
    this.setState({selectValue: event.target.value})
  }

  onChangeTagCategory = id => {
    this.setState({defaultTaskCategory: id})
  }

  onAddNewTask = event => {
    event.preventDefault()
    const {inputValue, selectValue, tasksList} = this.state
    const textToDisplay = tagsList.filter(
      eachitem => eachitem.optionId === selectValue,
    )
    const newObject = {
      id: selectValue,
      taskName: inputValue,
      displayText: textToDisplay[0].displayText,
    }
    this.setState({
      inputValue: '',
      selectValue: tagsList[0].optionId,
      tasksList: [...tasksList, newObject],
    })
  }

  render() {
    const {tasksList, inputValue, selectValue, defaultTaskCategory} = this.state
    const filteredList = tasksList.filter(eachitem =>
      eachitem.id.includes(defaultTaskCategory),
    )
    return (
      <div className="home-page-bg-container">
        <form className="create-task-form" onSubmit={this.onAddNewTask}>
          <h1 className="form-heading">Create a task!</h1>
          <label htmlFor="taskInput" className="label">
            Task
          </label>
          <input
            id="taskInput"
            type="text"
            className="input"
            placeholder="Enter the task here"
            value={inputValue}
            onChange={this.onChangeInput}
          />
          <label htmlFor="tagsInput" className="label">
            Tags
          </label>
          <select
            value={selectValue}
            id="tagsInput"
            className="input"
            onChange={this.onChangeSelect}
          >
            {tagsList.map(eachitem => (
              <option key={eachitem.optionId} value={eachitem.optionId}>
                {eachitem.displayText}
              </option>
            ))}
          </select>
          <button className="add-task-button" type="submit">
            Add Task
          </button>
        </form>
        <div className="tasks-bg-container">
          <h1 className="tasks-container-heading">Tags</h1>
          <ul className="tags-list-bg-container">
            {tagsList.map(eachitem => (
              <TagItem
                key={eachitem.optionId}
                data={eachitem}
                onChangeTagCategory={this.onChangeTagCategory}
                check={defaultTaskCategory === eachitem.optionId}
              />
            ))}
          </ul>
          <h1 className="tasks-container-heading">Tasks</h1>
          {filteredList.length > 0 ? (
            <ul className="added-tasks-list-bg-container">
              {filteredList.map(eachitem => (
                <li key={uuid()} className="task-item">
                  <p className="task-item-heading">{eachitem.taskName}</p>
                  <p className="task-category">{eachitem.displayText}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="tasks-container-heading">No Tasks Added Yet</p>
          )}
        </div>
      </div>
    )
  }
}

export default App
