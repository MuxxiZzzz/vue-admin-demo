export function setNewData(e1, e2) {
  if (e2 === '新密码' || e2 === '密码') {
    this.form.password = e1
  }
  if (e2 === '用户名或邮箱') {
    this.form.complex = e1
  }
  if (e2 === '用户ID') {
    this.form.userid = e1
  }
  if (e2 === '用户名') {
    this.form.username = e1
  }
  if (e2 === '邮箱') {
    this.form.useremail = e1
  }
  if (e2 === '英文ID') {
    this.form.roleid = e1
  }
  if (e2 === '中文名') {
    this.form.describeName = e1
  }
  if (e2 === '角色ID') {
    this.form.roleName = e1
  }
  if (e2 === '角色名') {
    this.form.roleDisplayName = e1
  }
  if (e2 === '租户名') {
    this.form.form.tenantName = e1
  }
  if (e2 === 'AdminEmailAddress') {
    this.form.AdminEmailAddress = e1
  }
  if (e2 === '当前密码') {
    this.form.currentPassword = e1
  }
}
