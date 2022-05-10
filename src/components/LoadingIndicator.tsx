import React, {ReactNode, useState} from "react";
import { ButtonProps } from "@mui/material/Button";
import LoadingButton from '@mui/lab/LoadingButton';
// workaround for LoadingButton - LoadingButtonProps freezes typescript compilation & the build remains stuck on "Checking validity of types"
// https://github.com/mui/material-ui/issues/30038

type LoadingButtonProps = ButtonProps & {
  loadingPosition: 'start' | 'end' | 'center';
}

type LoadingIndicatorProps = LoadingButtonProps & {
  loadingLabel: string
  children: ReactNode
}

export const LoadingIndicator = ({loadingLabel, children, ...rest}: LoadingIndicatorProps) => {

  const [loading, setLoading] = useState(false);

  return (
    <div>
      { loading

      ? <LoadingButton
      loading={loading}
      {...rest}
      >{loadingLabel}
      </LoadingButton>

      : React.isValidElement(children) ? React.cloneElement(children, {onClick: ()=>setLoading(true)}) : children
      }
      
      
    </div>
        
  )
}