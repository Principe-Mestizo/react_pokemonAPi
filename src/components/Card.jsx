import '../sass/Card.scss'
import PropTypes from 'prop-types'
export const Card = ({name, img}) => {
  return (
    <>
        <div className="card">
            <p className="card__name" >{name} </p>
            <div className="card__circle"></div>
            <img className='card__img' src={img} alt="imagen pokemon" />
        </div>
    </>
  )
}


Card.propTypes = {
    name: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired
}