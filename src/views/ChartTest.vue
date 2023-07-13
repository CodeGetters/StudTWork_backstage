<script setup>
import { onMounted, onUnmounted } from "vue";
import { getAllUser } from "../api/user";
import * as echart from "echarts";

const getUsers = async () => {
  await getAllUser()
    .then((res) => {
      handleUsers(res.data.users);
    })
    .catch((err) => {
      console.log("err:", err);
    });
};

const handleUsers = async (data) => {
  const showData = await data.reduce((count, item) => {
    const name = item.role;
    if (count[name]) {
      count[name]++;
    } else {
      count[name] = 1;
    }
    return count;
  }, {});
  const arr = Object.entries(showData).map(([name, value]) => {
    return { name, value };
  });

  const pieChart = async () => {
    let chart = echart.init(document.getElementById("showUser"), "auto");
    await chart.setOption({
      title: {
        text: "StudTWork 人员分配情况",
        left: "center",
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        // 图例列表的布局朝向。
        orient: "vertical",
        left: "left",
      },
      series: [
        {
          // 系列名称，鼠标 hover 显示的文本
          name: "人员",
          type: "pie",
          radius: "50%",
          data: arr,
          // 高亮状态的扇区和标签样式。
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              // 阴影水平方向上的偏移距离。
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    });
  };
  pieChart();
};

const initLineChart = () => {
  let chart = echart.init(document.getElementById("chart1"), "auto");

  chart.setOption({
    // x 轴
    xAxis: {
      // 坐标轴类型
      type: "category",
      data: [
        "一月",
        "二月",
        "三月",
        "四月",
        "五月",
        "六月",
        "七月",
        "八月",
        "九月",
        "十月",
        "十一月",
        "十二月",
      ],
    },
    // 提示框组件
    tooltip: {
      // 触发类型
      trigger: "axis",
    },
    // y 轴
    yAxis: {
      // 类型
      type: "value",
    },
    // 图类型
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320, 801, 102, 230, 4321, 4129],
        type: "line",
        smooth: true,
      },
    ],
  });

  window.onresize = () => {
    //自适应大小
    chart.resize();
  };
};

const initPieChart = () => {
  let chart = echart.init(document.getElementById("chart2"), "auto");

  chart.setOption({
    // 包含主标题和副标题。
    title: {
      // 主标题文本，支持使用 \n 换行。
      text: "Referer of a Website",
      // 副标题文本，支持使用 \n 换行。
      subtext: "Fake Data",
      // 文字水平对齐方式，默认自动。
      left: "center",
    },
    tooltip: {
      trigger: "item",
    },
    // 图例组件。
    legend: {
      // 图例列表的布局朝向。
      orient: "vertical",
      left: "left",
    },
    series: [
      {
        // 系列名称，鼠标 hover 显示的文本
        name: "Access From",
        type: "pie",
        radius: "50%",
        data: [
          { value: 1048, name: "Search Engine" },
          { value: 735, name: "Direct" },
          { value: 580, name: "Email" },
          { value: 484, name: "Union Ads" },
          { value: 300, name: "Video Ads" },
        ],
        // 高亮状态的扇区和标签样式。
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            // 阴影水平方向上的偏移距离。
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  });
};

const initCatrChart = () => {
  let chart3 = echart.init(document.getElementById("chart3"), "auto");

  chart3.setOption({
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: "bar",
      },
    ],
  });
};

onMounted(() => {
  getUsers();
  initLineChart();
  initPieChart();
  initCatrChart();
});

onUnmounted(() => {
  initLineChart();
  initPieChart();
  initCatrChart();
});
</script>

<template>
  <div class="chartUser h300px">
    <div id="showUser" :style="{ width: '500px', height: '300px' }"></div>
  </div>
  <div class="chart-box1 w500px">
    <div id="chart1" :style="{ width: '500px', height: '300px' }"></div>
    <div id="chart2" :style="{ with: '500px', height: '300px' }"></div>
    <div id="chart3" :style="{ with: '500px', height: '300px' }"></div>
  </div>
</template>
