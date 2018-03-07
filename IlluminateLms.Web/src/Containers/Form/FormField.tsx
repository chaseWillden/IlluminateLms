import * as React from 'react'
import { FormFieldProps } from '../Props';
import { ChangeEvent } from 'react';
import DatePicker from 'react-flatpickr';
import 'flatpickr/dist/themes/airbnb.css';

class FormField extends React.Component<FormFieldProps, any>{

  state = {
    type: 'text'
  }

  ele: HTMLInputElement = {} as HTMLInputElement;

  componentDidMount(){
    if (this.ele && this.props.focus) this.ele.focus();
  }

  componentWillMount(){
    this.setState({type: this.props.type || 'text'});
  }

  componentWillReceiveProps(nextProps: any){
    let type = 'text';
    let typeSwitch = nextProps.type || typeof nextProps.data;
    switch (typeSwitch){
      case 'boolean':
      case 'checkbox':
        type = 'checkbox';
        break;
      default:
        break;
    }

    if (typeof nextProps.data === 'string' && nextProps.data.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/g)){
      type = 'datetime';
    }

    this.setState({type: type});
  }

  /**
   * Get class
   */
  getClass(){
    let classes = "uk-";
    switch (this.state.type){
      case 'datetime':
      case 'text':
        classes += 'input';
        break;
      case 'checkbox':
        classes += 'checkbox';
        break;
      default:
        classes += this.state.type;
        break;
    }
    return classes;
  }

  onChange(e: ChangeEvent<HTMLInputElement>){
    if (this.state.type === 'checkbox') return this.props.onChange(e.target.checked);
    this.props.onChange(e.target.value);
  }

  /**
   * Get input
   */
  getInput(){
    if (!this.props.edit) return (
      this.state.type === 'checkbox' 
      ? <div>{this.props.data ? 'Yes' : 'No'}</div>
      : <div>{this.props.data}</div>
    )

    if (this.state.type === 'datetime'){
      return (
        <div className={this.getClass()}>
          <DatePicker value={this.props.data} onChange={this.onChange.bind(this)} options={{defaultDate: new Date()}} />
        </div>
      )
    }

    if (this.state.type === 'checkbox'){
      return (
        <input 
          className={this.getClass()}
          type={this.state.type} 
          checked={this.props.data}
          value={this.props.data}
          onChange={this.onChange.bind(this)} />
      )
    }

    let onEnter : Function = () => {};
    if (this.props.onEnter) onEnter = this.props.onEnter as Function;

    return (
      <input 
        className={this.getClass()}
        type={this.state.type} 
        value={this.props.data}
        onChange={this.onChange.bind(this)}
        autoFocus={this.props.focus}
        ref={(ele: HTMLInputElement) => this.ele = ele}
        onKeyUp={(e: any) => e.keyCode === 13 ? onEnter() : ''} />
    );
  }

  render(){
    if (this.props.label){
      return (
        <div className="uk-child-width-expand@s uk-margin" data-uk-grid>
          <div>
            <strong>{this.props.title}:</strong>
            {this.getInput()}
          </div>
        </div>
      )
    }

    return (
      <div className="uk-child-width-expand@s uk-margin" data-uk-grid>
        {this.props.title ? (
          <div>
            <strong>{this.props.title}:</strong>
          </div>
        ) : ''}
        <div>
          {this.getInput()}
        </div>
      </div>
    )
  }
}

export default FormField;