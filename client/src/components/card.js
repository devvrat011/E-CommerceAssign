import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "flowbite-react";
const Card=({card})=>{
    const navigate=useNavigate();
    const { currentUser } = useSelector((state) => state.user);
    const handleClick=()=>{
      if(currentUser){
        navigate(`/product/${card.slug}`) 
      }
      else{
        navigate('/login');
      }
    }
    return(
      <div key={card.id} className="relative bg-white rounded-lg p-4 shadow hover:shadow-md group">
      <div className="absolute top-4 left-4 bg-green-500 text-white px-2 py-1 rounded text-xs font-bold">
        NEW
      </div>
      <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
        -50%
      </div>
      
      <img src={card.imageUrl} alt={card.name} className="w-full h-48 object-cover rounded-t-lg mb-4" />
      
      <h3 className="font-semibold text-lg">{card.name}</h3>
      <p className="text-gray-600">${card.price}</p>
      
      <div className="absolute bottom-4 left-4 right-4 hidden group-hover:flex justify-end">
        <Button className="w-[50%] " onClick={() => { handleClick()}}>View Item</Button>
      </div>
    </div>
       
    )
}

export default Card;