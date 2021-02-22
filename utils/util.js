function ajax(name, data) {
  return new Promise((resovle, reject) => {
    wx.request({
      url: 'https://ruangong.tian999.top/' + name,
      method: 'GET',
      // 使用data传递参数，只能用get方法
      data: data,
      success: resovle, // resolve 会让success的返回值 res return
      fail: reject
    })
  })
}

function formatData(data) {
  const nameData = []
  for (let i = 1; i < data.length; i++) {
    const arr = data[i].garbage_list
    nameData[i - 1] = arr.slice(0, arr.length / 3)
  }
  // const arr = data[0].garbage_list
  // nameData[26] = arr.slice(0, arr.length / 4)
  console.log(nameData)
  return nameData
}

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

module.exports = {
  formatTime,
  ajax,
  formatData
}