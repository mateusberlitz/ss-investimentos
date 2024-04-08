interface Window {
    initIframe: (url: string) => void;
  }
  
  import React, { useEffect } from 'react';
  
  // O nome do componente foi ajustado para começar com letra maiúscula
  export default function CartasLike() {
    useEffect(() => {
      const addIframeScript = () => {
        const scriptUrl = 'https://cartas.formuladoconsorcio.com.br/interface/js/init-iframe.js';
        const script = document.createElement('script');
        script.src = scriptUrl;
        script.async = true;
        script.onload = () => window.initIframe('https://cartas.formuladoconsorcio.com.br/interface?token=MTI0NjE0X3BlcmUtMg==');
        document.body.appendChild(script);
      };
  
      addIframeScript();
    }, []);
  
    return (
        
      <div id='cartas-contempladas-conslike'></div>
    );
  }




