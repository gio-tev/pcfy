import useLocalStorage from './useLocalStorage';

const useSetIdsAndFilterPositions = () => {
  const [, setIds] = useLocalStorage('ids', {});

  const filterPostionsAndSetTeamId = (teams, positions, team) => {
    if (team) {
      const currentTeamObj = teams.response?.data.filter(value => value.name === team);
      const teamId = currentTeamObj && currentTeamObj[0]?.id;
      const filtered = positions.response?.data.filter(position => position.team_id === teamId);

      if (teamId) {
        setIds(prevState => {
          return {
            ...prevState,
            team_id: teamId,
          };
        });
      }

      return filtered;
    }
  };

  const setPositionId = (positions, position) => {
    if (position) {
      const currentPosObj = positions.response?.data.filter(value => value.name === position);
      const positionId = currentPosObj && currentPosObj[0]?.id;

      if (positionId) {
        setIds(prevState => {
          return {
            ...prevState,
            position_id: positionId,
          };
        });
      }
    }
  };

  const setBrandId = (brands, laptop_brand) => {
    if (laptop_brand) {
      const currentBrandObj = brands.response?.data.filter(value => value.name === laptop_brand);
      const laptopBrandId = currentBrandObj ? currentBrandObj[0]?.id : undefined;

      if (laptopBrandId) {
        setIds(prevState => {
          return {
            ...prevState,
            laptop_brand_id: laptopBrandId,
          };
        });
      }
    }
  };

  return { filterPostionsAndSetTeamId, setPositionId, setBrandId };
};

export default useSetIdsAndFilterPositions;
