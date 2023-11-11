import { useState, forwardRef } from 'react';
import './Error.scss';

export const Error = forwardRef((props, ref) => {
    return (
        <span
            ref={ref}
            className='error-message hide'
            aria-live='polite'
        >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint veritatis sit natus </span>
    )
}) 