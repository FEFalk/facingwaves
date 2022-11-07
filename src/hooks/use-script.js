import { useEffect } from 'react';

export const useScriptByUrl = (url) => {
  useEffect(() => {
    const script = document.createElement('script');

    script.src = url;
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [url]);
};

export default useScriptByUrl;

export const useInlineScript = (string) => {
  useEffect(() => {
    const script = document.createElement('script');

    script.type = 'text/javascript';
    script.innerHTML = string;

    console.log(script);

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [string]);
};
