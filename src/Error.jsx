import { forwardRef } from 'react';
import './Error.scss';

export const Error = forwardRef((props, ref) => {
    return (
        <span
            ref={ref}
            className='error-message'
            aria-live='polite'
        ></span>
    )
}) 