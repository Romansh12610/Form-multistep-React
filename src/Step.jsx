export default function Step({ number, title, heading }) {
    return (
        <div className="step-info__item">
            <div className="step-info__number">{number}</div>
            <div className="step-info__titles">
                <span>{title}</span>
                <span>{heading}</span>
            </div>
        </div>
    )
}