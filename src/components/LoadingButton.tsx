import LoadingButton from '@mui/lab/LoadingButton';
// loading button doc: https://mui.com/material-ui/api/loading-button/


export type LoadingButtonProps = {
  loading?: boolean
  loadingPosition?: "start" | "end" | "center"
  variant?: "text" | "outlined" | "contained"
  height: string
  width: string
}

export const LoadingButtonIndicator = ({loading, loadingPosition, variant, height, width}: LoadingButtonProps) => {

  return (

      <LoadingButton
          loading={loading}
          loadingPosition={loadingPosition}
          variant={variant}
          sx={{
              height:{height},
              width:{width}
              }}
      >
        Loading Quiz
      </LoadingButton>

  )
}