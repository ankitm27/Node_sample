import React from 'react'
import { Field, FieldArray, reduxForm } from 'redux-form'
import validate from './validate'

import { Button } from 'react-bootstrap';

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} type={type} placeholder={label} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)

const renderDataColumns = (rows, columnCount) => {
	let rowss= []
	for(let i=0; i<columnCount; i++) {
		rowss.push(i)
	}
  	return(
	    <React.Fragment>
	      {  rowss.map((data, index) => {
	        return(
	          <div key={index} className="col">
		    		<Field
			          name={`${rows}.${index}`}
			          type="text"
			          component={renderField}
			          label="data"
			        />
				</div>
	        )
	      })}
	    </React.Fragment>
  	)
}


const renderDynamic = ({ fields, columnCount,  meta: { error, submitFailed } }) => (
	<div>
	    {fields.map((rows, index) => (
			<div className="form-row" key={index}>
		    	{ renderDataColumns(rows, columnCount) }
		    	<button
		          type="button"
		          title="Remove Hobby"
		          onClick={() => fields.remove(index)}
		        >❌</button>
		    </div>
	    ))}
	    <div className="col">
	      <Button type="button" varient="primary" onClick={() => fields.push({})}>Add Row</Button>
	    </div>
	</div>
)

const AddChapter = props => {
	const { handleSubmit,submitting} = props
	return (
    <form onSubmit={handleSubmit}>
      <FieldArray name="rows" component={renderDynamic} columnCount={props.columnCount} />
      <span>
        <Button type="submit" varient="primary" disabled={submitting} onClick={props.onSubmit}>
          Submit
        </Button>
      </span>
    </form>
  )
}

export default reduxForm({
  form: 'AddChapter', // a unique identifier for this form
  enableReinitialize: true,
  validate
})(AddChapter)