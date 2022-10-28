import { Skeleton } from "@mui/material";
import { useThemeContext } from "../../context/ThemeContext";

const UserPageSkeleton = () => {
    const {theme} = useThemeContext()

    return(
        <div style={{width: '100%'}}>
            <Skeleton sx={{ bgcolor: theme === 'dark' ? 'grey.900' : '',mb: 2}} variant="rectangular" width={'100%'} height={40} />
            <Skeleton sx={{ bgcolor: theme === 'dark' ? 'grey.900' : '',mb: 2}} variant="rectangular" width={'100%'} height={40} />
            <Skeleton sx={{ bgcolor: theme === 'dark' ? 'grey.900' : '',mb: 2}} variant="rectangular" width={'100%'} height={40} />
            <Skeleton sx={{ bgcolor: theme === 'dark' ? 'grey.900' : '',mb: 2}} variant="rectangular" width={'100%'} height={40} />
        </div>
    )
}
export default UserPageSkeleton;