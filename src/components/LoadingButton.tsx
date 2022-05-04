import {useState} from "react";
import {Button} from "@mui/material";
import {useRouter} from "next/router";
import LoadingButton from '@mui/lab/LoadingButton';
// loading button doc: https://mui.com/material-ui/api/loading-button/


export type LoadingButtonProps = {
  loading?: boolean
  loadingPosition?: "start" | "end" | "center"
  variant?: "text" | "outlined" | "contained"
  height: string
  width: string
  loadingInput: string
}

export const LoadingButtonIndicator = ({loading, loadingPosition, variant, height, width, loadingInput}: LoadingButtonProps) => {

  const router = useRouter();
  const [toggleLoading, settoggleLoading] = useState(false);

  const onClickLoading = () => {
    settoggleLoading(true);
    router.push('/curious');
  }

  return (
    <div>
      { toggleLoading

      ? <LoadingButton
      loading={loading}
      loadingPosition={loadingPosition}
      variant={variant}
      sx={{
          height:{height},
          width:{width}
          }}
  >
        {loadingInput}
      </LoadingButton>
      : <Button
          sx = {{
              height: '60px',
              width: '200px'
          }}
            variant="contained"
            size="large"
            onClick={onClickLoading}
        >
        Take Quiz 
        </Button>
      
      }
    </div>
        
  )
}