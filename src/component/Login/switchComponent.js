import './css/LoginPage.css'
const SwitchComponent = ({option1,option2,setValue})=> {
    return (
        <label className="switch">
            <input type="checkbox" onClick={setValue}/>
            <span className="slider"></span>
            <div id="option">
                <p className="options">{option1}</p>
                <p className="options">{option2}</p>
            </div>
        </label>
    )
}
export default SwitchComponent;