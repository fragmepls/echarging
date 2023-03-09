async function getChargingStationData() {
  try {
    const response = await fetch(
      "https://mobility.api.opendatahub.bz.it/v2/tree,node/EChargingStation");
    const jsonObj = await response.json();
    Object.values(jsonObj['data']['EChargingStation']['stations']).forEach(value => {
        console.log(value['scode']);
    });
    //console.log(jsonObj['data']['EChargingStation']['stations']);
  } catch (error) {
    console.error(error);
  }
}

getChargingStationData();
