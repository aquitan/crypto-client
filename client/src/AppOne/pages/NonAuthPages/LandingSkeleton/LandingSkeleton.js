import LandingContent from '../Landing/components/LandingContent/LandingContent';
import LandingBlock from '../Landing/components/LandingBlock/LandingBlock';
import {Skeleton} from '@mui/material';
import React from 'react';

const LandingSkeleton = () => {
    return(
      <div className='landing_wrap' style={{marginTop: 50}}>
          <div className="content_wrap">
              <LandingContent>
                  <LandingBlock classname='landingBlock'>
                      <Skeleton sx={{mb: 2}} variant="rectangular" width={320} height={40} />
                      <Skeleton sx={{mb: 2}} variant="rectangular" width={'100%'} height={60} />
                      <Skeleton sx={{mb: 2}} variant="rectangular" width={'100%'} height={60} />
                  </LandingBlock>
                  <LandingBlock classname='landingBlock'>
                      <Skeleton sx={{mb: 2}} variant="rectangular" width={320} height={40} />
                      <Skeleton sx={{mb: 2}} variant="rectangular" width={'100%'} height={60} />
                      <Skeleton sx={{mb: 2}} variant="rectangular" width={'100%'} height={60} />
                  </LandingBlock>
                  <LandingBlock classname='landingBlock'>
                      <Skeleton sx={{mb: 2}} variant="rectangular" width={320} height={40} />
                      <Skeleton sx={{mb: 2}} variant="rectangular" width={'100%'} height={60} />
                      <Skeleton sx={{mb: 2}} variant="rectangular" width={'100%'} height={60} />
                  </LandingBlock>
              </LandingContent>
          </div>
      </div>
    )
}
export default LandingSkeleton;