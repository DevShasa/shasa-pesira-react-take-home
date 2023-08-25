import {Oval} from "react-loader-spinner"


const Loading = ()=>{
    return (
        <Oval
        color="#4fa94d"
        width="100"
        visible={true}
        secondaryColor="#4fa94d"
        strokeWidth={2}
        strokeWidthSecondary={2}
        />
    )
}

export default Loading