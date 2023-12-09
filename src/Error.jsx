import './Error.scss';

export const Error = ({ message, isNoWarning }) => {

    let className = 'error-message';
    if (isNoWarning) className += ' no-warning';

    return (
        <span
            className={className}
            aria-live='polite'
        >
            {message}
        </span>
    )
}