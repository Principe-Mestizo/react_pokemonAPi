
import '../sass/Buton.scss'

export const Buton = ({icon, handleCLick}) => {
  

  return (
    <>
        <div className="button_box">
          <button className='button' 
                  onClick={handleCLick}>
                  {icon}
          
          </button>
          <div className='button_shadow' onClick={handleCLick}></div>
        </div>
    </>
  )
}

