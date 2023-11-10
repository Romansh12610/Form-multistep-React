export default function Step({ number, title, heading, step }) {
    const isCurrent = number == step + 1;
    let numberClass = "step-info__number";
    if (isCurrent) {
        numberClass += ' current';
    }

    return (
        <div className="step-info__item">
            <div className={numberClass}>{number}</div>
            <div className="step-info__titles">
                <span>{title}</span>
                <span>{heading}</span>
            </div>
        </div>
    )
}