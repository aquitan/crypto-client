import {Skeleton} from '@mui/material';
import React from 'react';

const SkeletonBlocks = () => {
    return (
      <>
          <div>
              <Skeleton sx={{mb: 2}} variant="rectangular" width={'30%'} height={40} />
              <Skeleton sx={{mb: 2}} variant="rectangular" width={'100%'} height={60} />
              <Skeleton sx={{mb: 2}} variant="rectangular" width={'100%'} height={60} />
          </div>
          <div>
              <Skeleton sx={{mb: 2}} variant="rectangular" width={'30%'} height={40} />
              <Skeleton sx={{mb: 2}} variant="rectangular" width={'100%'} height={60} />
              <Skeleton sx={{mb: 2}} variant="rectangular" width={'100%'} height={60} />
          </div>
      </>
    )
}
export default SkeletonBlocks;