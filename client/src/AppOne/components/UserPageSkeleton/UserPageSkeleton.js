import { Skeleton } from "@mui/material";

const UserPageSkeleton = () => {
    return(
        <div style={{width: '100%'}}>
            <Skeleton sx={{mb: 2}} variant="rectangular" width={'100%'} height={40} />
            <Skeleton sx={{mb: 2}} variant="rectangular" width={'100%'} height={40} />
            <Skeleton sx={{mb: 2}} variant="rectangular" width={'100%'} height={40} />
            <Skeleton sx={{mb: 2}} variant="rectangular" width={'100%'} height={40} />
        </div>
    )
}
export default UserPageSkeleton;