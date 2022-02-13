import './Preloader.css';
const svg = require('./preloader.svg');
const Preloader = () => {
    return (
        <div className='WrapperPreloader'>
            <img src={svg} alt=""/>
        </div>
    )
}
export default Preloader;