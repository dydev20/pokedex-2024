import { forwardRef } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip
} from "chart.js"
import { Bar } from "react-chartjs-2";

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip
)
ChartJS.defaults.color="black";
ChartJS.defaults.font.size = 16;

const PokemonDialog = forwardRef(({ name, spriteFront, spriteBack, types, typeColour, capitalizeString,stats,handleDialogClose },dialogRef)=>{
    
    const statsData = stats.map(stat=>stat.base_stat); 
   
    const statsName = stats.map(stat => {
        let modifiedStatsName;

        switch (stat.stat.name){
            case "hp":
                modifiedStatsName="HP";
                break;
            case "attack":
                modifiedStatsName="Attack";
                break;
            case "defense":
                modifiedStatsName="Defense";
                break;
            case "special-attack":
                modifiedStatsName="Sp.Attack";
                break;
            case "special-defense":
                modifiedStatsName="Sp.Defense";
                break;
            case "speed":
                modifiedStatsName="Speed";
                break;
        }


        return modifiedStatsName;
    });

    const data = {
        labels:statsName,
        datasets:[
            {
                data:statsData,
                backgroundColor:"grey"
            }
        ]
    }

    const options = {
        indexAxis:"y",
        maintainAspectRatio:false
    }

    return (
        <dialog ref={dialogRef} className="pokemon-dialog">
            

            <div className="dialog-head">
                <h2>{capitalizeString(name)}</h2>
                <button 
                    type="button" 
                    className="dialog-close" 
                    onClick={()=>{handleDialogClose()}}
                >
                    <IoIosCloseCircle size={30} color="black"/>
                </button>
            </div>

            <div className="dialog-sprites">
                <img src={spriteFront} alt={name +" front"}/>
                <img src={spriteBack} alt={name + " back"} />
            </div>

            <ul className="pokemon-types">
                {types.map(type => {
                    return (
                        <li key={type.slot} className="type" style={typeColour(type.type.name)}>
                            {capitalizeString(type.type.name)}
                        </li>
                    )
                })}
            </ul>
            <div className="chart-container">
                <Bar data={data} options = {options}/>
            </div>
            

            
        </dialog>
    )
})
export default PokemonDialog

