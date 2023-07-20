// ip 定位
// https://lbs.amap.com/api/webservice/guide/api/ipconfig

const getIp = async () =>
  fetch("https://restapi.amap.com/v3/ip?key=")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // const ipAddress = data.ip;
      // console.log(`IP 获取成功 Address: ${ipAddress}`);
      console.log("data", data);
      return data;
    })
    .catch((error) => {
      console.error("ip 地址获取失败:", error);
    });
