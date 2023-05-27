
import React from 'react'
import styles from './notify.module.scss'

export const Volume = () => {
    return (
        <div className="o-field"> 
        <label className="c-label" htmlFor="data-volume"> 
            Громкость 
        </label> 
        <div className="u-flex1 u-flex"> 
            <input className="u-w100" id="data-volume" type="range" min="0" max="100" step="1" list="volume-marks"/> 
            <div className="u-bold u-ml3 u-flex u-flex--align-center"> 
                <i className="fa fa-volume-up u-mr2"></i> 43% </div> 
                <datalist id="volume-marks"> 
                    <option value="0" label="0%"></option> 
                    <option value="10"></option> 
                    <option value="20"></option> 
                    <option value="30"></option> 
                    <option value="40"></option> 
                    <option value="50" label="50%"></option> 
                    <option value="60"></option> 
                    <option value="70"></option> 
                    <option value="80"></option> 
                    <option value="90"></option> 
                    <option value="100" label="100%"></option>
                </datalist> 
            </div> 
        </div>
    )
}
