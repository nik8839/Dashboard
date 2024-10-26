import { type } from "@testing-library/user-event/dist/type";
import React from "react";

const ProfileComponent=()=>{
    let result=localStorage.getItem("user");
    
    //result=JSON.parse(result);
    //console.log(result);
    const name=result.name;
    //console.log(name)
   

    
    return (
        <div>
            <h1>
                Welcome page  
            </h1>
        </div>
    )
}
export default ProfileComponent;