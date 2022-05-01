import { Icon } from "@material-tailwind/react"

 export default function Dish() {
  return (
    <div>
        <h1>Chole Bhature</h1>
        <h3>North Indian</h3>
        <div>
            <p>Rs 100</p>
            <p><Icon name= "star" size= "xl" /> 20</p>
        </div>
        <div>
          <p>10% off</p>
          <p>Add</p>
        </div>
        
    </div>
  )
}

