import { useContext, useEffect } from 'react';
import { AppContext } from '../../store';
import useFetch from '../../hooks/useFetch';

const Success = () => {
  const fetch = useFetch();

  const { state } = useContext(AppContext);
  console.log(state, 'stttttttt');
  const finalData = { ...state };

  for (const [key, value] of Object.entries(finalData)) {
    if (value === undefined) delete finalData[key];
  }

  const formData = new FormData();

  for (const name in finalData) {
    formData.append(name, finalData[name]);
  }

  // useEffect(() => {
  //   fetch.sendHttp(process.env.REACT_APP_CREATE_LAPTOP, {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //     },
  //     body: formData,
  //   });
  // }, []);

  //  // Clear storage after submit

  return <div>Success</div>;
};

export default Success;
