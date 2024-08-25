import ClipLoader from "react-spinners/ClipLoader";

const style = {
    margin:"100px auto",
    display:"block"
}

function Spinner(){
    return(
        <ClipLoader 
            cssOverride={style}
        />
    )
}

export default Spinner