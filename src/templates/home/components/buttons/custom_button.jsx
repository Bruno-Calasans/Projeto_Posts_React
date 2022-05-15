
import {Component} from 'react'
import './custom_button.css'

export class CustomButton extends Component{

    render(){

        let {hidden, disabled, classe, click, text, children} = this.props

        return <>
            <button
            hidden={hidden}
            disabled={disabled}
            className={classe} 
            onClick={click}>
            {text ?? children}</button>
        </>
    }
}

