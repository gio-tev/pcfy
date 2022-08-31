import { useContext } from 'react';
import { AppContext } from '../../store';

// const testState = {
//   name: 'გიორგი',
//   surname: 'თევდორაშვილიი',
//   team_id: 1,
//   position_id: 1,
//   phone_number: '+995598236848',
//   email: 'giotev@redberry.ge',
//   token: 'b3583d95b638af109d80c8f07dcd7833',
//   laptop_name: 'Apple',
//   laptop_image: image,
//   laptop_brand_id: 1,
//   laptop_cpu: 'Intel Core i3',
//   laptop_cpu_cores: 4,
//   laptop_cpu_threads: 5,
//   laptop_ram: 3,
//   laptop_hard_drive_type: 'SSD',
//   laptop_purchase_date: '10 10 2003',
//   laptop_state: 'new',
//   laptop_price: 1000,
// };
const Success = () => {
  const { state } = useContext(AppContext);
  console.log(state);

  const finalData = { ...state };

  for (const [key, value] of Object.entries(finalData)) {
    if (value === undefined) delete finalData[key];
  }

  const formData = new FormData();

  for (const name in finalData) {
    formData.append(name, finalData[name]);
  }

  const save = async () => {
    const res = await fetch('https://pcfy.redberryinternship.ge/api/laptop/create', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: formData,
    });
    const data = await res.json();
    // const data = await res.json()
    console.log(data, 'responseeeeeee');
  };

  save();
  return <div>Success</div>;
};

export default Success;
