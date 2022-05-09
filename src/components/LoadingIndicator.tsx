import React, {ReactNode, useState} from "react";
import {Button} from "@mui/material";
import {useRouter} from "next/router";
import LoadingButton, { LoadingButtonProps } from '@mui/lab/LoadingButton';


export type LoadingIndicatorProps = LoadingButtonProps & {
  loadingInput: string
  children: ReactNode
}

export const LoadingIndicator = ({loadingInput, children, ...rest}: LoadingIndicatorProps) => {

  const [loading, setLoading] = useState(false);

  return (
    <div>
      { loading

      ? <LoadingButton
      loading={loading}
      {...rest}
      >{loadingInput}
      </LoadingButton>

      : React.isValidElement(children) ? React.cloneElement(children, {onClick: ()=>setLoading(true)}) : children
      }
      
      
    </div>
        
  )
}