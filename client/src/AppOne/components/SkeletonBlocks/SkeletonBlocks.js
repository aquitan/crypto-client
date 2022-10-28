import {Skeleton} from '@mui/material';
import React from 'react';
import { useThemeContext } from '../../context/ThemeContext';

const SkeletonBlocks = () => {
    const {theme} = useThemeContext()
    return (
      <>
          <div>
              <Skeleton sx={{ bgcolor: theme === 'dark' ? 'grey.900' : '',mb: 2}} variant="rectangular" width={'30%'} height={40} />
              <Skeleton sx={{ bgcolor: theme === 'dark' ? 'grey.900' : '',mb: 2}} variant="rectangular" width={'100%'} height={60} />
              <Skeleton sx={{ bgcolor: theme === 'dark' ? 'grey.900' : '',mb: 2}} variant="rectangular" width={'100%'} height={60} />
          </div>
          <div>
              <Skeleton sx={{ bgcolor: theme === 'dark' ? 'grey.900' : '',mb: 2}} variant="rectangular" width={'30%'} height={40} />
              <Skeleton sx={{ bgcolor: theme === 'dark' ? 'grey.900' : '',mb: 2}} variant="rectangular" width={'100%'} height={60} />
              <Skeleton sx={{ bgcolor: theme === 'dark' ? 'grey.900' : '',mb: 2}} variant="rectangular" width={'100%'} height={60} />
          </div>
      </>
    )
}
export default SkeletonBlocks;