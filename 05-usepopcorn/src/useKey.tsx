import { useEffect } from "react";

export function useKey(key: string, action: () => void){
    useEffect(function(){
        function callBack(e: KeyboardEvent){
          if(e.code.toLowerCase() === key.toLocaleLowerCase()){
            action();
          }
        }
    
        document.addEventListener("keydown", callBack);
    
        return function(){
          document.removeEventListener("keydown", callBack);
        }
    
      }, [key, action]);
}