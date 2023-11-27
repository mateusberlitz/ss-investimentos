import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router';

interface FacebookPixelProps{
    children: ReactNode;
}

interface FacebookPixelContextData{
  reactPixel?: any | undefined;
}

const FacebookPixelContext = createContext<FacebookPixelContextData>({} as FacebookPixelContextData);

const production = (process.env.NODE_ENV === "production" ? true : false);

export const FacebookPixelProvider = ({ children } : FacebookPixelProps) => {
  const [reactPixel, setReactPixel] = useState<any | undefined>(undefined);

  const router = useRouter();

  const advancedMatching = { 
    em: '' ,
    fn: '' ,
    ln: '' ,
    ct: '' ,
    country: '' ,
    db: '' ,
    ge: '' ,
    ph: '' ,
    st: '' ,
    zp: '' ,
  }; 

  const options = {
      autoConfig: true,
      debug: false,
  };

  

  useEffect(() => {
    if(production){


      const newReactPixel = import('react-facebook-pixel')
      .then(module => module.default)
      .then(ReactPixel => {
        //console.log("iniciou")
          ReactPixel.init(process.env.META_PIXEL ? process.env.META_PIXEL : '', advancedMatching, options); //'289858882437346'
          ReactPixel.pageView();

          setReactPixel(ReactPixel);
      })

    }

  }, [])


  if(production){
    const handleRouteChange = () => {
      reactPixel.pageView();
    }
  }

  console.log(reactPixel);

  // useEffect(() => {

  //   if(production){
  //     ReactPixel.pageView();

  //     router.events.on('routeChangeComplete', ReactPixel.pageView())

  //     return () => {
  //       router.events.off('routeChangeComplete', ReactPixel.pageView())
  //     }
  //   }
  // }, [router.events])

  return(
    <FacebookPixelContext.Provider value={{reactPixel: (reactPixel ? reactPixel : undefined)}}>
        {children}
    </FacebookPixelContext.Provider>
  )
}

export const useFacebookPixel = () => useContext(FacebookPixelContext);