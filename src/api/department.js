import service from ".";

/**
 * @description 创建小组
 * @param {*} data
 */
export const createDepartment = async (data) => {
  const response = await service.post("/department/create", {
    departmentName: data.value.departmentName,
    departmentAdmin: data.value.departmentAdmin,
    departmentIntro: data.value.departmentIntro,
  });
  return response.data;
};

/**
 * @description 查询所有小组
 */
export const showDepartments = async () => {
  const response = await service.get("/department/show");
  return response.data;
};

/**
 * @description 查询特定小组信息
 * @param {*} data
 */
export const findDepartment = async (id) => {
  const response = await service.post("/department/findOne", { id });
  return response.data;
};
